import SwiftUI

/// Card grattabile per rivelare il badge
struct ScratchCardView: View {
    let badge: BadgeInfo
    let onUnlock: (Double) -> Void

    @State private var scratchedPoints: [CGPoint] = []
    @State private var scratchPercentage: Double = 0
    @State private var isUnlocked = false
    @State private var showHint = true

    private let scratchThreshold: Double = 0.6  // 60% per sbloccare
    private let brushSize: CGFloat = 40

    var body: some View {
        VStack(spacing: 16) {
            Text("Gratta per rivelare il badge!")
                .font(.headline)
                .foregroundStyle(.secondary)

            GeometryReader { geometry in
                ZStack {
                    // Layer sotto: il badge
                    badgeLayer
                        .frame(width: geometry.size.width, height: geometry.size.height)

                    // Layer sopra: scratch overlay
                    if !isUnlocked {
                        scratchOverlay(in: geometry.size)
                    }

                    // Hint animato
                    if showHint && !isUnlocked {
                        hintOverlay
                    }
                }
                .clipShape(RoundedRectangle(cornerRadius: 16))
                .shadow(color: .black.opacity(0.1), radius: 10, y: 5)
                .gesture(
                    DragGesture(minimumDistance: 0)
                        .onChanged { value in
                            handleScratch(at: value.location, in: geometry.size)
                        }
                )
            }
            .aspectRatio(1.2, contentMode: .fit)

            // Progress indicator
            if !isUnlocked {
                VStack(spacing: 4) {
                    ProgressBarView(progress: scratchPercentage, showLabel: false, height: 6)

                    Text("\(Int(scratchPercentage * 100))% grattato")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .padding()
        .onAppear {
            // Nascondi hint dopo 2 secondi
            DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                withAnimation {
                    showHint = false
                }
            }
        }
    }

    // MARK: - Badge Layer

    private var badgeLayer: some View {
        VStack(spacing: 12) {
            ZStack {
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [.yellow.opacity(0.8), .orange],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 100, height: 100)
                    .shadow(color: .orange.opacity(0.3), radius: 10)

                Image(systemName: badge.imageName)
                    .font(.system(size: 44))
                    .foregroundStyle(.white)
            }
            .scaleEffect(isUnlocked ? 1.1 : 1.0)
            .animation(.spring(duration: 0.5), value: isUnlocked)

            Text(badge.title)
                .font(.title2.bold())
                .multilineTextAlignment(.center)

            Text(badge.description)
                .font(.subheadline)
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(
            LinearGradient(
                colors: [Color(.systemBackground), Color(.systemGray6)],
                startPoint: .top,
                endPoint: .bottom
            )
        )
    }

    // MARK: - Scratch Overlay

    private func scratchOverlay(in size: CGSize) -> some View {
        Canvas { context, canvasSize in
            // Background del gratta e vinci
            let backgroundRect = CGRect(origin: .zero, size: canvasSize)
            context.fill(
                Path(roundedRect: backgroundRect, cornerRadius: 16),
                with: .linearGradient(
                    Gradient(colors: [
                        Color(red: 0.7, green: 0.7, blue: 0.75),
                        Color(red: 0.6, green: 0.6, blue: 0.65)
                    ]),
                    startPoint: .topLeading,
                    endPoint: .bottomTrailing
                )
            )

            // Pattern decorativo
            for row in stride(from: 0, to: canvasSize.height, by: 20) {
                for col in stride(from: 0, to: canvasSize.width, by: 20) {
                    let starPath = Path { path in
                        let center = CGPoint(x: col + 10, y: row + 10)
                        path.addArc(center: center, radius: 2, startAngle: .zero, endAngle: .degrees(360), clockwise: true)
                    }
                    context.fill(starPath, with: .color(.white.opacity(0.1)))
                }
            }

            // Testo "GRATTA QUI"
            let text = Text("GRATTA QUI")
                .font(.system(size: 18, weight: .bold))
                .foregroundColor(.white.opacity(0.3))
            context.draw(text, at: CGPoint(x: canvasSize.width / 2, y: canvasSize.height / 2))

            // Maschera per i punti grattati
            context.blendMode = .destinationOut
            for point in scratchedPoints {
                let brushRect = CGRect(
                    x: point.x - brushSize / 2,
                    y: point.y - brushSize / 2,
                    width: brushSize,
                    height: brushSize
                )
                context.fill(Path(ellipseIn: brushRect), with: .color(.black))
            }
        }
    }

    // MARK: - Hint Overlay

    private var hintOverlay: some View {
        VStack {
            Image(systemName: "hand.draw.fill")
                .font(.system(size: 30))
                .foregroundStyle(.white.opacity(0.8))
                .offset(x: showHint ? 20 : -20)
                .animation(
                    .easeInOut(duration: 0.8)
                    .repeatForever(autoreverses: true),
                    value: showHint
                )
        }
    }

    // MARK: - Scratch Logic

    private func handleScratch(at point: CGPoint, in size: CGSize) {
        guard !isUnlocked else { return }

        // Aggiungi punto solo se non troppo vicino a uno esistente
        let minDistance: CGFloat = brushSize / 3
        let shouldAdd = scratchedPoints.allSatisfy { existingPoint in
            hypot(point.x - existingPoint.x, point.y - existingPoint.y) > minDistance
        }

        if shouldAdd {
            scratchedPoints.append(point)
            calculateScratchPercentage(in: size)
        }

        // Controlla se ha raggiunto la soglia
        if scratchPercentage >= scratchThreshold && !isUnlocked {
            unlock()
        }
    }

    private func calculateScratchPercentage(in size: CGSize) {
        // Calcolo approssimato basato su griglia
        let gridSize: CGFloat = 20
        let cols = Int(size.width / gridSize)
        let rows = Int(size.height / gridSize)
        let totalCells = cols * rows

        var scratchedCells = 0

        for row in 0..<rows {
            for col in 0..<cols {
                let cellCenter = CGPoint(
                    x: CGFloat(col) * gridSize + gridSize / 2,
                    y: CGFloat(row) * gridSize + gridSize / 2
                )

                // Verifica se il centro della cella è stato grattato
                let isScratched = scratchedPoints.contains { point in
                    hypot(point.x - cellCenter.x, point.y - cellCenter.y) < brushSize / 2
                }

                if isScratched {
                    scratchedCells += 1
                }
            }
        }

        scratchPercentage = Double(scratchedCells) / Double(totalCells)
    }

    private func unlock() {
        withAnimation(.spring(duration: 0.5)) {
            isUnlocked = true
        }

        // Feedback aptico
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(.success)

        // Callback
        onUnlock(scratchPercentage)
    }
}

#Preview {
    ScratchCardView(
        badge: BadgeInfo(
            title: "Fiorentino DOC",
            imageName: "fleur.de.lis.fill",
            description: "Hai conquistato la culla del Rinascimento!"
        )
    ) { percentage in
        print("Sbloccato con \(percentage * 100)%")
    }
}
