import SwiftUI

/// Vista impostazioni dell'app
struct SettingsView: View {
    @Environment(DataStore.self) private var dataStore
    @Environment(LocationService.self) private var locationService
    @Environment(AppSettings.self) private var appSettings

    @State private var showResetConfirmation = false
    @State private var showResetSuccess = false

    var body: some View {
        NavigationStack {
            List {
                // Sezione Gameplay
                gameplaySection

                // Sezione Posizione
                locationSection

                // Sezione Progresso
                progressSection

                // Sezione Info
                infoSection
            }
            .navigationTitle("Impostazioni")
            .alert("Resettare i progressi?", isPresented: $showResetConfirmation) {
                Button("Annulla", role: .cancel) { }
                Button("Resetta", role: .destructive) {
                    resetProgress()
                }
            } message: {
                Text("Tutti i badge sbloccati verranno persi. Questa azione non può essere annullata.")
            }
            .alert("Progressi resettati", isPresented: $showResetSuccess) {
                Button("OK") { }
            } message: {
                Text("Tutti i tuoi progressi sono stati cancellati.")
            }
        }
    }

    // MARK: - Gameplay Section

    private var gameplaySection: some View {
        Section {
            // Soglia distanza
            VStack(alignment: .leading, spacing: 8) {
                HStack {
                    Label("Soglia distanza", systemImage: "location.circle")
                    Spacer()
                    Text(appSettings.formattedThreshold)
                        .foregroundStyle(.secondary)
                }

                Text("Distanza massima per sbloccare un badge")
                    .font(.caption)
                    .foregroundStyle(.secondary)

                Picker("Soglia", selection: Bindable(appSettings).distanceThreshold) {
                    ForEach(AppSettings.thresholdPresets, id: \.1) { preset in
                        Text(preset.0).tag(preset.1)
                    }
                }
                .pickerStyle(.segmented)
            }
            .padding(.vertical, 4)
        } header: {
            Text("Gameplay")
        } footer: {
            Text("Una soglia più bassa rende il gioco più difficile, richiedendo di avvicinarsi maggiormente ai luoghi.")
        }
    }

    // MARK: - Location Section

    private var locationSection: some View {
        Section {
            HStack {
                Label("Stato permesso", systemImage: "location.fill")

                Spacer()

                HStack(spacing: 4) {
                    Circle()
                        .fill(locationStatusColor)
                        .frame(width: 8, height: 8)

                    Text(locationStatusText)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            }

            if locationService.authStatus == .denied || locationService.authStatus == .restricted {
                Button {
                    openSettings()
                } label: {
                    Label("Apri Impostazioni", systemImage: "gear")
                }
            }

            if locationService.authStatus == .notDetermined {
                Button {
                    locationService.requestPermission()
                } label: {
                    Label("Richiedi permesso", systemImage: "location")
                }
            }
        } header: {
            Text("Posizione")
        } footer: {
            Text("L'app usa la tua posizione solo per verificare la vicinanza ai luoghi. Non viene mai salvata.")
        }
    }

    // MARK: - Progress Section

    private var progressSection: some View {
        Section {
            HStack {
                Label("Badge sbloccati", systemImage: "checkmark.seal.fill")
                Spacer()
                Text("\(dataStore.visitedPlaceIds.count) / \(dataStore.places.count)")
                    .foregroundStyle(.secondary)
            }

            HStack {
                Label("Progresso", systemImage: "chart.pie.fill")
                Spacer()
                Text("\(Int(dataStore.totalProgress * 100))%")
                    .foregroundStyle(.secondary)
            }

            Button(role: .destructive) {
                showResetConfirmation = true
            } label: {
                Label("Resetta tutti i progressi", systemImage: "trash")
                    .foregroundStyle(.red)
            }
        } header: {
            Text("Progresso")
        } footer: {
            Text("Il reset è irreversibile e cancellerà tutti i badge sbloccati.")
        }
    }

    // MARK: - Info Section

    private var infoSection: some View {
        Section {
            HStack {
                Label("Versione", systemImage: "info.circle")
                Spacer()
                Text("1.0.0 (MVP)")
                    .foregroundStyle(.secondary)
            }

            HStack {
                Label("Regioni disponibili", systemImage: "map")
                Spacer()
                Text("\(dataStore.regions.count)")
                    .foregroundStyle(.secondary)
            }

            HStack {
                Label("Luoghi totali", systemImage: "mappin")
                Spacer()
                Text("\(dataStore.places.count)")
                    .foregroundStyle(.secondary)
            }

            Link(destination: URL(string: "https://github.com")!) {
                Label("Codice sorgente", systemImage: "chevron.left.forwardslash.chevron.right")
            }
        } header: {
            Text("Informazioni")
        } footer: {
            VStack(alignment: .leading, spacing: 8) {
                Text("Italia Passport - MVP")
                Text("Creato con SwiftUI e tanto amore per l'Italia")
            }
            .padding(.top, 8)
        }
    }

    // MARK: - Helpers

    private var locationStatusColor: Color {
        switch locationService.authStatus {
        case .authorized: return .green
        case .denied, .restricted: return .red
        case .notDetermined: return .orange
        }
    }

    private var locationStatusText: String {
        switch locationService.authStatus {
        case .authorized: return "Autorizzato"
        case .denied: return "Negato"
        case .restricted: return "Limitato"
        case .notDetermined: return "Non richiesto"
        }
    }

    private func openSettings() {
        if let url = URL(string: UIApplication.openSettingsURLString) {
            UIApplication.shared.open(url)
        }
    }

    private func resetProgress() {
        dataStore.resetAllProgress()
        showResetSuccess = true
    }
}

#Preview {
    SettingsView()
        .environment(DataStore.preview)
        .environment(LocationService.preview)
        .environment(AppSettings.preview)
}
