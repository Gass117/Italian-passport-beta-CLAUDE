import sys
from PIL import Image, ImageFilter
input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
img = Image.open(input_file).convert("L")
w, h = 418, 418

for idx, city in [(6, "ivrea"), (7, "susa")]:
    cell = img.crop(( (idx%3)*w, (idx//3)*h, (idx%3+1)*w, (idx//3+1)*h ))
    edges = cell.filter(ImageFilter.FIND_EDGES)
    pixels = edges.load()
    
    true_top = 0
    for y in range(209, 0, -1):
        # Cerchiamo un bordo solido al centro esatto
        if sum(1 for x in range(180, 238) if pixels[x,y] > 50) > 15:
            true_top = y
            break
            
    true_left = 0
    for x in range(209, 0, -1):
        if sum(1 for y in range(180, 238) if pixels[x,y] > 50) > 15:
            true_left = x
            break
            
    print(f"{city} Y={true_top}, X={true_left}")
