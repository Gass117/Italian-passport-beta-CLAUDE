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
width, height = img.size
w = width // 3
h = height // 3

# Dimensione fissa perfetta calcolata da Viareggio/Toscana
target_size = 370

for i, city in enumerate(lista_citta):
    col = i % 3
    row = i // 3
    
    left = col * w
    top = row * h
    right = (col + 1) * w
    bottom = (row + 1) * h
    
    cell = img.crop((left, top, right, bottom))
    
    # Calcolo il centro esatto del riquadro
    cx = w // 2
    cy = h // 2
    
    c_left = cx - target_size // 2
    c_top = cy - target_size // 2
    c_right = c_left + target_size
    c_bottom = c_top + target_size
    
    coin = cell.crop((c_left, c_top, c_right, c_bottom))
    
    square = coin.convert("RGBA")
    mask = Image.new('L', (target_size, target_size), 0)
    draw = ImageDraw.Draw(mask)
    # Applica un ritaglio perfettamente tondo
    draw.ellipse((2, 2, target_size-2, target_size-2), fill=255)
    square.putalpha(mask)
    
    out_path = os.path.join(output_folder, f"{city}.png")
    square.save(out_path)
    print(f"[{i+1}/8] Ritaglio a dimensione fissa salvato: {city}.png (Dimensioni: {target_size}x{target_size})")

print("Badge perfetti generati con successo!")
