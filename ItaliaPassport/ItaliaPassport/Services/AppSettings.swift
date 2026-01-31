import Foundation
import Observation

/// Gestisce le impostazioni dell'app persistite in UserDefaults
@Observable
final class AppSettings {
    // MARK: - Keys

    private enum Keys {
        static let distanceThreshold = "distanceThreshold"
        static let hasCompletedOnboarding = "hasCompletedOnboarding"
        static let preferredColorScheme = "preferredColorScheme"
    }

    // MARK: - Properties

    /// Soglia di distanza in metri per sbloccare badge (default: 200m)
    var distanceThreshold: Double {
        didSet {
            UserDefaults.standard.set(distanceThreshold, forKey: Keys.distanceThreshold)
        }
    }

    /// Indica se l'utente ha completato l'onboarding
    var hasCompletedOnboarding: Bool {
        didSet {
            UserDefaults.standard.set(hasCompletedOnboarding, forKey: Keys.hasCompletedOnboarding)
        }
    }

    // MARK: - Computed Properties

    /// Soglia formattata per display
    var formattedThreshold: String {
        if distanceThreshold < 1000 {
            return "\(Int(distanceThreshold)) metri"
        } else {
            return String(format: "%.1f km", distanceThreshold / 1000)
        }
    }

    /// Preset di soglie disponibili
    static let thresholdPresets: [(String, Double)] = [
        ("50 m (difficile)", 50),
        ("100 m", 100),
        ("200 m (default)", 200),
        ("500 m", 500),
        ("1 km (facile)", 1000)
    ]

    // MARK: - Initialization

    init() {
        // Carica valori salvati o usa defaults
        let savedThreshold = UserDefaults.standard.double(forKey: Keys.distanceThreshold)
        self.distanceThreshold = savedThreshold > 0 ? savedThreshold : 200.0

        self.hasCompletedOnboarding = UserDefaults.standard.bool(forKey: Keys.hasCompletedOnboarding)
    }

    // MARK: - Methods

    /// Resetta tutte le impostazioni ai valori di default
    func resetToDefaults() {
        distanceThreshold = 200.0
        hasCompletedOnboarding = false
    }
}

// MARK: - Preview Support

extension AppSettings {
    static var preview: AppSettings {
        AppSettings()
    }
}
