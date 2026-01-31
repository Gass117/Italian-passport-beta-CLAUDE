import SwiftUI

/// Riga singola per un luogo nella lista della regione
struct PlaceRowView: View {
    let place: Place
    let isVisited: Bool

    var body: some View {
        HStack(spacing: 12) {
            // Icona tipo luogo con stato
            ZStack {
                Circle()
                    .fill(isVisited ? Color.green.opacity(0.15) : Color.gray.opacity(0.1))
                    .frame(width: 50, height: 50)

                Image(systemName: place.type.iconName)
                    .font(.system(size: 20))
                    .foregroundStyle(isVisited ? .green : .secondary)

                // Badge check se visitato
                if isVisited {
                    Image(systemName: "checkmark.circle.fill")
                        .font(.system(size: 16))
                        .foregroundStyle(.green)
                        .background(Color.white)
                        .clipShape(Circle())
                        .offset(x: 16, y: 16)
                }
            }

            VStack(alignment: .leading, spacing: 4) {
                HStack {
                    Text(place.name)
                        .font(.headline)

                    Spacer()

                    // Tag tipo
                    Text(place.type.displayName)
                        .font(.caption2)
                        .fontWeight(.medium)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 3)
                        .background(typeBackgroundColor)
                        .foregroundStyle(typeForegroundColor)
                        .clipShape(Capsule())
                }

                Text(place.province)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                Text(place.shortDescription)
                    .font(.caption)
                    .foregroundStyle(.secondary)
                    .lineLimit(2)
            }

            Image(systemName: "chevron.right")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(.vertical, 8)
        .contentShape(Rectangle())
    }

    private var typeBackgroundColor: Color {
        switch place.type {
        case .city:
            return Color.blue.opacity(0.1)
        case .borgo:
            return Color.orange.opacity(0.1)
        case .landmark:
            return Color.purple.opacity(0.1)
        }
    }

    private var typeForegroundColor: Color {
        switch place.type {
        case .city:
            return .blue
        case .borgo:
            return .orange
        case .landmark:
            return .purple
        }
    }
}

#Preview {
    VStack {
        PlaceRowView(place: .sample, isVisited: false)
        Divider()
        PlaceRowView(place: .sample, isVisited: true)
    }
    .padding()
}
