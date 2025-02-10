/**
 * A helper interface for a single image in Strapi
 */
interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    };
  };
}

/**
 * A standard response from Strapi's REST API for multiple entries
 */
export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/**
 * A standard response from Strapi's REST API for a single entry
 */
export interface StrapiSingleResponse<T> {
  data: T;
  meta: object;
}

/**
 * Location interface
 */
export interface Location {
  id: number;
  attributes: {
    name: string;
    slug?: string;        // If you use slugs for locations
    address: string;
    city: string;
    image?: StrapiImage;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Instructor interface
 */
export interface Instructor {
  id: number;
  attributes: {
    name: string;
    slug?: string;        // If you have a slug for instructors
    bio: string;
    specialties: string[];
    image?: StrapiImage;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * DanceClass (Course) interface
 * Includes fields for slug, typeOfDance, location, instructor, etc.
 */
export interface DanceClass {
  id: number;
  attributes: {
    title: string;
    slug?: string;        // Slug field if you store it in Strapi
    description: string;
    schedule: string;
    price: number;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    typeOfDance?: string; // e.g. "Salsa & Bachata", "Kizomba", etc.
    image?: StrapiImage;

    // Relations (if you have location/instructor relations in Strapi)
    location?: {
      data: Location | null;
    };
    instructor?: {
      data: Instructor | null;
    };

    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Event interface
 */
export interface Event {
  id: number;
  attributes: {
    title: string;
    slug?: string;   // If you store an event slug
    description: string;
    date: string;
    location: string; // If this is just text, or a relation if you prefer
    image?: StrapiImage;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Service interface
 */
export interface Service {
  id: number;
  attributes: {
    title: string;
    description: string;
    icon: string;
    link: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * Testimonial interface
 */
export interface Testimonial {
  id: number;
  attributes: {
    name: string;
    comment: string;
    rating: number;
    role?: string;
    image?: StrapiImage;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}

/**
 * BlogPost interface
 */
export interface BlogPost {
  id: number;
  attributes: {
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    image?: StrapiImage;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
}
