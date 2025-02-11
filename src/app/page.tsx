import Hero from "@/components/sections/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import ClassesSection from "@/components/sections/ClassesSection";
import InstructorsSection from "@/components/sections/InstructorsSection";
import EventsSection from "@/components/sections/EventsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/homepage`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      classes: [],
      services: [],
      events: [],
      instructors: [],
      testimonials: []
    };
  }
}

export default async function HomePage() {
  const {
    classes = [],
    services = [],
    events = [],
    instructors = [],
    testimonials = []
  } = await getData();

  return (
    <main className="relative">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-50/50 to-transparent pointer-events-none" />
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
      </div>

      <div className="relative z-10">
        {classes.length > 0 && (
          <ErrorBoundary>
            <section className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent pointer-events-none" />
              <ClassesSection classes={classes} />
            </section>
          </ErrorBoundary>
        )}

        {services.length > 0 && (
          <ErrorBoundary>
            <ServicesSection services={services} />
          </ErrorBoundary>
        )}

        {instructors.length > 0 && (
          <ErrorBoundary>
            <div className="relative">
              <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
              <InstructorsSection instructors={instructors} />
            </div>
          </ErrorBoundary>
        )}

        {events.length > 0 && (
          <ErrorBoundary>
            <EventsSection events={events} />
          </ErrorBoundary>
        )}

        {testimonials.length > 0 && (
          <ErrorBoundary>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-50/30 to-transparent pointer-events-none" />
              <TestimonialsSection testimonials={testimonials} />
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
}