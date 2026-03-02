const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Map/RegionPaths.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Match the exported dict
const match = content.match(/export const REGION_PATHS: Record<string, string> = ({[\s\S]*?});/);
if (!match) process.exit(1);

const pathsObj = eval('(' + match[1] + ')');

function cleanPath(pathParam, regionId) {
    // 1. Split into Subpaths
    // SVG strings use 'm' or 'M' to start a new subpath. 
    // Usually they are followed by coords. e.g "m 10,20" or "m 10 20"

    // We can use a regex that matches "m " or "M " and the following numbers, until the next "z" or "Z"
    // Wait, let's just split by 'z' or 'Z', and process each chunk.
    // Almost all our subpaths end with 'z'. 

    // Better split approach: find all occurrences of "m" or "M"
    // Regex: /(?=[mM]\s)/
    const subpaths = pathParam.split(/(?=[mM]\s)/).filter(s => s.trim().length > 0);

    let result = "";

    // We need to rank subpaths by drawing complexity (character length) to easily identify micro islands.
    const subpathsData = subpaths.map(s => {
        return {
            original: s,
            length: s.length,
            // Extract the initial move command: "m dx,dx" or "M dx,dy"
            // It could be numbers separated by space or comma.
            // Match 'm ' or 'M ', then optional spaces, then number, then space/comma, then number
            moveCommandMatch: s.match(/^([mM]\s*[-0-9.]+\s*[, ]\s*[-0-9.]+)/)
        };
    });

    // Sort by length descending to know which is mainland and top islands
    const sorted = [...subpathsData].sort((a, b) => b.length - a.length);

    // Decide threshold / keep count based on region
    let keepTop = 1; // Default: only mainland

    if (regionId === 'sicilia') keepTop = 1; // Only main island
    if (regionId === 'sardegna') keepTop = 1; // Only main island
    if (regionId === 'toscana') keepTop = 2; // Mainland + Elba
    if (regionId === 'campania') keepTop = 3; // Mainland + Ischia + Capri
    if (regionId === 'veneto') keepTop = 1; // Mainland
    if (regionId === 'lazio') keepTop = 1;
    if (regionId === 'puglia') keepTop = 1;

    // Build the new path string
    for (let sp of subpathsData) {
        // Is this subpath one of the top N we want to keep?
        const rank = sorted.indexOf(sp);
        const shouldKeep = rank < keepTop;

        if (shouldKeep) {
            // Keep full drawing command
            result += " " + sp.original.trim();
        } else {
            // Drop drawing, but MUST keep the relative move displacement!
            // 'sp.original' starts with 'm X,Y' and ends with 'z'
            // The net displacement of the pen after 'z' is exactly X,Y!
            // So we substitute the whole massive drawing string with just 'm X,Y'
            if (sp.moveCommandMatch) {
                // To avoid breaking relative chains, we just issue the move.
                // Note: if the move is 'M' (absolute), we can omit it ONLY if it's not the first command 
                // in the entire SVG. But our SVGs start with 'm'. Absolute M sets the position, we must keep it.
                // In both 'm' and 'M' cases, emitting just the move command accurately updates the current point 
                // for the next subpath, effectively skipping the painting phase of this subpath.
                result += " " + sp.moveCommandMatch[1].trim();
            } else {
                // Fallback, shouldn't happen
                result += " " + sp.original.trim();
            }
        }
    }

    return result.trim();
}

let newPaths = {};
for (const [key, val] of Object.entries(pathsObj)) {
    newPaths[key] = cleanPath(val, key);
}

let newContent = `// SVG Path data for Italy Regions - Micro Islands Removed\n\nexport const REGION_PATHS: Record<string, string> = {\n`;

for (const [key, val] of Object.entries(newPaths)) {
    newContent += `    "${key}": "${val}",\n`;
}
newContent += `};\n`;

fs.writeFileSync(filePath, newContent);
console.log("Successfully cleaned RegionPaths.ts!");
