const fs = require('fs');
const path = require('path');

// Read the current file
const filePath = path.join(__dirname, '../src/components/Map/RegionPaths.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Extract the object
const match = content.match(/export const REGION_PATHS: Record<string, string> = ({[\s\S]*?});/);
if (!match) {
    console.error("Could not find REGION_PATHS object");
    process.exit(1);
}

const pathsObjString = match[1];
// Eval is dangerous but safe here as we control the input source (it's our file)
// We need to be careful with formatting to make it eval-able
const pathsObj = eval('(' + pathsObjString + ')');

// Function to split path into subpaths
// SVG paths start with M or m. 
// changing 'm' to '\nm' helps split
// But regex split is safer.
function filterPath(pathData, regionName) {
    // Regex to split by Move command, keeping the delimiter
    // This is tricky for relative moves. 
    // Simplified: split by 'M' or 'm'.
    const segments = pathData.split(/([Mm][^Mm]*)/).filter(s => s.trim().length > 0);

    // Calculate lengths/complexity
    const filtered = segments.filter(seg => {
        // Keep main landmass (longest)
        // Keep known islands (length > threshold)
        // Simple heuristic: String length. 
        // Micro islands are usually < 50-80 chars.
        // Elba (Toscana) is large. Capri (Campania) is small but detailed?

        // Let's refine based on region
        if (regionName === 'toscana' || regionName === 'campania' || regionName === 'lazio') {
            // Keep slightly smaller islands for these
            return seg.length > 60;
        }
        if (regionName === 'sicilia' || regionName === 'sardegna') {
            // Keep main + major islands (Lipari etc maybe?)
            // If we want ONLY main island, keep longest. 
            // User said "Lascia le isole note".
            return seg.length > 100;
        }

        // For others (Veneto lagoon? Puglia?), cut aggressively
        return seg.length > 80;
    });

    // Always ensure we keep at least the longest path (Mainland)
    if (filtered.length === 0) {
        // Fallback: keep longest
        segments.sort((a, b) => b.length - a.length);
        return segments[0];
    }

    return filtered.join(' ');
}

const newPaths = {};
for (const [key, val] of Object.entries(pathsObj)) {
    newPaths[key] = filterPath(val, key);
}

// Generate new file content
let newContent = `// SVG Path data for Italy Regions - Cleaned\n// Removed micro-islands\n\nexport const REGION_PATHS: Record<string, string> = {\n`;

for (const [key, val] of Object.entries(newPaths)) {
    newContent += `    "${key}": "${val}",\n`;
}
newContent += `};\n`;

fs.writeFileSync(filePath, newContent);
console.log("RegionPaths.ts updated successfully!");
