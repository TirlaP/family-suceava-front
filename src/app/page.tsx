import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import ClassesSection from "@/components/sections/ClassesSection";
import InstructorsSection from "@/components/sections/InstructorsSection";
import EventsSection from "@/components/sections/EventsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import { 
  fetchClasses, 
  fetchServices, 
  fetchEvents, 
  fetchTestimonials, 
  fetchInstructors
} from "@/services/server-strapi";

// This enables Next.js ISR - Incremental Static Regeneration
export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  try {
    console.log('Starting data fetch for HomePage');
    console.log('API URL:', process.env.NEXT_PUBLIC_STRAPI_API_URL);

    // Fetch all data in parallel
    const [
      classesData,
      servicesData,
      eventsData,
      instructorsData,
      testimonialsData
    ] = await Promise.all([
      fetchClasses(),
      fetchServices(),
      fetchEvents(),
      fetchInstructors(),
      fetchTestimonials(),
    ]);

    // Log data for debugging
    console.log('HomePage Data Loaded:', {
      classesCount: classesData.length,
      servicesCount: servicesData.length,
      eventsCount: eventsData.length,
      instructorsCount: instructorsData.length,
      testimonialsCount: testimonialsData.length
    });

    return (
      <main className="relative">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent pointer-events-none" />
          <ErrorBoundary>
            <Hero />
          </ErrorBoundary>
        </div>

        <div className="relative z-10">
          {classesData.length > 0 && (
            <ErrorBoundary>
              <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent pointer-events-none" />
                <ClassesSection classes={classesData} />
              </section>
            </ErrorBoundary>
          )}

          {servicesData.length > 0 && (
            <ErrorBoundary>
              <ServicesSection services={servicesData} />
            </ErrorBoundary>
          )}

          {instructorsData.length > 0 && (
            <ErrorBoundary>
              <div className="relative">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
                <InstructorsSection instructors={instructorsData} />
              </div>
            </ErrorBoundary>
          )}

          {eventsData.length > 0 && (
            <ErrorBoundary>
              <EventsSection events={eventsData} />
            </ErrorBoundary>
          )}

          {testimonialsData.length > 0 && (
            <ErrorBoundary>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-transparent pointer-events-none" />
                <TestimonialsSection testimonials={testimonialsData} />
              </div>
            </ErrorBoundary>
          )}

          <ErrorBoundary>
            <div className="relative bg-gradient-to-b from-white to-purple-50/30">
              <ContactSection />
            </div>
          </ErrorBoundary>
        </div>

        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed" />
        </div>

        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/10 via-transparent to-pink-50/10" />
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in HomePage:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-6 bg-red-50 rounded-lg mx-4">
          <p className="text-red-600">Something went wrong loading the page.</p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 text-sm text-red-800">
              {error instanceof Error ? error.message : 'Unknown error'}
            </pre>
          )}
        </div>
      </div>
    );
  }
}