import { axiosInstance } from './strapi';

interface RegistrationData {
  name: string;
  firstName: string;
  age: number;
  phone: string;
  email: string;
  city: string;
  courseType: string;
  howDidYouFindUs: string;
  gdprConsent: boolean;
}

export async function submitRegistration(data: RegistrationData) {
  try {
    // Submit registration directly - we'll handle the course status on the server side
    const response = await axiosInstance.post('/api/course-registrations', {
      data: {
        name: data.name,
        firstName: data.firstName,
        age: data.age,
        phone: data.phone,
        email: data.email,
        city: data.city,
        howDidYouFindUs: data.howDidYouFindUs,
        courseType: {
          connect: [{ id: parseInt(data.courseType) }]
        },
        statusRegistration: 'pending',
        gdprConsent: data.gdprConsent,
        publishedAt: new Date().toISOString(),
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error submitting registration:', error);
    throw error;
  }
}

export async function getAvailableCourses() {
  try {
    const response = await axiosInstance.get('/api/classes', {
      params: {
        'populate': '*',
      }
    });

    if (!response.data?.data) {
      return [];
    }

    // Transform the data to match the Course interface
    return response.data.data.map((item: any) => {
      const data = item.attributes || item;
      return {
        id: item.id,
        title: data.title || '',
        registrationEnabled: data.registrationEnabled || false,
        availableSpots: data.availableSpots || 0,
        waitlistEnabled: data.waitlistEnabled || false,
        typeOfDance: data.typeOfDance || '',
        level: data.level || '',
        schedule: data.schedule || null
      };
    });
  } catch (error) {
    console.error('Error fetching available courses:', error);
    return [];
  }
}