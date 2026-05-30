from PIL import Image, ImageDraw
import os

input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
output_folder = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/badges"

img = Image.open(input_file).convert("RGB")
diameter = 366

# Coordinate assolute perfette calcolate ignorando le caselle della griglia
for city, x, y in [("ivrea", 19, 813), ("susa", 437, 813)]:
    # Aggiungo 2 pixel di respiro per ammorbidire il tondo senza tagliare l'oro
    c_x = x - 2
    c_y = y - 2
    c_diameter = diameter + 4
    
    # Ritaglio direttamente dall'immagine gigante senza confini
    coin = img.crop((c_x, c_y, c_x + c_diameter, c_y + c_diameter))
    
    # Maschera sferica perfetta
    square = coin.convert("RGBA")
    cmask = Image.new('L', (c_diameter, c_diameter), 0)
    draw = ImageDraw.Draw(cmask)
    draw.ellipse((0, 0, c_diameter, c_diameter), fill=255)
    square.putalpha(cmask)
    
    # Salvataggio
    out_path = os.path.join(output_folder, f"{city}.png")
    square.save(out_path)
    print(f"[{city.upper()}] Estratta intera a coordinate assolute X={c_x}, Y={c_y}")
