import SwiftUI

/// Tipo di filtro per la collezione
enum CollectionFilter: String, CaseIterable {
    case all = "Tutti"
    case unlocked = "Sbloccati"
    case locked = "Mancanti"
}

/// Vista della collezione di badge
struct CollectionView: View {
    @Environment(DataStore.self) private var dataStore

    @State private var selectedFilter: CollectionFilter = .all
    @State private var selectedPlace: Place?

    private let columns = [
        GridItem(.flexible()),
        GridItem(.flexible()),
        GridItem(.flexible())
    ]

    private var filteredPlaces: [Place] {
        switch selectedFilter {
        case .all:
            return dataStore.places
        case .unlocked:
            return dataStore.unlockedPlaces
        case .locked:
            return dataStore.lockedPlaces
        }
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 20) {
                    // Header con stats
                    statsHeader

                    // Filtri
                    filterPicker

                    // Griglia badge
                    badgeGrid
                }
                .padding()
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Collezione")
            .navigationDestination(item: $selectedPlace) { place in
                PlaceDetailView(place: place)
            }
        }
    }

    // MARK: - Stats Header

    private var statsHeader: some View {
        VStack(spacing: 16) {
            // Passaporto visuale
            ZStack {
                RoundedRectangle(cornerRadius: 16)
                    .fill(
                        LinearGradient(
                            colors: [Color(red: 0.1, green: 0.3, blue: 0.1), Color(red: 0.2, green: 0.5, blue: 0.2)],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        )
                    )
                    .frame(height: 160)
                    .shadow(color: .black.opacity(0.2), radius: 10, y: 5)

                VStack(spacing: 12) {
                    // Emblema
                    Image(systemName: "star.fill")
                        .font(.system(size: 30))
                        .foregroundStyle(.yellow)

                    Text("PASSAPORTO ITALIA")
                        .font(.caption)
                        .fontWeight(.bold)
                        .tracking(4)
                        .foregroundStyle(.white.opacity(0.8))

                    HStack(spacing: 4) {
                        Text("\(dataStore.visitedPlaceIds.count)")
                            .font(.system(size: 48, weight: .bold, design: .rounded))

                        Text("/ \(dataStore.places.count)")
                            .font(.title2)
                            .fontWeight(.medium)
                    }
                    .foregroundStyle(.white)

                    Text("luoghi visitati")
                        .font(.caption)
                        .foregroundStyle(.white.opacity(0.7))
                }
            }

            // Progress bar
            ProgressBarView(progress: dataStore.totalProgress)
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    // MARK: - Filter Picker

    private var filterPicker: some View {
        HStack(spacing: 0) {
            ForEach(CollectionFilter.allCases, id: \.self) { filter in
                Button {
                    withAnimation(.spring(duration: 0.3)) {
                        selectedFilter = filter
                    }
                } label: {
                    VStack(spacing: 4) {
                        Text(filter.rawValue)
                            .font(.subheadline)
                            .fontWeight(selectedFilter == filter ? .semibold : .regular)

                        Text(countForFilter(filter))
                            .font(.caption2)
                            .foregroundStyle(.secondary)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.vertical, 12)
                    .background(selectedFilter == filter ? Color.green.opacity(0.15) : Color.clear)
                    .foregroundStyle(selectedFilter == filter ? .green : .primary)
                }
                .buttonStyle(.plain)
            }
        }
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 12))
        .shadow(color: .black.opacity(0.05), radius: 5, y: 2)
    }

    private func countForFilter(_ filter: CollectionFilter) -> String {
        switch filter {
        case .all:
            return "\(dataStore.places.count) totali"
        case .unlocked:
            return "\(dataStore.visitedPlaceIds.count) badge"
        case .locked:
            return "\(dataStore.lockedPlaces.count) da scoprire"
        }
    }

    // MARK: - Badge Grid

    private var badgeGrid: some View {
        VStack(alignment: .leading, spacing: 12) {
            if filteredPlaces.isEmpty {
                emptyState
            } else {
                // Raggruppa per regione
                let groupedPlaces = Dictionary(grouping: filteredPlaces) { $0.regionId }

                ForEach(dataStore.regions) { region in
                    if let regionPlaces = groupedPlaces[region.id], !regionPlaces.isEmpty {
                        regionSection(region: region, places: regionPlaces)
                    }
                }
            }
        }
    }

    private func regionSection(region: Region, places: [Place]) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            // Header regione
            HStack {
                Circle()
                    .fill(Color(hex: region.themeColorHex))
                    .frame(width: 8, height: 8)

                Text(region.displayName)
                    .font(.headline)

                Spacer()

                Text("\(dataStore.unlockedCount(for: region.id))/\(dataStore.totalCount(for: region.id))")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            // Griglia badge della regione
            LazyVGrid(columns: columns, spacing: 16) {
                ForEach(places) { place in
                    BadgeItemView(
                        place: place,
                        isUnlocked: dataStore.isVisited(place.id)
                    )
                    .contentShape(Rectangle())
                    .onTapGesture {
                        selectedPlace = place
                    }
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    private var emptyState: some View {
        ContentUnavailableView {
            Label(emptyStateTitle, systemImage: emptyStateIcon)
        } description: {
            Text(emptyStateDescription)
        } actions: {
            if selectedFilter == .locked && dataStore.lockedPlaces.isEmpty {
                Text("Hai completato la collezione!")
                    .font(.headline)
                    .foregroundStyle(.green)
            }
        }
        .padding(.vertical, 60)
    }

    private var emptyStateTitle: String {
        switch selectedFilter {
        case .all:
            return "Nessun luogo"
        case .unlocked:
            return "Nessun badge sbloccato"
        case .locked:
            return "Tutti i badge sbloccati!"
        }
    }

    private var emptyStateIcon: String {
        switch selectedFilter {
        case .all:
            return "map"
        case .unlocked:
            return "lock.fill"
        case .locked:
            return "trophy.fill"
        }
    }

    private var emptyStateDescription: String {
        switch selectedFilter {
        case .all:
            return "I luoghi saranno disponibili presto"
        case .unlocked:
            return "Visita i luoghi per sbloccare i badge"
        case .locked:
            return "Congratulazioni, hai visitato tutti i luoghi!"
        }
    }
}

#Preview {
    CollectionView()
        .environment(DataStore.preview)
}
