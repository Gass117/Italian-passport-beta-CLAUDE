import SwiftUI
import MapKit

/// Mini mappa con il pin del luogo
struct MiniMapView: View {
    let place: Place
    let userLocation: CLLocationCoordinate2D?

    @State private var cameraPosition: MapCameraPosition

    init(place: Place, userLocation: CLLocationCoordinate2D? = nil) {
        self.place = place
        self.userLocation = userLocation

        // Inizializza la camera centrata sul luogo
        let region = MKCoordinateRegion(
            center: place.coordinate,
            span: MKCoordinateSpan(latitudeDelta: 0.01, longitudeDelta: 0.01)
        )
        _cameraPosition = State(initialValue: .region(region))
    }

    var body: some View {
        Map(position: $cameraPosition) {
            // Pin del luogo
            Annotation(place.name, coordinate: place.coordinate) {
                PlacePin(type: place.type)
            }

            // Pin dell'utente se disponibile
            if let userLocation {
                Annotation("Tu", coordinate: userLocation) {
                    UserLocationPin()
                }
            }
        }
        .mapStyle(.standard(elevation: .realistic))
        .mapControls {
            MapCompass()
            MapScaleView()
        }
    }
}

// MARK: - Custom Pins

struct PlacePin: View {
    let type: PlaceType

    var body: some View {
        VStack(spacing: 0) {
            ZStack {
                Circle()
                    .fill(pinColor)
                    .frame(width: 36, height: 36)
                    .shadow(radius: 3)

                Image(systemName: type.iconName)
                    .font(.system(size: 16, weight: .semibold))
                    .foregroundStyle(.white)
            }

            // Punta del pin
            Triangle()
                .fill(pinColor)
                .frame(width: 12, height: 8)
                .rotationEffect(.degrees(180))
                .offset(y: -2)
        }
    }

    private var pinColor: Color {
        switch type {
        case .city: return .blue
        case .borgo: return .orange
        case .landmark: return .purple
        }
    }
}

struct UserLocationPin: View {
    var body: some View {
        ZStack {
            Circle()
                .fill(Color.blue.opacity(0.2))
                .frame(width: 44, height: 44)

            Circle()
                .fill(Color.blue)
                .frame(width: 16, height: 16)

            Circle()
                .stroke(Color.white, lineWidth: 3)
                .frame(width: 16, height: 16)
        }
    }
}

#Preview {
    MiniMapView(
        place: .sample,
        userLocation: CLLocationCoordinate2D(latitude: 43.770, longitude: 11.256)
    )
    .frame(height: 200)
    .clipShape(RoundedRectangle(cornerRadius: 12))
    .padding()
}
