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
  {
    slug: 'rentabilite-restaurant',
    title: 'Rentabilité restaurant : les 7 leviers pour enfin dégager des bénéfices',
    description: 'Comment améliorer la rentabilité de votre restaurant ? Food cost, masse salariale, prix de vente, carte courte... Les 7 leviers actionnables dès cette semaine.',
    date: '3 juin 2026',
    dateIso: '2026-06-03',
    readTime: 10,
    category: 'Gestion',
    keywords: ['rentabilité restaurant', 'améliorer rentabilité restaurant', 'marge restauration', 'bénéfice restaurant', 'gestion restaurant rentable'],
    content: `
<h2>Pourquoi la rentabilité d'un restaurant est si difficile à atteindre ?</h2>
<p>En France, 30 % des restaurants ferment dans les deux premières années. Parmi ceux qui survivent, beaucoup dégagent des marges nettes inférieures à 5 %. Pourtant, certains établissements affichent des résultats nets de 15 à 20 %. La différence ne tient pas à la chance ni à la notoriété — elle tient à la maîtrise de quelques leviers précis.</p>
<p>La rentabilité d'un restaurant se calcule simplement : Chiffre d'affaires − Charges = Résultat net. Mais derrière cette équation simple se cachent des dizaines de variables que seuls les restaurateurs rigoureux suivent vraiment.</p>

<h2>Levier 1 — Maîtriser son food cost (objectif : &lt; 32 %)</h2>
<p>Le food cost est le rapport entre le coût des ingrédients et le prix de vente HT. C'est le premier levier de rentabilité, et souvent le plus négligé. Un food cost à 38 % quand votre concurrent est à 29 % représente une perte de 9 points de marge brute — sur un CA de 50 000 €/mois, c'est 4 500 € de différence mensuelle.</p>
<p>Pour chaque plat, calculez précisément : coût de chaque ingrédient × grammage exact. Utilisez les cotations officielles (FranceAgriMer) comme base de référence, et ajustez avec vos prix fournisseurs réels.</p>
<blockquote><strong>Règle d'or : tout plat dont le food cost dépasse 35 % doit être revu (prix, grammage ou recette).</strong></blockquote>

<h2>Levier 2 — Réduire les pertes et le gaspillage</h2>
<p>En restauration, les pertes représentent en moyenne 4 à 8 % du food cost théorique. Épluchures, cuissons ratées, produits périmés avant utilisation : chaque euro gaspillé est un euro qui ne finance pas votre résultat.</p>
<ul>
  <li><strong>Carte courte</strong> : moins de références = moins de stocks = moins de pertes</li>
  <li><strong>FIFO</strong> (First In, First Out) : utilisez toujours les produits les plus anciens en premier</li>
  <li><strong>Portion control</strong> : pesez vos grammages, surtout sur les ingrédients coûteux</li>
</ul>

<h2>Levier 3 — Optimiser la structure de votre carte</h2>
<p>Le menu engineering est la discipline qui analyse chaque plat selon deux axes : sa popularité (combien de fois il est commandé) et sa rentabilité (quelle marge il génère). Cette matrice permet d'identifier :</p>
<ul>
  <li><strong>Les stars</strong> : populaires ET rentables → à mettre en valeur</li>
  <li><strong>Les vaches à lait</strong> : populaires mais peu rentables → à optimiser (prix ou recette)</li>
  <li><strong>Les questions</strong> : rentables mais peu commandées → à mieux promouvoir</li>
  <li><strong>Les poids morts</strong> : ni populaires ni rentables → à supprimer</li>
</ul>

<h2>Levier 4 — Maîtriser la masse salariale (objectif : &lt; 35 %)</h2>
<p>La masse salariale représente généralement 30 à 40 % du CA en restauration. Au-delà de 38 %, votre établissement est en danger structurel. Les leviers : planification précise des horaires selon les pics d'activité, polyvalence du personnel, révision des fiches de poste.</p>

<h2>Levier 5 — Augmenter le ticket moyen sans perdre en clientèle</h2>
<p>Une augmentation de 10 % du ticket moyen avec le même volume de couverts améliore directement le résultat net. Les techniques : suggestions du personnel, menus "découverte" à marge optimisée, accord mets-vins, desserts et boissons chaudes systématiquement proposés.</p>

<h2>Levier 6 — Négocier ses achats fournisseurs</h2>
<p>Peu de restaurateurs négocient vraiment leurs tarifs fournisseurs. Pourtant, une réduction de 5 % sur vos achats matières premières se répercute directement sur votre résultat. Groupements d'achats, engagements de volume, paiement comptant contre remise : les marges de négociation existent.</p>

<h2>Levier 7 — Suivre ses KPIs chaque semaine</h2>
<p>Ce qui ne se mesure pas ne s'améliore pas. Les KPIs essentiels à suivre chaque semaine : food cost % par plat, CA par couvert, taux d'occupation, masse salariale %. Un restaurateur qui suit ces 4 indicateurs réagit 3 à 4 semaines plus vite qu'un restaurateur qui navigue à l'aveugle.</p>

<h2>Conclusion</h2>
<p>La rentabilité d'un restaurant ne se décrète pas : elle se construit levier par levier, semaine après semaine. Les établissements qui dégagent des bénéfices durables ne sont pas nécessairement les plus "branchés" ou les mieux notés — ce sont ceux qui maîtrisent leurs coûts avec rigueur et ajustent leur carte en conséquence.</p>
    `,
  },
  {
    slug: 'calculer-marge-restaurant',
    title: 'Calculer la marge d\'un restaurant : formules, benchmarks et exemples concrets',
    description: 'Comment calculer la marge brute, la marge nette et le seuil de rentabilité de votre restaurant ? Formules détaillées, benchmarks sectoriels et exemples chiffrés.',
    date: '4 juin 2026',
    dateIso: '2026-06-04',
    readTime: 8,
    category: 'Gestion',
    keywords: ['calculer marge restaurant', 'marge brute restaurant', 'marge nette restauration', 'seuil rentabilité restaurant', 'calcul marge restauration'],
    content: `
<h2>Les trois niveaux de marge en restauration</h2>
<p>En restauration, on distingue trois niveaux de marge, chacun mesurant une réalité différente de votre performance économique :</p>
<ul>
  <li><strong>La marge brute</strong> : ce qui reste après déduction du coût des matières premières</li>
  <li><strong>La marge opérationnelle (EBITDA)</strong> : ce qui reste après masse salariale et charges fixes</li>
  <li><strong>La marge nette</strong> : le bénéfice réel après toutes charges, impôts inclus</li>
</ul>

<h2>Calcul de la marge brute par plat</h2>
<p>La marge brute par plat est le point de départ de toute analyse de rentabilité :</p>
<blockquote>
  <strong>Marge brute = Prix de vente HT − Coût des ingrédients</strong><br />
  <strong>Taux de marge brute = (Marge brute ÷ Prix de vente HT) × 100</strong>
</blockquote>
<p><strong>Exemple concret — Magret de canard :</strong></p>
<ul>
  <li>Prix de vente : 28 € TTC → 23,33 € HT</li>
  <li>Coût ingrédients : 6,80 € (magret 180g + garniture + sauce)</li>
  <li>Marge brute : 23,33 − 6,80 = <strong>16,53 €</strong></li>
  <li>Taux de marge brute : (16,53 ÷ 23,33) × 100 = <strong>70,9 %</strong></li>
  <li>Food cost : 100 − 70,9 = <strong>29,1 %</strong> ✅</li>
</ul>

<h2>Benchmarks de marge brute par type d'établissement</h2>
<table>
  <thead><tr><th>Type d'établissement</th><th>Food cost cible</th><th>Marge brute cible</th></tr></thead>
  <tbody>
    <tr><td>Restaurant gastronomique</td><td>28–35 %</td><td>65–72 %</td></tr>
    <tr><td>Bistrot / brasserie</td><td>30–36 %</td><td>64–70 %</td></tr>
    <tr><td>Restauration rapide</td><td>25–30 %</td><td>70–75 %</td></tr>
    <tr><td>Pizzeria</td><td>20–28 %</td><td>72–80 %</td></tr>
    <tr><td>Restaurant asiatique</td><td>25–32 %</td><td>68–75 %</td></tr>
  </tbody>
</table>

<h2>Calcul du seuil de rentabilité</h2>
<p>Le seuil de rentabilité (ou point mort) est le chiffre d'affaires minimum à réaliser pour couvrir toutes vos charges. En dessous : vous perdez de l'argent. Au-dessus : vous dégagez du bénéfice.</p>
<blockquote>
  <strong>Seuil de rentabilité = Charges fixes ÷ Taux de marge sur coûts variables</strong>
</blockquote>
<p><strong>Exemple :</strong></p>
<ul>
  <li>Charges fixes mensuelles : loyer 3 000 € + salaires 12 000 € + charges diverses 2 000 € = <strong>17 000 €</strong></li>
  <li>Taux de marge sur coûts variables : 68 % (food cost 32 %)</li>
  <li>Seuil de rentabilité : 17 000 ÷ 0,68 = <strong>25 000 € de CA mensuel</strong></li>
</ul>

<h2>La marge nette : ce que vous gardez vraiment</h2>
<p>Après toutes les charges (matières, personnel, loyer, énergie, amortissements, impôts), la marge nette d'un restaurant se situe généralement entre 3 et 9 % du CA. Un restaurant bien géré peut atteindre 12 à 15 %.</p>
<p>Pour l'améliorer, les deux leviers les plus efficaces sont :</p>
<ol>
  <li>Réduire le food cost de 2 à 3 points (impacte directement la marge brute)</li>
  <li>Optimiser la planification du personnel (impacte la masse salariale)</li>
</ol>

<h2>Outils pour calculer vos marges automatiquement</h2>
<p>Calculer manuellement la marge de chaque plat dans Excel est chronophage et source d'erreurs. Les outils spécialisés comme Costyfood permettent de générer automatiquement les ingrédients via IA, d'appliquer les prix du marché (FranceAgriMer) et d'obtenir food cost, marge brute et prix conseillé en quelques secondes.</p>
    `,
  },
  {
    slug: 'fiche-technique-cuisine-restaurant',
    title: 'Fiche technique cuisine : comment la créer et pourquoi elle est indispensable',
    description: 'Qu\'est-ce qu\'une fiche technique en cuisine ? Comment la créer, quoi y mettre et pourquoi chaque restaurant devrait en avoir une par plat. Guide complet avec modèle.',
    date: '5 juin 2026',
    dateIso: '2026-06-05',
    readTime: 7,
    category: 'Technique',
    keywords: ['fiche technique cuisine', 'fiche technique restaurant', 'créer fiche technique culinaire', 'modèle fiche technique restaurant', 'fiche recette professionnelle'],
    content: `
<h2>Qu'est-ce qu'une fiche technique en cuisine ?</h2>
<p>Une fiche technique de cuisine (aussi appelée fiche recette professionnelle) est un document standardisé qui décrit précisément un plat : liste des ingrédients avec grammages exacts, mode opératoire, dressage, allergènes, coût matière et prix de vente conseillé.</p>
<p>C'est à la fois un outil de gestion (calcul du food cost), un outil de formation (reproductibilité des recettes) et un outil légal (déclaration des allergènes).</p>

<h2>Pourquoi chaque restaurant doit avoir des fiches techniques</h2>
<p>Sans fiche technique, chaque chef cuisinera "à l'œil". Résultat :</p>
<ul>
  <li>Des grammages variables qui font exploser le food cost certains jours</li>
  <li>Des plats qui ne goûtent pas pareil d'un service à l'autre</li>
  <li>Impossible de former un remplaçant rapidement</li>
  <li>Aucune visibilité sur les coûts réels par plat</li>
</ul>
<p>À l'inverse, un restaurant avec des fiches techniques complètes peut faire tourner sa cuisine avec n'importe quel commis, connaît son coût exact par assiette et peut recalculer ses prix en 5 minutes si un fournisseur augmente ses tarifs.</p>

<h2>Que doit contenir une fiche technique de cuisine ?</h2>
<p>Une fiche technique professionnelle complète contient :</p>
<ol>
  <li><strong>Identité du plat</strong> : nom, catégorie (entrée/plat/dessert), nombre de couverts</li>
  <li><strong>Liste des ingrédients</strong> : nom exact, fournisseur, unité d'achat, grammage par portion</li>
  <li><strong>Prix unitaire</strong> de chaque ingrédient (au kg ou à l'unité)</li>
  <li><strong>Coût matière total</strong> par portion</li>
  <li><strong>Food cost %</strong> et <strong>prix de vente conseillé</strong></li>
  <li><strong>Mode opératoire</strong> : étapes de préparation numérotées</li>
  <li><strong>Dressage</strong> : description ou photo du rendu final</li>
  <li><strong>Allergènes</strong> : liste des 14 allergènes majeurs présents</li>
  <li><strong>Date de création</strong> et <strong>auteur</strong></li>
</ol>

<h2>Comment créer une fiche technique efficacement</h2>
<h3>Méthode 1 — À la main (Excel/Word)</h3>
<p>Créez un tableau avec les colonnes : Ingrédient | Grammage (g) | Prix/kg | Coût portion. Additionnez les coûts, divisez par le prix de vente HT. Long, source d'erreurs, mais gratuit.</p>

<h3>Méthode 2 — Outil spécialisé</h3>
<p>Des outils comme Costyfood génèrent automatiquement les ingrédients et leurs quantités via IA, appliquent les prix du marché en temps réel, calculent le food cost et exportent la fiche en PDF professionnel. Ce qui prenait 45 minutes se fait en 2 minutes.</p>

<h2>Modèle de fiche technique restaurant (structure)</h2>
<pre>
FICHE TECHNIQUE — [Nom du plat]
Catégorie : [Entrée / Plat / Dessert]
Couverts : [1 / 2 / 4]

INGRÉDIENTS :
Ingrédient          | Qté (g) | Prix/kg | Coût
--------------------|---------|---------|------
[Ingrédient 1]      | [150]   | [22,50] | [3,38]
[Ingrédient 2]      | [80]    | [4,20]  | [0,34]
...
TOTAL COÛT MATIÈRE  |         |         | [X,XX €]

Food cost : [XX %]
Prix de vente conseillé : [XX,XX €]

ALLERGÈNES : [Gluten, Lait...]
</pre>

<h2>Fréquence de mise à jour</h2>
<p>Une fiche technique doit être mise à jour à chaque fois qu'un prix fournisseur change significativement (+ ou − 10 %), qu'une recette est modifiée, ou qu'un ingrédient change de fournisseur. En pratique : une révision trimestrielle est le minimum.</p>
    `,
  },
  {
    slug: 'food-cost-calcul-gratuit-en-ligne',
    title: 'Food cost calcul en ligne : le guide complet pour maîtriser vos coûts',
    description: 'Comment calculer votre food cost gratuitement en ligne ? Formule, exemples, outils et conseils pour maîtriser vos coûts en restauration. Calculateur gratuit disponible.',
    date: '6 juin 2026',
    dateIso: '2026-06-06',
    readTime: 9,
    category: 'Gestion',
    keywords: ['food cost calcul', 'calculer food cost', 'food cost calcul gratuit', 'calcul food cost en ligne', 'food cost restaurant formule', 'food cost définition'],
    content: `
<h2>Food cost : définition et formule</h2>
<p>Le food cost est le ratio entre le coût des matières premières utilisées et le chiffre d'affaires généré par ces mêmes matières. C'est l'indicateur de base de la gestion d'un restaurant.</p>
<blockquote>
  <strong>Food cost % = (Coût des ingrédients ÷ Prix de vente HT) × 100</strong>
</blockquote>
<p>Exemple : un plat dont les ingrédients coûtent 7,20 € et qui est vendu 24 € HT a un food cost de <strong>30 %</strong>.</p>
<p>Cela signifie que 30 centimes de chaque euro encaissé partent en matières premières. Les 70 centimes restants doivent couvrir la main-d'œuvre, le loyer, l'énergie et dégager un bénéfice.</p>

<h2>Food cost idéal : quels objectifs viser ?</h2>
<p>Il n'existe pas de food cost universel "idéal" — il dépend de votre type de restauration, de vos charges fixes et de votre positionnement tarifaire. Toutefois, voici les fourchettes de référence :</p>
<ul>
  <li><strong>Restauration gastronomique</strong> : 28–34 % (produits nobles, prix élevés)</li>
  <li><strong>Bistrot / brasserie</strong> : 30–35 %</li>
  <li><strong>Restauration rapide</strong> : 24–30 %</li>
  <li><strong>Pizza / pasta</strong> : 22–28 %</li>
  <li><strong>Pâtisserie / boulangerie</strong> : 25–35 %</li>
</ul>
<p>Au-delà de 38 %, la rentabilité de votre restaurant est compromise sauf si vos charges salariales et locatives sont très faibles.</p>

<h2>Comment calculer son food cost étape par étape</h2>
<h3>Étape 1 — Listez tous les ingrédients du plat</h3>
<p>Pour chaque plat de votre carte, notez tous les ingrédients utilisés, y compris la matière grasse de cuisson, les herbes, les condiments et les garnitures. Tout ce qui est dans l'assiette a un coût.</p>

<h3>Étape 2 — Indiquez le grammage exact de chaque ingrédient</h3>
<p>C'est l'étape que la plupart des restaurateurs bâclent. Pesez vraiment chaque ingrédient. Un chef qui ajoute "une noix de beurre" peut mettre entre 10 et 25 grammes — cela peut faire varier le coût de 15 à 20 centimes sur un seul plat.</p>

<h3>Étape 3 — Valorisez chaque ingrédient au prix d'achat réel</h3>
<p>Utilisez vos dernières factures fournisseurs comme référence. Ramenez chaque prix à l'unité kilogramme pour pouvoir comparer et calculer facilement.</p>

<h3>Étape 4 — Calculez le coût total et le food cost %</h3>
<p>Additionnez tous les coûts unitaires (grammage × prix/kg ÷ 1000). Divisez par le prix de vente HT et multipliez par 100.</p>

<h2>Calculateur food cost gratuit en ligne</h2>
<p>Faire ce calcul pour 30, 50 ou 100 plats manuellement dans Excel prend des heures. Des outils comme Costyfood automatisent ce processus : l'IA génère les ingrédients et leurs quantités à partir du nom du plat, applique les prix du marché issus des cotations officielles FranceAgriMer, et affiche instantanément food cost %, marge brute et prix de vente conseillé.</p>
<p>Le calculateur est accessible gratuitement pour 3 plats, sans inscription ni carte bancaire.</p>

<h2>Les erreurs courantes de calcul du food cost</h2>
<ul>
  <li><strong>Oublier les pertes à la préparation</strong> : un poisson entier de 500g ne donne que 300g de filet — intégrez ce coefficient de rendement</li>
  <li><strong>Ne pas inclure les condiments</strong> : sel, poivre, huile d'olive, herbes fraîches s'additionnent</li>
  <li><strong>Utiliser des prix anciens</strong> : les prix fournisseurs changent. Un calcul fait il y a 6 mois peut être obsolète</li>
  <li><strong>Calculer en TTC</strong> : toujours calculer le food cost sur le prix HT</li>
  <li><strong>Ne pas intégrer les boissons</strong> : le food cost d'un menu inclut aussi les boissons offertes ou accompagnements</li>
</ul>

<h2>Food cost vs. beverage cost</h2>
<p>Dans les restaurants avec une offre boissons significative, on distingue le food cost (nourriture) du beverage cost (boissons). Les marges sont généralement meilleures sur les boissons (15–25 % de coût), ce qui permet de compenser un food cost élevé sur certains plats.</p>

<h2>Conclusion : le food cost, premier indicateur à maîtriser</h2>
<p>Avant d'investir dans la décoration, la communication ou les équipements, chaque restaurateur devrait être capable de donner le food cost exact de ses 10 plats les plus vendus. C'est la fondation de toute gestion rentable.</p>
    `,
  },
]

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug)
}
