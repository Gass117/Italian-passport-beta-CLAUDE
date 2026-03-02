const fs = require('fs');
const path = require('path');

const fileContent = fs.readFileSync(path.join(__dirname, '../src/components/Map/RegionPaths.ts'), 'utf8');

// Super simple regex to extract the dict
const match = fileContent.match(/export const REGION_PATHS: Record<string, string> = ({[\s\S]*?});/);
let regionPaths = {};
try {
    regionPaths = eval('(' + match[1] + ')');
} catch (e) {
    console.error("Failed to parse", e);
    process.exit(1);
}

const MACRO_REGIONS = {
    'lombardia': 'NORTH', 'piemonte': 'NORTH', 'valle_aosta': 'NORTH',
    'liguria': 'NORTH', 'veneto': 'NORTH', 'trentino': 'NORTH',
    'friuli': 'NORTH',
    'emilia': 'CENTER',
    'toscana': 'CENTER', 'umbria': 'CENTER', 'marche': 'CENTER', 'lazio': 'CENTER',
    'abruzzo': 'SOUTH', 'molise': 'SOUTH', 'campania': 'SOUTH',
    'puglia': 'SOUTH', 'basilicata': 'SOUTH', 'calabria': 'SOUTH',
    'sicilia': 'SOUTH', 'sardegna': 'SOUTH'
};

function getBBox(pathData) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    // Regex to match coordinates like "12.3,45.6" or "12 -34"
    // Path string split into tokens
    const tokens = pathData.replace(/[mzlhvcsqta]/gi, ' $& ').split(/[\s,]+/).filter(t => t.trim());

    let currentX = 0, currentY = 0;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (/[mzlhvcsqta]/i.test(token)) continue;

        // Not a command, must be a number
        let valX = parseFloat(token);

        // Wait, some commands take only X or Y. 
        // Simplification for our SVG which seems to mostly have x,y pairs (or dx,dy).
        // Let's just grab ALL numbers and see their ranges.
        // Actually, if it's relative, it adds. Our SVG is ONLY absolute/relative commands.
    }
}

// Since parsing SVG path properly here is complex, let's just do a rough min/max
// across all coordinates if they are Absolute. But they are relative ('m', 'v', 'l', etc).
// Let's use a simpler heuristic for bounds, or just print paths we can run in browser.
