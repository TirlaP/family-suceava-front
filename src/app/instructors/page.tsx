"use client";

import { useEffect, useState } from "react";
import { fetchInstructors } from "@/services/strapi";
import { Instructor } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  ArrowRight,
  Facebook,
  Instagram,
  Youtube
} from "lucide-react";

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInstructors = async () => {
      try {
        const fetchedInstructors = await fetchInstructors();
        setInstructors(fetchedInstructors);
      } catch (error) {
        console.error("Error loading instructors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInstructors();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const renderInstructorCard = (instructor: Instructor) => {
    const { name, bio, specialties, image, socialMedia } = instructor.attributes;
    const slug = name.toLowerCase().replace(/\s+/g, '-');

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
      >
        <Link href={`/instructors/${slug}`}>
          <div className="relative h-80">
            {image?.data ? (
              <Image
                src={image.data.attributes.url}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                <span className="text-purple-500 font-medium">No Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 group-hover:from-black/80 transition-all duration-300" />
            
            {/* Social Media Links */}
            {socialMedia && (
              <div className="absolute bottom-4 left-4 flex space-x-3">
                {socialMedia.facebook && (
                  <a
                    href={socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {socialMedia.instagram && (
                  <a
                    href={socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {socialMedia.youtube && (
                  <a
                    href={socialMedia.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-400 transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              {name}
            </h3>

            {specialties && specialties.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            )}

            <p className="text-gray-600 mb-4 line-clamp-3">{bio}</p>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-purple-600 font-medium">
                Vezi profilul complet
                <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Instructorii noștri
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cunoaște echipa noastră de instructori profesioniști, pasionați să îți împărtășească dragostea pentru dans.
          </p>
        </motion.div>

        {/* Instructors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderInstructorCard(instructor)}
            </motion.div>
          ))}
        </div>

        {/* Join Our Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 bg-white rounded-xl shadow-md p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Vrei să faci parte din echipa noastră?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Suntem mereu în căutare de instructori talentați și pasionați. 
            Dacă ai experiență în dans și dorești să faci parte din echipa noastră, contactează-ne!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Link href="/contact">
                Aplică acum
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
            >
              <Mail className="mr-2 h-4 w-4" />
              Trimite CV
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}