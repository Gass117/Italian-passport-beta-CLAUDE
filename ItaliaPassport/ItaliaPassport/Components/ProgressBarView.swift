import SwiftUI

/// Barra di progresso animata con stile passaporto
struct ProgressBarView: View {
    let progress: Double  // 0.0 - 1.0
    let showLabel: Bool
    let height: CGFloat

    init(progress: Double, showLabel: Bool = true, height: CGFloat = 12) {
        self.progress = min(max(progress, 0), 1)
        self.showLabel = showLabel
        self.height = height
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            if showLabel {
                HStack {
                    Text("Progresso")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                    Spacer()
                    Text("\(Int(progress * 100))%")
                        .font(.caption.bold())
                        .foregroundStyle(.primary)
                }
            }

            GeometryReader { geometry in
                ZStack(alignment: .leading) {
                    // Background
                    RoundedRectangle(cornerRadius: height / 2)
                        .fill(Color(.systemGray5))

                    // Progress fill
                    RoundedRectangle(cornerRadius: height / 2)
                        .fill(
                            LinearGradient(
                                colors: [.green.opacity(0.7), .green],
                                startPoint: .leading,
                                endPoint: .trailing
                            )
                        )
                        .frame(width: geometry.size.width * progress)
                        .animation(.spring(duration: 0.5), value: progress)
                }
            }
            .frame(height: height)
        }
    }
}

#Preview {
    VStack(spacing: 20) {
        ProgressBarView(progress: 0.0)
        ProgressBarView(progress: 0.25)
        ProgressBarView(progress: 0.5)
        ProgressBarView(progress: 0.75)
        ProgressBarView(progress: 1.0)
        ProgressBarView(progress: 0.6, showLabel: false, height: 8)
    }
    .padding()
}
