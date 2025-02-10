import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import ClassesSection from "@/components/sections/ClassesSection";
import InstructorsSection from "@/components/sections/InstructorsSection";
import EventsSection from "@/components/sections/EventsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

import { 
  fetchClasses, 
  fetchServices, 
  fetchEvents, 
  fetchTestimonials, 
  fetchInstructors
} from "@/services/strapi";

// Loading animation component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-600"></div>
  </div>
);

// Error boundary component
const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center min-h-[200px] bg-red-50 rounded-lg mx-4">
    <p className="text-red-600">{message}</p>
  </div>
);

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  try {
    // Fetch all data in parallel with error handling for each request
    const [
      classesData,
      servicesData,
      eventsData,
      instructorsData,
      testimonialsData
    ] = await Promise.all([
      fetchClasses().catch((error) => {
        console.error('Error fetching classes:', error);
        return [];
      }),
      fetchServices().catch((error) => {
        console.error('Error fetching services:', error);
        return [];
      }),
      fetchEvents().catch((error) => {
        console.error('Error fetching events:', error);
        return [];
      }),
      fetchInstructors().catch((error) => {
        console.error('Error fetching instructors:', error);
        return [];
      }),
      fetchTestimonials().catch((error) => {
        console.error('Error fetching testimonials:', error);
        return [];
      }),
    ]);

    // Apply data transformations and validations if needed
    const classes = Array.isArray(classesData) ? classesData : [];
    const services = Array.isArray(servicesData) ? servicesData : [];
    const events = Array.isArray(eventsData) ? eventsData : [];
    const instructors = Array.isArray(instructorsData) ? instructorsData : [];
    const testimonials = Array.isArray(testimonialsData) ? testimonialsData : [];

    return (
      <main className="relative">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent pointer-events-none" />
          <Hero />
        </div>

        <div className="relative z-10">
          <section className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent pointer-events-none" />
            <ClassesSection classes={classes} />
          </section>

          <ServicesSection services={services} />

          <div className="relative">
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
            <InstructorsSection instructors={instructors} />
          </div>

          <EventsSection events={events} />

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-transparent pointer-events-none" />
            <TestimonialsSection testimonials={testimonials} />
          </div>

          <div className="relative bg-gradient-to-b from-white to-purple-50/30">
            <ContactSection />
          </div>
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
    console.error('Error rendering HomePage:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorDisplay message="Something went wrong loading the page. Please try again later." />
      </div>
    );
  }
}