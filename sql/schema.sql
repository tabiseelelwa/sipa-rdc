CREATE DATABASE IF NOT EXISTS pygmees_rdc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE pygmees_rdc;

CREATE TABLE IF NOT EXISTS communautes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  region VARCHAR(100) NOT NULL,
  province VARCHAR(100) NOT NULL,
  population_estimee INT,
  langue VARCHAR(100),
  description TEXT,
  territoire TEXT,
  specificites TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS actualites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  extrait TEXT,
  contenu LONGTEXT,
  categorie ENUM('culture', 'droits', 'environnement', 'sante', 'education', 'international') DEFAULT 'culture',
  image_url VARCHAR(255),
  auteur VARCHAR(100),
  publie BOOLEAN DEFAULT false,
  date_publication DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patrimoine (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  categorie ENUM('musique', 'art', 'medecine', 'chasse', 'cuisine', 'spiritualite', 'artisanat') NOT NULL,
  description TEXT,
  contenu LONGTEXT,
  communaute_id INT,
  image_url VARCHAR(255),
  video_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (communaute_id) REFERENCES communautes(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS galerie (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255),
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  categorie VARCHAR(50),
  communaute_id INT,
  credit_photo VARCHAR(100),
  ordre INT DEFAULT 0,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (communaute_id) REFERENCES communautes(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS partenaires (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(200) NOT NULL,
  type ENUM('ong', 'gouvernement', 'international', 'academique', 'media') DEFAULT 'ong',
  pays VARCHAR(100),
  description TEXT,
  site_web VARCHAR(255),
  logo_url VARCHAR(255),
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  sujet VARCHAR(255),
  message TEXT NOT NULL,
  traite BOOLEAN DEFAULT false,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS statistiques (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cle VARCHAR(100) NOT NULL UNIQUE,
  valeur VARCHAR(255) NOT NULL,
  label VARCHAR(200),
  icone VARCHAR(50),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS equipe (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  role VARCHAR(150) NOT NULL,
  bio TEXT,
  communaute_origine VARCHAR(100),
  photo_url VARCHAR(255),
  ordre INT DEFAULT 0,
  actif BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO communautes (nom, slug, region, province, population_estimee, langue, description, territoire, specificites, image_url) VALUES
(
  'Aka (Bambuti)',
  'aka-bambuti',
  'Forêt équatoriale',
  'Équateur / Tshuapa',
  25000,
  'Mongo / Lingala',
  'Les Aka sont l''un des peuples pygmées les plus connus de la forêt équatoriale du Congo. Maîtres de la forêt, ils vivent en harmonie avec leur environnement depuis des millénaires. Leur musique polyphonique, reconnue par l''UNESCO, est un trésor de l''humanité.',
  'Ils occupent la grande forêt équatoriale le long du fleuve Congo et ses affluents, dans les provinces de l''Équateur et de la Tshuapa.',
  'Renommés pour leur polyphonie vocale unique, leur médecine traditionnelle à base de plantes, et leur organisation sociale matrilinéaire.',
  '/images/communautes/aka.jpg'
),
(
  'Baka',
  'baka',
  'Forêt du nord-est',
  'Haut-Uélé / Ituri',
  15000,
  'Baka / Swahili',
  'Le peuple Baka est célèbre pour son exceptionnelle connaissance de la forêt tropicale. Chasseurs-cueilleurs par excellence, ils entretiennent une relation spirituelle profonde avec la forêt qu''ils considèrent comme une mère nourricière et protectrice.',
  'Présents dans la forêt dense du Haut-Uélé et de l''Ituri, à la frontière avec le Soudan du Sud et la République Centrafricaine.',
  'Experts en chasse au filet collectif, en apiculture forestière, et gardiens de rites initiatiques secrets transmis de génération en génération.',
  '/images/communautes/baka.jpg'
),
(
  'Twa (Batwa)',
  'twa-batwa',
  'Région des Grands Lacs',
  'Nord-Kivu / Sud-Kivu',
  80000,
  'Kinyarwanda / Swahili',
  'Les Batwa des Grands Lacs sont les gardiens ancestraux des forêts montagneuses de la Région des Grands Lacs. Leur histoire est intimement liée à la forêt de Bwindi et aux forêts du Kivu, aujourd''hui transformées en parcs nationaux.',
  'Établis dans les hautes terres du Nord et Sud-Kivu, aux abords des parcs nationaux de Kahuzi-Biéga et de Virunga.',
  'Peuple le plus sédentarisé des groupes pygmées, ils sont des potiers et artisans exceptionnels. Leur danse et leurs chants sont reconnus comme patrimoine culturel régional.',
  '/images/communautes/batwa.jpg'
),
(
  'Mbuti',
  'mbuti',
  'Forêt d''Ituri',
  'Ituri',
  35000,
  'Kango / Swahili',
  'Les Mbuti sont les habitants originels de la forêt d''Ituri, l''une des forêts tropicales les plus anciennes et les plus riches en biodiversité au monde. Ils se considèrent eux-mêmes comme "les enfants de la forêt".',
  'La forêt d''Ituri dans la province de l''Ituri, à l''est de la RDC, constitue leur territoire ancestral depuis au moins 40 000 ans.',
  'Leur philosophie de vie, documentée par l''anthropologue Colin Turnbull, révèle une vision du monde centrée sur la bonté fondamentale de la forêt. Ils pratiquent une forme unique de chasse à l''arc et aux filets.',
  '/images/communautes/mbuti.jpg'
),
(
  'Cwa',
  'cwa',
  'Savane boisée',
  'Kasaï / Lomami',
  12000,
  'Tshiluba / Lingala',
  'Les Cwa représentent une branche pygmée adaptée aux zones de transition entre forêt et savane. Moins médiatisés que leurs cousins forestiers, ils possèdent une culture riche et des connaissances écologiques uniques des milieux mixtes.',
  'Zone de transition forêt-savane dans les provinces du Kasaï et de la Lomami, au centre de la RDC.',
  'Experts en traque sur terrain ouvert, fabricants de pièges sophistiqués, et herboristes spécialisés dans les plantes des zones de lisière.',
  '/images/communautes/cwa.jpg'
);

INSERT INTO actualites (titre, slug, extrait, contenu, categorie, auteur, publie, date_publication) VALUES
(
  'Les Mbuti reçoivent la reconnaissance de leurs droits fonciers dans la forêt d''Ituri',
  'mbuti-droits-fonciers-ituri',
  'Une décision historique du gouvernement provincial reconnaît officiellement les droits ancestraux des Mbuti sur 45 000 hectares de forêt.',
  '<p>Dans une décision qui fait date, les autorités provinciales de l''Ituri ont officiellement reconnu les droits fonciers ancestraux du peuple Mbuti sur une superficie de 45 000 hectares de la forêt d''Ituri.</p><p>Cette reconnaissance, fruit de dix ans de négociations menées par des organisations de défense des droits des peuples autochtones, représente une avancée majeure pour la protection des modes de vie traditionnels des Mbuti.</p><p>Le chef coutumier Molimo wa Ituri a déclaré lors de la cérémonie de remise des titres : "La forêt n''appartient pas à ceux qui la détruisent, mais à ceux qui la font vivre depuis des millénaires."</p>',
  'droits',
  'Équipe de rédaction',
  true,
  '2024-03-15 10:00:00'
),
(
  'Festival International de Musique Pygmée à Kinshasa',
  'festival-musique-pygmee-kinshasa-2024',
  'La capitale congolaise accueille pour la première fois un festival dédié aux musiques des peuples pygmées, réunissant 12 groupes venus de toute la RDC.',
  '<p>Du 20 au 25 juillet, Kinshasa vibrera au rythme des polyphonies et des rythmes ancestraux des peuples pygmées de la RDC. Ce festival historique rassemble pour la première fois des représentants de toutes les grandes communautés pygmées du pays.</p><p>Au programme : concerts, ateliers d''initiation musicale, expositions d''artisanat, et tables rondes sur la préservation du patrimoine culturel.</p>',
  'culture',
  'Amani Katembo',
  true,
  '2024-06-01 09:00:00'
),
(
  'Nouvelle clinique de médecine traditionnelle au cœur de la forêt équatoriale',
  'clinique-medecine-traditionnelle-foret',
  'Un partenariat entre l''OMS et les guérisseurs Aka aboutit à la création d''un centre de santé unique alliant médecine moderne et savoirs ancestraux.',
  '<p>La forêt équatoriale de la province de l''Équateur abrite désormais un centre de santé unique en son genre : une clinique qui intègre les pratiques médicales traditionnelles des Aka avec les protocoles de médecine moderne.</p><p>Ce projet, financé par l''OMS et plusieurs ONG internationales, documente également les plantes médicinales utilisées par les guérisseurs Aka, un patrimoine botanique inestimable en danger de disparition.</p>',
  'sante',
  'Dr. Esperance Mukendi',
  true,
  '2024-04-20 14:00:00'
),
(
  'Les enfants Batwa à l''école : un programme d''inclusion récompensé par l''UNICEF',
  'programme-education-batwa-unicef',
  'Le programme "Forêt et Savoir" qui scolarise 2 000 enfants Batwa tout en préservant leur identité culturelle reçoit le prix UNICEF de l''éducation inclusive.',
  '<p>Le programme éducatif "Forêt et Savoir", développé par l''association PIDP-Kivu en partenariat avec les communautés Batwa du Nord et Sud-Kivu, a reçu le prix UNICEF de l''éducation inclusive 2024.</p><p>Cette initiative novatrice scolarise plus de 2 000 enfants Batwa dans des écoles adaptées qui enseignent les matières académiques en langue maternelle tout en intégrant les savoirs traditionnels dans le curriculum.</p>',
  'education',
  'Samuel Furaha',
  true,
  '2024-05-10 11:00:00'
);

INSERT INTO patrimoine (titre, categorie, description, communaute_id) VALUES
('Polyphonie vocale Aka', 'musique', 'La musique polyphonique des Aka, inscrite au patrimoine immatériel de l''UNESCO, est une forme d''expression collective où chaque voix s''entrelace librement avec les autres dans une improvisation structurée.', 1),
('Chasse au filet collectif', 'chasse', 'Technique ancestrale où toute la communauté participe à la chasse en utilisant des filets de liane. Cette pratique est autant une stratégie de subsistance qu''un acte social et cérémoniel.', 2),
('Poterie des Batwa', 'artisanat', 'Les Batwa sont réputés pour leur poterie exceptionnelle. Chaque pièce, faite à la main sans tour de potier, raconte une histoire et porte des motifs symboliques transmis de mère en fille.', 3),
('Médecine forestière Mbuti', 'medecine', 'Les Mbuti possèdent une pharmacopée d''une richesse extraordinaire, avec plus de 300 plantes médicinales identifiées et utilisées pour traiter des maladies allant des infections aux troubles psychologiques.', 4),
('Molimo : la cérémonie de la forêt', 'spiritualite', 'Le Molimo est la cérémonie spirituelle centrale des Mbuti. Quand la forêt "dort" ou qu''un malheur frappe la communauté, on réveille la forêt par des chants et des rituels nocturnes.', 4);

INSERT INTO statistiques (cle, valeur, label, icone) VALUES
('population_totale', '600000', 'Pygmées en RDC', 'users'),
('communautes', '5', 'Groupes principaux', 'map-pin'),
('langues', '12', 'Langues et dialectes', 'message-circle'),
('hectares_foret', '2000000', 'Hectares de forêt ancestrale', 'trees');

INSERT INTO partenaires (nom, type, pays, description, site_web) VALUES
('PIDP-Kivu', 'ong', 'RDC', 'Programme Intégré pour le Développement du Peuple Pygmée au Kivu', 'https://pidp-kivu.org'),
('Forest Peoples Programme', 'international', 'Royaume-Uni', 'Organisation internationale de défense des droits des peuples forestiers', 'https://www.forestpeoples.org'),
('UNESCO', 'international', 'France', 'Organisation des Nations Unies pour l''éducation, la science et la culture', 'https://www.unesco.org'),
('ICCN', 'gouvernement', 'RDC', 'Institut Congolais pour la Conservation de la Nature', 'https://iccn.cd'),
('Rainforest Foundation UK', 'ong', 'Royaume-Uni', 'Organisation de protection des forêts tropicales et des peuples qui en dépendent', 'https://www.rainforestfoundationuk.org');

INSERT INTO equipe (nom, role, bio, communaute_origine, ordre) VALUES
('Honoré Molimo', 'Directeur fondateur', 'Né dans la forêt d''Ituri, Honoré est un défenseur infatigable des droits des Pygmées. Après des études de droit à Kinshasa, il a consacré sa vie à la documentation et à la promotion de la culture Mbuti.', 'Mbuti (Ituri)', 1),
('Amina Baka-Mwasi', 'Coordinatrice culturelle', 'Ethnomusicologue et activiste, Amina a documenté plus de 500 chants pygmées. Elle dirige les programmes de préservation du patrimoine musical et coordonne les échanges culturels.', 'Aka (Équateur)', 2),
('Jean-Pierre Furaha', 'Responsable juridique', 'Avocat spécialisé en droits des peuples autochtones, Jean-Pierre mène les combats judiciaires pour la reconnaissance des droits fonciers et la protection contre les expulsions forcées.', 'Batwa (Sud-Kivu)', 3),
('Sophie Masika', 'Coordinatrice santé', 'Infirmière et herboriste, Sophie fait le lien entre médecine traditionnelle et moderne. Elle documente les plantes médicinales et forme des agents de santé communautaires.', 'Mbuti (Ituri)', 4);

CREATE INDEX idx_actualites_publie ON actualites(publie);
CREATE INDEX idx_actualites_categorie ON actualites(categorie);
CREATE INDEX idx_actualites_date ON actualites(date_publication);
CREATE INDEX idx_patrimoine_categorie ON patrimoine(categorie);
CREATE INDEX idx_galerie_actif ON galerie(actif);
CREATE INDEX idx_contacts_traite ON contacts(traite);

CREATE OR REPLACE VIEW v_actualites_recentes AS
SELECT 
  id, titre, slug, extrait, categorie, auteur, date_publication, image_url
FROM actualites
WHERE publie = true
ORDER BY date_publication DESC;

DELIMITER //
CREATE PROCEDURE IF NOT EXISTS log_contact(
  IN p_nom VARCHAR(100),
  IN p_email VARCHAR(150),
  IN p_sujet VARCHAR(255),
  IN p_message TEXT,
  IN p_ip VARCHAR(45)
)
BEGIN
  INSERT INTO contacts (nom, email, sujet, message, ip_address)
  VALUES (p_nom, p_email, p_sujet, p_message, p_ip);
END //
DELIMITER ;
