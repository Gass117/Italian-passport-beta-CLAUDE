from PIL import Image, ImageDraw
import os

def process_badges_grid(input_path, out_dir, cities):
    """
    Ritaglio di precisione per griglie 3x3 di badge generati da AI.
    Rimuove eventuali sfumature e ombre per un gettone perfetto e omogeneo.
    """
    print(f"Inizio elaborazione di {len(cities)} badge da {input_path}...")
    img = Image.open(input_path).convert("RGB")
    width, height = img.size
    w = width // 3
    h = height // 3

    os.makedirs(out_dir, exist_ok=True)

    def trim_white_hardcore(im):
        gray = im.convert('L')
        # Taglia tutto quello che è anche leggermente grigio/ombra (più chiaro di 190)
        mask = gray.point(lambda p: 255 if p < 190 else 0)
        bbox = mask.getbbox()
        if bbox:
            return im.crop(bbox)
        return im

    for i, city in enumerate(cities):
        col = i % 3
        row = i // 3
        
        left = col * w
        top = row * h
        right = (col + 1) * w
        bottom = (row + 1) * h
        
        cell = img.crop((left, top, right, bottom))
        trimmed = trim_white_hardcore(cell)
        
        cw, ch = trimmed.size
        size = max(cw, ch)
        
        square = Image.new('RGBA', (size, size), (255, 255, 255, 0))
        offset = ((size - cw) // 2, (size - ch) // 2)
        square.paste(trimmed.convert("RGBA"), offset)
        
        mask = Image.new('L', (size, size), 0)
        draw = ImageDraw.Draw(mask)
        # Bordo circolare trasparente smussato
        draw.ellipse((1, 1, size-1, size-1), fill=255)
        square.putalpha(mask)
        
        out_path = os.path.join(out_dir, f"{city}.png")
        square.save(out_path)
        print(f"[{i+1}/9] Badge perfetto salvato: {city}.png (Dimensioni: {size}x{size})")

# ==========================================
# ISTRUZIONI PER L'USO FUTURO:
# ==========================================
# 1. Modificare i percorsi e la lista delle città
# 2. Lanciare: python master_crop_badges.py
#
# input_file = "C:/percorso/immagine_griglia_3x3.png"
# output_folder = "C:/percorso/cartella_di_destinazione"
#
# lista_citta = [
#     "citta1", "citta2", "citta3",
#     "citta4", "citta5", "citta6",
#     "citta7", "citta8", "citta9"
# ]
# process_badges_grid(input_file, output_folder, lista_citta)
