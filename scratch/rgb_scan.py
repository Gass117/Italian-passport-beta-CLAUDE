import sys
from PIL import Image
input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
img = Image.open(input_file).convert("RGB")
w, h = 418, 418

for idx, city in [(6, "ivrea"), (7, "susa")]:
    cell = img.crop(( (idx%3)*w, (idx//3)*h, (idx%3+1)*w, (idx//3+1)*h ))
    pixels = cell.load()
    
    true_top = 0
    for y in range(h):
        avg = sum(sum(pixels[x,y])//3 for x in range(150, 250)) / 100
        if avg < 240: # Trova la prima riga dove il bianco di sfondo cala e inizia il colore
            true_top = y
            break
            
    true_left = 0
    for x in range(w):
        avg = sum(sum(pixels[x,y])//3 for y in range(150, 250)) / 100
        if avg < 240:
            true_left = x
            break
            
    print(f"{city.upper()} Y={true_top}, X={true_left}")
