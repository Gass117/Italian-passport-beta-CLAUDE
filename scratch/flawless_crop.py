from PIL import Image, ImageDraw
import os

input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
output_folder = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/badges"

lista_citta = [
    "torino", "alba", "asti",
    "stresa", "novara", "barolo",
    "ivrea", "susa"
]

img = Image.open(input_file).convert("RGB")
w, h = img.size[0]//3, img.size[1]//3

for i, city in enumerate(lista_citta):
    col = i % 3
    row = i // 3
    
    cell = img.crop((col*w, row*h, (col+1)*w, (row+1)*h))
    gray = cell.convert("L")
    pixels = gray.load()
    
    # 1. Troviamo il punto esatto in cui inizia la moneta (soglia sicura a 120 per non prendere ombre)
    # Se per caso non dovesse trovarlo (impossibile), il default è il valore di Torino
    b_top = next((y for y in range(h) if any(pixels[x,y] < 120 for x in range(w))), 12)
    b_left = next((x for x in range(w) if any(pixels[x,y] < 120 for y in range(h))), 21)
    
    # 2. Sappiamo dai dati precedenti che il vero diametro interno è di circa ~362/364 pixel
    diameter = 366
    
    # 3. Retrocediamo di 2 pixel (perché la soglia a 120 scarta i primi 2 pixel sfocati dell'oro)
    c_left = b_left - 2
    c_top = b_top - 2
    
    # 4. Creiamo il quadrato di ritaglio perfetto partendo dall'ancora
    c_right = c_left + diameter
    c_bottom = c_top + diameter
    
    coin = cell.crop((c_left, c_top, c_right, c_bottom))
    
    # 5. Applichiamo la maschera circolare a zero-padding
    square = coin.convert("RGBA")
    cmask = Image.new('L', (diameter, diameter), 0)
    draw = ImageDraw.Draw(cmask)
    draw.ellipse((0, 0, diameter, diameter), fill=255)
    square.putalpha(cmask)
    
    out_path = os.path.join(output_folder, f"{city}.png")
    square.save(out_path)
    print(f"[{i+1}/8] Flawless Cropped: {city}.png ancorato a ({c_left}, {c_top})")

print("I badge del Piemonte sono ora chirurgicamente perfetti.")
