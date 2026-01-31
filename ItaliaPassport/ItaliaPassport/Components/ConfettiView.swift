import SwiftUI

/// Particella singola di confetti
struct ConfettiPiece: Identifiable {
    let id = UUID()
    var x: CGFloat
    var y: CGFloat
    let color: Color
    let rotation: Double
    let scale: CGFloat
    let shape: ConfettiShape
}

enum ConfettiShape: CaseIterable {
    case circle, square, triangle

    @ViewBuilder
    func view(color: Color, scale: CGFloat) -> some View {
        switch self {
        case .circle:
            Circle()
                .fill(color)
                .frame(width: 8 * scale, height: 8 * scale)
        case .square:
            Rectangle()
                .fill(color)
                .frame(width: 8 * scale, height: 8 * scale)
        case .triangle:
            Triangle()
                .fill(color)
                .frame(width: 10 * scale, height: 10 * scale)
        }
    }
}

/// Forma triangolo per confetti
struct Triangle: Shape {
    func path(in rect: CGRect) -> Path {
        var path = Path()
        path.move(to: CGPoint(x: rect.midX, y: rect.minY))
        path.addLine(to: CGPoint(x: rect.maxX, y: rect.maxY))
        path.addLine(to: CGPoint(x: rect.minX, y: rect.maxY))
        path.closeSubpath()
        return path
    }
}

/// View che mostra un'animazione di confetti celebrativa
struct ConfettiView: View {
    @State private var pieces: [ConfettiPiece] = []
    @State private var isAnimating = false

    let colors: [Color] = [
        .red, .green, .blue, .yellow, .orange, .pink, .purple,
        Color(red: 0, green: 0.5, blue: 0), // Verde Italia
        Color.white,
        Color.red.opacity(0.8)
    ]

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                ForEach(pieces) { piece in
                    piece.shape.view(color: piece.color, scale: piece.scale)
                        .position(x: piece.x, y: piece.y)
                        .rotationEffect(.degrees(piece.rotation))
                }
            }
            .onAppear {
                startConfetti(in: geometry.size)
            }
        }
        .allowsHitTesting(false)
    }

    private func startConfetti(in size: CGSize) {
        // Genera particelle
        pieces = (0..<50).map { _ in
            ConfettiPiece(
                x: CGFloat.random(in: 0...size.width),
                y: -20,
                color: colors.randomElement() ?? .red,
                rotation: Double.random(in: 0...360),
                scale: CGFloat.random(in: 0.8...1.5),
                shape: ConfettiShape.allCases.randomElement() ?? .circle
            )
        }

        // Anima la caduta
        withAnimation(.easeIn(duration: 3.0)) {
            for i in pieces.indices {
                pieces[i].y = size.height + 50
                pieces[i].x += CGFloat.random(in: -100...100)
            }
        }

        // Rimuovi dopo l'animazione
        DispatchQueue.main.asyncAfter(deadline: .now() + 3.5) {
            pieces.removeAll()
        }
    }
}

/// Modifier per aggiungere confetti a qualsiasi view
struct ConfettiModifier: ViewModifier {
    @Binding var isShowing: Bool

    func body(content: Content) -> some View {
        ZStack {
            content

            if isShowing {
                ConfettiView()
                    .ignoresSafeArea()
                    .onAppear {
                        DispatchQueue.main.asyncAfter(deadline: .now() + 3.5) {
                            isShowing = false
                        }
                    }
            }
        }
    }
}

extension View {
    func confetti(isShowing: Binding<Bool>) -> some View {
        modifier(ConfettiModifier(isShowing: isShowing))
    }
}

#Preview {
    ZStack {
        Color.white
        ConfettiView()
    }
}
