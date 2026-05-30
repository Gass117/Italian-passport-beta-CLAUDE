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

def get_true_edges(cell):
    gray = cell.convert("L")
    pixels = gray.load()
    # A 130 ignoriamo persino le ombre scurissime, colpendo solo i colori vivaci e l'oro
    thresh = 130 
    
    b_top = next((y for y in range(h) if any(pixels[x,y] < thresh for x in range(w))))
    b_bottom = next((y for y in range(h-1, -1, -1) if any(pixels[x,y] < thresh for x in range(w))))
    b_left = next((x for x in range(w) if any(pixels[x,y] < thresh for y in range(h))))
    b_right = next((x for x in range(w-1, -1, -1) if any(pixels[x,y] < thresh for y in range(h))))
            
    return b_left, b_top, b_right, b_bottom

for i, city in enumerate(lista_citta):
    col = i % 3
    row = i // 3
    
    left = col * w
    top = row * h
    right = (col + 1) * w
    bottom = (row + 1) * h
    
    cell = img.crop((left, top, right, bottom))
    
    b_left, b_top, b_right, b_bottom = get_true_edges(cell)
    
    # Ora larghezza e altezza saranno identiche, ma per sicurezza prendiamo il massimo
    diameter = max(b_right - b_left, b_bottom - b_top)
    
    # Troviamo il centro millimetrico della moneta
    cx = (b_left + b_right) // 2
    cy = (b_top + b_bottom) // 2
    
    # Creiamo un quadrato perfetto attorno al centro esatto
    c_left = cx - diameter // 2
    c_top = cy - diameter // 2
    c_right = c_left + diameter
    c_bottom = c_top + diameter
    
    # Aggiungiamo solo 2 pixel di sicurezza
    c_left -= 2
    c_top -= 2
    c_right += 2
    c_bottom += 2
    final_diameter = diameter + 4
    
    # Ritaglio chirurgico
    coin = cell.crop((c_left, c_top, c_right, c_bottom))
    
    # Maschera perfetta
    square = coin.convert("RGBA")
    cmask = Image.new('L', (final_diameter, final_diameter), 0)
    draw = ImageDraw.Draw(cmask)
    draw.ellipse((0, 0, final_diameter, final_diameter), fill=255)
    square.putalpha(cmask)
    
    out_path = os.path.join(output_folder, f"{city}.png")
    square.save(out_path)
    print(f"[{i+1}/8] Ultimate Cropped: {city}.png (Diametro: {final_diameter}px, Centro originario Y: {cy})")

print("Ritaglio Definitivo Completato!")
