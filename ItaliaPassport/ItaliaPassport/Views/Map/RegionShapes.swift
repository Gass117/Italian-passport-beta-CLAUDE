import SwiftUI

/// Dati per posizionamento e shape delle regioni sulla mappa
struct RegionMapData {
    let id: String
    let name: String
    let center: CGPoint      // Centro normalizzato (0-1)
    let size: CGSize         // Dimensione relativa
    let pathPoints: [CGPoint] // Punti del path normalizzati

    /// Genera un Path scalato per una certa dimensione
    func scaledPath(in containerSize: CGSize) -> Path {
        var path = Path()
        guard !pathPoints.isEmpty else { return path }

        let scaledPoints = pathPoints.map { point in
            CGPoint(
                x: point.x * containerSize.width,
                y: point.y * containerSize.height
            )
        }

        path.move(to: scaledPoints[0])
        for point in scaledPoints.dropFirst() {
            path.addLine(to: point)
        }
        path.closeSubpath()

        return path
    }
}

/// Repository delle shape delle regioni italiane
/// Coordinate normalizzate 0-1 per adattarsi a qualsiasi dimensione
enum ItalyRegions {
    static let all: [RegionMapData] = [
        // Nord-Ovest
        valleAosta, piemonte, liguria, lombardia,

        // Nord-Est
        trentinoAltoAdige, veneto, friuliVeneziaGiulia, emiliaRomagna,

        // Centro
        toscana, marche, umbria, lazio,

        // Sud
        abruzzo, molise, campania, puglia, basilicata, calabria,

        // Isole
        sicilia, sardegna
    ]

    // MARK: - Definizioni Regioni (semplificate per MVP)

    static let valleAosta = RegionMapData(
        id: "valle_aosta",
        name: "Valle d'Aosta",
        center: CGPoint(x: 0.15, y: 0.12),
        size: CGSize(width: 0.05, height: 0.03),
        pathPoints: [
            CGPoint(x: 0.12, y: 0.10),
            CGPoint(x: 0.18, y: 0.10),
            CGPoint(x: 0.18, y: 0.14),
            CGPoint(x: 0.12, y: 0.14)
        ]
    )

    static let piemonte = RegionMapData(
        id: "piemonte",
        name: "Piemonte",
        center: CGPoint(x: 0.18, y: 0.18),
        size: CGSize(width: 0.12, height: 0.10),
        pathPoints: [
            CGPoint(x: 0.10, y: 0.14),
            CGPoint(x: 0.22, y: 0.10),
            CGPoint(x: 0.28, y: 0.15),
            CGPoint(x: 0.25, y: 0.25),
            CGPoint(x: 0.15, y: 0.28),
            CGPoint(x: 0.08, y: 0.22)
        ]
    )

    static let liguria = RegionMapData(
        id: "liguria",
        name: "Liguria",
        center: CGPoint(x: 0.22, y: 0.30),
        size: CGSize(width: 0.12, height: 0.04),
        pathPoints: [
            CGPoint(x: 0.15, y: 0.28),
            CGPoint(x: 0.30, y: 0.28),
            CGPoint(x: 0.28, y: 0.33),
            CGPoint(x: 0.13, y: 0.33)
        ]
    )

    static let lombardia = RegionMapData(
        id: "lombardia",
        name: "Lombardia",
        center: CGPoint(x: 0.32, y: 0.15),
        size: CGSize(width: 0.12, height: 0.10),
        pathPoints: [
            CGPoint(x: 0.25, y: 0.08),
            CGPoint(x: 0.40, y: 0.08),
            CGPoint(x: 0.42, y: 0.22),
            CGPoint(x: 0.28, y: 0.24),
            CGPoint(x: 0.25, y: 0.15)
        ]
    )

    static let trentinoAltoAdige = RegionMapData(
        id: "trentino",
        name: "Trentino-Alto Adige",
        center: CGPoint(x: 0.42, y: 0.08),
        size: CGSize(width: 0.10, height: 0.08),
        pathPoints: [
            CGPoint(x: 0.38, y: 0.02),
            CGPoint(x: 0.50, y: 0.02),
            CGPoint(x: 0.50, y: 0.14),
            CGPoint(x: 0.38, y: 0.14)
        ]
    )

    static let veneto = RegionMapData(
        id: "veneto",
        name: "Veneto",
        center: CGPoint(x: 0.50, y: 0.18),
        size: CGSize(width: 0.12, height: 0.10),
        pathPoints: [
            CGPoint(x: 0.42, y: 0.12),
            CGPoint(x: 0.58, y: 0.12),
            CGPoint(x: 0.60, y: 0.24),
            CGPoint(x: 0.44, y: 0.24)
        ]
    )

    static let friuliVeneziaGiulia = RegionMapData(
        id: "friuli",
        name: "Friuli-Venezia Giulia",
        center: CGPoint(x: 0.60, y: 0.12),
        size: CGSize(width: 0.08, height: 0.06),
        pathPoints: [
            CGPoint(x: 0.55, y: 0.08),
            CGPoint(x: 0.68, y: 0.08),
            CGPoint(x: 0.68, y: 0.18),
            CGPoint(x: 0.58, y: 0.18)
        ]
    )

    static let emiliaRomagna = RegionMapData(
        id: "emilia",
        name: "Emilia-Romagna",
        center: CGPoint(x: 0.42, y: 0.28),
        size: CGSize(width: 0.18, height: 0.08),
        pathPoints: [
            CGPoint(x: 0.28, y: 0.24),
            CGPoint(x: 0.55, y: 0.24),
            CGPoint(x: 0.58, y: 0.32),
            CGPoint(x: 0.30, y: 0.34)
        ]
    )

