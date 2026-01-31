import SwiftUI

/// Tab selezionato nell'app
enum AppTab: Hashable {
    case map
    case collection
    case settings
}

/// Vista principale con TabView
struct ContentView: View {
    @State private var selectedTab: AppTab = .map

    var body: some View {
        TabView(selection: $selectedTab) {
            // Tab Mappa
            ItalyMapView()
                .tabItem {
                    Label("Mappa", systemImage: "map.fill")
                }
                .tag(AppTab.map)

            // Tab Collezione
            CollectionView()
                .tabItem {
                    Label("Collezione", systemImage: "seal.fill")
                }
                .tag(AppTab.collection)

            // Tab Impostazioni
            SettingsView()
                .tabItem {
                    Label("Profilo", systemImage: "person.fill")
                }
                .tag(AppTab.settings)
        }
        .tint(.green)
    }
}

#Preview {
    ContentView()
        .environment(DataStore.preview)
        .environment(LocationService.preview)
        .environment(AppSettings.preview)
}
