from PIL import Image, ImageDraw
import os

input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
output_folder = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/badges"

img = Image.open(input_file).convert("RGB")
w, h = img.size[0]//3, img.size[1]//3

for idx, city in [(6, "ivrea"), (7, "susa")]:
    col = idx % 3
    row = idx // 3
    
    cell = img.crop((col*w, row*h, (col+1)*w, (row+1)*h))
    gray = cell.convert("L")
    pixels = gray.load()
    
    # 1. Troviamo la Y della vera cima della moneta:
    # Ignoriamo sbavature o linee verticali dell'AI cercando la prima riga che ha una densità di almeno 20 pixel scuri (la curvatura superiore della moneta)
    b_top = next((y for y in range(h) if sum(1 for x in range(w) if pixels[x,y] < 120) > 20), 12)
    
    # Poiché >20 pixel si raggiungono 2-3 pixel sotto la punta reale, retrocediamo di 3 pixel per l'ancora perfetta
    c_top = b_top - 3
    
    # 2. Facciamo lo stesso per il bordo sinistro
    b_left = next((x for x in range(w) if sum(1 for y in range(h) if pixels[x,y] < 120) > 20), 21)
    c_left = b_left - 3
    
    diameter = 366
    c_right = c_left + diameter
    c_bottom = c_top + diameter
    
    coin = cell.crop((c_left, c_top, c_right, c_bottom))
    square = coin.convert("RGBA")
    cmask = Image.new('L', (diameter, diameter), 0)
    draw = ImageDraw.Draw(cmask)
    draw.ellipse((0, 0, diameter, diameter), fill=255)
    square.putalpha(cmask)
    
    out_path = os.path.join(output_folder, f"{city}.png")
    square.save(out_path)
    print(f"Fixed {city}.png ancorato a ({c_left}, {c_top})")
