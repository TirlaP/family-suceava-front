import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import ClassesSection from "@/components/sections/ClassesSection";
import TeamSection from "@/components/sections/InstructorsSection";
import EventsSection from "@/components/sections/EventsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import InstructorsSection from "@/components/sections/InstructorsSection";

import { 
  fetchClasses, 
  fetchServices, 
  fetchEvents, 
  fetchTestimonials, 
  fetchInstructors
} from "@/services/strapi";

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const [
    classes,
    services,
    events,
    instructors,
    testimonials
  ] = await Promise.all([
    fetchClasses().catch(() => []),
    fetchServices().catch(() => []),
    fetchEvents().catch(() => []),
    fetchInstructors().catch(() => []),
    fetchTestimonials().catch(() => []),
  ]);

  return (
    <main className="relative z-0">
      <div className="min-h-screen relative z-0">
        <Hero />
      </div>
      <ClassesSection classes={classes} />
      <ServicesSection services={services} />
      <InstructorsSection instructors={instructors} />
      <EventsSection events={events} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
    </main>
  );
}
