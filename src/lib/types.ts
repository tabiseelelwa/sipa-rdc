export interface Communaute {
  id: number;
  nom: string;
  slug: string;
  region: string;
  province: string;
  population_estimee: number;
  langue: string;
  description: string;
  territoire: string;
  specificites: string;
  image_url: string;
}

export interface Actualite {
  id: number;
  titre: string;
  slug: string;
  extrait: string;
  contenu: string;
  categorie: 'culture' | 'droits' | 'environnement' | 'sante' | 'education' | 'international';
  image_url?: string;
  auteur: string;
  publie: boolean;
  date_publication: string;
}

export interface Patrimoine {
  id: number;
  titre: string;
  categorie: 'musique' | 'art' | 'medecine' | 'chasse' | 'cuisine' | 'spiritualite' | 'artisanat';
  description: string;
  contenu?: string;
  communaute_id?: number;
  image_url?: string;
  video_url?: string;
}

export interface GalerieItem {
  id: number;
  titre?: string;
  description?: string;
  image_url: string;
  categorie?: string;
  credit_photo?: string;
}

export interface Partenaire {
  id: number;
  nom: string;
  type: string;
  pays: string;
  description: string;
  site_web?: string;
  logo_url?: string;
}

export interface Statistique {
  id: number;
  cle: string;
  valeur: string;
  label: string;
  icone: string;
}

export interface MembreEquipe {
  id: number;
  nom: string;
  role: string;
  bio: string;
  communaute_origine?: string;
  photo_url?: string;
}

export interface ContactForm {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
