import Foundation
import SwiftData
import Observation

/// Container per i dati JSON
struct PlacesData: Codable {
    let regions: [Region]
    let places: [Place]
}

/// Store centralizzato per la gestione dei dati dell'app
@Observable
final class DataStore {
    // MARK: - Properties

    /// Tutte le regioni caricate
    private(set) var regions: [Region] = []

    /// Tutti i luoghi caricati
    private(set) var places: [Place] = []

    /// Set degli ID dei luoghi visitati (per lookup veloce)
    private(set) var visitedPlaceIds: Set<String> = []

    /// ModelContext per SwiftData
    private var modelContext: ModelContext?

    /// Errore di caricamento, se presente
    private(set) var loadError: Error?

    // MARK: - Initialization

    init() {
        loadStaticData()
    }

    /// Configura il ModelContext per la persistenza
    func configure(with modelContext: ModelContext) {
        self.modelContext = modelContext
        loadVisitedPlaces()
    }

    // MARK: - Data Loading

    /// Carica i dati statici dal file JSON
    private func loadStaticData() {
        guard let url = Bundle.main.url(forResource: "places", withExtension: "json") else {
            loadError = DataStoreError.fileNotFound
            // Carica dati di fallback per development
            loadFallbackData()
            return
        }

        do {
            let data = try Data(contentsOf: url)
            let decoder = JSONDecoder()
            let placesData = try decoder.decode(PlacesData.self, from: data)
            self.regions = placesData.regions
            self.places = placesData.places
        } catch {
            loadError = error
            loadFallbackData()
        }
    }

    /// Carica dati di fallback per preview e development
    private func loadFallbackData() {
        self.regions = Region.samples
        self.places = Place.samples
    }

    /// Carica i luoghi visitati da SwiftData
    private func loadVisitedPlaces() {
        guard let context = modelContext else { return }

        do {
            let descriptor = FetchDescriptor<VisitedPlace>()
            let visited = try context.fetch(descriptor)
            self.visitedPlaceIds = Set(visited.map { $0.placeId })
        } catch {
            print("Error loading visited places: \(error)")
        }
    }

    // MARK: - Queries

    /// Ottiene tutti i luoghi per una regione
    func places(for regionId: String) -> [Place] {
        places.filter { $0.regionId == regionId }
    }

    /// Ottiene una regione per ID
    func region(for id: String) -> Region? {
        regions.first { $0.id == id }
    }

    /// Ottiene un luogo per ID
    func place(for id: String) -> Place? {
        places.first { $0.id == id }
    }

    /// Verifica se un luogo è stato visitato
    func isVisited(_ placeId: String) -> Bool {
        visitedPlaceIds.contains(placeId)
    }

    /// Conta i badge sbloccati per una regione
    func unlockedCount(for regionId: String) -> Int {
        let regionPlaceIds = Set(places(for: regionId).map { $0.id })
        return visitedPlaceIds.intersection(regionPlaceIds).count
    }

    /// Conta totale luoghi per una regione
    func totalCount(for regionId: String) -> Int {
        places(for: regionId).count
    }

    /// Tutti i badge (luoghi) sbloccati
    var unlockedPlaces: [Place] {
        places.filter { visitedPlaceIds.contains($0.id) }
    }

    /// Tutti i badge non ancora sbloccati
    var lockedPlaces: [Place] {
        places.filter { !visitedPlaceIds.contains($0.id) }
    }

    /// Progresso totale (0.0 - 1.0)
    var totalProgress: Double {
        guard !places.isEmpty else { return 0 }
        return Double(visitedPlaceIds.count) / Double(places.count)
    }

    // MARK: - Mutations

    /// Segna un luogo come visitato
    func markAsVisited(_ placeId: String, scratchPercentage: Double = 0.6) {
        guard let place = place(for: placeId),
              let context = modelContext else { return }

        // Verifica che non sia già visitato
        guard !visitedPlaceIds.contains(placeId) else { return }

        // Crea e salva il record
        let visitRecord = VisitedPlace(
            placeId: placeId,
            regionId: place.regionId,
            scratchPercentage: scratchPercentage
        )

        context.insert(visitRecord)

        do {
            try context.save()
            visitedPlaceIds.insert(placeId)
        } catch {
            print("Error saving visited place: \(error)")
        }
    }

    /// Resetta tutti i progressi (per testing/debug)
    func resetAllProgress() {
        guard let context = modelContext else { return }

        do {
            try context.delete(model: VisitedPlace.self)
            try context.save()
            visitedPlaceIds.removeAll()
        } catch {
            print("Error resetting progress: \(error)")
        }
    }
}

// MARK: - Errors

enum DataStoreError: LocalizedError {
    case fileNotFound
    case decodingError

    var errorDescription: String? {
        switch self {
        case .fileNotFound:
            return "File places.json non trovato nel bundle"
        case .decodingError:
            return "Errore nella decodifica del JSON"
        }
    }
}

// MARK: - Preview Support

extension DataStore {
    /// DataStore con dati di esempio per SwiftUI previews
    static var preview: DataStore {
        let store = DataStore()
        store.regions = Region.samples
        store.places = Place.samples
        return store
    }
}
