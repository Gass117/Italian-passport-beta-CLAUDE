from PIL import Image, ImageDraw
import os

input_path = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/toscana_badges.png"
out_dir = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/badges"

cities = [
    "pienza", "pisa", "pitigliano"
]

img = Image.open(input_path).convert("RGB")
width, height = img.size
w = width // 3
h = height // 3

mapping = {
    "pienza": (0, 1),
    "pisa": (1, 1),
    "pitigliano": (2, 1)
}

def trim_white_aggressive(im):
    gray = im.convert('L')
    # Use a more aggressive threshold to ignore the faint noise/gradient in the middle row
    # Anything lighter than 230 will be considered "background" to crop out
    mask = gray.point(lambda p: 255 if p < 230 else 0)
    bbox = mask.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

for city in cities:
    col, row = mapping[city]
    
    left = col * w
    top = row * h
    right = (col + 1) * w
    bottom = (row + 1) * h
    
    cell = img.crop((left, top, right, bottom))
    
    trimmed = trim_white_aggressive(cell)
    
    cw, ch = trimmed.size
    size = max(cw, ch)
    
    square = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    offset = ((size - cw) // 2, (size - ch) // 2)
    square.paste(trimmed.convert("RGBA"), offset)
    
    mask = Image.new('L', (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse((1, 1, size-1, size-1), fill=255)
    square.putalpha(mask)
    
    out_path = os.path.join(out_dir, f"{city}.png")
    square.save(out_path)
    print(f"Fixed & Saved: {out_path} (Size: {size}x{size})")
