from PIL import Image, ImageDraw
import os

input_path = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/toscana_badges.png"
out_dir = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/badges"

cities = [
    "firenze", "lucca", "montepulciano",
    "pienza", "pisa", "pitigliano",
    "san_gimignano", "siena", "volterra"
]

img = Image.open(input_path).convert("RGB")
width, height = img.size
w = width // 3
h = height // 3

def trim_white(im):
    # Convert to grayscale to easily detect the non-white pixels
    gray = im.convert('L')
    # Create a mask where white background (e.g. > 240) is 0 and the rest is 255
    mask = gray.point(lambda p: 255 if p < 240 else 0)
    bbox = mask.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

for i, city in enumerate(cities):
    row = i // 3
    col = i % 3
    
    left = col * w
    top = row * h
    right = (col + 1) * w
    bottom = (row + 1) * h
    
    # Extract the cell
    cell = img.crop((left, top, right, bottom))
    
    # Trim the white space tightly around the coin
    trimmed = trim_white(cell)
    
    # The trimmed image should be mostly square, let's force it to be a perfect square
    cw, ch = trimmed.size
    size = max(cw, ch)
    
    # Create a new transparent square image
    square = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    
    # Paste the trimmed coin precisely in the center
    offset = ((size - cw) // 2, (size - ch) // 2)
    square.paste(trimmed.convert("RGBA"), offset)
    
    # Create a precise circular mask
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    # A tiny 1-pixel margin to avoid jagged aliased edges
    draw.ellipse((1, 1, size-1, size-1), fill=255)
    
    # Apply the mask
    square.putalpha(mask)
    
    out_path = os.path.join(out_dir, f"{city}.png")
    square.save(out_path)
    print(f"Trimmed & Saved: {out_path} (Size: {size}x{size})")

print("Tutti i badge sono stati ridimensionati a filo bordo!")
