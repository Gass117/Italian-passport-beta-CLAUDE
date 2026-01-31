import SwiftUI

/// Singolo badge nella griglia della collezione
struct BadgeItemView: View {
    let place: Place
    let isUnlocked: Bool

    var body: some View {
        VStack(spacing: 8) {
            // Icona badge
            ZStack {
                Circle()
                    .fill(badgeBackground)
                    .frame(width: 60, height: 60)
                    .shadow(color: isUnlocked ? .orange.opacity(0.2) : .clear, radius: 5)

                Image(systemName: place.badge.imageName)
                    .font(.system(size: 28))
                    .foregroundStyle(badgeForeground)
            }

            // Nome luogo
            Text(place.name)
                .font(.caption)
                .fontWeight(.medium)
                .lineLimit(1)
                .foregroundStyle(isUnlocked ? .primary : .secondary)

            // Tipo
            Text(place.type.displayName)
                .font(.caption2)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 8)
    }

    private var badgeBackground: some ShapeStyle {
        if isUnlocked {
            return AnyShapeStyle(
                LinearGradient(
                    colors: [.yellow.opacity(0.7), .orange.opacity(0.8)],
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )
        } else {
            return AnyShapeStyle(Color.gray.opacity(0.2))
        }
    }

    private var badgeForeground: Color {
        isUnlocked ? .white : .gray.opacity(0.5)
    }
}

#Preview {
    HStack {
        BadgeItemView(place: .sample, isUnlocked: true)
        BadgeItemView(place: .sample, isUnlocked: false)
    }
    .padding()
}
