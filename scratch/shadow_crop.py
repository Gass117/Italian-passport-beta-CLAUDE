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
    
    original_cell = img.crop((left, top, right, bottom))
    cell = original_cell.copy()
    
    ImageDraw.floodfill(cell, (0, 0), (255, 0, 255), thresh=40)
    ImageDraw.floodfill(cell, (w-1, 0), (255, 0, 255), thresh=40)
    ImageDraw.floodfill(cell, (0, h-1), (255, 0, 255), thresh=40)
    ImageDraw.floodfill(cell, (w-1, h-1), (255, 0, 255), thresh=40)
    
    bg = Image.new("RGB", cell.size, (255, 0, 255))
    diff = ImageChops.difference(cell, bg)
    bbox = diff.getbbox()
    
    if bbox:
        b_left, b_top, b_right, b_bottom = bbox
        
        # La LARGHEZZA è il diametro reale della moneta, senza le ombre verticali
        diameter = b_right - b_left
        
        # Ancoriamo il ritaglio al bordo superiore della moneta, scendendo giù per 'diameter' pixel
        c_left = b_left
        c_right = b_right
        c_top = b_top
        c_bottom = b_top + diameter
        
        # Questo è il quadrato perfetto che incapsula solo ed esclusivamente la moneta
        coin = original_cell.crop((c_left, c_top, c_right, c_bottom))
        
        square = coin.convert("RGBA")
        cmask = Image.new('L', (diameter, diameter), 0)
        draw = ImageDraw.Draw(cmask)
        # Smussiamo il tutto in un tondo perfetto per cancellare del tutto gli angoli con l'ombra
        draw.ellipse((2, 2, diameter-2, diameter-2), fill=255)
        square.putalpha(cmask)
        
        out_path = os.path.join(output_folder, f"{city}.png")
        square.save(out_path)
        print(f"Perfect Cropped: {city}.png (Diametro: {diameter})")
    else:
        print(f"Errore su {city}")
