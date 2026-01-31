import Foundation
import CoreLocation

/// Tipo di luogo
enum PlaceType: String, Codable, CaseIterable {
    case city = "city"
    case borgo = "borgo"
    case landmark = "landmark"

    var displayName: String {
        switch self {
        case .city: return "Città"
        case .borgo: return "Borgo"
        case .landmark: return "Monumento"
        }
    }

    var iconName: String {
        switch self {
        case .city: return "building.2.fill"
        case .borgo: return "house.lodge.fill"
        case .landmark: return "mappin.and.ellipse"
        }
    }
}

/// Stato di visita del luogo
enum VisitStatus: Equatable {
    case locked           // Non ancora verificato o troppo lontano
    case eligible         // Abbastanza vicino, può grattare
    case unlocked         // Badge sbloccato

    var displayName: String {
        switch self {
        case .locked: return "Da visitare"
        case .eligible: return "Sei qui! Gratta per sbloccare"
        case .unlocked: return "Visitato"
        }
    }

    var iconName: String {
        switch self {
        case .locked: return "lock.fill"
        case .eligible: return "hand.draw.fill"
        case .unlocked: return "checkmark.seal.fill"
        }
    }
}

/// Informazioni sul badge associato al luogo
struct BadgeInfo: Codable, Hashable {
    let title: String
    let imageName: String  // SF Symbol o asset name
    let description: String
}

/// Rappresenta un luogo visitabile in Italia
struct Place: Codable, Identifiable, Hashable {
    let id: String
    let regionId: String
    let name: String
    let type: PlaceType
    let province: String
    let latitude: Double
    let longitude: Double
    let shortDescription: String

    /// 5 cose da fare per essere italiano DOC in questo luogo
    let docTips: [String]

    /// Badge associato
    let badge: BadgeInfo

    /// Coordinate CLLocation per calcoli distanza
    var coordinate: CLLocationCoordinate2D {
        CLLocationCoordinate2D(latitude: latitude, longitude: longitude)
    }

    var location: CLLocation {
        CLLocation(latitude: latitude, longitude: longitude)
    }
}

// MARK: - Sample Data for Previews
extension Place {
    static let sample = Place(
        id: "firenze",
        regionId: "toscana",
        name: "Firenze",
        type: .city,
        province: "FI",
        latitude: 43.7696,
        longitude: 11.2558,
        shortDescription: "Culla del Rinascimento e capitale mondiale dell'arte, Firenze incanta con i suoi capolavori, ponti storici e tradizioni culinarie uniche.",
        docTips: [
            "Mangia una schiacciata all'olio in un forno storico",
            "Passeggia sul Ponte Vecchio al tramonto",
            "Ordina un lampredotto dal trippaio ambulante",
            "Visita gli Uffizi di prima mattina",
            "Prendi un caffè al Caffè Gilli in Piazza della Repubblica"
        ],
        badge: BadgeInfo(
            title: "Fiorentino DOC",
            imageName: "fleur.de.lis.fill",
            description: "Hai conquistato la culla del Rinascimento!"
        )
    )

    static let samples: [Place] = [
        sample,
        Place(
            id: "san_gimignano",
            regionId: "toscana",
            name: "San Gimignano",
            type: .borgo,
            province: "SI",
            latitude: 43.4677,
            longitude: 11.0430,
            shortDescription: "Il borgo delle belle torri, patrimonio UNESCO, famoso per la Vernaccia e le torri medievali che dominano il paesaggio.",
            docTips: [
                "Conta tutte le 14 torri rimaste",
                "Assaggia il gelato più premiato d'Italia",
                "Bevi un bicchiere di Vernaccia locale",
                "Passeggia sulle mura al tramonto",
                "Compra dello zafferano locale"
            ],
            badge: BadgeInfo(
                title: "Torriere Medievale",
                imageName: "building.columns.fill",
                description: "Hai scalato la Manhattan del Medioevo!"
            )
        )
    ]
}
