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
    # Soglia alta (180): ignora del tutto gli aloni o i gradienti grigi/bianchi ai lati e in alto,
    # agganciandosi SOLO ai pixel scuri/colorati del bordo della moneta
    thresh = 180 
    
    b_top = 0
    for y in range(h):
        if any(pixels[x, y] < thresh for x in range(w)):
            b_top = y
            break
            
    b_left = 0
    for x in range(w):
        if any(pixels[x, y] < thresh for y in range(h)):
            b_left = x
            break
            
    b_right = w - 1
    for x in range(w - 1, -1, -1):
        if any(pixels[x, y] < thresh for y in range(h)):
            b_right = x
            break
            
    return b_left, b_top, b_right

for i, city in enumerate(lista_citta):
    col = i % 3
    row = i // 3
    
    left = col * w
    top = row * h
    right = (col + 1) * w
    bottom = (row + 1) * h
    
    cell = img.crop((left, top, right, bottom))
    
    # 1. Troviamo i bordi REALI dorati, ignorando aloni
    b_left, b_top, b_right = get_true_edges(cell)
    
    # 2. Il diametro reale è la distanza tra il bordo sinistro e destro
    diameter = b_right - b_left
    
    # 3. Aggiungiamo un piccolissimo margine (2 pixel) per non affettare l'oro
    margin = 2
    c_left = b_left - margin
    c_top = b_top - margin
    c_right = b_right + margin
    c_bottom = b_top + diameter + margin
    
    final_diameter = c_right - c_left
    
    # 4. Ritagliamo
    coin = cell.crop((c_left, c_top, c_right, c_bottom))
    
    # 5. Applichiamo la maschera sferica perfetta senza padding
    square = coin.convert("RGBA")
    cmask = Image.new('L', (final_diameter, final_diameter), 0)
    draw = ImageDraw.Draw(cmask)
    draw.ellipse((0, 0, final_diameter, final_diameter), fill=255)
    square.putalpha(cmask)
    
    out_path = os.path.join(output_folder, f"{city}.png")
    square.save(out_path)
    print(f"[{i+1}/8] Final Cropped: {city}.png (Diametro: {final_diameter})")

print("Ritaglio millimetrico completato!")
