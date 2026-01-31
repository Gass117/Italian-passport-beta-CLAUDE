import SwiftUI

/// View principale con la mappa interattiva dell'Italia
struct ItalyMapView: View {
    @Environment(DataStore.self) private var dataStore
    @State private var selectedRegionId: String?
    @State private var hoveredRegionId: String?
    @State private var navigateToRegion: Region?

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(spacing: 24) {
                    // Header con stats
                    headerSection

                    // Mappa Italia
                    italyMapSection

                    // Lista regioni disponibili
                    availableRegionsSection
                }
                .padding()
            }
            .background(Color(.systemGroupedBackground))
            .navigationTitle("Italia Passport")
            .navigationDestination(item: $navigateToRegion) { region in
                RegionDetailView(region: region)
            }
        }
    }

    // MARK: - Header

    private var headerSection: some View {
        VStack(spacing: 12) {
            HStack {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Il tuo viaggio")
                        .font(.headline)
                        .foregroundStyle(.secondary)

                    Text("\(dataStore.visitedPlaceIds.count) / \(dataStore.places.count)")
                        .font(.system(size: 36, weight: .bold, design: .rounded))
                }

                Spacer()

                // Badge icon
                ZStack {
                    Circle()
                        .fill(Color.green.opacity(0.15))
                        .frame(width: 60, height: 60)

                    Image(systemName: "mappin.and.ellipse")
                        .font(.system(size: 28))
                        .foregroundStyle(.green)
                }
            }

            ProgressBarView(progress: dataStore.totalProgress)
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    // MARK: - Italy Map

    private var italyMapSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Tocca una regione per esplorare")
                .font(.subheadline)
                .foregroundStyle(.secondary)

            GeometryReader { geometry in
                let mapSize = CGSize(
                    width: geometry.size.width,
                    height: geometry.size.width * 1.3  // Aspect ratio Italia
                )

                ZStack {
                    // Background mare
                    RoundedRectangle(cornerRadius: 20)
                        .fill(Color.blue.opacity(0.1))

                    // Regioni
                    ForEach(ItalyRegions.all, id: \.id) { regionData in
                        RegionShapeView(
                            regionData: regionData,
                            containerSize: mapSize,
                            isSelected: selectedRegionId == regionData.id,
                            isHovered: hoveredRegionId == regionData.id,
                            isAvailable: dataStore.region(for: regionData.id) != nil,
                            progress: regionProgress(for: regionData.id)
                        )
                        .onTapGesture {
                            handleRegionTap(regionData)
                        }
                        .simultaneousGesture(
                            DragGesture(minimumDistance: 0)
                                .onChanged { _ in
                                    hoveredRegionId = regionData.id
                                }
                                .onEnded { _ in
                                    hoveredRegionId = nil
                                }
                        )
                    }
                }
                .frame(width: mapSize.width, height: mapSize.height)
            }
            .aspectRatio(1/1.3, contentMode: .fit)
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    // MARK: - Available Regions List

    private var availableRegionsSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Regioni disponibili")
                .font(.headline)

            ForEach(dataStore.regions) { region in
                RegionRowView(
                    region: region,
                    unlockedCount: dataStore.unlockedCount(for: region.id),
                    totalCount: dataStore.totalCount(for: region.id)
                )
                .contentShape(Rectangle())
                .onTapGesture {
                    navigateToRegion = region
                }
            }

            if dataStore.regions.isEmpty {
                ContentUnavailableView(
                    "Nessuna regione",
                    systemImage: "map",
                    description: Text("Le regioni saranno disponibili presto")
                )
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .clipShape(RoundedRectangle(cornerRadius: 16))
        .shadow(color: .black.opacity(0.05), radius: 10, y: 5)
    }

    // MARK: - Helpers

    private func regionProgress(for regionId: String) -> Double {
        let total = dataStore.totalCount(for: regionId)
        guard total > 0 else { return 0 }
        return Double(dataStore.unlockedCount(for: regionId)) / Double(total)
    }

    private func handleRegionTap(_ regionData: RegionMapData) {
        selectedRegionId = regionData.id

        // Se la regione ha dati, naviga
        if let region = dataStore.region(for: regionData.id) {
            navigateToRegion = region
        }

        // Reset selection dopo animazione
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
            selectedRegionId = nil
        }
    }
}

// MARK: - Region Shape View

struct RegionShapeView: View {
    let regionData: RegionMapData
    let containerSize: CGSize
    let isSelected: Bool
    let isHovered: Bool
    let isAvailable: Bool
    let progress: Double

    var body: some View {
        regionData.scaledPath(in: containerSize)
            .fill(fillColor)
            .overlay(
                regionData.scaledPath(in: containerSize)
                    .stroke(strokeColor, lineWidth: isSelected || isHovered ? 2 : 1)
            )
            .scaleEffect(isSelected ? 1.05 : 1.0)
            .animation(.spring(duration: 0.2), value: isSelected)
            .animation(.easeInOut(duration: 0.15), value: isHovered)
    }

    private var fillColor: Color {
        if !isAvailable {
            return Color.gray.opacity(0.2)
        }
        if isHovered {
            return Color.green.opacity(0.4)
        }
        if progress > 0 {
            return Color.green.opacity(0.2 + progress * 0.3)
        }
        return Color.green.opacity(0.15)
    }

    private var strokeColor: Color {
        if isSelected || isHovered {
            return .green
        }
        return isAvailable ? .green.opacity(0.5) : .gray.opacity(0.3)
    }
}

// MARK: - Region Row View

struct RegionRowView: View {
    let region: Region
    let unlockedCount: Int
    let totalCount: Int

    private var progress: Double {
        guard totalCount > 0 else { return 0 }
        return Double(unlockedCount) / Double(totalCount)
    }

    var body: some View {
        HStack(spacing: 12) {
            // Icona regione
            ZStack {
                Circle()
                    .fill(Color(hex: region.themeColorHex).opacity(0.2))
                    .frame(width: 44, height: 44)

                Image(systemName: "map.fill")
                    .foregroundStyle(Color(hex: region.themeColorHex))
            }

            VStack(alignment: .leading, spacing: 4) {
                Text(region.displayName)
                    .font(.headline)

                Text("\(unlockedCount)/\(totalCount) luoghi visitati")
                    .font(.caption)
                    .foregroundStyle(.secondary)
            }

            Spacer()

            // Progress indicator
            ZStack {
                Circle()
                    .stroke(Color.gray.opacity(0.2), lineWidth: 3)

                Circle()
                    .trim(from: 0, to: progress)
                    .stroke(Color.green, style: StrokeStyle(lineWidth: 3, lineCap: .round))
                    .rotationEffect(.degrees(-90))
            }
            .frame(width: 32, height: 32)

            Image(systemName: "chevron.right")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
        .padding(.vertical, 8)
    }
}

// MARK: - Color Extension

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (255, 0, 0, 0)
        }
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}

#Preview {
    ItalyMapView()
        .environment(DataStore.preview)
}
