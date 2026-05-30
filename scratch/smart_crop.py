from PIL import Image, ImageDraw, ImageChops
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

for i, city in enumerate(lista_citta):
    col = i % 3
    row = i // 3
    
    left = col * w
    top = row * h
    right = (col + 1) * w
    bottom = (row + 1) * h
    
    # Teniamo l'originale per il ritaglio finale
    original_cell = img.crop((left, top, right, bottom))
    
    # Creiamo una copia su cui usare il "secchiello"
    cell = original_cell.copy()
    
    # Usiamo il floodfill (secchiello) partendo dai 4 angoli.
    # Sostituiamo il bianco/grigino di sfondo con un magenta puro (255, 0, 255)
    # thresh=40 permette di tollerare le sfumature di sporco nello sfondo.
    ImageDraw.floodfill(cell, (0, 0), (255, 0, 255), thresh=40)
    ImageDraw.floodfill(cell, (w-1, 0), (255, 0, 255), thresh=40)
    ImageDraw.floodfill(cell, (0, h-1), (255, 0, 255), thresh=40)
    ImageDraw.floodfill(cell, (w-1, h-1), (255, 0, 255), thresh=40)
    
    # Calcoliamo il bounding box cercando tutto ciò che NON è magenta
    bg = Image.new("RGB", cell.size, (255, 0, 255))
    diff = ImageChops.difference(cell, bg)
    bbox = diff.getbbox()
    
    if bbox:
        # Ritagliamo dall'immagine ORIGINALE usando le coordinate precise trovate
        coin = original_cell.crop(bbox)
        
        cw, ch = coin.size
        size = max(cw, ch)
        
        # Inseriamo la moneta in un quadrato perfetto
        square = Image.new('RGBA', (size, size), (255, 255, 255, 0))
        offset = ((size - cw) // 2, (size - ch) // 2)
        square.paste(coin.convert("RGBA"), offset)
        
        # Applichiamo la maschera circolare perfetta per eliminare ogni angolo
        cmask = Image.new('L', (size, size), 0)
        draw = ImageDraw.Draw(cmask)
        draw.ellipse((1, 1, size-1, size-1), fill=255)
        square.putalpha(cmask)
        
        out_path = os.path.join(output_folder, f"{city}.png")
        square.save(out_path)
        print(f"Smart Cropped: {city}.png (BBox: {bbox} -> Size: {size}x{size})")
    else:
        print(f"Errore: impossibile trovare il badge per {city}")
