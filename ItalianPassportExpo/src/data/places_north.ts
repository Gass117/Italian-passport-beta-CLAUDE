import { Place } from '../types';

export const PLACES_NORTH: Place[] = [
    // LOMBARDIA (10)
    {
        id: "milano", regionId: "lombardia", name: "Milano", type: "city", province: "MI", latitude: 45.4642, longitude: 9.1900,
        shortDescription: "Capitale della moda e del design, frenetica e innovativa, ma con un cuore antico tra il Duomo e i Navigli.",
        docTips: ["Sali sulle terrazze del Duomo", "Fai aperitivo sui Navigli", "Ammira l'Ultima Cena", "Visita la Galleria Vittorio Emanuele II", "Mangia cotoletta e risotto"],
        badge: { title: "Meneghino", imageName: "tram.fill", description: "Milano l'è un gran Milan!" }
    },
    {
        id: "como", regionId: "lombardia", name: "Como", type: "city", province: "CO", latitude: 45.8081, longitude: 9.0852,
        shortDescription: "Adagiata sul lago omonimo, famosa per le ville signorili, la funicolare per Brunate e l'eleganza senza tempo.",
        docTips: ["Prendi la funicolare per Brunate", "Passeggia fino a Villa Olmo", "Fai un giro in battello sul lago", "Visita il Duomo di Como", "Mangia i misoltini del lago"],
        badge: { title: "Laghee", imageName: "sailboat.fill", description: "Eleganza sul Lario!" }
    },
    {
        id: "bergamo", regionId: "lombardia", name: "Bergamo", type: "city", province: "BG", latitude: 45.6983, longitude: 9.6773,
        shortDescription: "Divisa tra Città Bassa e l'antica Città Alta, cinta da mura venete Patrimonio UNESCO, patria della stracciatella.",
        docTips: ["Sali in Città Alta con la funicolare", "Passeggia sulle Mura Venete", "Mangia i casoncelli", "Gusta il vero gelato alla stracciatella", "Visita Piazza Vecchia"],
        badge: { title: "Orobico", imageName: "building.columns.fill", description: "Due città in una!" }
    },
    {
        id: "brescia", regionId: "lombardia", name: "Brescia", type: "city", province: "BS", latitude: 45.5416, longitude: 10.2118,
        shortDescription: "La Leonessa d'Italia, custode di eccezionali resti romani (Brixia) e complessi monastici longobardi (Santa Giulia).",
        docTips: ["Visita il Parco Archeologico Romano", "Esplora il Museo di Santa Giulia", "Sali al Castello sul Colle Cidneo", "Bevi un pirlo in Piazza della Loggia", "Ammira il Duomo Vecchio e Nuovo"],
        badge: { title: "Leonessa d'Italia", imageName: "pawprint.fill", description: "Forte e fiera!" }
    },
    {
        id: "mantova", regionId: "lombardia", name: "Mantova", type: "city", province: "MN", latitude: 45.1564, longitude: 10.7914,
        shortDescription: "La città dei Gonzaga, circondata dai laghi formati dal fiume Mincio, un gioiello del Rinascimento italiano.",
        docTips: ["Visita Palazzo Ducale", "Ammira la Camera degli Sposi", "Passeggia a Palazzo Te", "Assaggia i tortelli di zucca", "Mangia la torta sbrisolona"],
        badge: { title: "Corte dei Gonzaga", imageName: "crown.fill", description: "Magia sul Mincio!" }
    },
    {
        id: "cremona", regionId: "lombardia", name: "Cremona", type: "city", province: "CR", latitude: 45.1332, longitude: 10.0251,
        shortDescription: "Capitale mondiale della liuteria, patria di Stradivari e famosa per il Torrazzo e la mostarda.",
        docTips: ["Sali in cima al Torrazzo", "Visita il Museo del Violino", "Ascolta un'audizione di Stradivari", "Mangia il torrone", "Assaggia i marubini in brodo"],
        badge: { title: "Maestro Liutaio", imageName: "guitars.fill", description: "Città della musica!" }
    },
    {
        id: "bellagio", regionId: "lombardia", name: "Bellagio", type: "borgo", province: "CO", latitude: 45.9870, longitude: 9.2612,
        shortDescription: "La 'Perla del Lago di Como', situata esattamente dove il lago si biforca, regala scorci incantevoli e ville da sogno.",
        docTips: ["Punta Spartivento per ammirare i due rami", "Visita i giardini di Villa Melzi", "Esplora le viuzze a gradoni", "Prendi un caffè in riva al lago", "Fai shopping nelle botteghe storiche"],
        badge: { title: "Perla del Lario", imageName: "drop.fill", description: "Dove il lago si divide!" }
    },
    {
        id: "sirmione", regionId: "lombardia", name: "Sirmione", type: "borgo", province: "BS", latitude: 45.4921, longitude: 10.6053,
        shortDescription: "Perla del Lago di Garda, amata da Catullo, famosa per il Castello Scaligero e le acque termali rigeneranti.",
        docTips: ["Esplora il Castello Scaligero", "Visita le Grotte di Catullo", "Rilassati alle terme", "Passeggia lungo la costa", "Prendi un gelato gigante"],
        badge: { title: "Poeta del Garda", imageName: "book.fill", description: "Terme e poesia!" }
    },
    {
        id: "pavia", regionId: "lombardia", name: "Pavia", type: "city", province: "PV", latitude: 45.1845, longitude: 9.1582,
        shortDescription: "Città delle 100 torri e un'antica università. Poco distante sorge la magnifica Certosa di Pavia.",
        docTips: ["Visita la Certosa di Pavia", "Attraversa il Ponte Coperto", "Ammira San Michele Maggiore", "Cammina nei cortili dell'Università", "Passeggia in Piazza della Vittoria"],
        badge: { title: "Cento Torri", imageName: "building.2.fill", description: "Saggezza e mattoni rossi!" }
    },
    {
        id: "monza", regionId: "lombardia", name: "Monza", type: "city", province: "MB", latitude: 45.5845, longitude: 9.2744,
        shortDescription: "Conosciuta per il Gran Premio di F1, racchiude la Villa Reale asburgica e la Corona Ferrea nel suo bel Duomo.",
        docTips: ["Ammira la Corona Ferrea nel Duomo", "Passeggia nel Parco di Monza", "Visita la Villa Reale", "Vedi l'Autodromo Nazionale", "Assaggia la torta paesana"],
        badge: { title: "Regina Longobarda", imageName: "crown.fill", description: "Velocità e storia!" }
    },

    // VALLE D'AOSTA (7)
    {
        id: "aosta", regionId: "valle_aosta", name: "Aosta", type: "city", province: "AO", latitude: 45.7373, longitude: 7.3201,
        shortDescription: "La Roma delle Alpi, circondata dalle vette più alte d'Europa, ricca di storia romana e castelli fiabeschi.",
        docTips: ["Ammira l'Arco di Augusto", "Visita il Teatro Romano", "Mangia la fonduta valdostana", "Sali a Pila in telecabina", "Compra una Fontina DOP"],
        badge: { title: "Scalatore Romano", imageName: "mountain.2.fill", description: "Vette storiche!" }
    },
    {
        id: "courmayeur", regionId: "valle_aosta", name: "Courmayeur", type: "borgo", province: "AO", latitude: 45.7891, longitude: 6.9691,
        shortDescription: "Elegante località turistica ai piedi del Monte Bianco, paradiso dello sci e dell'alpinismo.",
        docTips: ["Prendi la funivia Skyway Monte Bianco", "Passeggia in Via Roma", "Ammira il Dente del Gigante", "Mangia la polenta concia", "Goditi le terme di Pré-Saint-Didier (vicino)"],
        badge: { title: "Tetto d'Europa", imageName: "snowflake", description: "A un passo dal cielo!" }
    },
    {
        id: "cervinia", regionId: "valle_aosta", name: "Cervinia", type: "landmark", province: "AO", latitude: 45.9348, longitude: 7.6253,
        shortDescription: "Breuil-Cervinia offre viste mozzafiato sul maestoso Monte Cervino, la vetta più iconica delle Alpi.",
        docTips: ["Scia ai piedi del Cervino", "Visita il Lago Blu", "Ascesa al Plateau Rosà", "Ammira il Cervino al tramonto", "Mangia il lardo d'Arnad"],
        badge: { title: "Pioniere della Neve", imageName: "mountain.2.circle.fill", description: "Tra i ghiacciai!" }
    },
    {
        id: "cogne", regionId: "valle_aosta", name: "Cogne", type: "borgo", province: "AO", latitude: 45.6083, longitude: 7.3562,
        shortDescription: "Porta principale del Parco Nazionale del Gran Paradiso, rinomata per le Cascate di Lillaz e il Pizzo al Tombolo.",
        docTips: ["Esplora il Parco del Gran Paradiso", "Ammira le Cascate di Lillaz", "Compra il 'pizzo di Cogne'", "Assaggia la Seupetta di Cogne", "Fai sci di fondo nei Prati di Sant'Orso"],
        badge: { title: "Paradiso Naturale", imageName: "leaf.fill", description: "Nel cuore della natura!" }
    },
    {
        id: "la_thuile", regionId: "valle_aosta", name: "La Thuile", type: "borgo", province: "AO", latitude: 45.7144, longitude: 6.9478,
        shortDescription: "Vasta area sciistica di confine, natura incontaminata e le spettacolari Cascate del Rutor.",
        docTips: ["Trekking alle Cascate del Rutor", "Visita il Passo del Piccolo San Bernardo", "Scia al confine con la Francia", "Mangia i baciocco di La Thuile", "Esplora i boschi di conifere"],
        badge: { title: "Confinario", imageName: "map.fill", description: "A cavallo delle Alpi!" }
    },
    {
        id: "gressoney", regionId: "valle_aosta", name: "Gressoney", type: "borgo", province: "AO", latitude: 45.7825, longitude: 7.8256,
        shortDescription: "Nella valle del Monte Rosa, borgo di tradizioni Walser con il fiabesco Castel Savoia della Regina Margherita.",
        docTips: ["Visita il Castel Savoia", "Ammira i ghiacciai del Monte Rosa", "Scopri la cultura Walser", "Passeggia nel borgo Saint-Jean", "Assaggia la Toma di Gressoney"],
        badge: { title: "Cultura Walser", imageName: "house.fill", description: "Tradizioni ad alta quota!" }
    },
    {
        id: "saint_vincent", regionId: "valle_aosta", name: "Saint-Vincent", type: "borgo", province: "AO", latitude: 45.7483, longitude: 7.6432,
        shortDescription: "La Riviera delle Alpi, amata per il suo clima dolce, le rinomate terme e lo storico Casinò.",
        docTips: ["Tenta la fortuna al Casinò de la Vallée", "Rilassati alle Terme", "Visita la Chiesa parrocchiale romanza", "Spingiti fino al Castello di Ussel", "Gusta i tegole, biscotti locali"],
        badge: { title: "Riviera Alpina", imageName: "drop.fill", description: "Benessere in montagna!" }
    },

    // PIEMONTE (8)
    {
        id: "torino", regionId: "piemonte", name: "Torino", type: "city", province: "TO", latitude: 45.0703, longitude: 7.6869,
        shortDescription: "L'elegante prima capitale d'Italia, tra portici infiniti, cioccolato gianduia, il Museo Egizio e la Mole Antonelliana.",
        docTips: ["Sali sulla Mole Antonelliana", "Visita il Museo Egizio", "Bevi un Bicerin storico", "Passeggia al Parco del Valentino", "Mangia un gianduiotto"],
        badge: { title: "Sabaudo", imageName: "crown.fill", description: "Eleganza reale!" }
    },
    {
        id: "alba", regionId: "piemonte", name: "Alba", type: "city", province: "CN", latitude: 44.6987, longitude: 8.0353,
        shortDescription: "Capitale delle Langhe, patria del Tartufo Bianco e della Nutella, immersa in un mare di colline vitate.",
        docTips: ["Senti il profumo alla Fiera del Tartufo", "Mangia i tajarin al tartufo bianco", "Ammira le cento torri del centro", "Bevi un bicchiere di Barolo", "Scopri le origini della Ferrero"],
        badge: { title: "Re del Tartufo", imageName: "leaf.fill", description: "Un profumo inconfondibile!" }
    },
    {
        id: "asti", regionId: "piemonte", name: "Asti", type: "city", province: "AT", latitude: 44.9008, longitude: 8.2069,
        shortDescription: "Città dai gloriosi fasti medievali, famosa per il Palio più antico d'Italia e lo Spumante dolce.",
        docTips: ["Beviti un calice di Asti Spumante o Moscato", "Assisti al Palio di Asti", "Esplora le Cattedrale di Santa Maria Assunta", "Mangia la bagna cauda", "Visita la Torre Troyana"],
        badge: { title: "Bollina Docg", imageName: "wineglass.fill", description: "Brindisi astigiano!" }
    },
    {
        id: "stresa", regionId: "piemonte", name: "Stresa", type: "city", province: "VB", latitude: 45.8824, longitude: 8.5393,
        shortDescription: "Regina del Lago Maggiore, celebre per il lussuoso lungolago e l'incredibile vista sulle Isole Borromee.",
        docTips: ["Prendi il traghetto per l'Isola Bella", "Esplora i giardini dell'Isola Madre", "Mangia le Margheritine di Stresa", "Sali sul Mottarone", "Ammira il tramonto dall'Isola dei Pescatori"],
        badge: { title: "Isolano Borromeo", imageName: "leaf.circle.fill", description: "Paradiso lacustre!" }
    },
    {
        id: "novara", regionId: "piemonte", name: "Novara", type: "city", province: "NO", latitude: 45.4469, longitude: 8.6186,
        shortDescription: "Città incastonata tra Piemonte e Lombardia, dominata dall'imponente Cupola neoclassica di San Gaudenzio.",
        docTips: ["Sali sulla Cupola dell'Antonelli", "Mangia i biscotti Camporelli", "Mangia la Paniscia (risotto ricco)", "Visita il Broletto", "Passeggia per Piazza delle Erbe"],
        badge: { title: "Cupola Sovrana", imageName: "building.columns.fill", description: "Architetto eccelso!" }
    },
    {
        id: "barolo", regionId: "piemonte", name: "Barolo", type: "borgo", province: "CN", latitude: 44.6111, longitude: 7.9427,
        shortDescription: "Il cuore delle Langhe che dà il nome al 'Re dei Vini', circondato da vigneti pettinati e dominato da un castello.",
        docTips: ["Visita il WiMu (Museo del Vino)", "Degusta il Barolo in cantina", "Mangia il brasato al Barolo", "Ammira il panorama dal Castello Falletti", "Scopri l'enoteca regionale"],
        badge: { title: "Sommelier delle Langhe", imageName: "drop.fill", description: "Il Re dei Vini!" }
    },
    {
        id: "ivrea", regionId: "piemonte", name: "Ivrea", type: "city", province: "TO", latitude: 45.4678, longitude: 7.8753,
        shortDescription: "Sede storica di Olivetti e città UNESCO per il design industriale, celebre in tutto il mondo per la Battaglia delle Arance.",
        docTips: ["Partecipa alla Battaglia delle Arance a Carnevale", "Visita il museo MAAM (Olivetti)", "Ammira il Castello dalle rosse torri", "Acquista la Torta Novecento", "Passeggia lungo la Dora Baltea"],
        badge: { title: "Aranciere", imageName: "circle.circle.fill", description: "Battaglia agrumata!" }
    },
    {
        id: "susa", regionId: "piemonte", name: "Susa", type: "city", province: "TO", latitude: 45.1387, longitude: 7.0543,
        shortDescription: "Antica città all'imbocco della Val di Susa, con testimonianze romane come l'Arco di Augusto e un fascino alpino.",
        docTips: ["Passa sotto l'Arco di Augusto", "Visita l'Anfiteatro Romano", "Ammira la Cattedrale di San Giusto", "Assaggia i canestrelli di Susa", "Esplora i resti dell'Acquedotto"],
        badge: { title: "Sentinella delle Alpi", imageName: "shield.fill", description: "Valico di storia!" }
    },

    // VENETO (10)
    {
        id: "venezia", regionId: "veneto", name: "Venezia", type: "city", province: "VE", latitude: 45.4408, longitude: 12.3155,
        shortDescription: "La Serenissima, città unica al mondo costruita sull'acqua, un labirinto di calli, canali e ponti romantici.",
        docTips: ["Giro in gondola (obbligatorio!)", "Perditi tra le calli", "Visita Piazza San Marco", "Mangia cicchetti nei bacari", "Prendi il vaporetto sul Canal Grande"],
        badge: { title: "Doge", imageName: "mask.fill", description: "Serenissima bellezza!" }
    },
    {
        id: "verona", regionId: "veneto", name: "Verona", type: "city", province: "VR", latitude: 45.4384, longitude: 10.9916,
        shortDescription: "La città dell'Amore, celebre per Romeo e Giulietta, ma dominata dalla maestosa Arena romana.",
        docTips: ["Assisti a un'opera in Arena", "Tocca il seno della statua di Giulietta", "Passeggia in Piazza delle Erbe", "Attraversa il Ponte di Castelvecchio", "Bevi uno Spritz al tramonto"],
        badge: { title: "Innamorato", imageName: "heart.fill", description: "Romeo o Giulietta?" }
    },
    {
        id: "padova", regionId: "veneto", name: "Padova", type: "city", province: "PD", latitude: 45.4064, longitude: 11.8768,
        shortDescription: "La città del Santo (S. Antonio), dello storico Caffè Pedrocchi, di Prato della Valle e degli affreschi di Giotto.",
        docTips: ["Ammira gli affreschi di Giotto nella Cappella degli Scrovegni", "Passeggia in Prato della Valle", "Visita la Basilica di Sant'Antonio", "Prendi un caffè al Caffè Pedrocchi", "Esplora il palazzo del Bo (Università)"],
        badge: { title: "Santo Giottesco", imageName: "paintpalette.fill", description: "Tra santi ed artisti!" }
    },
    {
        id: "vicenza", regionId: "veneto", name: "Vicenza", type: "city", province: "VI", latitude: 45.5455, longitude: 11.5354,
        shortDescription: "Città simbolo del genio di Andrea Palladio, dove i palazzi rinascimentali si susseguono perfetti, patrimonio UNESCO.",
        docTips: ["Ammira la Basilica Palladiana in Piazza dei Signori", "Visita il Teatro Olimpico", "Raggiungi La Rotonda (Villa Almerico Capra)", "Mangia baccalà alla vicentina", "Passeggia lungo Corso Palladio"],
        badge: { title: "Architetto Palladiano", imageName: "building.columns.fill", description: "La perfezione classica!" }
    },
    {
        id: "treviso", regionId: "veneto", name: "Treviso", type: "city", province: "TV", latitude: 45.6669, longitude: 12.2430,
        shortDescription: "Una città d'acque, silenziosa e raffinata, dove è nato il Tiramisù tra canali sereni e ruote di mulino.",
        docTips: ["Assaggia l'autentico Tiramisù dove è nato", "Passeggia sul canale dei Buranelli", "Bevi un'ombra in Pescheria", "Ammira Piazza dei Signori", "Guarda i mulini ad acqua in centro"],
        badge: { title: "Goloso di Tiramisù", imageName: "cup.and.saucer.fill", description: "Dolce e fluviale!" }
    },
    {
        id: "cortina", regionId: "veneto", name: "Cortina d'Ampezzo", type: "city", province: "BL", latitude: 46.5405, longitude: 12.1357,
        shortDescription: "La 'Regina delle Dolomiti', località sciistica tra le più prestigiose al mondo e vetrina alpina chic.",
        docTips: ["Scia alle Tofane", "Vasca in Corso Italia", "Ammira le Cinque Torri", "Mangia i casunziei all'ampezzana", "Prendi la funivia del Faloria"],
        badge: { title: "Regina delle nevi", imageName: "snowflake", description: "Classe ad alta quota!" }
    },
    {
        id: "chioggia", regionId: "veneto", name: "Chioggia", type: "city", province: "VE", latitude: 45.2202, longitude: 12.2783,
        shortDescription: "La 'Piccola Venezia', con i suoi canali, i pescherecci colorati e i sapori dell'Adriatico.",
        docTips: ["Passeggia in Corso del Popolo", "Visita il mercato del pesce", "Ammira la Torre dell'Orologio di Sant'Andrea", "Mangia un sarde in saor", "Prendi un bragozzo (barca locale)"],
        badge: { title: "Pescatore del Canale", imageName: "paperplane.fill", description: "Colori della laguna!" }
    },
    {
        id: "bassano", regionId: "veneto", name: "Bassano del Grappa", type: "city", province: "VI", latitude: 45.7656, longitude: 11.7317,
        shortDescription: "Città ai piedi del Monte Grappa, famosa per il suggestivo Ponte Vecchio di legno (degli Alpini) e la grappa.",
        docTips: ["Attraversa il Ponte degli Alpini", "Bevi la grappa Poli o Nardini", "Fotografa il fiume Brenta dal ponte", "Visita il Museo degli Alpini", "Assaggia gli asparagi bianchi (in stagione)"],
        badge: { title: "Alpino Distillato", imageName: "wineglass.fill", description: "Ponte e tradizioni!" }
    },
    {
        id: "murano", regionId: "veneto", name: "Murano", type: "borgo", province: "VE", latitude: 45.4566, longitude: 12.3551,
        shortDescription: "L'isola della laguna veneta famosa in tutto il mondo per la millenaria tradizione della soffiatura del vetro.",
        docTips: ["Assisti a una dimostrazione di vetro soffiato", "Visita il Museo del Vetro", "Compra un gioiello in vetro originale", "Ammira la Basilica dei SS. Maria e Donato", "Gira lungo i canali tranquilli"],
        badge: { title: "Maestro Vetraio", imageName: "flame.fill", description: "Fuoco e arte!" }
    },
    {
        id: "burano", regionId: "veneto", name: "Burano", type: "borgo", province: "VE", latitude: 45.4854, longitude: 12.4167,
        shortDescription: "Isola lagunare celebre per il suo centrino in merletto intricato e per le case tinteggiate a tinte ultra squillanti.",
        docTips: ["Fotografa le case coloratissime", "Compra un merletto di Burano", "Trova la casa di 'Bepi Suà'", "Assaggia i biscotti 'bussolai'", "Ammira il campanile storto di San Martino"],
        badge: { title: "Merlettaio Colorato", imageName: "paintbrush.fill", description: "Tavolozza galleggiante!" }
    },

    // FRIULI VENEZIA GIULIA (7)
    {
        id: "trieste", regionId: "friuli", name: "Trieste", type: "city", province: "TS", latitude: 45.6495, longitude: 13.7768,
        shortDescription: "Città di frontiera, letteraria e cosmopolita, con la piazza sul mare più grande d'Europa e i suoi caffè storici.",
        docTips: ["Prendi un caffè in Piazza Unità", "Visita il Castello di Miramare", "Sali sul Tram di Opicina", "Mangia in un buffet tipico", "Passeggia sul Molo Audace"],
        badge: { title: "Caffè Letterario", imageName: "cup.and.saucer.fill", description: "Profumo di cultura e mare!" }
    },
    {
        id: "udine", regionId: "friuli", name: "Udine", type: "city", province: "UD", latitude: 46.0619, longitude: 13.2378,
        shortDescription: "Il salotto buono del Friuli, dall'architettura veneziana arricchita dagli splendidi affreschi del Tiepolo.",
        docTips: ["Bevi un 'tajut' (bicchiere di vino) in osteria", "Ammira Piazza della Libertà (stile veneziano)", "Visita le Gallerie del Tiepolo", "Sali al Castello di Udine", "Mangia frico e polenta"],
        badge: { title: "Cittadino Tiepolesco", imageName: "paintpalette.fill", description: "Aperitivo in piazza!" }
    },
    {
        id: "pordenone", regionId: "friuli", name: "Pordenone", type: "city", province: "PN", latitude: 45.9555, longitude: 12.6617,
        shortDescription: "La città dei portici affrescati e del festival letterario 'Pordenonelegge', bagnata dal fiume Noncello.",
        docTips: ["Passeggia sotto i portici di Corso Vittorio Emanuele", "Ammira i palazzi affrescati", "Passeggia sul parco del Noncello", "Visita il Duomo di San Marco", "Assaggia la pitina (insaccato locale)"],
        badge: { title: "Lettore del Noncello", imageName: "book.fill", description: "Cultura e portici!" }
    },
    {
        id: "gorizia", regionId: "friuli", name: "Gorizia", type: "city", province: "GO", latitude: 45.9402, longitude: 13.6202,
        shortDescription: "Divisa a lungo dal Novecento, oggi respira senza confini insieme alla sua gemella slovena Nova Gorica.",
        docTips: ["Metti un piede in Italia e uno in Slovenia a Piazza della Transalpina", "Visita il Castello di Gorizia", "Assaggia la putizza (dolce)", "Scopri il Museo della Grande Guerra", "Passeggia nel Borgo Castello"],
        badge: { title: "Cittadino d'Europa", imageName: "globe.europe.africa.fill", description: "Dove i muri cadono!" }
    },
    {
        id: "aquileia", regionId: "friuli", name: "Aquileia", type: "borgo", province: "UD", latitude: 45.7671, longitude: 13.3662,
        shortDescription: "Sito UNESCO e antichissima capitale romana, conserva uno dei mosaici paleocristiani più grandi e intatti d'Occidente.",
        docTips: ["Studiati l'immenso mosaico della Basilica Patriarcale", "Cammina tra gli scavi del Foro Romano", "Esplora il Porto Fluviale Romano", "Visita il Museo Archeologico", "Bevi Refosco dal Peduncolo Rosso"],
        badge: { title: "Patriarca", imageName: "grid", description: "Un puzzle millenario!" }
    },
    {
        id: "cividale", regionId: "friuli", name: "Cividale del Friuli", type: "borgo", province: "UD", latitude: 46.0949, longitude: 13.4334,
        shortDescription: "Roccaforte longobarda per eccellenza, fondata da Giulio Cesare, dominata dal leggendario Ponte del Diavolo.",
        docTips: ["Attraversa il Ponte del Diavolo", "Visita il Tempietto Longobardo", "Ammira l'Altare di Ratchis", "Mangia gli gnocchi di susine", "Scatta foto sul fiume Natisone"],
        badge: { title: "Duca Longobardo", imageName: "shield.fill", description: "Patti con il diavolo!" }
    },
    {
        id: "lignano", regionId: "friuli", name: "Lignano Sabbiadoro", type: "city", province: "UD", latitude: 45.6881, longitude: 13.1378,
        shortDescription: "La meta balneare dei friulani, famosa per le spiagge ampie e dorate, la forma a penisola e l'architettura a chiocciola di Pineta.",
        docTips: ["Goditi la spiaggia d'oro", "Passeggia sul lungomare", "Divertiti a Terrazza a Mare", "Noleggia un pedalò", "Assaggia il pesce nostrano"],
        badge: { title: "Spirito da Spiaggia", imageName: "sun.max.fill", description: "Estate in Friuli!" }
    },

    // TRENTINO ALTO ADIGE (8)
    {
        id: "trento", regionId: "trentino", name: "Trento", type: "city", province: "TN", latitude: 46.0719, longitude: 11.1150,
        shortDescription: "Città del Concilio, incastonata tra le Dolomiti, dove la cultura italiana incontra quella mitteleuropea.",
        docTips: ["Visita il Castello del Buonconsiglio", "Ammira il Duomo", "Esplora il MUSE", "Bevi Trento DOC", "Mangia canederli"],
        badge: { title: "Alpino", imageName: "snowflake", description: "Aria pura e storia!" }
    },
    {
        id: "bolzano", regionId: "trentino", name: "Bolzano", type: "city", province: "BZ", latitude: 46.4983, longitude: 11.3548,
        shortDescription: "La Capitale dell'Alto Adige / Südtirol, un perfetto ponte tra l'Italia e il mondo germanico, tra Ötzi e mercatini.",
        docTips: ["Incontra la mummia Ötzi al Museo Archeologico", "Fai shopping sotto i Portici", "Ammira il Duomo di Bolzano", "Prendi la funivia del Renon", "Assaggia speck e Schüttelbrot"],
        badge: { title: "Uomo del Ghiaccio", imageName: "snowflake.circle.fill", description: "Cultura senza confini!" }
    },
    {
        id: "merano", regionId: "trentino", name: "Merano", type: "city", province: "BZ", latitude: 46.6713, longitude: 11.1607,
        shortDescription: "Elegante località termale dal fascino asburgico, amatissima dall'imperatrice Sissi, immersa in un clima mite.",
        docTips: ["Rilassati alle famose Terme di Merano", "Passeggia lungo la camminata Tappeiner", "Esplora i Giardini di Castel Trauttmansdorff", "Mangia lo Strudel di mele", "Passeggia sotto i portici medievali"],
        badge: { title: "Ospite di Sissi", imageName: "drop.fill", description: "Benessere imperiale!" }
    },
    {
        id: "riva_garda", regionId: "trentino", name: "Riva del Garda", type: "borgo", province: "TN", latitude: 45.8893, longitude: 10.8433,
        shortDescription: "Il punto più a nord del Lago di Garda, dove le montagne si tuffano a picco nell'acqua, paradiso del windsurf.",
        docTips: ["Sali sulla Torre Apponale", "Visita il MAG (Museo Alto Garda) al Castello", "Fai windsurf o vela nel lago", "Passeggia sulla via Ponale antica", "Assaggia la carne salada"],
        badge: { title: "Velista del Lago", imageName: "wind", description: "Vento in poppa col Ponale!" }
    },
    {
        id: "madonna_campiglio", regionId: "trentino", name: "Madonna di Campiglio", type: "landmark", province: "TN", latitude: 46.2307, longitude: 10.8267,
        shortDescription: "La regina delle nevi trentine nel parco dell'Adamello Brenta, vetrina internazionale dello sci e dell'alpinismo.",
        docTips: ["Scia pista 3 Tre, coppa del mondo", "Visita il Lago Ritorto", "Fotografa le Dolomiti di Brenta al tramonto (Enrosadira)", "Gusta uno strudel caldo in baita", "Fai trekking nella Val Genova"],
        badge: { title: "Sciatore VIP", imageName: "star.fill", description: "Tra le cime maestose!" }
    },
    {
        id: "rovereto", regionId: "trentino", name: "Rovereto", type: "city", province: "TN", latitude: 45.8906, longitude: 11.0427,
        shortDescription: "Città della Quercia e della Pace, ospita il futurista museo MART e l'imponente Maria Dolens (Campana dei Caduti).",
        docTips: ["Ascolta i cento rintocchi della Campana della pace al tramonto", "Visita il museo MART di arte contemporanea", "Passeggia nel borgo medievale", "Visita il Museo della Guerra nel Castello", "Bevi caffè nella torrefazione Bontadi"],
        badge: { title: "Rintocco di Pace", imageName: "bell.fill", description: "Memoria e futuro!" }
    },
    {
        id: "canazei", regionId: "trentino", name: "Canazei", type: "borgo", province: "TN", latitude: 46.4658, longitude: 11.7709,
        shortDescription: "Il gioiello della Val di Fassa, circondata dai passi Sella, Pordoi e Fedaia, ai piedi del massiccio della Marmolada.",
        docTips: ["Perditi nel Sellaronda con gli sci", "Sali al Sass Pordoi, la Terrazza delle Dolomiti", "Respira l'aria pura della Val di Fassa", "Mangia speck e formaggio Puzzone", "Ammira il ghiacciaio della Marmolada"],
        badge: { title: "Re del Sellaronda", imageName: "figure.skiing.downhill", description: "Quattro passi non bastano!" }
    },
    {
        id: "bressanone", regionId: "trentino", name: "Bressanone (Brixen)", type: "city", province: "BZ", latitude: 46.7119, longitude: 11.6521,
        shortDescription: "La città più antica del Tirolo, sede vescovile millenaria con lo splendido Duomo e i chiostri affrescati.",
        docTips: ["Ammira gli affreschi del Chiostro del Duomo", "Passeggia nella via Stufles", "Bevi il vino bianco della Valle Isarco", "Visita il Palazzo Vescovile", "Vai alla Plose per sciare o slittare"],
        badge: { title: "Vescovo Alpino", imageName: "paintbrush.fill", description: "Colori antichi!" }
    },
    // --- LIGURIA ---
    {
        "id": "genova",
        "regionId": "liguria",
        "name": "Genova",
        "type": "city",
        "province": "GE",
        "latitude": 44.4056,
        "longitude": 8.9463,
        "shortDescription": "La Superba, labirinto di caruggi che scendono al porto antico, città di contrasti, pesto e cantautori.",
        "docTips": ["Perditi nei caruggi del centro storico", "Mangia la focaccia intinta nel cappuccino", "Visita il celebre Acquario al Porto Antico", "Sali alla Spianata Castelletto al tramonto", "Assaggia il vero pesto genovese artigianale"],
        "badge": { "title": "Lanterna", "imageName": "lighthouse.fill", "description": "Superba conquista!" }
    },
    {
        "id": "portofino",
        "regionId": "liguria",
        "name": "Portofino",
        "type": "borgo",
        "province": "GE",
        "latitude": 44.303,
        "longitude": 9.209,
        "shortDescription": "Il borgo marinaro più iconico al mondo, rifugio elegante incastonato in una baia lussureggiante.",
        "docTips": ["Passeggia nell'esclusiva piazzetta", "Sali al Castello Brown per un panorama maestoso", "Prendi l'aperitivo guardando i mega-yacht", "Nuota a Paraggi nelle acque smeraldine", "Arriva in battello da Santa Margherita"],
        "badge": { "title": "VIP del Golfo", "imageName": "yacht.fill", "description": "Dolce vita in Riviera!" }
    },
    {
        "id": "vernazza",
        "regionId": "liguria",
        "name": "Vernazza (Cinque Terre)",
        "type": "borgo",
        "province": "SP",
        "latitude": 44.135,
        "longitude": 9.683,
        "shortDescription": "Il più pittoresco borgo delle Cinque Terre, con la sua piccola piazza sul mare e le case a tinte pastello.",
        "docTips": ["Fai il bagno nel porticciolo tra i gozzi colorati", "Sali alle rovine del Castello Doria", "Percorri il mistico Sentiero Azzurro", "Bevi un calice di Sciacchetrà in piazzetta", "Ammira i terrazzamenti eroici a picco sul mare"],
        "badge": { "title": "Eroe Terrazzato", "imageName": "house.lodge.fill", "description": "Colori di costa!" }
    },
    {
        "id": "sanremo",
        "regionId": "liguria",
        "name": "Sanremo",
        "type": "city",
        "province": "IM",
        "latitude": 43.816,
        "longitude": 7.776,
        "shortDescription": "La Città dei Fiori e del Festival della Canzone. Vanta un clima mite, palme e ville in stile Liberty.",
        "docTips": ["Scatta una foto davanti al Teatro Ariston", "Pedala sulla spettacolare Ciclovia del Ponente", "Ammira l'eleganza del Casinò Municipale", "Esplora La Pigna, cuore medievale arroccato", "Passeggia tra i profumi di Villa Ormond"],
        "badge": { "title": "Canta Autore", "imageName": "music.mic", "description": "Perché Sanremo è Sanremo!" }
    },
    {
        "id": "camogli",
        "regionId": "liguria",
        "name": "Camogli",
        "type": "borgo",
        "province": "GE",
        "latitude": 44.348,
        "longitude": 9.155,
        "shortDescription": "Il borgo dei mille bianchi velieri, celebre per i palazzi stretti e altissimi affacciati sulla spiaggia di sassi.",
        "docTips": ["Mangia la focaccia al formaggio tipica", "Partecipa alla leggendaria Sagra del Pesce", "Ammira il Golfo Paradiso dal muretto", "Visita la suggestiva Basilica di Santa Maria Assunta", "Prendi il battello per la remota Abbazia di San Fruttuoso"],
        "badge": { "title": "Veliero Golfo", "imageName": "sailboat.fill", "description": "Navigatore ligure!" }
    },
    {
        "id": "alassio",
        "regionId": "liguria",
        "name": "Alassio",
        "type": "city",
        "province": "SV",
        "latitude": 44.004,
        "longitude": 8.169,
        "shortDescription": "Città del celebre Muretto, amata per le eleganti spiagge di fine sabbia chiara e i dolcetti al cioccolato.",
        "docTips": ["Trova la lastra del tuo idolo sul Muretto di Alassio", "Assaggia i morbidi Baci di Alassio", "Fai shopping nel Budello parallelo al mare", "Rilassati sui lettini dei Bagni storici", "Percorri la Via Julia Augusta romana"],
        "badge": { "title": "Bacio al Muretto", "imageName": "heart.text.square.fill", "description": "Dolce sole!" }
    },
    {
        "id": "sestri_levante",
        "regionId": "liguria",
        "name": "Sestri Levante",
        "type": "city",
        "province": "GE",
        "latitude": 44.269,
        "longitude": 9.395,
        "shortDescription": "Sottile lingua di terra sospesa tra la Baia delle Favole e la Baia del Silenzio. Scrittori e poeti l'hanno amata.",
        "docTips": ["Nuota al calar del sole nella Baia del Silenzio", "Passeggia sul lungomare della Baia delle Favole", "Perditi nel Caruggio pieno di botteghe storiche", "Esci a fare trekking verso Punta Manara", "Mangia un misto di mare e panissa fritta"],
        "badge": { "title": "Favolista Baia", "imageName": "book.closed.fill", "description": "Incanto tra due mari!" }
    }
];
