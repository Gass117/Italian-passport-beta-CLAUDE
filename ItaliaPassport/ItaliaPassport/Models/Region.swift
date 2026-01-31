import Foundation

/// Rappresenta una regione italiana con i suoi metadati
struct Region: Codable, Identifiable, Hashable {
    let id: String
    let name: String
    let displayName: String
    let capitalCity: String

    /// Nome dell'asset per lo shape della regione (usato per rendering custom)
    let shapeAssetName: String?

    /// Coordinate del centro della regione per posizionamento mappa
    let centerLatitude: Double
    let centerLongitude: Double

    /// Colore tema della regione in formato hex
    let themeColorHex: String

    var themeColor: String {
        themeColorHex
    }
}

// MARK: - Sample Data for Previews
extension Region {
    static let sample = Region(
        id: "toscana",
        name: "Toscana",
        displayName: "Toscana",
        capitalCity: "Firenze",
        shapeAssetName: "toscana_shape",
        centerLatitude: 43.7711,
        centerLongitude: 11.2486,
        themeColorHex: "#D4A574"
    )

    static let samples: [Region] = [
        sample,
        Region(
            id: "lazio",
            name: "Lazio",
            displayName: "Lazio",
            capitalCity: "Roma",
            shapeAssetName: "lazio_shape",
            centerLatitude: 41.9028,
            centerLongitude: 12.4964,
            themeColorHex: "#8B4513"
        )
    ]
}
