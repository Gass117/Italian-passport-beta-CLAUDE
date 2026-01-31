import SwiftUI
import CoreLocation

/// Vista dettaglio di un luogo con verifica posizione e scratch card
struct PlaceDetailView: View {
    @Environment(DataStore.self) private var dataStore
    @Environment(LocationService.self) private var locationService
    @Environment(AppSettings.self) private var appSettings

    let place: Place

    @State private var visitStatus: VisitStatus = .locked
    @State private var distanceResult: DistanceCheckResult?
    @State private var isCheckingLocation = false
    @State private var showLocationError = false
    @State private var locationErrorMessage = ""
    @State private var showConfetti = false
    @State private var showUnlockedBadge = false

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header con immagine/mappa
                headerSection

                // Info luogo
                infoSection

                // 5 cose da fare
                docTipsSection

                // Status e azione
                statusSection
            }
            .padding()
        }
        .background(Color(.systemGroupedBackground))
        .navigationTitle(place.name)
        .navigationBarTitleDisplayMode(.large)
        .confetti(isShowing: $showConfetti)
        .onAppear {
            checkIfAlreadyVisited()
        }
        .alert("Errore Posizione", isPresented: $showLocationError) {
            Button("OK") { }
            if locationService.authStatus == .denied {
                Button("Apri Impostazioni") {
                    openSettings()
                }
            }
        } message: {
            Text(locationErrorMessage)
        }
        .sheet(isPresented: $showUnlockedBadge) {
            UnlockedBadgeView(place: place)
        }
    }

    // MARK: - Header Section

    private var headerSection: some View {
        VStack(spacing: 0) {
            // Mappa del luogo
            MiniMapView(
                place: place,
                userLocation: locationService.currentLocation?.coordinate
            )
            .frame(height: 200)
            .clipShape(RoundedRectangle(cornerRadius: 16))

            // Badge stato
            HStack {
                Spacer()

                HStack(spacing: 6) {
                    Image(systemName: visitStatus.iconName)
                    Text(visitStatus.displayName)
                }
                .font(.caption.bold())
                .padding(.horizontal, 12)
                .padding(.vertical, 6)
                .background(statusBackgroundColor)
                .foregroundStyle(statusForegroundColor)
                .clipShape(Capsule())
                .offset(y: -16)
            }
            .padding(.horizontal)
        }
    }

    // MARK: - Info Section

    private var infoSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Tipo e provincia
            HStack {
                Label(place.type.displayName, systemImage: place.type.iconName)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)

                Text("•")
                    .foregroundStyle(.secondary)

                Text("Provincia di \(place.province)")
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }

            // Descrizione
            Text(place.shortDescription)
                .font(.body)
                .lineSpacing(4)

            // Coordinate
            HStack {
                Image(systemName: "location.fill")
                    .foregroundStyle(.blue)
                Text(String(format: "%.4f, %.4f", place.latitude, place.longitude))
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    // MARK: - DOC Tips Section

    private var docTipsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Image(systemName: "checkmark.seal.fill")
                    .foregroundStyle(.green)
                Text("5 cose da fare per essere italiano DOC")
                    .font(.headline)
            }

            VStack(alignment: .leading, spacing: 8) {
                ForEach(Array(place.docTips.enumerated()), id: \.offset) { index, tip in
                    HStack(alignment: .top, spacing: 12) {
                        ZStack {
                            Circle()
                                .fill(Color.green.opacity(0.15))
                                .frame(width: 28, height: 28)

                            Text("\(index + 1)")
                                .font(.caption.bold())
                                .foregroundStyle(.green)
                        }

                        Text(tip)
                            .font(.subheadline)
                    }
                }
            }
        }
        .padding()
        .frame(maxWidth: .infinity, alignment: .leading)
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    // MARK: - Status Section

    @ViewBuilder
    private var statusSection: some View {
        switch visitStatus {
        case .locked:
            lockedSection

        case .eligible:
            eligibleSection

        case .unlocked:
            unlockedSection
        }
    }

    private var lockedSection: some View {
        VStack(spacing: 16) {
            Image(systemName: "lock.fill")
                .font(.system(size: 40))
                .foregroundStyle(.secondary)

            Text("Avvicinati a questo luogo per sbloccare il badge")
                .font(.headline)
                .multilineTextAlignment(.center)

            if let distanceResult {
                VStack(spacing: 4) {
                    Text("Sei a \(distanceResult.formattedDistance) di distanza")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)

                    Text("Devi essere entro \(appSettings.formattedThreshold)")
                        .font(.caption)
                        .foregroundStyle(.secondary)
                }
            }

            Button {
                checkLocation()
            } label: {
                HStack {
                    if isCheckingLocation {
                        ProgressView()
                            .tint(.white)
                    } else {
                        Image(systemName: "location.fill")
                    }
                    Text("Verifica posizione")
                }
                .font(.headline)
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.blue)
                .foregroundStyle(.white)
                .clipShape(RoundedRectangle(cornerRadius: 12))
            }
            .disabled(isCheckingLocation)
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    private var eligibleSection: some View {
        VStack(spacing: 16) {
            Text("Sei arrivato! Gratta per sbloccare il badge")
                .font(.headline)
                .foregroundStyle(.green)

            ScratchCardView(badge: place.badge) { percentage in
                handleBadgeUnlocked(scratchPercentage: percentage)
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    private var unlockedSection: some View {
        VStack(spacing: 16) {
            ZStack {
                Circle()
                    .fill(
                        LinearGradient(
                            colors: [.yellow.opacity(0.8), .orange],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(width: 80, height: 80)
                    .shadow(color: .orange.opacity(0.3), radius: 10)

                Image(systemName: place.badge.imageName)
                    .font(.system(size: 36))
                    .foregroundStyle(.white)
            }

            Text(place.badge.title)
                .font(.title2.bold())

            Text("Hai visitato questo luogo!")
                .font(.subheadline)
                .foregroundStyle(.secondary)

            Text(place.badge.description)
                .font(.body)
                .multilineTextAlignment(.center)
                .foregroundStyle(.secondary)
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    // MARK: - Helper Properties

    private var statusBackgroundColor: Color {
        switch visitStatus {
        case .locked: return Color.gray.opacity(0.2)
        case .eligible: return Color.green.opacity(0.2)
        case .unlocked: return Color.orange.opacity(0.2)
        }
    }

    private var statusForegroundColor: Color {
        switch visitStatus {
        case .locked: return .secondary
        case .eligible: return .green
        case .unlocked: return .orange
        }
    }

    // MARK: - Actions

    private func checkIfAlreadyVisited() {
        if dataStore.isVisited(place.id) {
            visitStatus = .unlocked
        }
    }

    private func checkLocation() {
        isCheckingLocation = true

        // Verifica permesso
        if locationService.authStatus == .notDetermined {
            locationService.requestPermission()
            isCheckingLocation = false
            return
        }

        if locationService.authStatus == .denied {
            locationErrorMessage = locationService.authStatus.message
            showLocationError = true
            isCheckingLocation = false
            return
        }

        Task {
            do {
                // Aggiorna soglia nel service
                locationService.distanceThreshold = appSettings.distanceThreshold

                guard let result = try await locationService.checkDistance(to: place) else {
                    await MainActor.run {
                        locationErrorMessage = "Impossibile ottenere la posizione"
                        showLocationError = true
                        isCheckingLocation = false
                    }
                    return
                }

                await MainActor.run {
                    distanceResult = result
                    isCheckingLocation = false

                    if result.isWithinRange {
                        withAnimation {
                            visitStatus = .eligible
                        }
                        // Feedback aptico
                        let generator = UIImpactFeedbackGenerator(style: .medium)
                        generator.impactOccurred()
                    }
                }
            } catch {
                await MainActor.run {
                    locationErrorMessage = error.localizedDescription
                    showLocationError = true
                    isCheckingLocation = false
                }
            }
        }
    }

    private func handleBadgeUnlocked(scratchPercentage: Double) {
        // Salva nel datastore
        dataStore.markAsVisited(place.id, scratchPercentage: scratchPercentage)

        // Aggiorna stato
        withAnimation {
            visitStatus = .unlocked
        }

        // Mostra confetti
        showConfetti = true

        // Dopo un po' mostra il badge
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.5) {
            showUnlockedBadge = true
        }
    }

    private func openSettings() {
        if let url = URL(string: UIApplication.openSettingsURLString) {
            UIApplication.shared.open(url)
        }
    }
}

// MARK: - Unlocked Badge View

struct UnlockedBadgeView: View {
    @Environment(\.dismiss) private var dismiss
    let place: Place

    var body: some View {
        NavigationStack {
            VStack(spacing: 24) {
                Spacer()

                ZStack {
                    Circle()
                        .fill(
                            LinearGradient(
                                colors: [.yellow.opacity(0.8), .orange],
                                startPoint: .topLeading,
                                endPoint: .bottomTrailing
                            )
                        )
                        .frame(width: 120, height: 120)
                        .shadow(color: .orange.opacity(0.3), radius: 20)

                    Image(systemName: place.badge.imageName)
                        .font(.system(size: 56))
                        .foregroundStyle(.white)
                }

                VStack(spacing: 8) {
                    Text("Badge Sbloccato!")
                        .font(.title.bold())

                    Text(place.badge.title)
                        .font(.title2)
                        .foregroundStyle(.secondary)
                }

                Text(place.badge.description)
                    .font(.body)
                    .multilineTextAlignment(.center)
                    .foregroundStyle(.secondary)
                    .padding(.horizontal)

                Spacer()

                Button {
                    dismiss()
                } label: {
                    Text("Continua")
                        .font(.headline)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color.green)
                        .foregroundStyle(.white)
                        .clipShape(RoundedRectangle(cornerRadius: 12))
                }
                .padding()
            }
            .navigationTitle("Congratulazioni!")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Button {
                        dismiss()
                    } label: {
                        Image(systemName: "xmark.circle.fill")
                            .foregroundStyle(.secondary)
                    }
                }
            }
        }
    }
}

#Preview {
    NavigationStack {
        PlaceDetailView(place: .sample)
            .environment(DataStore.preview)
            .environment(LocationService.preview)
            .environment(AppSettings.preview)
    }
}