    static let toscana = RegionMapData(
        id: "toscana",
        name: "Toscana",
        center: CGPoint(x: 0.38, y: 0.40),
        size: CGSize(width: 0.14, height: 0.12),
        pathPoints: [
            CGPoint(x: 0.28, y: 0.34),
            CGPoint(x: 0.48, y: 0.32),
            CGPoint(x: 0.50, y: 0.48),
            CGPoint(x: 0.35, y: 0.52),
            CGPoint(x: 0.28, y: 0.42)
        ]
    )

    static let marche = RegionMapData(
        id: "marche",
        name: "Marche",
        center: CGPoint(x: 0.55, y: 0.40),
        size: CGSize(width: 0.08, height: 0.10),
        pathPoints: [
            CGPoint(x: 0.50, y: 0.34),
            CGPoint(x: 0.62, y: 0.34),
            CGPoint(x: 0.60, y: 0.48),
            CGPoint(x: 0.50, y: 0.48)
        ]
    )

    static let umbria = RegionMapData(
        id: "umbria",
        name: "Umbria",
        center: CGPoint(x: 0.48, y: 0.45),
        size: CGSize(width: 0.06, height: 0.08),
        pathPoints: [
            CGPoint(x: 0.45, y: 0.40),
            CGPoint(x: 0.52, y: 0.40),
            CGPoint(x: 0.52, y: 0.50),
            CGPoint(x: 0.45, y: 0.50)
        ]
    )

    static let lazio = RegionMapData(
        id: "lazio",
        name: "Lazio",
        center: CGPoint(x: 0.45, y: 0.55),
        size: CGSize(width: 0.12, height: 0.10),
        pathPoints: [
            CGPoint(x: 0.35, y: 0.48),
            CGPoint(x: 0.52, y: 0.48),
            CGPoint(x: 0.55, y: 0.62),
            CGPoint(x: 0.38, y: 0.65),
            CGPoint(x: 0.32, y: 0.55)
        ]
    )

    static let abruzzo = RegionMapData(
        id: "abruzzo",
        name: "Abruzzo",
        center: CGPoint(x: 0.55, y: 0.52),
        size: CGSize(width: 0.08, height: 0.06),
        pathPoints: [
            CGPoint(x: 0.50, y: 0.48),
            CGPoint(x: 0.62, y: 0.48),
            CGPoint(x: 0.60, y: 0.56),
            CGPoint(x: 0.50, y: 0.56)
        ]
    )

    static let molise = RegionMapData(
        id: "molise",
        name: "Molise",
        center: CGPoint(x: 0.58, y: 0.58),
        size: CGSize(width: 0.05, height: 0.04),
        pathPoints: [
            CGPoint(x: 0.55, y: 0.55),
            CGPoint(x: 0.62, y: 0.55),
            CGPoint(x: 0.62, y: 0.62),
            CGPoint(x: 0.55, y: 0.62)
        ]
    )

    static let campania = RegionMapData(
        id: "campania",
        name: "Campania",
        center: CGPoint(x: 0.52, y: 0.65),
        size: CGSize(width: 0.10, height: 0.08),
        pathPoints: [
            CGPoint(x: 0.45, y: 0.60),
            CGPoint(x: 0.58, y: 0.60),
            CGPoint(x: 0.60, y: 0.72),
            CGPoint(x: 0.45, y: 0.72)
        ]
    )

    static let puglia = RegionMapData(
        id: "puglia",
        name: "Puglia",
        center: CGPoint(x: 0.68, y: 0.62),
        size: CGSize(width: 0.12, height: 0.14),
        pathPoints: [
            CGPoint(x: 0.60, y: 0.55),
            CGPoint(x: 0.78, y: 0.58),
            CGPoint(x: 0.75, y: 0.72),
            CGPoint(x: 0.60, y: 0.68)
        ]
    )

    static let basilicata = RegionMapData(
        id: "basilicata",
        name: "Basilicata",
        center: CGPoint(x: 0.60, y: 0.70),
        size: CGSize(width: 0.08, height: 0.06),
        pathPoints: [
            CGPoint(x: 0.55, y: 0.66),
            CGPoint(x: 0.66, y: 0.66),
            CGPoint(x: 0.66, y: 0.75),
            CGPoint(x: 0.55, y: 0.75)
        ]
    )

    static let calabria = RegionMapData(
        id: "calabria",
        name: "Calabria",
        center: CGPoint(x: 0.60, y: 0.82),
        size: CGSize(width: 0.08, height: 0.12),
        pathPoints: [
            CGPoint(x: 0.55, y: 0.74),
            CGPoint(x: 0.65, y: 0.74),
            CGPoint(x: 0.62, y: 0.92),
            CGPoint(x: 0.55, y: 0.88)
        ]
    )

    static let sicilia = RegionMapData(
        id: "sicilia",
        name: "Sicilia",
        center: CGPoint(x: 0.52, y: 0.92),
        size: CGSize(width: 0.15, height: 0.08),
        pathPoints: [
            CGPoint(x: 0.42, y: 0.88),
            CGPoint(x: 0.62, y: 0.88),
            CGPoint(x: 0.60, y: 0.98),
            CGPoint(x: 0.42, y: 0.96)
        ]
    )

    static let sardegna = RegionMapData(
        id: "sardegna",
        name: "Sardegna",
        center: CGPoint(x: 0.22, y: 0.58),
        size: CGSize(width: 0.08, height: 0.14),
        pathPoints: [
            CGPoint(x: 0.18, y: 0.48),
            CGPoint(x: 0.28, y: 0.48),
            CGPoint(x: 0.28, y: 0.70),
            CGPoint(x: 0.18, y: 0.68)
        ]
    )

    /// Trova una regione per ID
    static func find(byId id: String) -> RegionMapData? {
        all.first { $0.id == id }
    }
}
