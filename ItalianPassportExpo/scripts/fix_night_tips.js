const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/data');
const files = fs.readdirSync(dir).filter(f => f.startsWith('places_') && f.endsWith('.ts'));

const nightTipsString = `,
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ]`;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Force remove any existing nightTips entirely
    content = content.replace(/,\s*"?nightTips"?:\s*\[[\s\S]*?\]/g, '');

    // 2. Add exactly one nightTips array right after docTips
    content = content.replace(/("?docTips"?:\s*\[[\s\S]*?\])/g, `$1${nightTipsString}`);

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned and Updated ${file}`);
}
