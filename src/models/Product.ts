import { DataTypes, Model } from "sequelize";
import { db } from '../database/database';
import { ProductTable } from "./ProductTable";

const productData = [
  {
    "url": "ploganker",
    "no_title": "Aqualink Ploganker Serie",
    "no_description": "<p>AQUALINK ploganker er et av de mest effektive ankere på markedet. Ankeret har oppnådd svært gode resultater i fullskalatester, og har i løpet av kort tid markert seg som et meget annvennlig anker på grunn av dets utforming og høye holdekraft. Ankeret er beregnet for bruk på myke havbunnsflater slik som sand og leire. Med dets dobbelt spissede form og anleggsflate, penetrerer det underlaget raskt og effektivt Alle ankerne tilfredsstiller kravene til NS 9415:2009</p><p>AQUALINK sine plogankere finnes i følgende størrelser:</p>",
    "en_title": "Aqualink Plow Anchor Series ",
    "en_description": "<p>AQUALINK plow anchors are one of the most efficient anchors on the market. The anchor has achieved very good results in full-scale tests, and has in a short time marked itself as a very friendly anchor due to its design and high holding force. The anchor is intended for use on soft seabed surfaces such as sand and clay. With its double pointed shape and contact surface, it penetrates the substrate quickly and efficiently. All anchors satisfy the requirements of NS 9415: 2009 </p><p>AQUALINK's plow anchors are available in the following sizes: </p> ",
    "product_image": null
  },
  {
    "url": "notlodd-vektlokke",
    "no_title": "Aqualink Notlodd-Vektløkker",
    "no_description": "<p>Bruk av brukt rigg kjetting til lodding av nøtene har ført til uønskede hendelser en rekke ganger. Vårt bidrag reduserer denne problematikken både med tanke på HMS og rømming. Ved å benytte materialer som er skånsom mot noten og reduserer risikoen for rømning, har AQUALINK AS utviklet et vektlodd i stål innkapslet i polyuretan.</p> <p>Loddet leveres i 2 størrelser: 80 kg og 250 kg</p><p>Produktet er svært fleksibel i bruk og lodd av denne typen kan bygges opp til 6500kg.</p><p>Med andre ord du kan selv bygge den vekt størrelsen som måtte passe ditt behov.</p><ul><li>Skånsom mot not, redusert fare for rømming</li><li>Ingen rust dannelse (vanntett)</li><li>Mindre volum</li><li>Gjenbruk</li><li>Redusert fare for uhell ved håndtering på dekk for service personell</li><li>Enkelt vedlikehold ved skifte av slings eller plugg</li><li>Fleksibilitet – øke og redusere vekt etter eget behov</li></ul><p>Innfestningspunktene mot not/flyter er utformet slik at bruk av stålkomponenter er eliminert. Loddet holdes oppe av en galvansiert stålplugg med påsveiset løfteøye.</p><p>Sertifiserte stropper i polyester er festet i stålpluggens løfteøye og sørger for at ingen av loddets stålkomponenter har fysisk kontakt med noten. Loddet kan også benyttes som single vektløkker ved å snare en rundslings gjennom senter hullet av loddet.</p>",
    "en_title": "Aqualink Netlodd-Weight Loops ",
    "en_description": "<p>The use of a used rig chain to solder the nets has led to undesirable events a number of times. Our contribution reduces this problem both in terms of HSE and escape. By using materials that are gentle on the net and reduce the risk of escape, AQUALINK AS has developed a weight weight in steel encapsulated in polyurethane. </p> <p> The weight is delivered in 2 sizes: 80 kg and 250 kg </p> <p>The product is very flexible in use and weights of this type can be built up to 6500kg. </p> <p> In other words you can build the weight size that may suit your needs. </p> <ul> <li> Gentle against net, reduced risk of escape </li> <li> No rust formation (waterproof) </li> <li> Less volume </li> <li> Reuse </li> <li> Reduced risk of accidents when handling tires for service personnel </li> <li> Easy maintenance when changing slings or plugs </li> <li> Flexibility - increase and decrease weight according to your own needs </li> </ul> <p> The attachment points to the net / float are designed so that the use of steel components is eliminated. The weight is supported by a galvanized steel plug with a welded lifting eye. </p> <p> Certified straps in polyester are attached to the steel plug's lifting eye and ensure that none of the weight's steel components have physical contact with the groove. The weight can also be used as a single weight loop by twisting a loop through the center hole of the weight. </p> ",
    "product_image": null
  },
  {
    "url": "taukauser-med-parelokke",
    "no_title": "Aqualink Taukauser Med Pæreløkke",
    "no_description": "<p>Alle K3-B2 kauser fra AQUALINK med pæreløkke leveres i galvanisert utførelse. Denne kause typen er valgt for å unngå at kausen \"klapper\" sammen ved størrer belastninger. </p><p>De påsveiste ørene langs sidene på kausene sørger for at tauet holdes på plass i kausen.</p><p><b>Sporbarhet:</b></p><p>Både kause og pæreløkke er batch merket</p><p><b>Montering og bruk:</b></p><p>Kauser med pæreløkke benyttes i fortøyningsliner, haneføtter og rammetau og skal kun belastes i lengderetningen</p><p>Kauser spleises inn i tau med minimum 4 innstikk</p>",
    "en_title": "Aqualink Rope Cause Bulb Loop",
    "en_description": "<p>All K3-B2 socks from AQUALINK with bulb loop are delivered in galvanized design. This type of cause is chosen to prevent the cause from \"collapsing\" at higher loads. </p> <p> The welded ears along the sides of the causers ensure that the rope is kept in place in the causer. </p> <p> <b> Traceability: </b> </p> <p> Both causal and bulb loop is batch marked </p> <p> <b> Assembly and use: </b> </p> <p> Causes with bulb loop are used in mooring lines, cock feet and frame ropes and should only be loaded in the longitudinal direction </p> <p> Causes are spliced into ropes with a minimum of 4 inserts </p> ",
    "product_image": null
  },
  {
    "url": "trossekauser-polyuretan",
    "no_title": "Aqualink Trosskauser Polyuretan",
    "no_description": "<p>AQUALINK sine nyeste polyuretan kauser tilfredsstiller alle kravene til NS-9415:2009Kausen er meget slitesterk har lav vekt og har en overlegen levetid i forhold til tradisjonelle stålkauser.Den har gjennomgått omfattende tester over lang tid både i sjø og på land og viser ingen synlige tegntil skade eller slitasje.</p><p>Hver kausestørrelse har sin unike farge som gjør identifisering av taudimensjoner under vann lettere.Kausene benyttes sammen med AQUALINK sine egenutviklede pæreløkker for opptimal tilpassning.</p>",
    "en_title": "Aqualink Polyurethane Socks",
    "en_description": "<p>AQUALINK's latest polyurethane socks meet all the requirements of NS-9415: 2009 The sock is very durable, has low weight and has a superior service life compared to traditional steel socks. It has undergone extensive tests over a long period of time both at sea and on land and shows no visible signs of damage or wear. </p> <p> Each socket size has its unique color that makes identification of rope dimensions underwater easier. The socks are used together with AQUALINK's self-developed bulb loops for optimal fit. </p>",
    "product_image": null
  },
  {
    "url": "parelokke",
    "no_title": "Aqualink Pæreløkke",
    "no_description": "<p>AQUALINK smidde pæreløkker er tilpasset bruken av AQUALINKS egenutviklede polyuretan kauser.Pæreløkkens design sørger for en stabil passform selv under meget høye strekkbelastninger.</p><p><b>Sporbarhet:</b></p><p>Pæreløkke er batch merket</p> <p><b>Montering og bruk:</b></p><p>Pæreløkke benyttes i fortøyningsliner, haneføtter og rammetau og skal kun belastes i lengderetningen</p>",
    "en_title": "Aqualink Bulb Loop",
    "en_description": "<p>AQUALINK forged bulb loops are adapted to the use of AQUALINK's self-developed polyurethane socks. The bulb loop's design ensures a stable fit even under very high tensile loads. </p> <p> <b> Traceability: </b> </p> <p > Bulb loop is batch marked </p> <p> <b> Assembly and use: </b> </p> <p> Bulb loop is used in mooring lines, cock feet and frame ropes and should only be loaded in the longitudinal direction </p>",
    "product_image": null
  },
  {
    "url": "fortoyningssjakler",
    "no_title": "Aqualink Fortøyningssjakler",
    "no_description": "<p>AQUALINK sine oppdrettsjakler er utviklet til fortøyninger i kombinasjon med kjetting tau og trosser. Sjakelen er målsatt og dimensjonert med ekstra stor bøyle åpning og innvendig høyde for å kunne kombineres med K3-trossekauser Sjaklene leveres med forsterket mutterbolt med stort splinthull i bolten.</p><p><b>Sporbarhet:</b></p><p>Sjaklenes bøyle er merket med MBL, fabrikant og kodemerking mens bolten har sporbarhetsmerking.</p><p><b>Montering og bruk:</b></p><p>Sjakler benyttes som koblingspunkt mellom alle komponenter i fortøyningssystemet. Sjakler bør brukes slik at belastningen påføres mest mulig i lengde rettningen, da de er konstruert og sertifisert for dette. Anleggspunktene skal være midt i bøylen og mest mulig fordelt på boltens bredde. Hvis sjaklene brukes i flerpartsredsap vil økt vinkel mellom partene øke belastningen. Sjakelbolten må altid sikres med spint eller bendsling etter at mutteren er trukket til. Hvis sjakler skal koples sammen, skal det altid gjøres mot bøyle.</p><p>Bruk ikke sjakler i temperaturer over 2500 C<sup>0</sup></p><ul><li>Passer til samtlige Greenpin fortøyningssjakler med nominelt låsehull på 6 mm</li><li>Raskere montering og ikke minst mye lettere</li><li>Skader ikke operatør ved montering eller demontering</li><li>Ruster ikke og langt mer synlig ved ROV inspeksjoner</li><li>Dobbel sikring med mothaker og friksjon</li><li>Robust og spesialprodusert plastmateriale</li><li>Presses helt inn slik at hodet bunner mot bolten</li><li>Sjekk at mothaker gir inngrep ved å presse motsatt vei</li></ul>",
    "en_title": "Aqualink Mooring shackles",
    "en_description": "<p>AQUALINK's breeding jackets are developed for moorings in combination with chain ropes and ropes. The shackle is dimensioned and dimensioned with an extra large hoop opening and internal height to be able to be combined with K3 rope stockings. The shackles are delivered with a reinforced nut bolt with a large splinter hole in the bolt. p> <p> The shackles' hoop is marked with MBL, manufacturer and code marking while the bolt has traceability marking. </p> <p> <b> Mounting and use: </b> </p> <p> Shackles are used as a connection point between all components of the mooring system. Shackles should be used so that the load is applied as much as possible in the longitudinal direction, as they are designed and certified for this. The abutment points must be in the middle of the hoop and as wide as possible distributed over the width of the bolt. If the shackles are used in multi-party tools, an increased angle between the parties will increase the load. The shackle bolt must always be secured with a pin or bend after the nut has been tightened. If shackles are to be connected, always do so against the hoop. </p> <p> Do not use shackles in temperatures above 2500 C <sup> 0 </sup> </p> <ul> <li> Fits all Greenpin mooring shackles with nominal locking hole of 6 mm </li> <li> Faster assembly and not least much easier </li> <li> Does not damage the operator during assembly or disassembly </li> <li> Does not rust and is much more visible at ROV inspections </li> <li> Double securing with barbs and friction </li> <li> Robust and specially produced plastic material </li> <li> Pressed in completely so that the head bottoms against the bolt </li> <li> Check that barbs act by pushing the opposite way </li> </ul>",
    "product_image": null
  },
  {
    "url": "fiberstropper",
    "no_title": "Aqualink Fiberstropper",
    "no_description": "<p><b>Før bruk:</p></b> <p>Sjekk at merkelappen er synlig og lesbar, og at opplysningene stemmer med produktet.Sørg for å følge flytekrageleverandørens anvisning dersom redskapet monteres i sjakler ellersnares fast i egnede innfestningspunkter ved bruk som hanefotinnfestning.</p><p><b>Kontroller at det ikke er: </b></p><ul><li>knuter</li><li>hull i beskyttelsesduken på rundslingen, slik at garnet er synlig</li><li>revnete sømmer og kutt</li><li>varmeskader/sveisesprut</li><li>kjemikalieskader</li></ul><p>Hvis stroppene er veldig tilsmusset, kan de vaskes med et mildt rengøringsmiddel og Vann.</p><p><b>Sporbarhet:</b></p><p>Fiberstropper levert a AQUALINK er produsert og merket i henhold til EN1492.1-2 for båndstropper og rundslings.</p><p>Stroppens serienummer står angitt på produktsertiakat.</p><p>Om ID-tag er en del av merkingen er denne sydd fast i stroppen med individuelt nummer for hver stropp/slings.</p>",
    "en_title": "Aqualink Fiber Straps ",
    "en_description": "<p> <b> Before use: </p> </b> <p> Check that the label is visible and legible, and that the information matches the product. attachment points when used as a cock foot attachment. </p> <p> <b> Check that there are no: </b></p><ul><li>knots</li> <li> holes in the protective fabric on the round loop, so that the yarn is visible </li> <li> torn seams and cuts </li> <li> heat damage / welding spatter </li> <li> chemical damage </li> </ul> <p> If the straps are very dirty , they can be washed with a mild detergent and Water. </p> <p> <b> Traceability: </b> </p> <p> Fiber straps supplied by AQUALINK are manufactured and marked in accordance with EN1492.1-2 for straps and round slings. </p> <p> The strap's serial number is stated on the product certificate. </p> <p> If the ID tag is part of the marking, this is sewn into the strap with an individual number for each strap / sling. </p>",
    "product_image": null
  }
]

interface ProductData extends Model {
  url: string;
  en_title: string;
  no_title: string;
  en_description: string;
  no_description: string;
  product_image: string;
}

const Product = db.define<ProductData>('product', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  en_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  no_title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  en_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  no_description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  product_image: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

Product.sync({force: true}).then(async () => {
  const products = await Product.findAll();
  if (!products || !products.length) {
    console.log('Creating initial Products...');
    await Product.bulkCreate(productData);
    console.log('Created Products!');
  }
}).catch(err => {
  console.log('Unable to create products', err);
});

export {
  Product,
  ProductData
}