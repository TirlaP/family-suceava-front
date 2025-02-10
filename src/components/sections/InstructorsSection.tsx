"use client";

import { Instructor } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InstructorsSectionProps {
  instructors: Instructor[];
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

export default function InstructorsSection({ instructors }: InstructorsSectionProps) {
  if (!Array.isArray(instructors) || instructors.length === 0) {
    return null;
  }

  const renderInstructorCard = (instructor: Instructor) => {
    if (!instructor?.attributes) return null;
    const { name, bio, specialties, image, slug } = instructor.attributes;

    return (
      <motion.div 
        key={instructor.id} 
        variants={itemVariants} 
        className="h-full"
      >
        <Link 
          href={`/instructors/${slug}`}
          className="group block h-full"
        >
          <Card className="relative overflow-hidden bg-white transition-all duration-500 
                          hover:shadow-2xl hover:-translate-y-1 h-full">
            {/* Image Container */}
            <div className="relative h-[400px] overflow-hidden">
              {image?.data ? (
                <>
                  <Image
                    src={image.data.attributes.url}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t 
                                from-black/70 via-black/20 to-transparent 
                                opacity-0 group-hover:opacity-100 
                                transition-opacity duration-500" />
                </>
              ) : (
                <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                  <span className="text-purple-600 font-medium">No Image</span>
                </div>
              )}
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white 
                          transform translate-y-20 group-hover:translate-y-0 
                          transition-transform duration-500">
              {/* Specialties */}
              <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500 delay-100">
                {specialties?.map((specialty, index) => (
                  <span 
                    key={`${instructor.id}-specialty-${index}`}
                    className="px-3 py-1 text-sm font-medium bg-white/20 
                              backdrop-blur-sm rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Name & Bio */}
              <h3 className="text-2xl font-bold mb-3 transform 
                          group-hover:-translate-y-1 transition-transform duration-300">
                {name}
              </h3>
              <p className="text-white/90 line-clamp-3 opacity-0 
                          group-hover:opacity-100 transition-opacity duration-500 delay-200">
                {bio}
              </p>
            </div>

            {/* Static Content (visible by default) */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white opacity-100 
                            group-hover:opacity-0 transition-opacity duration-300 
                            text-shadow-lg">
                  {name}
                </h3>
                <div className="flex gap-3 opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500 delay-300">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('#', '_blank');
                    }}
                    className="text-white hover:text-purple-300 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('#', '_blank');
                    }}
                    className="text-white hover:text-purple-300 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      window.open('#', '_blank');
                    }}
                    className="text-white hover:text-purple-300 transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </button>
                </div>
              </div>
          </Card>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/50 
                      rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-100/50 
                      rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-purple-600 font-medium text-sm uppercase tracking-wider mb-4 block">
            Echipa Noastră
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#000066] mb-6">
            Instructori cu 
            <span className="text-purple-600"> Experiență</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Cunoaște instructorii noștri pasionați care te vor ghida în călătoria ta
            prin lumea dansului latino.
          </p>
        </motion.div>

        {/* Instructors Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {instructors.map((instructor) => renderInstructorCard(instructor))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <Button 
            asChild 
            size="lg" 
            className="bg-[#000066] hover:bg-purple-600 text-white 
                      px-8 py-6 rounded-full text-lg font-medium 
                      shadow-lg hover:shadow-xl transition-all duration-300 
                      hover:scale-105"
          >
            <Link href="/instructors">
              Vezi Toți Instructorii
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}