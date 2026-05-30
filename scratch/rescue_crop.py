from PIL import Image, ImageDraw
import os

input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
output_folder = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/badges"

img = Image.open(input_file).convert("RGB")

diameter = 366

# Le coordinate ASSOLUTE per recuperare le teste sconfinate nelle celle superiori
# Spaziatura verticale costante trovata: ~502 pixel
# Riga 1 (Torino): Y=10
# Riga 2 (Stresa): Y=512
# Riga 3 (Ivrea): Y=1014 (10 pixel sopra il limite della sua cella che è 1024)

# IVREA
x_ivrea = 18
y_ivrea = 1014
coin_ivrea = img.crop((x_ivrea, y_ivrea, x_ivrea + diameter, y_ivrea + diameter))
square = coin_ivrea.convert("RGBA")
cmask = Image.new('L', (diameter, diameter), 0)
draw = ImageDraw.Draw(cmask)
draw.ellipse((0, 0, diameter, diameter), fill=255)
square.putalpha(cmask)
square.save(os.path.join(output_folder, "ivrea.png"))
print("Ivrea salvata con la testa recuperata!")

# SUSA
x_susa = 512 + 18 # 530
y_susa = 1014
coin_susa = img.crop((x_susa, y_susa, x_susa + diameter, y_susa + diameter))
square = coin_susa.convert("RGBA")
cmask = Image.new('L', (diameter, diameter), 0)
draw = ImageDraw.Draw(cmask)
draw.ellipse((0, 0, diameter, diameter), fill=255)
square.putalpha(cmask)
square.save(os.path.join(output_folder, "susa.png"))
print("Susa salvata con la testa recuperata!")
