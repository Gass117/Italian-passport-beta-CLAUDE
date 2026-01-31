import SwiftUI
import SwiftData

/// Entry point dell'applicazione Italia Passport
@main
struct ItaliaPassportApp: App {
    // MARK: - State Objects

    /// Store dei dati
    @State private var dataStore = DataStore()

    /// Servizio di localizzazione
    @State private var locationService = LocationService()

    /// Impostazioni app
    @State private var appSettings = AppSettings()

    // MARK: - SwiftData

    /// Container SwiftData per la persistenza
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            VisitedPlace.self
        ])
        let modelConfiguration = ModelConfiguration(
            schema: schema,
            isStoredInMemoryOnly: false
        )

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    // MARK: - Body

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(dataStore)
                .environment(locationService)
                .environment(appSettings)
                .onAppear {
                    // Configura il DataStore con il ModelContext
                    dataStore.configure(with: sharedModelContainer.mainContext)

                    // Sincronizza la soglia distanza
                    locationService.distanceThreshold = appSettings.distanceThreshold
                }
        }
        .modelContainer(sharedModelContainer)
    }
}
