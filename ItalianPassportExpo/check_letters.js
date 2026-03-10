const fs = require('fs');
const pathStr = "m 165.81021,222.60051 m -109.83,-1.17 0.79,0.27 1.55,-1.67... (truncated for brevity, let's just parse the actual string from the TS file)";

const content = fs.readFileSync('c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/src/components/Map/RegionPaths.ts', 'utf-8');
const match = content.match(/"liguria":\s*"([^"]+)"/);
if (match) {
    const letters = match[1].match(/[a-zA-Z]/g);
    const uniqueLetters = [...new Set(letters)];
    console.log("Commands in Liguria:", uniqueLetters);
} else {
    console.log("Could not find liguria");
}
