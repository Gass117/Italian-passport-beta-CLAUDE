import Foundation
import CoreLocation
import Observation

/// Stato dell'autorizzazione location
enum LocationAuthStatus {
    case notDetermined
    case denied
    case restricted
    case authorized

    var message: String {
        switch self {
        case .notDetermined:
            return "Permesso posizione non ancora richiesto"
        case .denied:
            return "Accesso alla posizione negato. Vai in Impostazioni > Privacy > Posizione per abilitarlo."
        case .restricted:
            return "Accesso alla posizione limitato dalle impostazioni del dispositivo"
        case .authorized:
            return "Posizione disponibile"
        }
    }

    var canRequestLocation: Bool {
        self == .authorized
    }
}

/// Risultato del check distanza
struct DistanceCheckResult {
    let distance: CLLocationDistance  // in metri
    let isWithinRange: Bool
    let formattedDistance: String

    static func from(distance: CLLocationDistance, threshold: Double) -> DistanceCheckResult {
        let formatted: String
        if distance < 1000 {
            formatted = String(format: "%.0f m", distance)
        } else {
            formatted = String(format: "%.1f km", distance / 1000)
        }

        return DistanceCheckResult(
            distance: distance,
            isWithinRange: distance <= threshold,
            formattedDistance: formatted
        )
    }
}

/// Servizio per la gestione della posizione utente
@Observable
final class LocationService: NSObject {
    // MARK: - Properties

    /// Stato corrente dell'autorizzazione
    private(set) var authStatus: LocationAuthStatus = .notDetermined

    /// Ultima posizione nota dell'utente
    private(set) var currentLocation: CLLocation?

    /// Indica se è in corso un aggiornamento posizione
    private(set) var isUpdating: Bool = false

    /// Eventuale errore
    private(set) var locationError: Error?

    /// Soglia di distanza in metri (configurabile)
    var distanceThreshold: Double = 200.0

    private let locationManager = CLLocationManager()
    private var locationContinuation: CheckedContinuation<CLLocation?, Error>?

    // MARK: - Initialization

    override init() {
        super.init()
        locationManager.delegate = self
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        updateAuthStatus()
    }

    // MARK: - Public Methods

    /// Richiede il permesso per usare la posizione
    func requestPermission() {
        locationManager.requestWhenInUseAuthorization()
    }

    /// Ottiene la posizione corrente (one-shot)
    @MainActor
    func getCurrentLocation() async throws -> CLLocation? {
        // Verifica autorizzazione
        guard authStatus == .authorized else {
            if authStatus == .notDetermined {
                requestPermission()
            }
            return nil
        }

        isUpdating = true
        locationError = nil

        defer { isUpdating = false }

        return try await withCheckedThrowingContinuation { continuation in
            self.locationContinuation = continuation
            locationManager.requestLocation()
        }
    }

    /// Calcola la distanza tra la posizione corrente e un luogo
    func checkDistance(to place: Place) async throws -> DistanceCheckResult? {
        guard let userLocation = try await getCurrentLocation() else {
            return nil
        }

        let distance = userLocation.distance(from: place.location)
        return DistanceCheckResult.from(distance: distance, threshold: distanceThreshold)
    }

    /// Calcola la distanza senza aggiornare la posizione (usa l'ultima nota)
    func checkDistanceFromLastKnown(to place: Place) -> DistanceCheckResult? {
        guard let userLocation = currentLocation else { return nil }

        let distance = userLocation.distance(from: place.location)
        return DistanceCheckResult.from(distance: distance, threshold: distanceThreshold)
    }

    // MARK: - Private Methods

    private func updateAuthStatus() {
        switch locationManager.authorizationStatus {
        case .notDetermined:
            authStatus = .notDetermined
        case .denied:
            authStatus = .denied
        case .restricted:
            authStatus = .restricted
        case .authorizedAlways, .authorizedWhenInUse:
            authStatus = .authorized
        @unknown default:
            authStatus = .notDetermined
        }
    }
}

// MARK: - CLLocationManagerDelegate

extension LocationService: CLLocationManagerDelegate {
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        updateAuthStatus()
    }

    func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let location = locations.last else { return }

        currentLocation = location
        locationContinuation?.resume(returning: location)
        locationContinuation = nil
    }

    func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        locationError = error
        locationContinuation?.resume(throwing: error)
        locationContinuation = nil
    }
}

// MARK: - Preview Support

extension LocationService {
    /// LocationService simulato per preview
    static var preview: LocationService {
        let service = LocationService()
        // Simula una posizione a Firenze
        service.currentLocation = CLLocation(latitude: 43.7696, longitude: 11.2558)
        return service
    }

    /// LocationService con posizione custom per testing
    static func mock(latitude: Double, longitude: Double) -> LocationService {
        let service = LocationService()
        service.currentLocation = CLLocation(latitude: latitude, longitude: longitude)
        return service
    }
}
