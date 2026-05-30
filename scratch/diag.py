from PIL import Image

input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
img = Image.open(input_file).convert("L")
width, height = img.size
w = width // 3
h = height // 3

# Test su Torino (Cella 0)
cell = img.crop((0, 0, w, h))
pixels = cell.load()

def get_edges(threshold):
    b_top = 0
    for y in range(h):
        if any(pixels[x, y] < threshold for x in range(w)):
            b_top = y
            break
            
    b_bottom = h - 1
    for y in range(h - 1, -1, -1):
        if any(pixels[x, y] < threshold for x in range(w)):
            b_bottom = y
            break
            
    b_left = 0
    for x in range(w):
        if any(pixels[x, y] < threshold for y in range(h)):
            b_left = x
            break
            
    b_right = w - 1
    for x in range(w - 1, -1, -1):
        if any(pixels[x, y] < threshold for y in range(h)):
            b_right = x
            break
            
    return b_left, b_top, b_right, b_bottom

print("Threshold 240 (Very light gray):")
print(get_edges(240))
print("Threshold 200 (Shadows removed):")
print(get_edges(200))
print("Threshold 150 (Only solid coin colors):")
print(get_edges(150))
