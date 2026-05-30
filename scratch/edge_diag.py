from PIL import Image, ImageFilter

input_file = "c:/Users/engin/Desktop/IT-Pasprt/Italian-passport-beta-CLAUDE/ItalianPassportExpo/assets/images/piemonte.badges.png"
img = Image.open(input_file).convert("L")
w, h = img.size[0]//3, img.size[1]//3

for idx, city in [(6, "ivrea"), (7, "susa")]:
    cell = img.crop(( (idx%3)*w, (idx//3)*h, (idx%3+1)*w, (idx//3+1)*h ))
    # Applichiamo un filtro per trovare i contorni fisici, trasformando i bordi in linee bianche brillanti su sfondo nero
    edges = cell.filter(ImageFilter.FIND_EDGES)
    pixels = edges.load()
    
    # Cerchiamo la prima riga che contiene i contorni della moneta, ignorando i bordi laterali della cella (primi e ultimi 20 pixel)
    b_top = next((y for y in range(h) if any(pixels[x,y] > 50 for x in range(20, w-20))), 0)
    b_left = next((x for x in range(w) if any(pixels[x,y] > 50 for y in range(h))), 0)
    
    print(f"{city.upper()} - Il bordo reale inizia a Y: {b_top}, X: {b_left}")
