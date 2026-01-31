# Italia Passport

Un passaporto digitale dell'Italia dove collezioni luoghi visitati "grattando" sticker per rivelare badge. I badge si sbloccano solo se la tua posizione GPS è sufficientemente vicina alle coordinate del luogo.

## Requisiti

- Xcode 15.0+
- iOS 17.0+
- Swift 5.9+

## Come eseguire il progetto

1. **Apri il progetto in Xcode**
   ```bash
   cd ItaliaPassport
   open ItaliaPassport.xcodeproj
   ```

2. **Seleziona il target**
   - Scegli un simulatore o dispositivo iOS 17+
   - Assicurati che il target "ItaliaPassport" sia selezionato

3. **Compila ed esegui**
   - Premi `Cmd + R` oppure clicca il pulsante Play

4. **Permessi di localizzazione**
   - L'app chiederà il permesso per accedere alla posizione quando provi a sbloccare un badge
   - Per testare nel simulatore, usa: Features > Location > Custom Location

## Struttura del progetto

```
ItaliaPassport/
├── ItaliaPassportApp.swift      # Entry point con SwiftData
├── ContentView.swift            # TabView principale
├── Models/
│   ├── Region.swift             # Modello regione
│   ├── Place.swift              # Modello luogo con badge
│   └── VisitedPlace.swift       # SwiftData model per persistenza
├── Data/
│   ├── DataStore.swift          # Gestione dati centralizzata
│   └── places.json              # Dataset luoghi iniziale
├── Services/
│   ├── LocationService.swift    # CoreLocation wrapper
│   └── AppSettings.swift        # Impostazioni persistenti
├── Views/
│   ├── Map/                     # Mappa Italia interattiva
│   ├── Region/                  # Dettaglio regione
│   ├── Place/                   # Dettaglio luogo + scratch
│   ├── Collection/              # Griglia badge
│   └── Settings/                # Impostazioni
└── Components/                  # Componenti riutilizzabili
```

## Come aggiungere nuove regioni e luoghi

### Aggiungere un luogo

1. Apri `ItaliaPassport/Data/places.json`
2. Aggiungi un nuovo oggetto nell'array `places`:

```json
{
  "id": "nome_univoco",
  "regionId": "id_regione_esistente",
  "name": "Nome del Luogo",
  "type": "city|borgo|landmark",
  "province": "XX",
  "latitude": 41.9028,
  "longitude": 12.4964,
  "shortDescription": "Breve descrizione del luogo...",
  "docTips": [
    "Prima cosa da fare",
    "Seconda cosa da fare",
    "Terza cosa da fare",
    "Quarta cosa da fare",
    "Quinta cosa da fare"
  ],
  "badge": {
    "title": "Titolo del Badge",
    "imageName": "nome.sf.symbol",
    "description": "Descrizione del badge sbloccato"
  }
}
```

### Aggiungere una regione

1. Aggiungi la regione nell'array `regions` di `places.json`:

```json
{
  "id": "nome_regione",
  "name": "NomeRegione",
  "displayName": "Nome Regione",
  "capitalCity": "Capitale",
  "shapeAssetName": "nome_shape",
  "centerLatitude": 41.0,
  "centerLongitude": 12.0,
  "themeColorHex": "#COLORE"
}
```

2. Aggiungi la shape in `Views/Map/RegionShapes.swift`:

```swift
static let nuovaRegione = RegionMapData(
    id: "nome_regione",
    name: "Nome Regione",
    center: CGPoint(x: 0.5, y: 0.5),  // coordinate normalizzate 0-1
    size: CGSize(width: 0.1, height: 0.1),
    pathPoints: [
        CGPoint(x: 0.45, y: 0.45),
        CGPoint(x: 0.55, y: 0.45),
        CGPoint(x: 0.55, y: 0.55),
        CGPoint(x: 0.45, y: 0.55)
    ]
)
```

3. Aggiungi la regione all'array `all` in `ItalyRegions`

### SF Symbols consigliati per i badge

- Città: `building.2.fill`, `building.columns.fill`
- Borghi: `house.lodge.fill`, `mountain.2.fill`
- Mare: `sailboat.fill`, `water.waves`
- Cultura: `theatermasks.fill`, `paintpalette.fill`
- Cibo: `fork.knife`, `cup.and.saucer.fill`
- Natura: `leaf.fill`, `tree.fill`

## Funzionalità implementate

### MVP Completo

- [x] Mappa Italia interattiva con regioni cliccabili
- [x] Highlight regioni al tocco/hover
- [x] Lista luoghi per regione con filtri
- [x] Scheda luogo con descrizione e "5 cose da fare"
- [x] Verifica posizione GPS con soglia configurabile
- [x] Scratch card per rivelare badge
- [x] Animazione confetti alla scoperta
- [x] Collezione badge con griglia e filtri
- [x] Progress bar generale
- [x] Impostazioni con soglia distanza e reset
- [x] Persistenza con SwiftData
- [x] Gestione permessi localizzazione

### Architettura

- SwiftUI + MVVM
- SwiftData per persistenza
- @Observable per state management
- Dependency injection via Environment
- Separazione chiara Models/Views/Services

## Testare l'app

### Nel simulatore

1. Esegui l'app
2. Vai in un luogo (es. Firenze)
3. Clicca "Verifica posizione"
4. Nel simulatore: Features > Location > Custom Location
5. Inserisci le coordinate del luogo (es. 43.7696, 11.2558)
6. Gratta la card per sbloccare il badge

### Su dispositivo fisico

1. Recati fisicamente vicino a uno dei luoghi
2. L'app verificherà la tua posizione reale
3. Se sei entro la soglia (default 200m), potrai grattare

## Next Steps (Post-MVP)

### Cloud Sync
- [ ] Integrazione CloudKit per sync tra dispositivi
- [ ] Backup automatico dei progressi
- [ ] Condivisione badge sui social

### Gamification
- [ ] Livelli utente (Turista, Esploratore, Viaggiatore, Nomade)
- [ ] Achievement speciali (tutte le città, tutti i borghi, ecc.)
- [ ] Streak per visite consecutive
- [ ] Leaderboard tra amici

### Notifiche
- [ ] Notifica quando sei vicino a un luogo non visitato
- [ ] Reminder per completare una regione
- [ ] Notifiche per nuovi luoghi aggiunti

### Contenuti
- [ ] Foto dei luoghi
- [ ] Audio guide
- [ ] Storie locali
- [ ] Recensioni e consigli della community
- [ ] Integrazione con ristoranti/hotel locali

### UI/UX
- [ ] Onboarding animato
- [ ] Tema scuro/chiaro
- [ ] Widget iOS per progressi
- [ ] Apple Watch companion app
- [ ] Localizzazione multilingua

### Tecniche
- [ ] Geofencing reale con notifiche background
- [ ] AR per visualizzare badge nel mondo reale
- [ ] Offline mode completo
- [ ] Analytics e crash reporting

## Privacy

L'app:
- Richiede la posizione solo "When In Use"
- Non salva la posizione dell'utente
- Memorizza solo l'ID dei luoghi visitati localmente
- Non condivide dati con terze parti

## Licenza

MIT License - Usa liberamente per scopi personali e commerciali.

---

Creato con SwiftUI e tanto amore per l'Italia.
