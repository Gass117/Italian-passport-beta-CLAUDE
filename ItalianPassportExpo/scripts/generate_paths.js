const fs = require('fs');
const path = require('path');

const svgMapPath = path.join(__dirname, '../node_modules/@svg-maps/italy/index.js');
const outputPath = path.join(__dirname, '../src/components/Map/RegionPaths.ts');

const mapping = {
    "abruzzo": "abruzzo",
    "aosta-valley": "valle_aosta",
    "apulia": "puglia",
    "basilicata": "basilicata",
    "calabria": "calabria",
    "campania": "campania",
    "emilia-romagna": "emilia",
    "friuli-venezia-giulia": "friuli",
    "lazio": "lazio",
    "liguria": "liguria",
    "lombardy": "lombardia",
    "marche": "marche",
    "molise": "molise",
    "piedmont": "piemonte",
    "sardinia": "sardegna",
    "sicily": "sicilia",
    "trentino-south-tyrol": "trentino",
    "tuscany": "toscana",
    "umbria": "umbria",
    "veneto": "veneto"
};

try {
    let content = fs.readFileSync(svgMapPath, 'utf8');
    // Strip "export default " and specific char at end if present
    content = content.replace('export default ', '').trim();
    if (content.endsWith(';')) {
        content = content.slice(0, -1);
    }

    const data = JSON.parse(content);
    const paths = {};

    data.locations.forEach(loc => {
        const newId = mapping[loc.id];
        if (newId) {
            paths[newId] = loc.path;
        } else {
            console.warn(`No mapping found for ID: ${loc.id}`);
        }
    });

    const outputContent = `// SVG Path data for Italy Regions - High Quality
// Generated from @svg-maps/italy
// ViewBox: ${data.viewBox}

export const REGION_PATHS: Record<string, string> = ${JSON.stringify(paths, null, 4)};
`;

    fs.writeFileSync(outputPath, outputContent);
    console.log(`Successfully wrote to ${outputPath}`);
    console.log(`ViewBox used: ${data.viewBox}`);

} catch (err) {
    console.error('Error generating paths:', err);
    process.exit(1);
}
