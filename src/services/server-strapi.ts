import { 
  DanceClass, 
  Instructor, 
  Event, 
  Service, 
  Testimonial, 
  StrapiResponse 
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

/**
 * Helper function to transform the item.
 * If item.attributes exists, use it; otherwise, use item directly.
 */
function transformData(item: any) {
  return item.attributes || item;
}

async function fetchFromAPI<T>(endpoint: string): Promise<T[]> {
  if (!API_URL) {
    console.error('NEXT_PUBLIC_STRAPI_API_URL is not defined');
    return [];
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`✅ API Success [${endpoint}]`);

    if (!data?.data) {
      console.warn(`No data in response for ${endpoint}`);
      return [];
    }

    return data.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

export async function fetchClasses(): Promise<DanceClass[]> {
  try {
    const data = await fetchFromAPI<DanceClass>('/api/classes?populate=*');
    
    return data.map((item: any) => {
      const data = transformData(item);
      return {
        id: item.id,
        attributes: {
          title: data.title || '',
          slug: data.slug || '',
          description: data.description || '',
          schedule: data.schedule || '',
          price: data.price || 0,
          level: data.level || 'Beginner',
          typeOfDance: data.typeOfDance || '',
          image: data.image || null,
          location: data.location || null,
          instructor: data.instructor || null,
          publishedAt: data.publishedAt || '',
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
        }
      };
    });
  } catch (error) {
    console.error('Error fetching classes:', error);
    return [];
  }
}

export async function fetchInstructors(): Promise<Instructor[]> {
  try {
    const data = await fetchFromAPI<Instructor>('/api/instructors?populate=*');
    
    return data.map((item: any) => {
      const data = transformData(item);
      return {
        id: item.id,
        attributes: {
          name: data.name || '',
          bio: data.bio || '',
          specialties: data.specialties || [],
          image: data.image || null,
          publishedAt: data.publishedAt || '',
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
        }
      };
    });
  } catch (error) {
    console.error('Error fetching instructors:', error);
    return [];
  }
}

export async function fetchEvents(): Promise<Event[]> {
  try {
    const data = await fetchFromAPI<Event>('/api/events?populate=*');
    
    return data.map((item: any) => {
      const data = transformData(item);
      return {
        id: item.id,
        attributes: {
          title: data.title || '',
          description: data.description || '',
          date: data.date || '',
          location: data.location || '',
          image: data.image || null,
          slug: data.slug || '',
          publishedAt: data.publishedAt || '',
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
        }
      };
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function fetchServices(): Promise<Service[]> {
  try {
    const data = await fetchFromAPI<Service>('/api/services?populate=*');
    
    return data.map((item: any) => {
      const data = transformData(item);
      return {
        id: item.id,
        attributes: {
          title: data.title || '',
          description: data.description || '',
          icon: data.icon || '',
          link: data.link || '',
          publishedAt: data.publishedAt || '',
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
        }
      };
    });
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const data = await fetchFromAPI<Testimonial>('/api/testimonials?populate=*');
    
    return data.map((item: any) => {
      const data = transformData(item);
      return {
        id: item.id,
        attributes: {
          name: data.name || '',
          comment: data.comment || '',
          rating: data.rating || 0,
          role: data.role || '',
          image: data.image || null,
          publishedAt: data.publishedAt || '',
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
        }
      };
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}