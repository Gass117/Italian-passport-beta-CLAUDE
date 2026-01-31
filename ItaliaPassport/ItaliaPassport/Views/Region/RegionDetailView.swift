import SwiftUI
import MapKit

/// Vista dettaglio di una regione con lista dei luoghi
struct RegionDetailView: View {
    @Environment(DataStore.self) private var dataStore

    let region: Region

    @State private var selectedPlace: Place?
    @State private var filterType: PlaceType?
    @State private var showOnlyUnvisited = false

    private var places: [Place] {
        var result = dataStore.places(for: region.id)

        if let filterType {
            result = result.filter { $0.type == filterType }
        }

        if showOnlyUnvisited {
            result = result.filter { !dataStore.isVisited($0.id) }
        }

        return result
    }

    private var progress: Double {
        let total = dataStore.totalCount(for: region.id)
        guard total > 0 else { return 0 }
        return Double(dataStore.unlockedCount(for: region.id)) / Double(total)
    }

    var body: some View {
        ScrollView {
            VStack(spacing: 20) {
                // Header con mappa regione
                headerSection

                // Filtri
                filterSection

                // Lista luoghi
                placesListSection
            }
            .padding()
        }
        .background(Color(.systemGroupedBackground))
        .navigationTitle(region.displayName)
        .navigationBarTitleDisplayMode(.large)
        .navigationDestination(item: $selectedPlace) { place in
            PlaceDetailView(place: place)
        }
    }

    // MARK: - Header Section

    private var headerSection: some View {
        VStack(spacing: 16) {
            // Mini mappa della regione
            Map {
                // Centro della regione
            }
            .frame(height: 150)
            .clipShape(RoundedRectangle(cornerRadius: 12))
            .overlay(
                RoundedRectangle(cornerRadius: 12)
                    .stroke(Color(hex: region.themeColorHex).opacity(0.3), lineWidth: 2)
            )

            // Stats
            HStack(spacing: 20) {
                StatCard(
                    title: "Luoghi",
                    value: "\(dataStore.totalCount(for: region.id))",
                    icon: "mappin.circle.fill",
                    color: .blue
                )

                StatCard(
                    title: "Visitati",
                    value: "\(dataStore.unlockedCount(for: region.id))",
                    icon: "checkmark.seal.fill",
                    color: .green
                )

                StatCard(
                    title: "Progresso",
                    value: "\(Int(progress * 100))%",
                    icon: "chart.pie.fill",
                    color: Color(hex: region.themeColorHex)
                )
            }

            // Progress bar
            ProgressBarView(progress: progress, showLabel: false, height: 8)
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    // MARK: - Filter Section

    private var filterSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Filtra luoghi")
                    .font(.headline)

                Spacer()

                Toggle("Solo da visitare", isOn: $showOnlyUnvisited)
                    .labelsHidden()
                    .toggleStyle(.switch)
                    .tint(.green)

                Text("Da visitare")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            // Tipo filter chips
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    FilterChip(title: "Tutti", isSelected: filterType == nil) {
                        filterType = nil
                    }

                    ForEach(PlaceType.allCases, id: \.self) { type in
                        FilterChip(
                            title: type.displayName,
                            icon: type.iconName,
                            isSelected: filterType == type
                        ) {
                            filterType = filterType == type ? nil : type
                        }
                    }
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    // MARK: - Places List Section

    private var placesListSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Luoghi da esplorare")
                .font(.headline)

            if places.isEmpty {
                ContentUnavailableView(
                    "Nessun luogo",
                    systemImage: "map",
                    description: Text(showOnlyUnvisited ?
                        "Hai visitato tutti i luoghi con questo filtro!" :
                        "Nessun luogo disponibile per questo filtro")
                )
                .padding(.vertical, 40)
            } else {
                LazyVStack(spacing: 0) {
                    ForEach(places) { place in
                        PlaceRowView(
                            place: place,
                            isVisited: dataStore.isVisited(place.id)
                        )
                        .onTapGesture {
                            selectedPlace = place
                        }

                        if place.id != places.last?.id {
                            Divider()
                                .padding(.leading, 62)
                        }
                    }
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }
}

// MARK: - Supporting Views

struct StatCard: View {
    let title: String
    let value: String
    let icon: String
    let color: Color

    var body: some View {
        VStack(spacing: 4) {
            Image(systemName: icon)
                .font(.system(size: 20))
                .foregroundStyle(color)

            Text(value)
                .font(.system(size: 18, weight: .bold, design: .rounded))

            Text(title)
                .font(.caption2)
                .foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
    }
}

struct FilterChip: View {
    let title: String
    var icon: String? = nil
    let isSelected: Bool
    let action: () -> Void

    var body: some View {
        Button(action: action) {
            HStack(spacing: 4) {
                if let icon {
                    Image(systemName: icon)
                        .font(.caption)
                }
                Text(title)
                    .font(.subheadline)
            }
            .padding(.horizontal, 12)
            .padding(.vertical, 8)
            .background(isSelected ? Color.green : Color(.systemGray5))
            .foregroundStyle(isSelected ? .white : .primary)
            .clipShape(Capsule())
        }
        .buttonStyle(.plain)
    }
}

#Preview {
    NavigationStack {
        RegionDetailView(region: .sample)
            .environment(DataStore.preview)
    }
}
