const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/data');
const files = fs.readdirSync(dir).filter(f => f.startsWith('places_') && f.endsWith('.ts'));

const nightTipsString = `,
        "nightTips": [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ]`;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Find docTips array and insert nightTips directly after it, but only if it doesn't already exist.
    // Handles both `docTips` and `"docTips"`
    const newContent = content.replace(/("?docTips"?:\s*\[[\s\S]*?\])(?!\s*,\s*"?nightTips"?)/g, `$1${nightTipsString}`);

    if (newContent !== content) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${file}`);
    }
}
