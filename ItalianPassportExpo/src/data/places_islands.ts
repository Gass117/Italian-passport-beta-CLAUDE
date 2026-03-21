import { Place } from '../types';

export const PLACES_ISLANDS: Place[] = [
    // SICILIA (10)
    {
        id: "palermo", regionId: "sicilia", name: "Palermo", type: "city", province: "PA", latitude: 38.1157, longitude: 13.3615,
        shortDescription: "Città dai mille volti, araba, normanna, barocca. Un mix esplosivo di mercati storici, street food e arte.",
        docTips: ["Mangia pane e panelle", "Visita la Cappella Palatina", "Esplora lo storico mercato di Ballarò", "Ammira il Teatro Massimo", "Fai colazione con granita e brioche"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Gattopardo", imageName: "leaf.fill", description: "Splendore siciliano!" }
    },
    {
        id: "catania", regionId: "sicilia", name: "Catania", type: "city", province: "CT", latitude: 37.5079, longitude: 15.0830,
        shortDescription: "La città nera di pietra lavica ai piedi dell'Etna, vitale e verace, con il simbolo dell'Elefante in piazza.",
        docTips: ["Mangia a colazione Iris fritta", "Visita la Pescheria al mattino", "Passeggia in Via Etnea", "Ammira 'U Liotru' (l'Elefante)", "Gusta la pasta alla Norma e carne di cavallo"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Catanese Lavico", imageName: "flame.fill", description: "All'ombra dell'Etna!" }
    },
    {
        id: "taormina", regionId: "sicilia", name: "Taormina", type: "borgo", province: "ME", latitude: 37.8525, longitude: 15.2831,
        shortDescription: "Il balcone più chic di Sicilia, arroccata, con un Teatro Greco sospeso tra l'Etna e il mare Ionio.",
        docTips: ["Assisti a uno spettacolo al Teatro Antico", "Passeggia in Corso Umberto", "Ammira l'Isola Bella dal belvedere", "Bevi un caffè al Bam Bar", "Visita la Villa Comunale botanica"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Attore Greco", imageName: "eye.fill", description: "Spettacolo infinito!" }
    },
    {
        id: "siracusa", regionId: "sicilia", name: "Siracusa", type: "city", province: "SR", latitude: 37.0755, longitude: 15.2866,
        shortDescription: "La più grande metropoli dell'antichità poggia sulla magica isola di Ortigia ed ha teatri immensi scavati nel duro calcare.",
        docTips: ["Perditi nell'assolata bianca Ortigia", "Sussurra nell'Orecchio di Dionisio", "Siediti nel colossale Teatro Greco", "Guarda la Fonte Aretusa fiorita di Papiri", "Ammira il superbo Duomo un tempo Tempio d'Atena"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Tiranno di Siracusa", imageName: "ear.fill", description: "Acustica perfetta!" }
    },
    {
        id: "agrigento", regionId: "sicilia", name: "Agrigento", type: "city", province: "AG", latitude: 37.3111, longitude: 13.5765,
        shortDescription: "La città dei Templi. Un parco archeologico greco monumentale, dorato, sterminato e di struggente folgorante bellezza dorica.",
        docTips: ["Cammina maestoso sotto il Tempio della Concordia perfetto", "Ammira le rovine al tramonto dorato bruciato", "Visita la candida panna della Scala dei Turchi vicina", "Gusta minne di Sant'Agata siculi dolci e paste di mandorle", "Cerca tracce Pirandello lo scrittore"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Architetto Dorico", imageName: "building.columns.fill", description: "Templi al sole!" }
    },
    {
        id: "cefalu", regionId: "sicilia", name: "Cefalù", type: "borgo", province: "PA", latitude: 38.0386, longitude: 14.0229,
        shortDescription: "Un borgo di pescatori incastrato a forza sotto un duro masso, l'immensa Rocca, col possente Duomo arabeggiante a due torri.",
        docTips: ["Spaventati entrando nell'oro sfavillante dei Mosaici Bizantini nel superbo Duomo", "Suda ed inerpica dura la Rocca il castello panorama sgozzo", "Mangia fritti di paranza al porto vecchio pittoresco molo muretto", "Visita affascinante lavatoio antico lavandaie sorgente fluente", "Rilassati dorata lingua sabbia marina bagnanti e tramonti"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Pescatore Normanno", imageName: "shield.righthalf.filled", description: "Rocca e sabbia!" }
    },
    {
        id: "noto", regionId: "sicilia", name: "Noto", type: "borgo", province: "SR", latitude: 36.8922, longitude: 15.0704,
        shortDescription: "La capitale indiscussa smagliante fiorita e perfetta dell'inimitabile sfarzoso Barocco Siciliano UNESCO. Pietra dolce bionda.",
        docTips: ["Toccati inebriato il petto innanzi immensa Scalinata Cattedrale zafferano d'oro e tufo e ghirigori fiori pietra", "Assaggia svenendo un Cannolo ricotta pecora Caffè Sicilia", "Passeggia Corso Vittorio Emanuele balconi grotteschi figure mostri telamoni", "Tuffa Oasi Vendicari o calamosche lì distanti caraibici", "Maggio visita festa sfarzosa dell'Infiorata petali sterminati"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Maestro Barocco", imageName: "burst.fill", description: "Pietra di miele!" }
    },
    {
        id: "trapani", regionId: "sicilia", name: "Trapani", type: "city", province: "TP", latitude: 38.0176, longitude: 12.5362,
        shortDescription: "Città dei due mari, battuta dai venti estremi, adorna di storiche bianchissime ed abbacinanti Saline punteggiate dai mulini a vento africani.",
        docTips: ["Ammira abbacinato montagnette piramidi sale Saline Paceco mulini tramonto rosso fuoco!", "Assaggia succulento cuscus di pesce piccante tradizioni arabeggianti", "Imbarcati frettoloso per le vicine limpide caraibiche Isole Egadi Favignana", "Passeggia per mura tramontana castello della colombaia", "Acciuffa la processione straziante antichissima Misteri Venerdì Santo passione pura"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Salinaro Trapanese", imageName: "drop.fill", description: "Vento, mulini e sale!" }
    },
    {
        id: "erice", regionId: "sicilia", name: "Erice", type: "borgo", province: "TP", latitude: 38.0375, longitude: 12.5875,
        shortDescription: "Vetta mistica e cinta mura elime fortificate a strapiombo sulle nubi e mare Trapani, col Castello di Venere e dolci di pastafrolla.",
        docTips: ["Sali mozzafiato Funivia super panoramica o strada tornanti", "Morditi goloso i pasticcini convento Ericini genovesi crema calda e ricotta dolce", "Esplora tra la nebbia fitta il castello di Venere spuntone liscio volo", "Ammira sbalordito in giù verso Trapani le dorate saline e coste Egadi mozzafiato", "Passeggia ciottoli liscissimi pavé e chiese arab-gotico campanili alti"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Sacerdote di Venere", imageName: "heart.circle.fill", description: "Oltre le nubi!" }
    },
    {
        id: "ragusa", regionId: "sicilia", name: "Ragusa", type: "city", province: "RG", latitude: 36.9250, longitude: 14.7306,
        shortDescription: "L'isola nell'isola. L'incantevole scosceso miraggio barocco sospeso di Ragusa Ibla sterminato intrecciato labirintico.",
        docTips: ["Scendi trepidante Scalinata tortuosa infinita Santa Maria delle Scale ammirando Ibla apparizione cupole", "Emozionati dorato immenso Duomo San Giorgio rosone svettante piazze palme", "Mangia i cavatielli ragusani ricchi e le scacce focacce succulente in trattoria", "Sentiti immerso finti delitti commissario Montalbano girati qua ghirigori", "Perditi romantico esotico tranquillo rigoglioso incantato Giardino Ibleo"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Duca di Ibla", imageName: "star.fill", description: "Labirinto d'ora barocca!" }
    },

    // SARDEGNA (10)
    {
        id: "cagliari", regionId: "sardegna", name: "Cagliari", type: "city", province: "CA", latitude: 39.2238, longitude: 9.1217,
        shortDescription: "Città del sole, costruita su sette colli che guardano il mare, tra fenicotteri rosa, torri medievali e spiagge sterminate.",
        docTips: ["Sali altissimo panoramico Bastione umberto Saint Remy calcare chiaro", "Russa beato alla sabbiosa lunghissima profumata spiaggia del Poetto lido cagliaritano infinito", "Ammira affascinato esotici miraggi rossi Fenicotteri a Stagno Molentargius sale", "Visita fiero Quartiere mure possenti Castello roccaforte cattedrale palazzi viceré", "Morditi croccantissimo maialino arrosto porceddu e finisci mielato e caldo dolce frittura Seadas formaggio"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Isolano Cagliaritano", imageName: "water.waves", description: "Sole, torri e mare!" }
    },
    {
        id: "alghero", regionId: "sardegna", name: "Alghero", type: "city", province: "SS", latitude: 40.5579, longitude: 8.3193,
        shortDescription: "La picciona e sarda piccola 'Barceloneta', isola linguistica e corallina racchiusa saldamente in massicce poderose mura ispaniche ocra.",
        docTips: ["Passeggia felicemente alte panoramiche intatte poderose difese Bastioni murature ispaniche dorate sole caldo", "Spaventati calano sottomarino scale infinite Grotta misteriosa buia di Nettuno stalattiti gigantesche", "Richiedi stupiti superbi maestri l'oro rosso algherese i coralli autentici intarsiati", "Mastica vera succulenta paella algherese o fidata succosa e dolce Aragosta alla catalana sarda", "Rilassati soffice bianca fine spiagge argentiera e maria pia pineta rinfrescate"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Principe Corallino", imageName: "rosette", description: "Rosso oro ispanico!" }
    },
    {
        id: "olbia", regionId: "sardegna", name: "Olbia", type: "city", province: "SS", latitude: 40.9228, longitude: 9.4975,
        shortDescription: "Porta d'accesso all'abbacinante, sfavillante lusso Costa Smeralda ma dal cuore rustico ruvido granitico d'un popolo nuragico fiero.",
        docTips: ["Scopri millenari inespugnabili rocca Tumbula Pozzo Sacro Sa Testa e Tomba dei giganti archeologia titanica megalitica!", "Passeggia vitale estiva gremita folta Corso Umberto bar gelaterie allegre", "Sbronzati Vermentino di Gallura unico pregiato gagliardo bianco sardo forte ruvido soleggiato.", "Salta calette insenature segrete turchesi trasparenti smeraldo Tavolara molara golfo azzurrato", "Visita candida liscia maestosa Basilica romanica San Simplicio patrono austera silenziosa."],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Nuragico Fiero", imageName: "circle.circle.fill", description: "Smeraldi e gallure bionde!" }
    },
    {
        id: "bosa", regionId: "sardegna", name: "Bosa", type: "borgo", province: "OR", latitude: 40.2917, longitude: 8.4975,
        shortDescription: "Il borgo variopinto lussureggiante e romantico affacciato calmo sull'unico fiume navigabile, tetti multicolore sormontati dominati dal fiero rude Castello Malaspina oristanese",
        docTips: ["Fotografa sgargianti fitte accalcate allegre Case Colorate in tinta pastello squillante fiume Temo sonnacchioso calmo", "Sali erta faticosa dura salita al Castello Malaspina dominanza valle fiume e mare argentato", "Bevi la raffinata preziosa locale ambrata e vellutata dolcissima Malvasia vino Bosa DOC unico al mondo fragrante", "Gira vecchie rudi storiche concerie cuio pellami abbandonate fiume scheletri e fascino post industriale romantico", "Bagnati Cane Malu piscine naturali strane lisciate scogli calcarei mare aspro selvaggio sardo costa occidentale."],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Pittore Temese", imageName: "paintpalette.fill", description: "Arcobaleno al fiume!" }
    },
    {
        id: "stintino", regionId: "sardegna", name: "Stintino", type: "borgo", province: "SS", latitude: 40.9382, longitude: 8.2255,
        shortDescription: "Una striscia penisola lingua esangue protesa mari incontaminati turchini mozzafiato che gelosamente custodisce la abbagliante La Pelosa, i Caraibi italiani.",
        docTips: ["Abbagliati accecato commosso nuotando cristallina celeste zaffira tiepida paradisiaca piana acqua La Pelosa fondale bassissimo e sabbie eteree", "Sbircia ed fotografa misterioso Asinara isola parco fiero penitenziario carcere lontano orizzonte nebbioso in barca escursione brada selvaggia", "Ammira torretta aragonese fiera sassosa isolotto di guardia golfo asinara", "Mangia i sapidi piccanti forti sfiziosissimi pesci crudi polipi tonni freschi mercatini marinai pescator", "Cammina selvaggia aspro nudo aspro brullo rude Capo Falcone rocce erte ventosa vertiginosa."],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Esploratore Caraibico", imageName: "sun.max.fill", description: "Sabbie rosa e mari blu!" }
    },
    {
        id: "castelsardo", regionId: "sardegna", name: "Castelsardo", type: "borgo", province: "SS", latitude: 40.9145, longitude: 8.7126,
        shortDescription: "Il roccaforte nido d'aquila abbarbicato strapiombo poggio vulcanico aereo, famoso l'intreccio vivente artigianato cestini sardi dorati sparto e palma nana e pesci preda d'aragoste.",
        docTips: ["Sbircia timoroso divertito la sbalorditiva fiabesca ed enorme Roccia dell'Elefante spuntone vulcanico somigliante forma pachiderma! Sulla via prima l'ingresso", "Erpica saluta rudi mure vicolo stretto e cadi al Castello rincantucciato museo d'intrecci paglia cestini rari mondo", "Zittisci prega mistica misteriosa sfarzosa e grottesca Cattedrale sul mare cripte cupe altari neri lignee e la luna mar", "Avvista coste lontanissime e selvagge fino ai picchi d'Asinara scoscesa dal castello fortilizio sardo isolano spietato soleggiato battuto maestrale fiero.", "Gusta furbesca costosa ma regina dolce polposa unica Aragosta Castellanese regale pescato fondali falesia fresca mare"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Intrecciatore", imageName: "basket.fill", description: "Cestini di palma nana!" }
    },
    {
        id: "villasimius", regionId: "sardegna", name: "Villasimius", type: "city", province: "SU", latitude: 39.1415, longitude: 9.5204,
        shortDescription: "Un promontorio paradiso subacqueo sud sardo area marina protetta di calette isolate nascoste profumate ginepri e macchia saggia rocciosa spiagge talcate.",
        docTips: ["Tuffati maschera esplora ricco brulicante favoloso vitale fondale incontaminato turchese Area Marina Protetta Capo Carbonara branchi banchi cernie e barracuda", "Tostati al sole immensa lunga bianca morbida Porto Giunco spiaggia con alle spalle l'oasi fenicotteri rosa stagno sonnecchiante duna spessa", "Passeggia vecchie stradine fiorite e centro storico serate gremite gioielli gelati turisti gaudenti artigianato filigrana sarda fiera", "Erpica torre antica Fortezza Vecchia lidi difesa pirati corsari moreschi cannoni avvistamenti barche nemiche sarde notti orrore passate e storia aspra.", "Naviga gommone oca vela cala pira cala caterina scogli granitici tondi dolci e falesie di granito bianco e tamerici pini marittimi in mare scoglio e sole."],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Sirena dei due Golfi", imageName: "leaf.fill", description: "Azzurri e ginepri in fior!" }
    },
    {
        id: "nuoro", regionId: "sardegna", name: "Nuoro", type: "city", province: "NU", latitude: 40.3201, longitude: 9.3291,
        shortDescription: "L'Atene sarda forte incrollabile cuore barbarcino pastorale, tra rocce, premio nobel Deledda aspro rude monte Ortobene sacro fiero selvaggio arrosti e cuccioli fieri porcellini.",
        docTips: ["Bussa porta casa fiera e letteraria scrittrice premio nobel sincera pastori Grazie Deledda museo vita e cultura rustica barbaricina aspra cruda in città.", "Sali vertiginoso boschivo irto selvaggio sacro roccioso panoramico Monte Ortobene domina sterminata valle sarda verde roccia pecore ovili al vento statua redentore", "Ascolta brividi arcaici primordiali paurosi echi dei cantori arcaici fieri sardi canti tenores polifonici a tenore voci pancia grevi grottose feste paesane sagre piazze", "Mangia affondando denti golosi sfogliatine ricotta arse pecorina filante forte sapore focacce tipiche spesse seadas miele corbezzo forte guttiau carta musica fina.", "Comprati preziosi intagliati corno coltelli pattada sardi affilati pugnali osso capra selvaggia e vesti velluto coste vellutato pastori rudi montagna sughero."],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Cuore Barbaricino", imageName: "mountain.2.fill", description: "Fiera rude saggezza aspro pastore!" }
    },
    {
        id: "maddalena", regionId: "sardegna", name: "La Maddalena", type: "borgo", province: "SS", latitude: 41.2173, longitude: 9.4069,
        shortDescription: "Arcipelago e isola isola capoluogo, avamposto di mari stellati paradisi protetti calette granito rossastro e base navale storica d'eroi Garibaldi isolato ed appartato a cavallo, venti sferzanti di Sardegna fiera di roccia gallurese",
        docTips: ["Corri scavalca fiero romantico ponte passerella al forte e solitario rifugio Casa dell'Eroe Garibaldi Isola Caprera leoni esilio pino solitario nido d'aquile aspro mare", "Naviga arcipelago cale calette incontaminate incanto piscine naturali manti acqua verde chiara limpidissima cielo barca a vela brezze maestrale sferzante scogli lisciati tondi granitici sardi.", "Sbircia commosso da lontano mistica unica chiusa interdetta ed incredibile rosea magica e misteriosa Spiaggia Rosa Budelli unica ricolma e fatta triturarti conchiglie sminuzzate secoli tempeste e polveri rosa", "Fai due passi vivaci centro vivo caruggi stretti piazza umberto navi marinai bar moli traghetti in porto voci barcaioli fieri gallura e pesce caldo.", "Inerpica aspra e deserta forte a picco strapiombante Guardia Vecchia e fortezze murate batterie sabaude bunker in rovina panorami sconfinati corse d'isolotto lontani azzurri."],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Eroe dei due Mondi", imageName: "sailboat.fill", description: "L'arcipelago turchese magico!" }
    },
    {
        id: "oristano", regionId: "sardegna", name: "Oristano", type: "city", province: "OR", latitude: 39.9044, longitude: 8.5910,
        shortDescription: "Patria giudicale fiera Eleonora d'Arborea, città della misteriosa ed intricata affascinante sartiglia equestre, spiagge di quarzo bianchissime fieri fenicotteri in vivaci e ricche ampie sterminate e fertili risaie d'acqua piatta e laguna dolce.",
        docTips: ["Entusiasmati urlante terrorizzato eccitato polvere cavalli trottanti corsa sfrenata rocambolesca abilità Carnevale folle e mistico la 'Sartiglia' cavalieri mascherati stelle spade spade squarcianti e fiocchi tamburi galoppi sardi.", "Avvista candida bianca candelabri marmi Cattedrale assunta romanica svettante duomo isolato", "Rotolati disteso bagnati caldo abbagliato sfavillante incantevolissimo Lido chicchi di riso e puro bianco lucente quarzo minuscolo tondeggiante di Is Arutas spiaggia unica abbaglio e smeraldo sardo maroso limpido freddo fiero.", "Mastica ruspante focosa pungente bottarga affumicata muggine caviale grattata ruvida arida pasta fredda piana stagni cabras pesci e triglie carciofi spinosi saporitissimi pugliesi", "Ricorda reverente omaggia coraggiosa statua legislatrice regale forte ed emanciapata eroica medioevale fiera inimitabile Eleonora Arborea regina sarda in fiera piazza isolana calda e sole d'arabeschi e corone sarde."],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Giudice Arborense", imageName: "cross.fill", description: "Cavalleria e chicchi bianchissimi d'Arutas!" }
    }
];
