import Foundation
import SwiftData

/// Record di un luogo visitato, persistito con SwiftData
@Model
final class VisitedPlace {
    /// ID univoco del luogo (corrisponde a Place.id)
    @Attribute(.unique) var placeId: String

    /// ID della regione per query filtrate
    var regionId: String

    /// Timestamp di quando è stato sbloccato il badge
    var unlockedAt: Date

    /// Percentuale grattata quando è stato sbloccato (per statistiche)
    var scratchPercentage: Double

    init(placeId: String, regionId: String, unlockedAt: Date = Date(), scratchPercentage: Double = 0.6) {
        self.placeId = placeId
        self.regionId = regionId
        self.unlockedAt = unlockedAt
        self.scratchPercentage = scratchPercentage
    }
}

// MARK: - Convenience Extensions
extension VisitedPlace {
    /// Formatta la data di visita in modo leggibile
    var formattedDate: String {
        let formatter = DateFormatter()
        formatter.dateStyle = .medium
        formatter.timeStyle = .short
        formatter.locale = Locale(identifier: "it_IT")
        return formatter.string(from: unlockedAt)
    }
}
