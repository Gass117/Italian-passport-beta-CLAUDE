const fs = require('fs');
const path = require('path');
const svgPathBounds = require('svg-path-bounds');

const pathsPath = path.join(__dirname, '../src/components/Map/RegionPaths.ts');
let content = fs.readFileSync(pathsPath, 'utf8');

const match = content.match(/export const REGION_PATHS: Record<string, string> = ({[\s\S]*?});/);
if (!match) process.exit(1);

const pathsObj = eval('(' + match[1] + ')');

let bboxes = {};

for (const [id, pathStr] of Object.entries(pathsObj)) {
    // svgPathBounds returns [left, top, right, bottom]
    let [left, top, right, bottom] = svgPathBounds(pathStr);

    // Add a 5% padding around the bounding box
    const width = right - left;
    const height = bottom - top;

    // increase the box so the map appears 25% bigger? Wait, the user wants the IMAGE to be 25% bigger.
    // By using the exact bounding box, the image will scale to fill the container! That's already HUGE compared to displaying the macro region.
    // So exact bounding box + small padding is perfect.
    const padX = width * 0.05;
    const padY = height * 0.05;

    const minX = left - padX;
    const minY = top - padY;
    const w = width + padX * 2;
    const h = height + padY * 2;

    bboxes[id] = {
        viewBox: `${minX} ${minY} ${w} ${h}`,
        aspectRatio: w / h
    };
}

const outContent = `// Auto-generated exact bounding boxes for each region
export const REGION_BBOXES: Record<string, { viewBox: string, aspectRatio: number }> = ${JSON.stringify(bboxes, null, 4)};\n`;

fs.writeFileSync(path.join(__dirname, '../src/components/Map/RegionBBoxes.ts'), outContent);
console.log("Generated RegionBBoxes!");
