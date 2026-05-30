from PIL import Image

input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
img = Image.open(input_file).convert("L")
w, h = img.size[0]//3, img.size[1]//3
cell = img.crop((0, 0, w, h)) # Torino
pixels = cell.load()

for thresh in [220, 190, 150, 120, 100, 80, 50]:
    try:
        b_top = next((y for y in range(h) if any(pixels[x,y] < thresh for x in range(w))))
        b_bottom = next((y for y in range(h-1, -1, -1) if any(pixels[x,y] < thresh for x in range(w))))
        b_left = next((x for x in range(w) if any(pixels[x,y] < thresh for y in range(h))))
        b_right = next((x for x in range(w-1, -1, -1) if any(pixels[x,y] < thresh for y in range(h))))
        print(f"Thresh {thresh}: left={b_left}, top={b_top}, right={b_right}, bottom={b_bottom} | Width={b_right-b_left}, Height={b_bottom-b_top}")
    except Exception as e:
        print(f"Thresh {thresh}: No pixels found below threshold")
