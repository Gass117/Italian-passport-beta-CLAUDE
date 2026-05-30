from PIL import Image

input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
img = Image.open(input_file).convert("L")
w, h = img.size[0]//3, img.size[1]//3

for idx, city in [(6, "ivrea"), (7, "susa")]:
    cell = img.crop(( (idx%3)*w, (idx//3)*h, (idx%3+1)*w, (idx//3+1)*h ))
    pixels = cell.load()
    
    print(f"--- {city.upper()} ---")
    for y in range(30):
        dark_count = sum(1 for x in range(w) if pixels[x,y] < 120)
        if dark_count > 0:
            print(f"Row {y}: {dark_count} dark pixels")
