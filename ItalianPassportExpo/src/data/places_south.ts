import { Place } from '../types';

export const PLACES_SOUTH: Place[] = [
    // ABRUZZO (7)
    {
        id: "laquila", regionId: "abruzzo", name: "L'Aquila", type: "city", province: "AQ", latitude: 42.3498, longitude: 13.3995,
        shortDescription: "Città d'arte e di montagna, ferita ma orgogliosa, ricca di basiliche, fontane e leggende templari.",
        docTips: ["Ammira la Basilica di Collemaggio", "Conta le 99 cannelle", "Visita il Forte Spagnolo", "Mangia arrosticini", "Scopri i misteri templari"],
        badge: { title: "99 Cannelle", imageName: "drop.triangle.fill", description: "Forte e gentile!" }
    },
    {
        id: "pescara", regionId: "abruzzo", name: "Pescara", type: "city", province: "PE", latitude: 42.4646, longitude: 14.2140,
        shortDescription: "La città di D'Annunzio sul mare Adriatico, vivace, moderna, con il suggestivo Ponte del Mare e spiagge assolate.",
        docTips: ["Attraversa il Ponte del Mare a piedi", "Visita la Casa Natale di Gabriele D'Annunzio", "Mangia i brodetti di pesce", "Passeggia in Pineta", "Goditi i trabocchi sul molo"],
        badge: { title: "Poeta del Mare", imageName: "water.waves", description: "Adriatico moderno!" }
    },
    {
        id: "sulmona", regionId: "abruzzo", name: "Sulmona", type: "city", province: "AQ", latitude: 42.0487, longitude: 13.9248,
        shortDescription: "Famosa in tutto il mondo per la produzione di confetti colorati e per essere la patria del poeta latino Ovidio.",
        docTips: ["Compra un mazzo di fiori fatto di confetti", "Ammira l'Acquedotto Medievale in Piazza Garibaldi", "Visita la statua di Ovidio", "Assaggia l'aglio rosso di Sulmona", "Scopri l'Eremo di San Onofrio"],
        badge: { title: "Duca dei Confetti", imageName: "star.fill", description: "Dolcezza millenaria!" }
    },
    {
        id: "scanno", regionId: "abruzzo", name: "Scanno", type: "borgo", province: "AQ", latitude: 41.9022, longitude: 13.8828,
        shortDescription: "Il borgo dei fotografi, con i suoi vicoli suggestivi, le donne in abito tradizionale e il lago a forma di cuore.",
        docTips: ["Ammira il lago di Scanno a forma di cuore", "Passeggia per le rue antiche", "Scopri l'oreficeria tradizionale", "Mangia il pan dell'orso", "Incontra donne nel costume tipico"],
        badge: { title: "Fotografo di Cuori", imageName: "heart.fill", description: "Lago incantato!" }
    },
    {
        id: "santo_stefano", regionId: "abruzzo", name: "Santo Stefano di Sessanio", type: "borgo", province: "AQ", latitude: 42.3444, longitude: 13.6444,
        shortDescription: "Un albergo diffuso in un borgo fortificato mediceo perfettamente conservato tra i monti del Gran Sasso.",
        docTips: ["Mangia la zuppa di lenticchie locali", "Esplora i vicoli in pietra chiara", "Ammira la Torre Medicea ricostruita", "Compra la lana tisa a mano", "Dormi nelle case storiche"],
        badge: { title: "Sopravvissuto del Borgo", imageName: "building.2.fill", description: "Pietra viva!" }
    },
    {
        id: "roccaraso", regionId: "abruzzo", name: "Roccaraso", type: "borgo", province: "AQ", latitude: 41.8485, longitude: 14.0732,
        shortDescription: "La meta sciistica più famosa dell'Appennino Centrale, con piste infinite tra i monti e tanta neve.",
        docTips: ["Scia al comprensorio Aremogna", "Gusta caciocavallo fuso in baita", "Passeggia nel Prato", "Ciaspolata notturna nei boschi", "Visita l'antica chiesa rupestre"],
        badge: { title: "Scialpinista", imageName: "snowflake", description: "Neve del sud!" }
    },
    {
        id: "chieti", regionId: "abruzzo", name: "Chieti", type: "city", province: "CH", latitude: 42.3486, longitude: 14.1672,
        shortDescription: "Una delle città più antiche d'Italia, alta su un colle, custodisce nei suoi musei il celebre Guerriero di Capestrano.",
        docTips: ["Saluta il Guerriero di Capestrano nel Museo Nazionale", "Passeggia sul Corso Marrucino", "Ammira la Cattedrale di San Giustino", "Visita i Tempietti Romani", "Bevi una Genziana"],
        badge: { title: "Guerriero Antico", imageName: "shield.fill", description: "Storia su in colle!" }
    },

    // MOLISE (7)
    {
        id: "campobasso", regionId: "molise", name: "Campobasso", type: "city", province: "CB", latitude: 41.5603, longitude: 14.6627,
        shortDescription: "Capoluogo dominato dal possente Castello Monforte, un dedalo di vicoli e scale circonda la collina centrale.",
        docTips: ["Sali al Castello Monforte", "Passeggia nel centro storico a chiocciola", "Mangia i cavatelli al sugo", "Scopri il Museo Sannitico", "Assaggia il caciocavallo locale"],
        badge: { title: "Conte Monforte", imageName: "building.fill", description: "In cima alla collina!" }
    },
    {
        id: "termoli", regionId: "molise", name: "Termoli", type: "city", province: "CB", latitude: 42.0019, longitude: 14.9975,
        shortDescription: "Borgo marinaro murato che si protende nell'Adriatico, famoso per il Castello Svevo e i trabocchi.",
        docTips: ["Visita il Castello Svevo", "Passeggia nel borgo antico", "Mangia brodetto di pesce", "Vedi il vicolo più stretto d'Italia (Rejecelle)", "Ammira un trabucco"],
        badge: { title: "Marinaio del Borgo", imageName: "fish.fill", description: "Mura sul mare!" }
    },
    {
        id: "isernia", regionId: "molise", name: "Isernia", type: "city", province: "IS", latitude: 41.5973, longitude: 14.2312,
        shortDescription: "Città preistorica e sannita, custode del Paleolitico italiano con il sito de La Pineta e l'arte del tombolo.",
        docTips: ["Visita il Museo del Paleolitico", "Esplora gli scavi della Pineta", "Ammira il Palazzo d'Avalos", "Compra un pizzo a tombolo", "Esplora il centro storico ricostruito"],
        badge: { title: "Paleolitico", imageName: "hammer.fill", description: "Radici antiche!" }
    },
    {
        id: "agnone", regionId: "molise", name: "Agnone", type: "borgo", province: "IS", latitude: 41.8157, longitude: 14.3777,
        shortDescription: "Famosa in tutto il mondo per la millenaria Pontificia Fonderia Marinelli, dove nascono le campane dei papi.",
        docTips: ["Visita l'antica Fonderia Marinelli", "Ascolta i maestri campanari", "Passeggia nel quartiere veneziano", "Compra i confetti ricci", "Assaggia la stracciata (formaggio fresco)"],
        badge: { title: "Suonatore di Campane", imageName: "bell.fill", description: "Rintocchi divini!" }
    },
    {
        id: "sepino", regionId: "molise", name: "Sepino", type: "landmark", province: "CB", latitude: 41.4055, longitude: 14.6186,
        shortDescription: "L'antica Saepinum, un'eccezionale città romana perfettamente conservata nelle sue mura e nel teatro emiciclo.",
        docTips: ["Cammina sul Decumano antico", "Esplora le porte romane", "Siediti al Teatro romano rustico", "Ammira la Basilica romana", "Scatta foto tra le colonne e l'erba"],
        badge: { title: "Centurione Rustico", imageName: "shield.lefthalf.filled", description: "La Roma molisana!" }
    },
    {
        id: "venafro", regionId: "molise", name: "Venafro", type: "city", province: "IS", latitude: 41.4816, longitude: 14.0415,
        shortDescription: "Città dell'olio tesse le colline a confine con la Campania, vanta un Museo d'Inverno ed eleganza barocca.",
        docTips: ["Visita il Castello Pandone coi suoi affreschi di cavalli", "Degusta l'Olio di Venafro decantato da Orazio", "Ammira il Verlasce (l'Anfiteatro romano inglobato)", "Visita il Museo Nazionale di Castello Pandone", "Passeggia nel Parco dell'Olivo"],
        badge: { title: "Oliatore antico", imageName: "leaf.fill", description: "Città millenaria!" }
    },
    {
        id: "pietrabbondante", regionId: "molise", name: "Pietrabbondante", type: "landmark", province: "IS", latitude: 41.7454, longitude: 14.3854,
        shortDescription: "Custodisce il più grande santuario e teatro dei bellicosi e fieri Sanniti costruito ad altezza vertiginosa.",
        docTips: ["Siediti sui sedili ergonomici sanniti perfetti nel teatro in pietra", "Senti la maestosità del poggio panoramico", "Tocca le ciclopiche immani mura poligonali", "Esplora il misterioso santuario maggiore sannitico", "Goditi le fresche faggete intorno al borgo"],
        badge: { title: "Sannita Fiero", imageName: "mountain.2.fill", description: "Mura ciclopiche!" }
    },

    // CAMPANIA (10)
    {
        id: "napoli", regionId: "campania", name: "Napoli", type: "city", province: "NA", latitude: 40.8518, longitude: 14.2681,
        shortDescription: "Città del sole, del Vesuvio e della pizza. Napoli è caos, bellezza, storia stratificata e un cuore che batte fortissimo.",
        docTips: ["Mangia una pizza margherita", "Passeggia per Spaccanapoli", "Visita il Cristo Velato", "Senza un caffè sospeso", "Guarda il tramonto da Posillipo"],
        badge: { title: "Napoletano Verace", imageName: "sun.max.fill", description: "Vedi Napoli e poi muori... di felicità!" }
    },
    {
        id: "pompei", regionId: "campania", name: "Pompei", type: "landmark", province: "NA", latitude: 40.7508, longitude: 14.4869,
        shortDescription: "La città romana sepolta dal Vesuvio nel 79 d.C. e cristallizzata nel tempo. Un viaggio indietro di 2000 anni.",
        docTips: ["Cammina sulla via dell'Abbondanza", "Visita la Villa dei Misteri", "Trova i calchi dei corpi", "Entra nel Lupanare", "Immagina la vita romana"],
        badge: { title: "Viaggiatore nel Tempo", imageName: "clock.arrow.circlepath", description: "Hai camminato nella storia!" }
    },
    {
        id: "amalfi", regionId: "campania", name: "Amalfi", type: "city", province: "SA", latitude: 40.6340, longitude: 14.6027,
        shortDescription: "Perla della Costiera, antica Repubblica Marinara. Limoni, ceramiche, Duomo arabo-normanno e mare cristallino.",
        docTips: ["Sali i 62 gradini del Duomo", "Assaggia il limoncello", "Compra carta fatta a mano", "Nuota nel mare cristallino", "Passeggia sul Sentiero degli Dei"],
        badge: { title: "Marinaio della Repubblica", imageName: "sailboat.fill", description: "Il mare è la tua casa!" }
    },
    {
        id: "positano", regionId: "campania", name: "Positano", type: "borgo", province: "SA", latitude: 40.6283, longitude: 14.4849,
        shortDescription: "Il presepe verticale della Costiera Amalfitana. Case color pastello accatastate su falesie ripide a strapiombo sul blu.",
        docTips: ["Fai shopping, 'Moda Positano' nei vicoli", "Rilassati sulla Spiaggia Grande", "Bevi granite al limone Sfusato Amalfitano ghiacciate", "Sali scalinate infinite", "Vivi la notte nei locali a picco"],
        badge: { title: "Jet Set Costiero", imageName: "sparkles", description: "Sfarzo verticale!" }
    },
    {
        id: "sorrento", regionId: "campania", name: "Sorrento", type: "city", province: "NA", latitude: 40.6263, longitude: 14.3758,
        shortDescription: "Sospesa su altissime falesie vulcaniche che affacciano su Capri e il Golfo, terra delle sirene e di uliveti sterminati.",
        docTips: ["Degusta in Limonaia il vero Limoncello", "Passeggia romantica a Marina Grande", "Scendi nel profondo scuro Vallone dei Mulini", "Mangia i tipici Gnocchi alla Sorrentina al tegamino", "Shopping artigianato in legno intarsiato rarissimo"],
        badge: { title: "Cantore Sirene", imageName: "music.mic", description: "Torna a Surriento!" }
    },
    {
        id: "capri", regionId: "campania", name: "Capri", type: "borgo", province: "NA", latitude: 40.5528, longitude: 14.2373,
        shortDescription: "L'isola azzurra dei sogni, celebre lusso mondiale, dei maestosi e svettanti Faraglioni nel mare e della dolce Piazzetta chic.",
        docTips: ["Ammira superbi i grandiosi Faraglioni", "Sosta 'vip' in Piazzetta salotto vip", "Scopri azzurra e magica la Grotta Azzurra canora in barca", "Funicolare da Marina Grande", "Passeggia folle nei profumati Giardini di Augusto"],
        badge: { title: "Divo dell'Isola", imageName: "star.circle.fill", description: "Lusso azzurro mare!" }
    },
    {
        id: "ravello", regionId: "campania", name: "Ravello", type: "borgo", province: "SA", latitude: 40.6508, longitude: 14.6133,
        shortDescription: "Nobildonna signorile e musicale della Costiera incastonata fiera altissima su dirupi a strapiombo, ville di sogno ed immensi giardini sospesi.",
        docTips: ["Estasiati alle Terrazze dell'Infinito sospese altissime Villa Cimbrone", "Entra in Villa Rufolo tra giardini saraceni d'oriente mistiche fioriture", "Ascolta suoni in rassegna Ravello Festival magica palco sul mare", "Passeggia nel silenzio antico", "Stupisciti veduta maiolica Duomo centrale"],
        badge: { title: "Poeta dell'Infinito", imageName: "cloud.fill", description: "In cielo sopra il mare!" }
    },
    {
        id: "salerno", regionId: "campania", name: "Salerno", type: "city", province: "SA", latitude: 40.6824, longitude: 14.7681,
        shortDescription: "Porta elegante e fiera e lucente d'inizio Costiera. Celebre d'inverno le magiche Luci d'Artista ed antichissimo cuore medico glorioso mondiale.",
        docTips: ["Innamorati stupiti camminando Lungomare Trieste lunghissimo fresco e palme.", "Entra Duomo di San Matteo cripta aurea magnifica decoratissima in marmo pregiato", "Sali e conquista faticosi gradini al possente fiero Castello di Arechi", "Trova i meravigliosi Giardini della Minerva antica medicina olistica erboristi", "Goditi le spettacolari Luci d'Artista dicembre piazze colorate fiumane natalizie"],
        badge: { title: "Medico Scalernitano", imageName: "cross.case.fill", description: "Lungo mare stellato!" }
    },
    {
        id: "caserta", regionId: "campania", name: "Caserta", type: "city", province: "CE", latitude: 41.0821, longitude: 14.3346,
        shortDescription: "Casa mondiale dell'immenso sfavillante sogno ambizioso Borbone. Il titanico ed enorme palazzo Reale sfarzoso di Versailles campana, con parchi acquatici fontanieri immensi",
        docTips: ["Spaesati correndo tre kilometri fontane e piscine Parco Reggia infinita", "Inchinati scalone d'onore marmoreo gigantesco Reggia sfarzosa barocca oro palatina", "Assaggia mozzarella latte crudo e focosissima saporitissima Mozzarella di Bufala Campana DOP", "Passeggia nel sonnolento rustico Casertavecchia colle e borgo antico silente", "Vai bosco san silvestro"],
        badge: { title: "Reale Borbonico", imageName: "crown.fill", description: "Lussi regali sconfinati!" }
    },
    {
        id: "paestum", regionId: "campania", name: "Paestum", type: "landmark", province: "SA", latitude: 40.4216, longitude: 15.0063,
        shortDescription: "Tempio dei templi d'occidente e l'oro dell'antica gloriosissima e potente Magna Grecia intatta dorica solenne e possente",
        docTips: ["Visita giganteschi poderosi Templi Greci di Hera Nettuno e di Atene piana verde intatti", "Omaggia singolare enigmatico Affresco della Tomba del Tuffatore museo", "Mastica mozzarellone bufale caseifici antistanti scavi caldissime!", "Gira nel foro tra ciottoli e vestigia millenarie marittime", "Attendi calare sole dorato tra possenti colonne templari oro infuocate stupore divo."],
        badge: { title: "Divinità Dorica", imageName: "building.columns.fill", description: "Tempio al sole!" }
    },

    // PUGLIA (10)
    {
        id: "bari", regionId: "puglia", name: "Bari", type: "city", province: "BA", latitude: 41.1171, longitude: 16.8719,
        shortDescription: "La porta d'oriente vivacissima e scatenata con il suo celebre lungomare infinito e Bari Vecchia dedalo e dimora dell'amatissimo e venerato San Nicola protettore marinai",
        docTips: ["Scova le mitiche focose signore artigiane che 'abbozzano' fanno velocissime Orecchiette Arco Basso vicolo rorido pancia Vecchia", "Passeggia infinito elegante fiero e marziale Lungomare Nazario Sauro schiaffo vento forte maestrale.", "Comprati calde Panzarotti calzoni fritti ripieni sgocciolanti mozzarella a Chiringuito peschereccio", "Entra commosso reverente Basilica San Nicola mistica ed ecumenica coi greci ortodossi", "Ascolta rumori pescatori mercatino freschissimo a N'dèrr'a la lanze crudi di mare polipi ricci."],
        badge: { title: "Pastaio di Mare", imageName: "fish.fill", description: "Orecchiette e scirocco voli!" }
    },
    {
        id: "lecce", regionId: "puglia", name: "Lecce", type: "city", province: "LE", latitude: 40.3515, longitude: 18.1750,
        shortDescription: "La splendida e ricamata capitale sfarzosa del Barocco. Totalmente scolpita ricchissima d'ori tenera pietra leccese calda d'oro sole che stupisce piazze e duomi dorati.",
        docTips: ["Ghermisci ardente gustoso fragrante Pasticciotto caldo ripieno di crema Lecce vera", "Mastica Rosticato Rustico Leccese caldissimo besciamella mozzarella calda piazzetta", "Ammira ipnotico rosone dorato ricamatissimo della maestosa altissima Basilica Santa Croce leccese", "Cammina intatto anfiteatro romano scavi nel cuore sprofondati al baricentro della vivissima smaltata e grandiosa illuminata Piazza Sant'Oronzo", "Esplora vicoli pietre bionde duomo chiesette corti cortili aperti dorati barocchi e teatrali ed effigi ghirigori"],
        badge: { title: "Incantatore Barocco", imageName: "sparkles", description: "Pietra d'oro barocca!" }
    },
    {
        id: "alberobello", regionId: "puglia", name: "Alberobello", type: "borgo", province: "BA", latitude: 40.7831, longitude: 17.2374,
        shortDescription: "Il magico fiabesco ed inimitabile villaggietto mondiale interamente composto candidi a cono trulli e segni pagani solari mistici calce smagliante tetti a gradoni grigi.",
        docTips: ["Dormi sogno reale rotondo magico fiabesco dentro letto Trullo originale tondo intimo freschissimo.", "Sali per terrazze belvedere Rione Monti e fotografa mare e vallate sterminate infinite calce dei trullini grigi candidi a discesa colmo spiovente", "Visita speciale misterioso doppio possente Il Trullo Sovrano due piani!", "Esplora artigiani Aia Piccola lato antico e rionale meno affollato mistico", "Cerca decritta significati dipinti tetto misteriosi pinnacoli segni zodiacali zodiaci celtici pagani cristiani incisi malocchio."],
        badge: { title: "Mastro Trullaro", imageName: "house.fill", description: "Magia di pietra!" }
    },
    {
        id: "polignano", regionId: "puglia", name: "Polignano a Mare", type: "borgo", province: "BA", latitude: 40.9958, longitude: 17.2215,
        shortDescription: "Incredibilissima scogliera e nido a nido di rondini a picco mare smeraldino azzurrissimo cristallino Adriatico pugliese candido abbacinante. Spettacolare vertiginoso affaccio volare oh oh.",
        docTips: ["Tuffati Lama Monachile minuscola stupenda grotta spiaggia ciottoli ponte tuffatori professionisti mondiali red bull d'abissi profondissimi strapiombi falesie", "Passeggia poesia muri scritte romantiche Modugno vicoli calce tuffati sospesi sul ruggente azzurrissimo e profondo mar.", "Canta fiero 'Nel blu dipinto di blu' volando di Modugno statua scogliosa spavalda bronzea braccia cielo divo divo innamorato del cielo blu.", "Sbircia grotta palazzese esclusivo scavato", "Gustati crudi cotti freschissimi polpesca puglia adriatico verace."],
        badge: { title: "Tuffatore Azzurro", imageName: "water.waves", description: "Volare nel blu dipinto di blu!" }
    },
    {
        id: "ostuni", regionId: "puglia", name: "Ostuni", type: "city", province: "BR", latitude: 40.7288, longitude: 17.5775,
        shortDescription: "Chiamata 'La Città Bianca', rifulge abbacinante e accecante sotto al solleone come un isolotto greco sperduto e riarsa emerso dalla campagna lussureggiante marea di uliveti rossi contorti infiniti secolari e spesse terre pugliesi infuocate.",
        docTips: ["Perditi salite ripidissime scalinate budelli candidi lattescenti muri calcinati spessi di bianco abbacinante fresco spessore cangiante al tramonto caldo solare e luce viva rifranta", "Ammira grandissimo rosone decoratissimo troneggiante gotico in alto alla vetta della severa concattedrale Duomo alto campanaria", "Beccati panorama marea sconfinata piana rosso terra ulivi possenti spioventi fino a mare luccicante azzurrato lontano e infinito profondo.", "Acciuffa e divora in via aperitivi focaccia calda fumante rustica croccante ripiena puglia verace", "Bevi fresco negramaro calici rosso forte foggiano primitivo barricato cantina scavata tuffo"],
        badge: { title: "Gabbiano Bianco", imageName: "sun.max.fill", description: "Accecante uliveto mari!" }
    },
    {
        id: "otranto", regionId: "puglia", name: "Otranto", type: "borgo", province: "LE", latitude: 40.1444, longitude: 18.4893,
        shortDescription: "Porta d'estremo oriente albalinea turchese e selvosa Italia. Custode massiccia mura aragonesi trucidate teschie ed idruntini martiri e fantastico lido spiagge salentine paradisiache chiare limpidissimo e fresco cristallo. Castello immane.",
        docTips: ["Incantati stupefatto Mosaico pavimentale Albero della Vita sterminato folle romanico cattedrale.", "Impallidisci spaventato Ossario 800 santi teschie Idruntini martiri saraceni decapitati cripta navata reliquiario", "Visita passeggia spesse possenti altissime enormi baluardi Castello Aragonese", "Passeggia serate animatissime labirinti vicoli ciottoli artigianato turchese corallo botteghe salento estivo", "Tuffati Bauxite Cava stagno laghetto rosso marte sanguigno sponda smeraldo falesie lontane adriatiche lido incanto caraibico"],
        badge: { title: "Martire Guardiano", imageName: "shield.fill", description: "Alba dorata d'oriente!" }
    },
    {
        id: "gallipoli", regionId: "puglia", name: "Gallipoli", type: "city", province: "LE", latitude: 40.0556, longitude: 17.9790,
        shortDescription: "Chiamata la perla Jonica d'oriente, o Kalè Polis la città bella greca antica isolata da un solido pio e forte ponte unita scogliera spiovente murata scudieri mare pescatori crudi gamberoni rosa purpurato sole",
        docTips: ["Goditi tramonti lunghissimi fuoco caldissimo purpurato spiaggia Purità mura isola bastioni.", "Azzanna crudissimo Gambero Rosso dolcissimo violetto pescatori rudi sbarco mercato cala porto antico mattiniero sapore forte", "Stringiti budelli barocchi chiesette confraternite intarsiate ori marmi sfarzosi in viuzze cieche corti", "Attraversa possente ponte mure castello isolotto diviso terra ferma sbarramenti vecchi d'angioini", "Godi spiagge immense dune pini profumati rosmarino baia verde notti giovani falò pazzi sfrenati balli salentini e pizzica taranta"],
        badge: { title: "Navigatore Jonico", imageName: "sunrise.fill", description: "Tramonti rossi e gamberi!" }
    },
    {
        id: "trani", regionId: "puglia", name: "Trani", type: "city", province: "BT", latitude: 41.2721, longitude: 16.4172,
        shortDescription: "Elegantissima nobildonna portuale celebre in tutto il mondo per il lussureggiante molo d'oriente ed una regale superba candida Cattedrale Romanica eretta solitaria grandiosa dritta sospesa sfidante onde mare azzurro limpido cielo mare.",
        docTips: ["Fotografa impazzito campanile Cattedrale superba San Nicola pellegrino sfrecciante mare scogli onda spuma", "Mangia romantico serale bacino darsena scafi porticciolo ristorante moscato dolce DOC passito", "Visita quartiere ebraico Giudecca sinagoga antica candida pietra sole mura strette", "Ammira superbo colosso Federico Imperator Castello svevo affianco baia squadrato in tufo duro.", "Sorseggia Moscato di trani in calici freddi sole calante aperitivi e taralli poggia mare pontile"],
        badge: { title: "Cavaliere Crociato", imageName: "cross.fill", description: "Regina a picco sul mare!" }
    },
    {
        id: "monopoli", regionId: "puglia", name: "Monopoli", type: "city", province: "BA", latitude: 40.9525, longitude: 17.3005,
        shortDescription: "Porticciolo d'antico rifugio vivo pulsante ghirigori bianchi e finestre turchine greche pescherecci celesti famigliari vicoli labirintici piazzette improvvise campestri profumo scoglierette lidi dolci calette acqua celeste azzurrina dolce mare calmissimo",
        docTips: ["Cerca barchette gozzi 'vozz' azzurri dipinti rossi cullanti sonnacchiosi porticciolo fortificato e sbarazzino cannone incastrato", "Tuffa lido caletta Porta Vecchia nuotata mare cinta mura mura antichi calcinati bianche sbieche tufo scogli lisci acqua chiarissima cristallina dolce e freddina", "Penetra barocco fastosamente ricco Basilica Cattedrale Madonna madia miracolosa", "Gustati crudo polipo riccio panzerotti orecchiette cime veraci forni legna tralci ulivo affumicati d'arrosto e carni calde succulenti saporose foggiane e puglia verace sincera profonda.", "Gira campagna masserie fortificate muretti secco carrubi altissimi sterminati immensi monumentali d'ulivi tarantini millennio radici tortili possenti fronde grevi"],
        badge: { title: "Lupo di Gozzo", imageName: "sailboat.fill", description: "Azzurro mare gozzo!" }
    },
    {
        id: "vieste", regionId: "puglia", name: "Vieste", type: "borgo", province: "FG", latitude: 41.8821, longitude: 16.1774,
        shortDescription: "La sterminata fiera rude selvaggia altissima e dura coraggiosa capitale verde dello sperone roccioso d'Italia il fiero rude Gargano fittissimo ombroso traballante mare. Baie falesie e colossali faraglioni ciclopici mitologici",
        docTips: ["Spaventati altissimo Pizzomunno monolito faraglione calcarea leggenda d'amore infelice colossale dritta piantata spiaggia piana d'orata", "Naviga misteriosissime grotte occhio magico marine anfratti calcarei bianchissimi baie falesia archi arco san felice roccia sospeso mare", "Scopri foreste cupe nere profonde antistanti Foresta Umbra cervi lupi daini abeti secolari freschi brivido orsi rudi pastori ombre verdi pugliesi foggiani altipiani greggi pascoli caciocavallo podolico mucche lente.", "Gustati zuppa di pesce Trabocco trabucco reti volanti palafitte legno protese mare abissi", "Perditi chianche lisce vicoli abbaglianti candidi scalinate ripide fiorate vecchie signore filano cuciono chiacchiere profumo mare sapore basilico pomodori penduli ruvidi spaccati essiccati griglie profumate pesci rossi succulenti grigliate in vicoli fumi."],
        badge: { title: "Gigante Pizzomunno", imageName: "mountain.2.fill", description: "Spuntoni ed ulivi fieri!" }
    },

    // BASILICATA (7)
    {
        id: "matera", regionId: "basilicata", name: "Matera", type: "city", province: "MT", latitude: 40.6664, longitude: 16.6043,
        shortDescription: "La città dei Sassi, patrimonio UNESCO e Capitale della Cultura, un paesaggio biblico scavato nella roccia.",
        docTips: ["Esplora i Sassi (Caveoso e Barisano)", "Visita una casa grotta", "Ammira il Duomo", "Mangia il pane di Matera", "Dormi in una grotta"],
        badge: { title: "Uomo delle Caverne", imageName: "globe.europe.africa.fill", description: "Eternità di pietra!" }
    },
    {
        id: "potenza", regionId: "basilicata", name: "Potenza", type: "city", province: "PZ", latitude: 40.6404, longitude: 15.8056,
        shortDescription: "Il capoluogo regionale più alto d'Italia, una città di contrasti verticali, scale mobili infinite e tradizioni montane.",
        docTips: ["Usa le lunghissime scale mobili per il centro", "Passeggia in Via Pretoria", "Visita il Duomo di San Gerardo", "Assaggia gli strascinati", "Ammira il ponte sul Basento"],
        badge: { title: "Alpinista Urbano", imageName: "building.2.fill", description: "In cima senza fatica!" }
    },
    {
        id: "maratea", regionId: "basilicata", name: "Maratea", type: "borgo", province: "PZ", latitude: 39.9965, longitude: 15.7208,
        shortDescription: "La perla del Tirreno in Basilicata, dominata dall'enorme Statua del Redentore, tra falesie mozzafiato e borgo antico.",
        docTips: ["Sali alla Statua del Cristo Redentore", "Ammira il panorama dal belvedere", "Esplora le rovine dell'antica Maratea", "Fai il bagno nelle piccole cale", "Visita il Porto"],
        badge: { title: "Redentore", imageName: "star.fill", description: "Benedetto dal mare!" }
    },
    {
        id: "melfi", regionId: "basilicata", name: "Melfi", type: "city", province: "PZ", latitude: 40.9959, longitude: 15.6545,
        shortDescription: "Svetta alle pendici del Vulture con il suo imponente castello normanno, fucina delle Costituzioni di Federico II.",
        docTips: ["Esplora il Castello Normanno-Svevo", "Visita il Museo Archeologico Nazionale", "Passeggia nel centro medievale", "Assaggia i vini Aglianico del Vulture", "Ammira le chiese rupestri"],
        badge: { title: "Templare Normanno", imageName: "shield.fill", description: "Federico II fiero!" }
    },
    {
        id: "venosa", regionId: "basilicata", name: "Venosa", type: "borgo", province: "PZ", latitude: 40.9602, longitude: 15.8153,
        shortDescription: "Patria del poeta Orazio, uno dei borghi più belli d'Italia con l'incredibile Abbazia dell'Incompiuta e il castello.",
        docTips: ["Inchinati all'Abbazia della Trinità ('L'Incompiuta')", "Visita il Parco Archeologico e le Terme romane", "Entra nel Castello aragonese", "Degusta Aglianico del Vulture in cantine buie", "Assaggia taralli fragranti"],
        badge: { title: "Poeta Latino Orazio", imageName: "quill", description: "Versi e pietre sacre!" }
    },
    {
        id: "pietrapertosa", regionId: "basilicata", name: "Pietrapertosa", type: "borgo", province: "PZ", latitude: 40.5187, longitude: 16.0631,
        shortDescription: "Borgo vertiginoso incastonato a picco sulle rocce aspre delle Dolomiti Lucane, famoso per il 'Volo dell'Angelo'.",
        docTips: ["Lanciati nel folle 'Volo dell'Angelo' a 120km/h!", "Passeggia nel rione dell'Arabatana", "Ammira il fortilizio saraceno sulla cresta rocciosa", "Fotografa gli spuntoni rocciosi lucani Dolomitici d'incanto e terrore", "Mangia pasta mollicata e peperone crusco sfrigolante"],
        badge: { title: "Angelo Volante", imageName: "airplane", description: "Vertigine lucana pura!" }
    },
    {
        id: "castelmezzano", regionId: "basilicata", name: "Castelmezzano", type: "borgo", province: "PZ", latitude: 40.5283, longitude: 16.0450,
        shortDescription: "Gemello di Pietrapertosa, borgo fiabesco incuneato nelle guglie dolomitiche lucane, palcoscenico di passeggiate ed eremi aspri.",
        docTips: ["Fai il Sentiero delle Sette Pietre tra miti e magie", "Vola sul filo all'indietro (Volo dell'Angelo) per tornare a Pietrapertosa", "Bevi alla fontanella della piazza gradinata in roccia", "Ammira l'eremo nelle guglie", "Gusta la tipica cucina contadina dei monti caldi"],
        badge: { title: "Dolomitico Lucano", imageName: "mountain.2.fill", description: "Tra falesie giganti e abissi!" }
    },

    // CALABRIA (8)
    {
        id: "catanzaro", regionId: "calabria", name: "Catanzaro", type: "city", province: "CZ", latitude: 38.9098, longitude: 16.5877,
        shortDescription: "La città tra i due mari e dei tre colli, capoluogo, battuta dal vento sferzante e dotata di un ponte imponente sbalorditivo vertiginoso.",
        docTips: ["Passeggia su fiero poderoso lunghissimo Viadotto Ponte Bisantis arcata abissale altissima", "Ammira panorama Ionio Marco Parco Biodiversità Mediterranea fresco e pinete", "Morditi caldissimo panino tipico forte 'Morzello' pitta viscere pomodoro infuocate piccanti!", "Ammira bronzi copie museale o gipsoteca", "Sudi per ripidi vicoli tra due golfi e brezze del tirreno sferzante in tre colli appesi e vallate aspre serresi"],
        badge: { title: "Ponte Vertigine", imageName: "wind", description: "Morzello e brezze joniche!" }
    },
    {
        id: "tropea", regionId: "calabria", name: "Tropea", type: "borgo", province: "VV", latitude: 38.6763, longitude: 15.8956,
        shortDescription: "La perla del Tirreno, borgo a picco sul mare turchese, famosa per la cipolla rossa e le spiagge bianche.",
        docTips: ["Nuota sotto al Santuario dell'Isola", "Mangia cipolla rossa di Tropea", "Ammira il tramonto su Stromboli", "Passeggia nel centro storico", "Assaggia la 'nduja"],
        badge: { title: "Perla del Sud", imageName: "sun.haze.fill", description: "Piccante e dolce!" }
    },
    {
        id: "reggio_calabria", regionId: "calabria", name: "Reggio Calabria", type: "city", province: "RC", latitude: 38.1113, longitude: 15.6618,
        shortDescription: "Proprietaria del chilometro più bello d'Italia secondo D'Annunzio, casa sfarzosa immensa colossali e forti divini Bronzi Riace.",
        docTips: ["Stupisciti ed ammutolisci sbalordito e fragile piccino dinnanzi perfezione divina greca grandiosi divini dèi Bronzi Riace Mus. Nazionale!", "Passeggia serale Lungomare Falcomatà incantevole fresco e panorama Sicilia Stretto Messina mito fata morgana miraggio fiammeggiante", "Azzanna goloso forte rustica gustosa pitta calabra zeppole fritte nduja e provole silane", "Assaggia dissetante aroma bergamotto vero unico mondo sponde fiumare reggine profumo d'agrume e di zagare arse e secche bruciate calura scirocco asfissiante dolce e forte.", "Ammira castello aragonese e teatro cilea palcoscenici caldi sfarzosi d'eroi sbarchi garibaldi aspromonte"],
        badge: { title: "Divinità di Bronzo", imageName: "figure.stand", description: "Perfezione sul chilometro bello!" }
    },
    {
        id: "scilla", regionId: "calabria", name: "Scilla", type: "borgo", province: "RC", latitude: 38.2529, longitude: 15.7161,
        shortDescription: "Borgo omerico mitologico, dominato Castello Ruffo a picco e l'incanto di Chianalea, scogliera e barchette.",
        docTips: ["Esplora il borgo dei pescatori a fior d'acqua Chianalea", "Sali sul Castello Ruffo", "Mangia un panino al pescespada", "Ammira lo stretto di Messina", "Guarda la caccia al pescespada con le feluche"],
        badge: { title: "Pescatore Omerico", imageName: "fish.fill", description: "Mostri e mare azzurro!" }
    },
    {
        id: "pizzo", regionId: "calabria", name: "Pizzo", type: "borgo", province: "VV", latitude: 38.7363, longitude: 16.1824,
        shortDescription: "Borgo noto per il tartufo gelato e la storia murattiana, affacciato a balcone sul Golfo di Sant'Eufemia.",
        docTips: ["Mangia il celebre Tartufo di Pizzo in piazza", "Visita il Castello Aragonese (dove morì Murat)", "Scendi alla Chiesetta di Piedigrotta scavata nella roccia", "Ammira il mare dal balcone della piazza", "Gusta il tonno locale"],
        badge: { title: "Re del Tartufo Gelato", imageName: "star.fill", description: "Dolcezze spagnole!" }
    },
    {
        id: "cosenza", regionId: "calabria", name: "Cosenza", type: "city", province: "CS", latitude: 39.3006, longitude: 16.2530,
        shortDescription: "L'Atene della Calabria, ricca di storia, con un centro antico inerpicato sul colle Pancrazio e il mito di Alarico.",
        docTips: ["Passeggia nel salotto all'aperto MAB con sculture di Dalì/Chirico", "Esplora il bellissimo centro storico medievale", "Visita il Duomo Patrimonio dell'Umanità", "Sali al Castello Normanno-Svevo", "Cerca il tesoro di Alarico nel fiume Busento"],
        badge: { title: "Filosofo Silano", imageName: "book.fill", description: "Tra due fiumi in cerca dell'oro!" }
    },
    {
        id: "gerace", regionId: "calabria", name: "Gerace", type: "borgo", province: "RC", latitude: 38.2713, longitude: 16.2163,
        shortDescription: "Lo sparviero dell'Aspromonte. Borgo medievale e normanno miracolosamente intatto tra l'Aspromonte e lo Ionio.",
        docTips: ["Ammira la Cattedrale, la più grande della regione", "Passeggia in Piazza del Tocco", "Scendi nelle carceri normanne sotterranee", "Visita la chiesa di San Francesco", "Assaggia un sorso di Greco di Bianco o Mantonico ghiacciato"],
        badge: { title: "Sparviero Jonico", imageName: "cross.fill", description: "Intatto nella storia!" }
    },
    {
        id: "soverato", regionId: "calabria", name: "Soverato", type: "city", province: "CZ", latitude: 38.6853, longitude: 16.5492,
        shortDescription: "La Perla dello Ionio, famosissima località balneare che vanta un lungomare chilometrico e movida notturna.",
        docTips: ["Passeggia sul lungo lungomare pinetato", "Goditi la spiaggia di sabbia bianca caraibica", "Vivi la notte estiva nelle discoteche e lidi", "Assaggia il peperoncino calabrese sfiziosissimo in cucina", "Tuffati per avvistare storici cavallucci marini rarissimi in baia"],
        badge: { title: "Cavalluccio dello Ionio", imageName: "sun.max.fill", description: "Mare, notti e sabbia bianca!" }
    }
];
