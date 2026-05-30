from PIL import Image, ImageDraw
import os

# Configuration
input_path = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/toscana_badges.png"
out_dir = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/badges"

cities = [
    "firenze", "lucca", "montepulciano",
    "pienza", "pisa", "pitigliano",
    "san_gimignano", "siena", "volterra"
]

os.makedirs(out_dir, exist_ok=True)

try:
    img = Image.open(input_path)
    # Ensure it's in a format with alpha (though we'll use a mask)
    img = img.convert("RGBA")
    
    width, height = img.size
    w = width // 3
    h = height // 3
    
    for i, city in enumerate(cities):
        row = i // 3
        col = i % 3
        
        left = col * w
        top = row * h
        right = (col + 1) * w
        bottom = (row + 1) * h
        
        # Crop the square
        cropped = img.crop((left, top, right, bottom))
        
        # Create a circular mask to make corners transparent
        # We shrink the ellipse slightly by 5 pixels on all sides to avoid straight borders
        margin = 15
        mask = Image.new('L', (w, h), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((margin, margin, w - margin, h - margin), fill=255)
        
        # Apply the mask
        cropped.putalpha(mask)
        
        out_path = os.path.join(out_dir, f"{city}.png")
        cropped.save(out_path)
        print(f"Saved: {out_path}")
        
    print("All badges processed successfully.")

except Exception as e:
    print(f"Error: {e}")
