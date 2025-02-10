"use client";

import { useEffect, useState } from "react";
import { fetchLocations } from "@/services/strapi";
import { Location } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, ArrowRight, Building, CheckSquare } from "lucide-react";

// Helper to normalize a city string into a slug (remove diacritics and lowercase)
function normalizeLocation(city: string): string {
  return city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const fetchedLocations = await fetchLocations();
        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Error loading locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocations();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const renderLocationCard = (location: Location) => {
    const { name, address, city, image, phone, email } = location.attributes;
    // Use the normalized city value as the slug.
    const slug = normalizeLocation(city);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
      >
        <Link href={`/locations/${slug}`}>
          <div className="relative h-48">
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
                <span className="text-purple-500 font-medium">Location Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              {name}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">
                  {address}, {city}
                </span>
              </div>
              {phone && (
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{phone}</span>
                </div>
              )}
              {email && (
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{email}</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center text-purple-600 font-medium">
                Vezi detalii
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
            Locațiile noastre
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descoperă locațiile unde se desfășoară cursurile și evenimentele noastre.
          </p>
        </motion.div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 bg-white rounded-xl shadow-md p-6"
        >
          <div className="h-96 bg-gray-200 rounded-lg mb-6">
            {/* Add your map component here */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Map Component
            </div>
          </div>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderLocationCard(location)}
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16 bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ai întrebări despre locațiile noastre?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Suntem aici să te ajutăm! Contactează-ne pentru mai multe informații despre oricare dintre locațiile noastre.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/contact">Contactează-ne</Link>
            </Button>
            <Button variant="outline" size="lg">
              <Phone className="mr-2 h-4 w-4" />
              Sună-ne
            </Button>
          </div>
        </motion.div>

        {/* Advantages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Locații centrale",
              description:
                "Toate locațiile noastre sunt ușor accesibile și în zone centrale",
              icon: MapPin,
            },
            {
              title: "Săli moderne",
              description:
                "Săli spațioase, cu oglinzi și pardoseală profesională",
              icon: Building,
            },
            {
              title: "Facilități complete",
              description:
                "Vestiare, dușuri, parcare și alte facilități necesare",
              icon: CheckSquare,
            },
          ].map((advantage, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <advantage.icon className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {advantage.title}
              </h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 bg-white rounded-xl shadow-md p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Întrebări frecvente
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              {
                question: "Care sunt orele de funcționare?",
                answer:
                  "Locațiile noastre sunt deschise de luni până vineri între 9:00 și 22:00, iar în weekend între 10:00 și 20:00.",
              },
              {
                question: "Există parcare disponibilă?",
                answer:
                  "Da, toate locațiile noastre au parcare gratuită pentru cursanți.",
              },
              {
                question: "Ce facilități sunt disponibile?",
                answer:
                  "Oferim vestiare separate pentru bărbați și femei, dușuri, zonă de așteptare și apă gratuită.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
