import { NextResponse } from 'next/server';
import { 
  fetchClasses, 
  fetchServices, 
  fetchEvents, 
  fetchTestimonials, 
  fetchInstructors 
} from "@/services/strapi";

export async function GET() {
  console.log('Homepage API Route - Starting data fetch');
  
  try {
    // Fetch all data in parallel
    const [classes, services, events, instructors, testimonials] = await Promise.all([
      fetchClasses().catch(error => {
        console.error('Error fetching classes:', error);
        return [];
      }),
      fetchServices().catch(error => {
        console.error('Error fetching services:', error);
        return [];
      }),
      fetchEvents().catch(error => {
        console.error('Error fetching events:', error);
        return [];
      }),
      fetchInstructors().catch(error => {
        console.error('Error fetching instructors:', error);
        return [];
      }),
      fetchTestimonials().catch(error => {
        console.error('Error fetching testimonials:', error);
        return [];
      }),
    ]);

    console.log('Homepage API Route - Data fetch complete', {
      classesCount: classes.length,
      servicesCount: services.length,
      eventsCount: events.length,
      instructorsCount: instructors.length,
      testimonialsCount: testimonials.length,
    });

    return NextResponse.json({
      classes,
      services,
      events,
      instructors,
      testimonials,
    });
  } catch (error) {
    console.error('Error in homepage API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}