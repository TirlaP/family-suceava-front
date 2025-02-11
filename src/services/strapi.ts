import axios from 'axios';
import { 
  DanceClass, 
  Instructor, 
  Event, 
  Service, 
  Location, 
  Testimonial, 
  BlogPost,
  StrapiResponse 
} from '../types';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  response => {
    console.log(`✅ API Success [${response.config.url}]`);
    return response;
  },
  error => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

/**
 * Helper function to transform the item.
 * If item.attributes exists, use it; otherwise, use item directly.
 */
function transformData(item: any) {
  return item.attributes || item;
}

export async function fetchClasses(): Promise<DanceClass[]> {
  try {
    // 1) Request all fields from Strapi
    const response = await axiosInstance.get('/api/classes?populate=*');
    console.log("Classes response data:", response.data);

    // 2) Basic safety check
    if (!response.data?.data) {
      console.warn('No classes data in response');
      return [];
    }

    // 3) Map each record from the Strapi shape to your DanceClass shape
    return response.data.data.map((item: any) => {
      // If item.attributes exists, use it; otherwise fallback to item
      const data = item.attributes || item;

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
    const response = await axiosInstance.get<StrapiResponse<Instructor>>('/api/instructors?populate=*');

    if (!response.data?.data) return [];

    return response.data.data.map((item: any) => {
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
    const response = await axiosInstance.get<StrapiResponse<Event>>('/api/events?populate=*');

    console.log("response.data?.data", response.data?.data);
    
    if (!response.data?.data) return [];

    return response.data.data.map((item: any) => {
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
    const response = await axiosInstance.get<StrapiResponse<Service>>('/api/services');

    if (!response.data?.data) return [];

    return response.data.data.map((item: any) => {
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

export async function fetchLocations(): Promise<Location[]> {
  try {
    const response = await axiosInstance.get<StrapiResponse<Location>>('/api/locations?populate=*');

    console.log("response.data?.data", response.data?.data);
    
    if (!response.data?.data) return [];

    return response.data.data.map((item: any) => {
      const data = transformData(item);
      return {
        id: item.id,
        attributes: {
          name: data.name || '',
          address: data.address || '',
          city: data.city || '',
          image: data.image || null,
          slug: data.slug || '',
          publishedAt: data.publishedAt || '',
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
        }
      };
    });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await axiosInstance.get<StrapiResponse<Testimonial>>('/api/testimonials?populate=*');

    if (!response.data?.data) return [];

    return response.data.data.map((item: any) => {
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

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await axiosInstance.get<StrapiResponse<BlogPost>>('/api/blog-posts?populate=*');

    if (!response.data?.data) return [];

    return response.data.data.map((item: any) => {
      const data = transformData(item);
      return {
        id: item.id,
        attributes: {
          title: data.title || '',
          content: data.content || '',
          excerpt: data.excerpt || '',
          slug: data.slug || '',
          image: data.image || null,
          publishedAt: data.publishedAt || '',
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || '',
        }
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function submitContactForm(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const response = await axiosInstance.post('/api/contact-submissions', {
      data: {
        ...data,
        publishedAt: new Date().toISOString(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}

export async function fetchSingleClass(id: string): Promise<DanceClass | null> {
  try {
    const response = await axiosInstance.get<{ data: DanceClass }>(`/api/classes/${id}?populate=*`);
    
    const item = response.data.data;
    if (!item) return null;
    const data = transformData(item);
    return {
      id: item.id,
      attributes: {
        title: data.title || '',
        description: data.description || '',
        schedule: data.schedule || '',
        price: data.price || 0,
        level: data.level || 'Beginner',
        image: data.image || null,
        publishedAt: data.publishedAt || '',
        createdAt: data.createdAt || '',
        updatedAt: data.updatedAt || '',
      }
    };
  } catch (error) {
    console.error('Error fetching class:', error);
    return null;
  }
}

export async function fetchSingleEvent(id: string): Promise<Event | null> {
  try {
    const response = await axiosInstance.get<{ data: Event }>(`/api/events/${id}?populate=*`);
    
    const item = response.data.data;
    if (!item) return null;
    const data = transformData(item);
    return {
      id: item.id,
      attributes: {
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        location: data.location || '',
        image: data.image || null,
        publishedAt: data.publishedAt || '',
        createdAt: data.createdAt || '',
        updatedAt: data.updatedAt || '',
      }
    };
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}

export async function fetchSingleBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await axiosInstance.get<StrapiResponse<BlogPost>>(`/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`);
    
    const item = response.data.data[0];
    if (!item) return null;
    const data = transformData(item);
    return {
      id: item.id,
      attributes: {
        title: data.title || '',
        content: data.content || '',
        excerpt: data.excerpt || '',
        slug: data.slug || '',
        image: data.image || null,
        publishedAt: data.publishedAt || '',
        createdAt: data.createdAt || '',
        updatedAt: data.updatedAt || '',
      }
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
