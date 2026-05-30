import sys
from PIL import Image
input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
img = Image.open(input_file).convert("RGB")

# For Ivrea (Colonna 0, X=19)
ivrea_region = img.crop((19, 810, 19 + 366, 850))
pixels = ivrea_region.load()
for y in range(40):
    avg = sum(sum(pixels[x,y])//3 for x in range(150, 250)) / 100
    if avg < 240:
        print(f"Ivrea true absolute Y = {810 + y}")
        break

# For Susa (Colonna 1, X=437)
susa_region = img.crop((437, 810, 437 + 366, 850))
pixels = susa_region.load()
for y in range(40):
    avg = sum(sum(pixels[x,y])//3 for x in range(150, 250)) / 100
    if avg < 240:
        print(f"Susa true absolute Y = {810 + y}")
        break
