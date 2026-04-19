export type Article = {
  slug: string
  title: string
  description: string
  date: string
  dateIso: string
  readTime: number
  category: string
  keywords: string[]
  content: string
}

export const ARTICLES: Article[] = [
  {
    slug: 'calcul-food-cost-restaurant',
    title: 'Calcul food cost restaurant : la méthode complète pour maîtriser vos coûts en 2026',
    description: 'Apprenez à calculer le food cost de votre restaurant pas à pas : formule, benchmark par type de plat, et outils pour automatiser le suivi. Guide complet 2026.',
    date: '7 avril 2026',
    dateIso: '2026-04-07',
    readTime: 9,
    category: 'Gestion',
    keywords: ['food cost', 'calcul food cost restaurant', 'coût matière restaurant', 'ratio matière', 'marge brute restauration'],
    content: `
<h2>Qu'est-ce que le food cost et pourquoi c'est critique ?</h2>
<p>Le food cost (ou coût matière) représente la part du prix de vente d'un plat qui est consacrée aux ingrédients bruts. C'est l'un des indicateurs les plus fondamentaux de la rentabilité d'un restaurant — et pourtant, la majorité des restaurateurs ne le calculent pas régulièrement.</p>
<p>Un food cost mal maîtrisé peut faire couler un établissement, même avec une salle pleine tous les soirs. En France, les restaurants qui ferment dans les 3 premières années le font souvent faute d'un suivi rigoureux de leurs coûts.</p>

<h2>La formule du food cost en 3 étapes</h2>
<p>Le calcul du food cost repose sur une formule simple :</p>
<blockquote>
  <strong>Food cost % = (Coût des ingrédients ÷ Prix de vente HT) × 100</strong>
</blockquote>
<p>Par exemple, si votre entrecôte revient à 7,80 € en ingrédients et que vous la vendez 26 € HT, votre food cost est de <strong>30 %</strong>.</p>

<h3>Étape 1 — Lister tous les ingrédients et leurs grammages</h3>
<p>Pour chaque plat, notez chaque ingrédient avec sa quantité exacte (en grammes ou centilitres). N'oubliez pas les garnitures, les sauces, les condiments et les perditions (épluchage, cuisson).</p>

<h3>Étape 2 — Valoriser chaque ingrédient au prix d'achat réel</h3>
<p>Ramenez chaque ingrédient à son coût au kilo ou au litre, en vous basant sur vos dernières factures fournisseurs. C'est ici que beaucoup de restaurateurs perdent du temps — ou abandonnent.</p>

<h3>Étape 3 — Additionner et diviser par le prix de vente HT</h3>
<p>Additionnez le coût de tous les composants pour obtenir le coût matière total du plat. Divisez par le prix de vente HT et multipliez par 100.</p>

<h2>Benchmarks food cost par type d'établissement</h2>
<p>Les fourchettes acceptables varient selon le type de restauration :</p>
<ul>
  <li><strong>Gastronomique</strong> : 25 – 35 % (produits nobles, mais marges élevées)</li>
  <li><strong>Bistrot / brasserie</strong> : 28 – 35 %</li>
  <li><strong>Restauration rapide</strong> : 25 – 30 %</li>
  <li><strong>Pizzeria</strong> : 20 – 28 %</li>
  <li><strong>Burger</strong> : 25 – 32 %</li>
</ul>
<p>Au-delà de 38 %, votre restaurant est en danger structurel si les charges de personnel et le loyer sont dans les normes.</p>

<h2>Le food cost idéal selon la règle des 3 tiers</h2>
<p>La règle classique de la restauration française divise le chiffre d'affaires en trois tiers environ :</p>
<ul>
  <li><strong>~30 %</strong> : coût matière (food cost + boissons)</li>
  <li><strong>~35 %</strong> : masse salariale (personnel de salle + cuisine)</li>
  <li><strong>~15 %</strong> : charges fixes (loyer, énergie, assurances…)</li>
  <li><strong>~20 %</strong> : marge opérationnelle avant impôts</li>
</ul>
<p>Si votre food cost dépasse 33 %, soit vous comprimez les salaires, soit vous ne dégagez pas de bénéfice. C'est mathématique.</p>

<h2>Les erreurs classiques dans le calcul du food cost</h2>
<h3>Erreur 1 — Ne pas tenir compte des pertes</h3>
<p>Un filet de bœuf acheté 18 €/kg perd environ 15 % à la parage. Le coût réel utilisable monte donc à ~21 €/kg. Un agneau entier peut perdre jusqu'à 40 % entre os, gras et parures. Ne pas intégrer ces pertes fausse systématiquement vos calculs à la baisse.</p>

<h3>Erreur 2 — Utiliser les prix d'achat d'il y a 6 mois</h3>
<p>Les prix des matières premières fluctuent. Le poulet fermier Label Rouge peut varier de 20 % entre janvier et juillet selon la saison. Travailler avec des prix périmés conduit à des food costs calculés trop bas — et des plats vendus à perte sans que vous le sachiez.</p>

<h3>Erreur 3 — Ignorer les ingrédients "de base"</h3>
<p>Huile d'olive, sel, poivre, herbes fraîches, beurre de cuisson : ces ingrédients semblent anodins mais représentent souvent 2 à 4 % du coût d'un plat. Sur un mois, c'est significatif.</p>

<h3>Erreur 4 — Calculer une seule fois par an</h3>
<p>Le food cost n'est pas un exercice annuel. Idéalement, recalculez à chaque changement de carte et à chaque variation notable des prix fournisseurs. En 2025-2026, avec l'inflation des matières premières, certains restaurateurs ont vu leur food cost grimper de 5 points en quelques mois sans le détecter.</p>

<h2>Food cost vs coût de revient : ne pas confondre</h2>
<p>Le food cost ne mesure que les ingrédients. Le <strong>coût de revient</strong> intègre en plus la main d'œuvre directe (temps de préparation du plat) et parfois les charges indirectes. Pour un restaurant gastronomique où la préparation d'un plat demande 45 minutes de travail, le coût de revient peut être 2 fois supérieur au food cost seul.</p>

<h2>Comment automatiser le suivi du food cost</h2>
<p>La principale raison pour laquelle les restaurateurs ne suivent pas leur food cost ? Le temps que ça prend. Recalculer à la main 30 recettes avec des prix qui changent toutes les semaines est chronophage.</p>
<p>Des outils comme <strong>Costyfood</strong> automatisent ce processus : entrez le nom d'un plat, l'IA génère les ingrédients avec leurs grammages, et les prix sont mis à jour chaque semaine à partir des cotations officielles FranceAgriMer. Vous obtenez en 30 secondes le food cost %, la marge brute et le prix de vente conseillé.</p>

<h2>Le price advised : comment fixer son prix de vente ?</h2>
<p>À partir du coût matière, vous pouvez calculer le prix de vente minimum en appliquant votre coefficient multiplicateur cible :</p>
<blockquote>
  <strong>Prix de vente HT = Coût matière ÷ Food cost cible</strong>
</blockquote>
<p>Pour un food cost cible de 30 % et un coût matière de 4,50 € :</p>
<blockquote>Prix de vente HT = 4,50 ÷ 0,30 = <strong>15 € HT</strong>
</blockquote>
<p>Pensez à vérifier ce prix face à votre positionnement et à la concurrence locale — le calcul donne un plancher, pas forcément le prix optimal de marché.</p>

<h2>Tableau récapitulatif : food cost moyen par catégorie de plat</h2>
<ul>
  <li><strong>Entrées froides</strong> (carpaccio, tartares) : 22 – 30 %</li>
  <li><strong>Entrées chaudes</strong> (foie gras poêlé, ris de veau) : 30 – 40 %</li>
  <li><strong>Poissons</strong> (bar, turbot, sole) : 35 – 45 %</li>
  <li><strong>Viandes rouges</strong> (entrecôte, filet) : 28 – 38 %</li>
  <li><strong>Volailles</strong> (poulet rôti, canard) : 22 – 32 %</li>
  <li><strong>Desserts</strong> (tartes, mousses) : 15 – 25 %</li>
  <li><strong>Menus dégustation</strong> : calculer sur l'ensemble, cible 30 %</li>
</ul>

<h2>Conclusion</h2>
<p>Maîtriser son food cost n'est pas réservé aux grandes chaînes ou aux consultants. Avec la bonne méthode et les bons outils, n'importe quel restaurateur peut avoir une visibilité précise sur ses marges — et agir avant que les chiffres ne virent au rouge. Commencez par calculer le food cost de vos 5 plats les plus vendus cette semaine. Les résultats vous surprendront probablement.</p>
    `,
  },
  {
    slug: 'menu-engineering-guide',
    title: 'Menu engineering : comment optimiser votre carte pour maximiser vos profits',
    description: 'Guide complet du menu engineering : matrice BCG appliquée à la restauration, analyse plats stars et poids morts, techniques de présentation. Augmentez vos marges sans changer vos prix.',
    date: '3 avril 2026',
    dateIso: '2026-04-03',
    readTime: 11,
    category: 'Stratégie',
    keywords: ['menu engineering', 'menu engineering restaurant', 'ingénierie menu', 'analyse carte restaurant', 'optimisation carte restaurant'],
    content: `
<h2>Qu'est-ce que le menu engineering ?</h2>
<p>Le menu engineering (ou ingénierie de carte) est une méthodologie de gestion des restaurants qui consiste à analyser simultanément la popularité et la rentabilité de chaque plat, puis à prendre des décisions stratégiques sur la composition et la présentation de la carte. Développée dans les années 1980 par les chercheurs Kasavana et Smith, cette approche est aujourd'hui utilisée par les chaînes internationales comme par les bistrots indépendants.</p>
<p>L'objectif est clair : augmenter le résultat net du restaurant sans nécessairement toucher aux prix, en agissant sur le mix de vente.</p>

<h2>La matrice du menu engineering : 4 catégories de plats</h2>
<p>Le menu engineering classe chaque plat dans une matrice 2×2 selon deux critères :</p>
<ul>
  <li><strong>Popularité</strong> : part du plat dans le total des plats vendus (au-dessus ou en-dessous de la moyenne)</li>
  <li><strong>Contribution marginale</strong> : marge brute unitaire (prix de vente HT − coût matière)</li>
</ul>

<h3>1. Les Stars ⭐ — populaires ET rentables</h3>
<p>Ce sont vos plats locomotives. Très commandés et générateurs de marge élevée, ils sont le cœur de votre rentabilité. <strong>Action</strong> : maintenez leur qualité, ne touchez pas aux prix, donnez-leur une place premium sur la carte.</p>

<h3>2. Les Vaches à lait 🐄 — populaires MAIS peu rentables</h3>
<p>Ces plats font tourner la salle mais s'ils représentent trop de volume, ils pèsent sur votre résultat. <strong>Actions possibles</strong> : légère hausse de prix, réduction des portions, remplacement d'un ingrédient coûteux par une alternative équivalente.</p>

<h3>3. Les Énigmes ❓ — rentables MAIS peu commandés</h3>
<p>Ces plats ont de bonnes marges mais passent inaperçus. Souvent sous-valorisés dans la présentation. <strong>Actions possibles</strong> : repositionnement sur la carte (emplacement, encadré, photo), amélioration du descriptif, formation des serveurs pour les recommander.</p>

<h3>4. Les Poids morts 💀 — ni populaires NI rentables</h3>
<p>À supprimer ou à refondre entièrement. Ils mobilisent du stock, de la mise en place et de la charge mentale sans retour suffisant. Ne gardez un poids mort que s'il joue un rôle stratégique spécifique (plat végétarien obligatoire, plat enfant, etc.).</p>

<h2>Comment réaliser l'analyse en pratique</h2>

<h3>Étape 1 — Extraire les ventes sur une période représentative</h3>
<p>Utilisez votre logiciel de caisse (Lightspeed, Zelty, L'Addition, etc.) pour extraire le nombre de couverts par plat sur minimum 4 semaines. Évitez les périodes atypiques (vacances scolaires, événements exceptionnels).</p>

<h3>Étape 2 — Calculer la contribution marginale de chaque plat</h3>
<blockquote>
  <strong>Contribution marginale = Prix de vente HT − Coût matière</strong>
</blockquote>
<p>Un plat à 22 € HT avec un food cost de 6,60 € génère une contribution de 15,40 €. Un autre plat à 18 € avec un food cost de 3,60 € génère 14,40 €. Malgré le prix plus bas, il est presque aussi rentable en valeur absolue.</p>

<h3>Étape 3 — Calculer les moyennes et positionner chaque plat</h3>
<p>Calculez la popularité moyenne (nombre total de plats vendus ÷ nombre de plats à la carte). Calculez la contribution marginale moyenne. Positionnez chaque plat dans la matrice.</p>

<h3>Étape 4 — Décider et agir sur chaque catégorie</h3>
<p>Priorisez vos actions selon l'impact potentiel : une vache à lait vendue 80 fois par semaine avec une marge augmentée de 1,50 € rapporte 120 € de marge supplémentaire par semaine, soit plus de 6 000 € sur l'année.</p>

<h2>Les leviers de présentation de la carte</h2>

<h3>La règle du triangle d'or</h3>
<p>L'œil d'un client qui ouvre une carte suit un parcours naturel : il va d'abord en haut à droite, puis en haut à gauche, puis au centre. Ce sont les zones les plus lues. Placez vos <strong>Stars</strong> et vos <strong>Énigmes</strong> à fort potentiel dans ces zones.</p>

<h3>L'effet d'ancrage par les prix</h3>
<p>Intégrez 1 ou 2 plats premium (avec une marge absolue très élevée, même si le food cost % est plus élevé) en haut de chaque catégorie. Ils font paraître les plats de milieu de gamme plus accessibles et dirigent le choix vers eux — qui sont souvent vos meilleures vaches à lait ou Stars.</p>

<h3>La typographie et les descriptions</h3>
<p>Un plat décrit comme "Selle d'agneau de lait des Pyrénées, jus court au thym et polenta crémeuse" se vend mieux que "Agneau — polenta". Les adjectifs d'origine et les descripteurs sensoriels augmentent le prix perçu et la propension à commander.</p>

<h3>Supprimer les symboles monétaires</h3>
<p>Plusieurs études montrent que la suppression du symbole "€" ou "$" sur les cartes augmente le ticket moyen de 5 à 12 %. Le client se concentre sur le plat plutôt que sur le prix.</p>

<h3>La longueur de carte optimale</h3>
<p>Une carte trop longue (plus de 8 plats par catégorie) crée un effet de sur-choix qui stresse le client et l'amène à se replier vers des valeurs sûres — souvent vos plats les moins différenciants. Visez 5 à 7 entrées, 6 à 8 plats, 4 à 5 desserts.</p>

<h2>Menu engineering et saisonnalité</h2>
<p>Les plats de saison ont généralement un food cost plus favorable car les prix des ingrédients de saison sont plus bas. Intégrez la saisonnalité dans votre analyse : un plat classé "Poids mort" en janvier peut devenir une "Star" en été avec des ingrédients différents.</p>
<p>En France, les cotations FranceAgriMer permettent de suivre les fluctuations hebdomadaires des prix des fruits, légumes et viandes. Des outils comme Costyfood agrègent ces données pour mettre à jour automatiquement vos food costs en temps réel.</p>

<h2>Mesurer les résultats du menu engineering</h2>
<p>Après avoir mis en place les modifications (présentation, suppression, repricing), refaites l'analyse 6 à 8 semaines plus tard. Les indicateurs à suivre :</p>
<ul>
  <li>Ticket moyen HT par couvert (doit augmenter)</li>
  <li>Contribution marginale totale par service</li>
  <li>Part des Stars dans le mix de vente (doit augmenter)</li>
  <li>Part des Poids morts (doit diminuer ou disparaître)</li>
</ul>

<h2>Exemple concret : bistrot de 40 couverts</h2>
<p>Un bistrot parisien analyse sa carte de 28 plats. Résultat de l'audit :</p>
<ul>
  <li>6 Stars (dont l'entrecôte et le tartare de thon)</li>
  <li>8 Vaches à lait (dont le magret de canard — 45 couverts/semaine mais contribution à 9 €)</li>
  <li>7 Énigmes (dont une côte de cochon fermier jamais mise en avant)</li>
  <li>7 Poids morts</li>
</ul>
<p>Actions prises : suppression de 5 poids morts, +1,50 € sur 3 vaches à lait, repositionnement de la côte de cochon en première position de la rubrique viandes avec un descriptif renforcé. Résultat à 8 semaines : +14 % de contribution marginale totale par service.</p>

<h2>Conclusion</h2>
<p>Le menu engineering n'est pas une science exacte — c'est une méthode structurée pour prendre de meilleures décisions sur votre carte. Même une analyse partielle (se concentrer sur vos 10 plats les plus vendus) peut avoir un impact immédiat sur votre résultat. Commencez par identifier vos Stars et vos Poids morts cette semaine — le reste suivra.</p>
    `,
  },
  {
    slug: 'prix-ingredients-restauration-2026',
    title: "Prix des ingrédients en restauration 2026 : tendances, hausses à surveiller et stratégies d'achat",
    description: 'Analyse complète des prix des ingrédients en restauration pour 2026 : viandes, poissons, légumes, produits laitiers. Tendances FranceAgriMer, hausses attendues et conseils pour préserver vos marges.',
    date: '28 mars 2026',
    dateIso: '2026-03-28',
    readTime: 10,
    category: 'Marchés',
    keywords: ['prix ingrédients restauration 2026', 'hausse prix matières premières restaurant', 'cotations FranceAgriMer', 'inflation restauration', 'coût ingrédients 2026'],
    content: `
<h2>Contexte général : l'inflation des matières premières en 2026</h2>
<p>Après deux années de forte inflation (2022–2024), le marché des matières premières alimentaires s'est partiellement stabilisé en 2025. Mais la stabilisation n'est pas uniforme : certaines catégories continuent de progresser tandis que d'autres se normalisent. Pour les restaurateurs, la vigilance reste de mise — un plat calculé en 2024 peut avoir vu son food cost réel grimper de 4 à 8 points sans que rien ne signale l'alerte.</p>

<h2>Viandes : les catégories sous pression</h2>

<h3>Bœuf</h3>
<p>Le bœuf reste la catégorie la plus tendue. Les pièces nobles (filet, entrecôte, côte de bœuf) affichent des hausses structurelles liées à la réduction du cheptel français et aux nouvelles normes environnementales. Les prix au départ abattoir pour les viandes à griller (catégorie 1) se maintiennent 18 à 22 % au-dessus des niveaux de 2022.</p>
<p>En restauration, le filet de bœuf Label Rouge tourne autour de <strong>48 – 55 €/kg</strong> selon les régions et les grossistes en 2026. L'entrecôte se situe entre 28 et 36 €/kg.</p>

<h3>Agneau</h3>
<p>L'agneau connaît ses variations saisonnières habituelles, avec des pics au printemps (Pâques) et en automne. Les importations d'agneau néo-zélandais servent de régulateur mais pèsent sur la qualité perçue. L'agneau de lait des Pyrénées IGP reste rare et cher : <strong>18 – 24 €/kg carcasse</strong>.</p>

<h3>Volailles</h3>
<p>Le secteur volaille a été impacté par plusieurs épisodes d'influenza aviaire depuis 2021. Les élevages Label Rouge et biologiques ont particulièrement souffert. En 2026, le poulet fermier Label Rouge se négocie autour de <strong>7,50 – 9 €/kg</strong> en carcasse, contre 5,80 € en 2020. Le canard gras (pour le foie gras) reste très volatil selon les années d'influenza.</p>

<h3>Porc</h3>
<p>Le porc est la viande la mieux orientée : le marché s'est stabilisé et les prix restent accessibles. Le filet mignon de porc Label Rouge tourne autour de <strong>10 – 13 €/kg</strong>. Bonne option pour les plats milieu de gamme avec un food cost maîtrisé.</p>

<h2>Poissons et fruits de mer : vigilance maximale</h2>
<p>Les produits de la mer sont particulièrement exposés à la volatilité. La surpêche, les normes environnementales européennes et les aléas climatiques créent des tensions régulières.</p>

<h3>Saumon</h3>
<p>Après une période de prix historiquement bas en 2023-2024, le saumon atlantique d'élevage (Norvège, Écosse) a repris en 2025-2026. Le saumon frais portion (300-400g) se situe autour de <strong>14 – 18 €/kg</strong>. Le saumon fumé Label Rouge : 45 – 55 €/kg.</p>

<h3>Bar et dorade</h3>
<p>Le bar de ligne sauvage est devenu presque inaccessible pour la restauration courante : <strong>35 – 50 €/kg</strong> selon la taille. Le bar d'élevage de Méditerranée (Grèce, Turquie) reste à des niveaux plus raisonnables : 12 – 18 €/kg. La dorade royale d'élevage : 10 – 15 €/kg.</p>

<h3>Coquillages et crustacés</h3>
<p>Les coquilles Saint-Jacques de la baie de Saint-Brieuc Label Rouge : <strong>16 – 22 €/kg décortiqué</strong>. Les gambas brésiliennes (calibre 16/20) : 13 – 17 €/kg. Les homards bretons restent un luxe à plus de 35 €/kg vivant.</p>

<h2>Fruits et légumes : la saisonnalité comme levier</h2>
<p>Les fruits et légumes ont l'avantage d'offrir des variations saisonnières prévisibles. Un restaurant qui adapte sa carte à la saisonnalité peut réduire son food cost moyen de 3 à 5 points.</p>

<h3>Légumes à surveiller en 2026</h3>
<ul>
  <li><strong>Tomates</strong> : 1,80 – 3,50 €/kg selon la saison (pic hivernal)</li>
  <li><strong>Poivrons</strong> : 2 – 4,50 €/kg (préférer les importations espagnoles hors saison)</li>
  <li><strong>Asperges</strong> : 8 – 18 €/kg en pointe (mars-juin), inutilisables le reste de l'année</li>
  <li><strong>Champignons de Paris</strong> : 2,50 – 4 €/kg, stable</li>
  <li><strong>Girolles</strong> : 15 – 30 €/kg selon les récoltes</li>
  <li><strong>Truffe noire du Périgord</strong> : 800 – 1 200 €/kg (calculer au gramme !)</li>
</ul>

<h3>Légumes "valeurs sûres" pour le food cost</h3>
<p>Carottes, oignons, pommes de terre, choux, endives : ces légumes de base restent stables entre 0,50 et 1,50 €/kg et constituent d'excellents leviers pour équilibrer un food cost global.</p>

<h2>Produits laitiers : stabilisation après la tempête</h2>
<p>Après les hausses spectaculaires de 2022-2023, les produits laitiers se sont stabilisés. Le beurre reste au-dessus des niveaux pré-2022 (<strong>7 – 9 €/kg</strong> en bloc) mais ne progresse plus. Les fromages de chèvre frais : 12 – 18 €/kg selon l'affinage. Le parmesan 24 mois : 20 – 28 €/kg.</p>

<h2>Huile d'olive : une exception préoccupante</h2>
<p>L'huile d'olive a connu des hausses sans précédent : +180 % entre 2022 et 2025 en raison des sécheresses méditerranéennes successives. En 2026, l'huile d'olive vierge extra se négocie entre <strong>8 et 14 €/litre</strong> selon l'origine, contre 4-5 € en 2021. Une alternative : l'huile de tournesol haute oléique, plus stable autour de 2-3 €/litre, utilisable pour les cuissons.</p>

<h2>Comment FranceAgriMer suit ces prix</h2>
<p>FranceAgriMer publie chaque semaine des cotations officielles sur des centaines de références : fruits et légumes (marché de Rungis et MIN régionaux), viandes (Coquille d'Or), poissons (criées nationales). Ces données sont la référence du marché français.</p>
<p>Des outils comme Costyfood agrègent ces cotations hebdomadaires et les intègrent directement dans le calcul de food cost de vos fiches techniques. Lorsqu'une hausse dépasse 5 % sur un ingrédient que vous utilisez, une alerte est envoyée automatiquement — vous pouvez réagir avant que vos marges ne soient impactées.</p>

<h2>Stratégies d'achat pour préserver vos marges</h2>

<h3>1. Négocier des prix fermes sur 3 mois</h3>
<p>Pour les ingrédients stables (viandes de base, produits laitiers), négociez avec vos fournisseurs des prix fixes sur 1 à 3 mois. Cela vous protège des hausses soudaines et facilite le calcul de vos food costs.</p>

<h3>2. Travailler en circuit court pour les légumes</h3>
<p>Les maraîchers locaux offrent souvent des prix inférieurs aux grossistes sur les légumes de saison, avec une qualité supérieure. Construire une relation de confiance avec 2-3 producteurs locaux permet d'avoir accès à des cours préférentiels.</p>

<h3>3. Ajuster la carte trimestriellement</h3>
<p>Une carte qui change 4 fois par an permet d'intégrer les ingrédients au meilleur de leur rapport qualité/prix. C'est aussi un argument commercial fort pour fidéliser une clientèle en quête d'authenticité et de saisonnalité.</p>

<h3>4. Surveiller les cours hebdomadaires</h3>
<p>Prenez 15 minutes par semaine pour consulter les cotations FranceAgriMer (ou paramétrez des alertes automatiques). Anticiper une hausse sur un ingrédient phare vous donne le temps de trouver une alternative ou d'ajuster votre prix de vente avant que la marge ne soit érodée.</p>

<h3>5. Recalculer les food costs après chaque changement significatif</h3>
<p>Une règle simple : dès qu'un ingrédient qui représente plus de 20 % du coût d'un plat varie de plus de 10 %, recalculez le food cost de ce plat. En 2025, plusieurs restaurateurs ont continué à vendre leur tartare de bœuf au même prix malgré une hausse de 25 % sur la viande.</p>

<h2>Conclusion : la proactivité comme avantage concurrentiel</h2>
<p>Dans un contexte de volatilité persistante des matières premières, les restaurateurs qui gagnent sont ceux qui suivent leurs coûts en temps réel et ajustent leur carte en conséquence. Ce n'est plus une option de bonne gestion — c'est un avantage concurrentiel. Un restaurateur qui connaît son food cost à 1 % près prend de meilleures décisions sur ses prix, sa carte et ses négociations fournisseurs. Et sur un marché aussi concurrentiel que la restauration française, cette précision fait la différence.</p>
    `,
  },
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug)
}
