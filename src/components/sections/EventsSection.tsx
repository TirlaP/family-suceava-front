"use client";

import { Event } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EventsSectionProps {
  events: Event[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function EventsSection({ events }: EventsSectionProps) {
  if (!Array.isArray(events) || events.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: new Intl.DateTimeFormat("ro-RO", { month: "short" }).format(date),
      weekday: new Intl.DateTimeFormat("ro-RO", { weekday: "long" }).format(date),
      time: date.toLocaleTimeString("ro-RO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const renderFeaturedEvent = (event: Event) => {
    if (!event?.attributes) return null;

    const { title, description, date, location, image, slug } = event.attributes;
    const formattedDate = formatDate(date);

    return (
      <motion.div
        key={event.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Link href={`/events/${slug}`} className="block group">
          <div className="relative h-[600px] rounded-3xl overflow-hidden">
            {/* Image and Overlay */}
            <div className="absolute inset-0">
              {image?.data ? (
                <>
                  <Image
                    src={image.data.attributes.url}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 1280px) 100vw, 1280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t 
                                from-black/80 via-black/50 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-purple-100" />
              )}
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-12">
              <div className="max-w-3xl">
                {/* Date Badge */}
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm 
                              rounded-full px-6 py-2 mb-6 text-white">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-medium">
                    {formattedDate.weekday}, {formattedDate.day} {formattedDate.month}
                  </span>
                  <span className="mx-3">•</span>
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{location}</span>
                </div>

                <h3 className="text-4xl font-bold text-white mb-4 
                              group-hover:text-purple-300 transition-colors">
                  {title}
                </h3>

                <p className="text-gray-200 text-lg mb-8 line-clamp-2 max-w-2xl">
                  {description}
                </p>

                <Button
                  variant="secondary"
                  className="rounded-full px-8 py-6 text-lg bg-white hover:bg-purple-600 
                            hover:text-white group-hover:translate-x-2 transition-all duration-300"
                >
                  <span>Detalii și Înscriere</span>
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  const renderEventCard = (event: Event) => {
    if (!event?.attributes) return null;

    const { title, description, date, location, image, slug } = event.attributes;
    const formattedDate = formatDate(date);

    return (
      <motion.div 
        key={event.id}
        variants={itemVariants}
      >
        <Link href={`/events/${slug}`} className="group block h-full">
          <Card className="overflow-hidden h-full hover:shadow-xl transition-all duration-300 
                          transform hover:-translate-y-1 bg-white">
            <div className="relative h-64">
              {image?.data ? (
                <>
                  <Image
                    src={image.data.attributes.url}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              ) : (
                <div className="w-full h-full bg-purple-100" />
              )}

              {/* Date Badge */}
              <div className="absolute top-4 left-4 bg-white rounded-2xl p-3 text-center 
                            shadow-lg group-hover:bg-purple-600 group-hover:text-white 
                            transition-colors duration-300">
                <div className="text-2xl font-bold">
                  {formattedDate.day}
                </div>
                <div className="text-sm font-medium">
                  {formattedDate.month}
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formattedDate.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{location}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-600 
                            transition-colors line-clamp-1">
                {title}
              </h3>

              <p className="text-gray-600 line-clamp-2 mb-4">
                {description}
              </p>

              <div className="flex items-center text-purple-600 font-medium">
                <span className="group-hover:mr-2 transition-all">
                  Vezi detalii
                </span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 
                                    group-hover:opacity-100 group-hover:translate-x-0 
                                    transition-all duration-300" />
              </div>
            </div>
          </Card>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="py-32 bg-gradient-to-b from-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-purple-600 font-medium text-sm uppercase tracking-wider mb-4 block">
            Calendar Evenimente
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#000066] mb-6">
            Evenimente Speciale
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descoperă evenimentele noastre speciale și participă la cele mai tari
            petreceri de dans din oraș.
          </p>
        </motion.div>

        {/* Featured Event */}
        <div className="mb-16">
          {events[0] && renderFeaturedEvent(events[0])}
        </div>

        {/* Other Events Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" 
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {events.slice(1).map((event) => renderEventCard(event))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-[#000066] hover:bg-purple-600 text-white px-8 py-6 
                      rounded-full text-lg font-medium shadow-lg hover:shadow-xl 
                      transition-all duration-300 hover:scale-105"
          >
            <Link href="/events">
              Vezi Toate Evenimentele
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}