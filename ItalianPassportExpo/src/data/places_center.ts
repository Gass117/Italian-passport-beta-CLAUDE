import { Place } from '../types';

export const PLACES_CENTER: Place[] = [
    // EMILIA-ROMAGNA (10)
    {
        id: "bologna", regionId: "emilia", name: "Bologna", type: "city", province: "BO", latitude: 44.4949, longitude: 11.3426,
        shortDescription: "La Dotta, la Grassa, la Rossa. Città universitaria, di portici infiniti, torri pendenti e cucina imbattibile.",
        docTips: ["Sali sulla Torre degli Asinelli", "Mangia tortellini in brodo", "Passeggia sotto i portici Unesco", "Visita Piazza Maggiore", "Scopri i canali segreti"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Dotto", imageName: "book.fill", description: "Tra torri e tortellini!" }
    },
    {
        id: "parma", regionId: "emilia", name: "Parma", type: "city", province: "PR", latitude: 44.8015, longitude: 10.3280,
        shortDescription: "Capitale della gastronomia italiana (Prosciutto e Parmigiano), ricca di fascino ducale e patria di Verdi.",
        docTips: ["Ammira l'interno del Battistero", "Visita il Teatro Farnese in legno", "Degusta Prosciutto di Parma e Parmigiano Reggiano", "Passeggia nel Parco Ducale", "Ammira gli affreschi del Parmigianino"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Duca Gastronomo", imageName: "fork.knife", description: "Sapore ducale!" }
    },
    {
        id: "modena", regionId: "emilia", name: "Modena", type: "city", province: "MO", latitude: 44.6471, longitude: 10.9252,
        shortDescription: "Città lenta nel cibo (Aceto Balsamico) ma veloce nei motori (Ferrari). Il suo Duomo romanico è mozzafiato.",
        docTips: ["Sali sulla Ghirlandina", "Visita una Acetaia storica", "Scopri il Museo Enzo Ferrari", "Mangia gnocco fritto e tigelle", "Ammira Piazza Grande"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Pilota Balsamico", imageName: "car.fill", description: "Motori e sapore eccelso!" }
    },
    {
        id: "rimini", regionId: "emilia", name: "Rimini", type: "city", province: "RN", latitude: 44.0620, longitude: 12.5652,
        shortDescription: "Ben più di una spiaggia e una piadina: la Rimini di Fellini, col Tempio Malatestiano e il borgo San Giuliano.",
        docTips: ["Cammina sul Ponte di Tiberio", "Mangia una piadina romagnola", "Omaggia Fellini a Borgo San Giuliano", "Visita il Tempio Malatestiano", "Goditi l'Aperitivo al mare"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Regista Balneare", imageName: "film.fill", description: "La dolce vita romagnola!" }
    },
    {
        id: "ravenna", regionId: "emilia", name: "Ravenna", type: "city", province: "RA", latitude: 44.4184, longitude: 12.1993,
        shortDescription: "Tre volte capitale, custode millenaria del mosaico bizantino, incanto iridescente racchiuso in umili chiese di mattoni.",
        docTips: ["Abbagliati coi mosaici di San Vitale", "Ammira il Mausoleo di Galla Placidia", "Visita la Tomba di Dante Alighieri", "Gusta i cappelletti al ragù", "Cerca gli otto monumenti UNESCO"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Bizantino", imageName: "grid", description: "Oro e vetri millenari!" }
    },
    {
        id: "ferrara", regionId: "emilia", name: "Ferrara", type: "city", province: "FE", latitude: 44.8381, longitude: 11.6198,
        shortDescription: "Sontuosa capitale estense, città delle biciclette circondata da mura intatte e dominata dal Castello.",
        docTips: ["Gira le mura in bicicletta", "Esplora il Castello Estense", "Mangia la salama da sugo e il panpepato", "Passeggia in Via delle Volte", "Ammira la facciata del Duomo"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Signore Estense", imageName: "bicycle", description: "Pedalata rinascimentale!" }
    },
    {
        id: "piacenza", regionId: "emilia", name: "Piacenza", type: "city", province: "PC", latitude: 45.0526, longitude: 9.6930,
        shortDescription: "Importante crocevia sul Po, città d'arte sobria e nobile con Palazzi signorili (Palladio, Farnese).",
        docTips: ["Ammira i Cavalli del Mochi in Piazza Cavalli", "Visita Palazzo Farnese", "Assaggia la Coppa e i pisarei e fasö", "Entra nel Duomo medievale", "Passeggia lungo l'argine del Po"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Cavaliere del Po", imageName: "horse.fill", description: "La primogenita!" }
    },
    {
        id: "riccione", regionId: "emilia", name: "Riccione", type: "city", province: "RN", latitude: 43.9984, longitude: 12.6517,
        shortDescription: "La Perla Verde dell'Adriatico, mecca del divertimento notturno e dello shopping esclusivo in Viale Ceccarini.",
        docTips: ["Fai shopping in Viale Ceccarini", "Balla nei locali o in spiaggia", "Goditi le spiagge super attrezzate", "Assaggia bombolone con la crema", "Passeggia sul lungomare"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Nottambulo Chic", imageName: "party.popper.fill", description: "La perla verde!" }
    },
    {
        id: "comacchio", regionId: "emilia", name: "Comacchio", type: "city", province: "FE", latitude: 44.6934, longitude: 12.1837,
        shortDescription: "La 'Piccola Venezia' del Delta del Po, intreccio di canali punteggiati dai caratteristici Trepponti, famosa per l'anguilla.",
        docTips: ["Sali sui Trepponti", "Mangia l'anguilla marinata", "Fai un giro in batana nei canali", "Esplora il Delta del Po in bici", "Cerca i fenicotteri nelle Valli"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Re delle Valli", imageName: "fish.fill", description: "Terre emerse dal delta!" }
    },
    {
        id: "brisighella", regionId: "emilia", name: "Brisighella", type: "borgo", province: "RA", latitude: 44.2238, longitude: 11.7709,
        shortDescription: "Romantico borgo adagiato su tre colli di gesso (Rocca, Torre, Santuario), noto per l'olio e la suggestiva Via degli Asini.",
        docTips: ["Percorri l'antica Via degli Asini", "Sali alla Rocca Manfrediana", "Raggiungi la Torre dell'Orologio", "Degusta l'olio d'oliva DOP Brisighello", "Mangia la spoja lorda"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Custode del Gesso", imageName: "mountain.2.fill", description: "Sui tre colli!" }
    },

    // TOSCANA (10)
    {
        id: "firenze", regionId: "toscana", name: "Firenze", type: "city", province: "FI", latitude: 43.7696, longitude: 11.2558,
        shortDescription: "Culla del Rinascimento e capitale mondiale dell'arte, Firenze incanta con i suoi capolavori, ponti storici e tradizioni culinarie uniche.",
        docTips: ["Mangia una schiacciata all'olio", "Passeggia sul Ponte Vecchio al tramonto", "Ordina un lampredotto", "Visita gli Uffizi", "Sali sulla Cupola del Brunelleschi"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Fiorentino DOC", imageName: "fleur.de.lis.fill", description: "Culla del Rinascimento!" }
    },
    {
        id: "siena", regionId: "toscana", name: "Siena", type: "city", province: "SI", latitude: 43.3188, longitude: 11.3308,
        shortDescription: "Città del Palio e gioiello gotico, Siena conquista con Piazza del Campo, il Duomo a strisce e le rivalità tra contrade.",
        docTips: ["Siediti in Piazza del Campo", "Assaggia i ricciarelli e il panforte", "Scopri i simboli delle contrade", "Ammira il pavimento del Duomo", "Bevi un Chianti Classico"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Contradaiolo", imageName: "flag.fill", description: "Il Palio nelle vene!" }
    },
    {
        id: "pisa", regionId: "toscana", name: "Pisa", type: "city", province: "PI", latitude: 43.7228, longitude: 10.4017,
        shortDescription: "Nota a livello globale per la sua Torre Pendente, offre un incantevole prato di Miracoli e affascinanti lungarni.",
        docTips: ["Fai la classica foto 'reggendo' la Torre", "Passeggia lungo l'Arno (I Lungarni)", "Visita il Battistero per l'acustica", "Scopri Piazza dei Cavalieri", "Mangia cecina pisana"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Miracoloso", imageName: "arrow.up.right.circle.fill", description: "Equilibro precario!" }
    },
    {
        id: "lucca", regionId: "toscana", name: "Lucca", type: "city", province: "LU", latitude: 43.8427, longitude: 10.5027,
        shortDescription: "L'unica in Italia con mura rinascimentali totalmente intatte trasformate in passeggiata alberata. Città di Puccini.",
        docTips: ["Noleggia una bici e pedala sulle Mura", "Sali sulla Torre Guinigi e i suoi alberi", "Prendi un caffè tondo in Piazza dell'Anfiteatro", "Assaggia il Buccellato", "Visita la casa natale di Giacomo Puccini"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Cavaliere delle Mura", imageName: "leaf.fill", description: "Tra querce sospese!" }
    },
    {
        id: "san_gimignano", regionId: "toscana", name: "San Gimignano", type: "borgo", province: "SI", latitude: 43.4677, longitude: 11.0430,
        shortDescription: "Il borgo delle belle torri, patrimonio UNESCO, famoso per la Vernaccia e le torri medievali che sormontano la collina.",
        docTips: ["Conta le 14 torri storiche", "Gusta il gelato di Dondoli", "Bevi uno squisito Vernaccia", "Ammira il panorama valdelsano", "Esplora Piazza della Cisterna"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Manhattan Medievale", imageName: "building.columns.fill", description: "Tra cielo e terra!" }
    },
    {
        id: "volterra", regionId: "toscana", name: "Volterra", type: "borgo", province: "PI", latitude: 43.4023, longitude: 10.8596,
        shortDescription: "Dura roccaforte etrusca, scura, scolpita dal vento e incisa nell'alabastro. Scenario gotico magico.",
        docTips: ["Senza fiato davanti al Teatro Romano", "Ammonzena l'artigianato in Alabastro", "Passeggia lungo le Balze di Volterra", "Entra nella Piazza dei Priori", "Vivi l'atmosfera Twilight"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Mago Etrusco", imageName: "moon.fill", description: "Magia di alabastro!" }
    },
    {
        id: "pienza", regionId: "toscana", name: "Pienza", type: "borgo", province: "SI", latitude: 43.0768, longitude: 11.6789,
        shortDescription: "La città ideale di Papa Pio II. Balcone idilliaco affacciato sulla Val d'Orcia, dominato dal profumo del Pecorino.",
        docTips: ["Passeggia per Via dell'Amore e Via del Bacio", "Ammira lo squarcio sulla Val d'Orcia", "Assaggia il Pecorino di Pienza", "Entra in Palazzo Piccolomini", "Perditi nei vicoli perfetti"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Umanista ideale", imageName: "heart.fill", description: "Amore puro per gli occhi!" }
    },
    {
        id: "montepulciano", regionId: "toscana", name: "Montepulciano", type: "borgo", province: "SI", latitude: 43.0906, longitude: 11.7828,
        shortDescription: "Patria di Poliziano e del Vino Nobile d'altura. Le sue ripide vie conducono in un Rinascimento in pietra viva.",
        docTips: ["Degusta il Nobile in una cantina sotterranea", "Raggiungi la Piazza Grande", "Ammira il Tempio di San Biagio (fuori le mura)", "Gusta i pici all'aglione", "Scalinata per panorami infiniti"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Nobile Sommelier", imageName: "drop.fill", description: "Nobile anche d'animo!" }
    },
    {
        id: "pitigliano", regionId: "toscana", name: "Pitigliano", type: "borgo", province: "GR", latitude: 42.6347, longitude: 11.6697,
        shortDescription: "La 'Piccola Gerusalemme' sorge su uno sperone di tufo. Borgo dove antiche cave etrusche s'intrecciano con storia ebraica.",
        docTips: ["Esplora le vie cave etrusche", "Sali dalla pittoresca Via Cava", "Visita l'antica sinagoga", "Mangia lo sfratto dei goym", "Scatta al borgo di notte, magico"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Abitante del Tufo", imageName: "mountain.2.fill", description: "Terra etrusca!" }
    },
    {
        id: "viareggio", regionId: "toscana", name: "Viareggio", type: "city", province: "LU", latitude: 43.8668, longitude: 10.2430,
        shortDescription: "La perla della Versilia, famosa per il suo Carnevale, le lunghe spiagge di sabbia e l'architettura Liberty.",
        docTips: ["Partecipa alla sfilata dei carri", "Passeggiata Margherita coi villini Liberty", "Mangia un bombolone caldo", "Bevi al Burlamacco sulla pineta", "Un tuffo nei bagni storici"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Re del Carnevale", imageName: "party.popper.fill", description: "La vita è un carnevale!", imageAsset: require('../../assets/images/badges/viareggio.png') }
    },

    // UMBRIA (8)
    {
        id: "perugia", regionId: "umbria", name: "Perugia", type: "city", province: "PG", latitude: 43.1107, longitude: 12.3908,
        shortDescription: "Città etrusca e medievale, famosa per il cioccolato e il jazz, arroccata su un colle con panorami mozzafiato.",
        docTips: ["Attraversa l'Arco Etrusco", "Sedi in Piazza IV Novembre", "Scendi sotterra nella Rocca Paolina", "Assaggia un vero Bacio Perugina", "Cerca l'arte nella Galleria Nazionale"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Goloso", imageName: "star.fill", description: "Cuore verde d'Italia!" }
    },
    {
        id: "assisi", regionId: "umbria", name: "Assisi", type: "borgo", province: "PG", latitude: 43.0725, longitude: 12.6186,
        shortDescription: "Il candido borgo francescano, avvolto da misticismo, pace universale e i celestiali affreschi della Basilica.",
        docTips: ["Silenzio nella Basilica di San Francesco", "Sali sull'Eremo delle Carceri (Bosco Mite)", "Tramonto rosso infuocato a Santa Chiara", "Ascolta i canti gregoriani", "Porta a casa un Tau francescano"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Spirito di San Francesco", imageName: "bird.fill", description: "Pace e Bene!" }
    },
    {
        id: "orvieto", regionId: "umbria", name: "Orvieto", type: "city", province: "TR", latitude: 42.7188, longitude: 12.1119,
        shortDescription: "Famosa per lo stupefacente e sfolgorante Duomo gotico e il misterioso Pozzo di San Patrizio, posata su un altopiano tufaceo.",
        docTips: ["Sbalordisciti al cospetto del Duomo al sole", "Scendi tutti i gradini del Pozzo di S. Patrizio", "Scopri l'Orvieto sotterranea", "Bevi un calice di Orvieto Classico doc", "Sali alla Torre del Moro"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Mistero Tufaceo", imageName: "arrow.down.to.line.alt", description: "In fondo al pozzo!" }
    },
    {
        id: "spoleto", regionId: "umbria", name: "Spoleto", type: "city", province: "PG", latitude: 42.7350, longitude: 12.7369,
        shortDescription: "Antica città ducale longobarda. Teatro a cielo aperto grazie al noto ponte delle torri e al festival dei Due Mondi.",
        docTips: ["Lasciati abbracciare dalla piazza del Duomo", "Attraversa il colossale Ponte delle Torri (se aperto)", "Partecipa al Festival a giugno/luglio", "Passeggia su Via dei Duchi", "Assaggia strangozzi al tartufo nero"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Duca d'Arte", imageName: "theatermasks.fill", description: "Due mondi incontrati!" }
    },
    {
        id: "gubbio", regionId: "umbria", name: "Gubbio", type: "borgo", province: "PG", latitude: 43.3524, longitude: 12.5760,
        shortDescription: "La città di pietra più medievale d'Umbria, famosa per Don Matteo, la Corsa dei Ceri e l'incredibile Piazza Grande sospesa.",
        docTips: ["Fotografa l'imponente Piazza Grande appesa", "Sali con la cestovia (gabbia) al Monte Ingino", "Corri come pazzo se c'è la Festa dei Ceri", "Guarda la bottega dei mastri vasai antichi", "Prendi il Brevetto del Matto girando fontana"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Il Matto", imageName: "figure.run", description: "Gira la fontana!" }
    },
    {
        id: "todi", regionId: "umbria", name: "Todi", type: "borgo", province: "PG", latitude: 42.7831, longitude: 12.4081,
        shortDescription: "Definita la 'Città più vivibile del mondo'. Equilibrio perfetto tra architettura in pietra, verde lussureggiante e arte.",
        docTips: ["Passeggia nel salotto di Piazza del Popolo", "Scendi alle sorprendenti Cisterne Romane sotterranee", "Lasciati sedurre dal Tempio della Consolazione", "Degusta Grechetto DOC", "Visita San Fortunato (Tempio di Jacopone)"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Vita lenta", imageName: "leaf.fill", description: "Piccolo paradiso perfetto!" }
    },
    {
        id: "norcia", regionId: "umbria", name: "Norcia", type: "borgo", province: "PG", latitude: 42.7930, longitude: 13.0955,
        shortDescription: "Patria di San Benedetto e della 'Norcineria', fiera roccaforte montana celebre per prosciutto, tartufo nero e formaggi.",
        docTips: ["Entra in una vera, antica Norcineria per un panino epico", "Acquista il prezioso Tartufo Nero di Norcia", "Visita Piazza San Benedetto", "Respira forte l'aria della Valnerina", "Prova il puro liquore Amaro di Norcia"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Mastro Norcino", imageName: "fork.knife", description: "Gusto selvatico!" }
    },
    {
        id: "castelluccio", regionId: "umbria", name: "Castelluccio di Norcia", type: "landmark", province: "PG", latitude: 42.8277, longitude: 13.2045,
        shortDescription: "Piccolo nucleo ferito dai sismi antichi, famoso per la spettacolare 'fiorita' multicolore della pianura sottostante in estate.",
        docTips: ["Guarda la fioritura delle lenticchie a giugno/luglio", "Esegui trekking al Monte Vettore", "Mangia un piatto denso di cinghiale e lenticchie originali", "Assaggia ricotta salata purissima", "Passeggia lungo i vasti altipiani del Sibillini"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Pittore Floreale", imageName: "camera.macro", description: "Colori sgargianti ovunque!" }
    },

    // MARCHE (8)
    {
        id: "ancona", regionId: "marche", name: "Ancona", type: "city", province: "AN", latitude: 43.6158, longitude: 13.5189,
        shortDescription: "Città dorica costruita a forma di gomito sul mare, per cui puoi scorgere l'alba ed il tramonto spaccare le onde dal suo Monte Conero.",
        docTips: ["Ammira l'alba dal Passetto e il tramonto alla chiesa San Ciriaco", "Sali sul Duomo dominando il golfo", "Passeggiata al portonovo", "Pappati Moscioli selvatici del Conero (mitili)", "Tocca l'Arco di Traiano tra i vicoli portonieri"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Navigatore Dorico", imageName: "sailboat.fill", description: "Albe e tramonti mistici!" }
    },
    {
        id: "urbino", regionId: "marche", name: "Urbino", type: "city", province: "PU", latitude: 43.7262, longitude: 12.6363,
        shortDescription: "La città ideale del Rinascimento, patrimonio UNESCO, dove il tempo sembra essersi fermato alla corte di Federico da Montefeltro.",
        docTips: ["Visita il Palazzo Ducale sfarzoso", "Ammira i dipinti immensi di Raffaello (Casa Natale a due passi)", "Sali all'austera Fortezza Albornoz", "Riempiti con una spessa crescia sfogliata", "Perditi nei vicoli faticosi ed artistici"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Rinascimentale", imageName: "paintbrush.fill", description: "L'arte in ogni mattone!" }
    },
    {
        id: "ascoli_piceno", regionId: "marche", name: "Ascoli Piceno", type: "city", province: "AP", latitude: 42.8530, longitude: 13.5760,
        shortDescription: "La suggestiva e solenne 'Città delle 100 Torri', interamente forgiata in calde lastre lucenti di pura pietra focaia di travertino.",
        docTips: ["Bevi la tipica Anisetta storica Caffè Meletti", "Stupisciti ammirando l'infinita Piazza del Popolo in notturna", "Ordina decine di Olive Ascolane DOP", "Ricerca antiche iscrizioni goliardiche", "Trovati a calcare scritte sui cardini delle porte in Rua delle Stelle"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Mastro Scultore", imageName: "circle.grid.cross.fill", description: "Bianche e magiche piazze!" }
    },
    {
        id: "pesaro", regionId: "marche", name: "Pesaro", type: "city", province: "PU", latitude: 43.9103, longitude: 12.9123,
        shortDescription: "Città frizzante musicale del celebre compositore rossini. La costa sabbiosa, Bici ed un lungo mare stupendo al richiamo d'Opera.",
        docTips: ["Partecipa all'appassionato Rossini Opera Festival in sala", "Tuffa nel mare dopo la palla magica scultorea 'Sfera Grande' Pomodoro", "Visita Casa Rossini", "Mangia squisite Pizze Rossini (con maionese e uova, eh si!)", "Noleggia ciclovia costeggiando le spiagge ad adriatico"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Maestro d'Orchestra", imageName: "music.note", description: "Bici, Mare, Musica!" }
    },
    {
        id: "recanati", regionId: "marche", name: "Recanati", type: "borgo", province: "MC", latitude: 43.4018, longitude: 13.5518,
        shortDescription: "Borgo intriso d'infinito splendore romantico con memorie leopardiane fortissime. In ogni sasso riecheggiano opere di grandiosi scrittori poeti.",
        docTips: ["Cerca l'autentico Colle dell'Infinito", "Vedi in Casa madre Giacomo Leopardi sterminata biblio-memoria", "Scopri sguardi della povera 'Silvia' tra i balconi", "Cerca pure di Gigli d'Opera grandissima pittura Lorenzo Lotto", "Assapora buon Ciauscolo maceratese"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Poeta dell'Infinito", imageName: "quill", description: "Cullato fra versi dolcissimi!" }
    },
    {
        id: "gradara", regionId: "marche", name: "Gradara", type: "borgo", province: "PU", latitude: 43.9407, longitude: 12.7712,
        shortDescription: "Teatro della crudele se pur favolosa passione amorosa in età dantesca tra i dannati Paolo e Francesca, maestosa cerchiatura merlata ed uno splendido e saldo castello affacciato sul mare Adriatico.",
        docTips: ["Aggirati nelle cupe stanze di Paolo e Francesca", "Effettua camminatine di ronda altissime su mure castellari", "Compra ceramica dei mastri locale per un finto scudo", "Deliziati nei ristorantini sul crinale scosceso", "Portati alla Falconeria vicina coi predatori rari"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Eroe Cavalleresco", imageName: "shield.fill", description: "Sguardi proibiti danteschi!" }
    },
    {
        id: "loreto", regionId: "marche", name: "Loreto", type: "city", province: "AN", latitude: 43.4411, longitude: 13.6083,
        shortDescription: "Capitale mondiale della fede immensa dei mari, che si dice custodire casa miracolosa vergine per giunta traslata dalle crociate sacre volanti dall'oriente. Enorme rocca che prega il sol e la piana tra il Conero.",
        docTips: ["Inginocchiati colossale Santuario di Loreto marmoreo perimetro", "Passeggio camminamenti di ronda protettivi ed altissimi sul santuario marziale", "Richiedi rosari preziosi unici", "Osserva mirabile prospettiva delle Loggiati e piazza madonna in mezzo palazzi papali", "Mangia i biscottini tipici i cavallucci locali marchigiani"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Pellegrino Devoto", imageName: "cross.vial.fill", description: "Reliquia alata miracolosa!" }
    },
    {
        id: "senigallia", regionId: "marche", name: "Senigallia", type: "city", province: "AN", latitude: 43.7142, longitude: 13.2185,
        shortDescription: "La meta del divertimentissimo Summer Jamboree anni 50, per giunta chiamata città dalle 'spiagge dal liscio e placido e finissimo strato dorato come caldo velluto'",
        docTips: ["Rivivi atmosfere americanissime anni '50", "Danza in tondo nella celeberrima Rotonda Marel", "Lungo Misa porto e fiume peschereccio antiche viuzze", "Tira bocce con piada marchigiana (crescia) in mare finissima arenile vellutato", "Fotografa suggestiva Rocca Roveresca"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Danzatore Juke-box", imageName: "music.mic", description: "Spiaggia di velluto retro!" }
    },

    // LAZIO (10)
    {
        id: "roma", regionId: "lazio", name: "Roma", type: "city", province: "RM", latitude: 41.9028, longitude: 12.4964,
        shortDescription: "La Città Eterna, capitale d'Italia, dove ogni angolo racconta millenni di storia tra rovine imperiali, basiliche poderose e la dolce vita.",
        docTips: ["Lancia una moneta magica di Trevi ai pesci", "Mangia potente e sapida Carbonara originaria di Trastevere Testaccio", "Fori imperiali al lucore della luna (Via de' fori)", "Pellegrino di San Pietro mattiniero assiale (Senza calca vaticana!)", "Prendi e ghermisci caldo supplì al telefono (filante assai!)"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Civis Romanus", imageName: "building.columns.circle.fill", description: "L'urbe, niente meno!" }
    },
    {
        id: "tivoli", regionId: "lazio", name: "Tivoli", type: "city", province: "RM", latitude: 41.9633, longitude: 12.7986,
        shortDescription: "La città opulente estiva preferitissima dagl'intellettuali ed imperatori. Qui acqua e cascatelle rigogliano nel travertino ed antiche memorie greche mormorano per boschi freschissimi.",
        docTips: ["Perditi ore felici freschissime Villa d'Este le 100 enormi fontane sonore scoscianti in verdeggiante pendio maestoso.", "Scendi alle forre dell'inferno e precipizi spaventevoli Parco Villa Gregoriana.", "Ammetti che immensa Villa Adriana l'imperator creò", "Compra pizzelle spugnose calde in cittadella altare", "Gustati vista piana di Roma tramonti lontani."],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Villeggiante d'oro", imageName: "drop.fill", description: "Zampilli e re e ninfe d'acqua!" }
    },
    {
        id: "viterbo", regionId: "lazio", name: "Viterbo", type: "city", province: "VT", latitude: 42.4206, longitude: 12.1076,
        shortDescription: "L'importante 'Città d'Oro fortificata Dei Papi'. Rinomata dal Medioevo durissimo, tra torri papali profferlati antichi ed i sulfurei bagni vulcanici d'acque rudi etrusche termali.",
        docTips: ["Meraviglia dinanzi possente fiero e massiccio Palazzo dei Papi in peperino vulc", "Ammollati ore alle libere zampillanti calde selvagge Terme e Bagni sparsi nei campi termal", "Scoprilo tutto al buio intatto misteriosissimo quartiere Medioevo San Pellegrino incatenato da piazze incante.", "Gustati Acquacotta rude de' butteri", "Macchina Santa Rosa colossale settembre estasiato"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Cavaliere Papale", imageName: "building.fill", description: "Pietra sulfurea santa fortezza!" }
    },
    {
        id: "calcata", regionId: "lazio", name: "Calcata", type: "borgo", province: "VT", latitude: 42.2203, longitude: 12.4278,
        shortDescription: "Borgo hippie mistico stregato arroccatissimo ad ischio aspro profondo dirupo forra. Prima morto disabitato e quindi rivissuto con pazze anime hippies mondiali pazzi che le dier vivacità variopinta selvaggia pura",
        docTips: ["Siedito a chiacchiere bohemiens ed stregoni artisti vagabondi tra fedi e fumi nei localini forra antri.", "Scendi abissi valle lussureggianti magici oscuri Treja per cascatelle rinfrescati", "Beviam te dolcissima in botteguccia teiere giganti torte magiche mirtilli", "Ammira orologio solare incastonato", "Occhio felino ovunque vi son colonie randagi coccolosissime regni dei felini tra vasi crete"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Spirito Libero", imageName: "paintpalette.fill", description: "Figlio dei fiori roccia e fiumi!" }
    },
    {
        id: "civita_bagnoregio", regionId: "lazio", name: "Civita di Bagnoregio", type: "borgo", province: "VT", latitude: 42.6275, longitude: 12.1139,
        shortDescription: "Straziantemente poetica, chiamata 'La Città Che Muore' d'Italia in quanto in bilico crete calanchiche in asprissimo assottigliamento costante... accessibilissima unicamente via ponte strettissimo pedonale aereo per isola celestiale calanchifici",
        docTips: ["Vedi le forre Calanche in ogni dirupo circostante", "Attraversa pedana sospesa nell'etere foschia (brivido magico!)", "Acciuffa e divora in trattoria i saporitissimi picci pici bucatissimi funghi porcini", "Accedi sotterranei pre estrusco", "Avvista la chiesola sperduta piazzetta terrea battuta solitaria gatto"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Equilibrista del Tempo", imageName: "wind", description: "Ponte fiabesco nel cielo vuoto!" }
    },
    {
        id: "sperlonga", regionId: "lazio", name: "Sperlonga", type: "borgo", province: "LT", latitude: 41.2585, longitude: 13.4326,
        shortDescription: "Il chiarissimo candido villaggio intonaci bianchi simil-greco appollaiato irto rupe strapiombo Mar Tirreno spumeggiate smeraldo mare limpido. Rinomato ritiro estivo Tiberio ed Odisseo ciclopico",
        docTips: ["Scopriti groviglio arrampicate faticose bianche linde accecanti vicolette a picco gradoni", "Osserva museo Antri Grotta in Mare colossale statua Imperatore Tiberio relitta tra marosi", "Fai bagno lido finissimo e Torre Truglia antica saracena fiera avvistamenti", "Pappati grandissimo Tiella gaetana di polipi succulenti ed olivo olive di Itri e sciacqua veraci pescati", "Cerca finestre azzurre fioratissime pittoresco balconi"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Bianca Saracena", imageName: "eyes.inverse", description: "Profumo d'ulivo e di lido!" }
    },
    {
        id: "tarquinia", regionId: "lazio", name: "Tarquinia", type: "city", province: "VT", latitude: 42.2478, longitude: 11.7586,
        shortDescription: "Cuore e anima etrusca e misteri oscuri morte in tombe favolose. Custode unica UNESCO e scrigno magico mondo ultraterreno necropoli frescati coi vividissimi demoni etruschi danzanti antiche usanze per sempre e di un mare vicino lido torride etruscherie",
        docTips: ["Penetra antri tenebrosissimi della stupefacente necropoli etruschia colorante Monterozzi, UNESCO vero", "Spaurisciti ad ammirare fieri cavalli alati museo formidabile nazionale etrusco", "Deliziati borgo superbo medieval torrigiano altissimo a Corneto, tra mura severe", "Mastica pesce buonissimo arrosti di mare al fiero e battuto Lido vicino Tarquinia.", "Ricercate in calanchi natura intatta salite dolci campi coltivati macchia etruscheria campale isolata"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Danzatore Etrusco", imageName: "sparkles", description: "Colori vivi dell'aldilà antico!" }
    },
    {
        id: "frascati", regionId: "lazio", name: "Frascati", type: "city", province: "RM", latitude: 41.8080, longitude: 12.6840,
        shortDescription: "Celeberrima sfarzosissima Città Dei Castelli Romani alle porte urbe collinari tra grandissime opulente sfrenate Ville Tuscolane aristocratiche in verdissime frasche e vigneti generosissimi d'uve bionde e famosissime fraschette",
        docTips: ["Bevi gagliardo un boccale, fojetta fresca Vino fragrante doc ai Castelli romanaccio", "Entra Fraschette tipicissime popolari porchetta enorme pane caldo vino fresco spensierati e canti tavolata legno stracolme", "Incammina in mastodontica opulente Villa Aldobrandini parco verdissimo fontaniere acquatici d'effetti sfavillanti e teatrale maestà", "Canta sornioni scorci e salite in passeggiata centrale serale borghese", "Sbircialo a lungo panorama cupola di San pietro brillar su in orizzonte urbe estasi romano tramonto"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Bongustaio de Roma", imageName: "wineglass.fill", description: "Una gita ai castelli dorati!" }
    },
    {
        id: "anagni", regionId: "lazio", name: "Anagni", type: "city", province: "FR", latitude: 41.7438, longitude: 13.1537,
        shortDescription: "Detta fieramente la sdegnosissima 'Città dei Papi Ciociari' che diede asilo natali altomedioevali ai potenti in diatriba (Bonifacio VIII - lo schiaffo sonoro!). Tesori sotterranei in cattedrali cripte",
        docTips: ["Sconvolgiti in estasi innanzi coloratissimo imponente ciclo affreschi superbo cripta San Magno (La cappella sisitina del Medioevo!)", "Fiera scopri sdegno storico Palazzo Bonifacio 8vo scena epocale di schiaffi oltraggio dei Francesi! Sciarrati", "Gustati potente pasto ricoperto e gremito in ciociaria di finissima Abbacchio pecorino rustici formaggi veraci veraci e vini Cesanese", "Immersi tra viuzze austere di puro aspro calcare di fiero spessore grigio severe magioni medioevo intatte piazze aspre ciociara collina possente.", "Ammirale bifore palazzo conciliare magnifiche goticissime archi"],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Eroe Cibernetico", imageName: "graduationcap.fill", description: "Pergamene ed anatemi papali!" }
    },
    {
        id: "gaeta", regionId: "lazio", name: "Gaeta", type: "city", province: "LT", latitude: 41.2139, longitude: 13.5707,
        shortDescription: "Un incanto roccioso ed ultima imprendibile fortezza marittima per secoli tra due Regni Reali in scisma. Diviso tra spiagge sabbiose da sogno, l'ardito Santuario fenduto e mare d'ulivi montani Itri",
        docTips: ["Coraggioso addentrati vertiginosa altissima Montagna Spaccata dirupo abisso su mare aperto con grotta al Turco", "Goditi relax lunghissimo duna bianca finissima del Serapo soleggiante mare limpido tirreno", "Incitati a pappare voracemente golose grandissime pesanti Tiella sfoglie ripiene gaetane piene sarde polipetti scorfani saporitissime divine!", "Saluto torre svettante mausoleo antico romano Lucio munazio planco alto promontorio circondato mare verde azzurro lido estasiato parco falesia e santuari mistici di orlando eroi saraceni antichi sogni.", "Sali su fiera castello Aragonese svettante prigione forte e chiara su golfo golfo intiero magico panorama."],
        nightTips: [
            "Ammirare il suggestivo panorama illuminato",
            "Passeggiata serale nel centro storico",
            "Aperitivo nei locali caratteristici",
            "Cena degustando i piatti tipici",
            "Godersi l'atmosfera notturna locale"
        ],
        badge: { title: "Difensore del Mare", imageName: "shield.lefthalf.filled", description: "Montagna divisa e mare sacro!" }
    }
];
