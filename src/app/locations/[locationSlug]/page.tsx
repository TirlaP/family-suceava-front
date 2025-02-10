"use client";

import React, { useEffect, useState } from "react";
import { fetchLocations, fetchClasses } from "@/services/strapi";
import { Location, DanceClass } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock,
  Car,
  Wifi,
  Music,
  ArrowRight,
  CalendarDays,
} from "lucide-react";
import { notFound } from "next/navigation";

// Helper to normalize a city string into a slug.
function normalizeLocation(city: string): string {
  return city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

interface LocationSlugPageProps {
  params: Promise<{ locationSlug: string }>;
}

export default function LocationSlugPage({ params }: LocationSlugPageProps) {
  // Unwrap the params promise.
  const resolvedParams = React.use(params);
  const { locationSlug } = resolvedParams;

  const [location, setLocation] = useState<Location | null>(null);
  const [classesAtLocation, setClassesAtLocation] = useState<DanceClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLocationAndClasses = async () => {
      try {
        const [locations, allClasses] = await Promise.all([
          fetchLocations(),
          fetchClasses(),
        ]);

        const foundLocation = locations.find(
          (loc) => normalizeLocation(loc.attributes.city) === locationSlug
        );

        if (!foundLocation) {
          notFound();
        }

        setLocation(foundLocation);

        // Filter classes for this location.
        const locationClasses = allClasses.filter(
          (c) =>
            c.attributes.location?.data?.id === foundLocation.id
        );
        setClassesAtLocation(locationClasses);
      } catch (error) {
        console.error("Error loading location and classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocationAndClasses();
  }, [locationSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!location) {
    return notFound();
  }

  const { name, address, city, image, phone, email, openingHours, facilities } =
    location.attributes;

  const amenities = [
    {
      icon: Car,
      title: "Parcare",
      description: "Parcare gratuită disponibilă",
    },
    {
      icon: Wifi,
      title: "Wi-Fi",
      description: "Internet wireless gratuit",
    },
    {
      icon: Music,
      title: "Sistem audio",
      description: "Sistem audio profesional",
    },
  ];

  const renderClassCard = (danceClass: DanceClass) => {
    const { title, schedule, level, typeOfDance, image } = danceClass.attributes;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
      >
        <Link href={`/classes/${danceClass.id}`}>
          <div className="relative h-40">
            {image?.data ? (
              <Image
                src={image.data.attributes.url}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                <span className="text-purple-500 font-medium">No Image</span>
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                {typeOfDance}
              </span>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {level}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              {title}
            </h3>

            <div className="flex items-center text-gray-600 text-sm">
              <CalendarDays className="h-4 w-4 mr-2" />
              {schedule}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center text-purple-600 font-medium">
                Vezi detalii
                <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        {image?.data ? (
          <Image
            src={image.data.attributes.url}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-500" />
        )}
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white max-w-3xl"
            >
              <Button variant="outline" asChild className="mb-6 text-white border-white hover:bg-white/20">
                <Link href="/locations">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Toate locațiile
                </Link>
              </Button>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
              <div className="flex items-center text-gray-200 mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <p>{address}, {city}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Location Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Contact și program</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {phone && (
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <h3 className="font-medium">Telefon</h3>
                        <p className="text-gray-600">{phone}</p>
                      </div>
                    </div>
                  )}
                  {email && (
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-600">{email}</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {openingHours && (
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-purple-600 mr-3 mt-1" />
                      <div>
                        <h3 className="font-medium">Program</h3>
                        <div className="text-gray-600 space-y-1">
                          {openingHours.split("\n").map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Amenities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Facilități</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-gray-50 rounded-lg"
                  >
                    <amenity.icon className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">{amenity.title}</h3>
                      <p className="text-sm text-gray-600">{amenity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Classes at this Location */}
            {classesAtLocation.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6">Cursuri în această locație</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {classesAtLocation.map((danceClass) => (
                    <motion.div
                      key={danceClass.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {renderClassCard(danceClass)}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Map & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 space-y-6">
              {/* Map */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4">Locație pe hartă</h3>
                <div className="aspect-square w-full bg-gray-200 rounded-lg">
                  {/* Add your map component here */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    Map Component
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4">Acțiuni rapide</h3>
                <div className="space-y-4">
                  <Button size="lg" className="w-full bg-purple-600 hover:bg-purple-700">
                    <Link href="/contact">Programează o vizită</Link>
                  </Button>
                  {phone && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => (window.location.href = `tel:${phone}`)}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Sună-ne
                    </Button>
                  )}
                  {email && (
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => (window.location.href = `mailto:${email}`)}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Trimite email
                    </Button>
                  )}
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4">Informații utile</h3>
                <div className="space-y-4 text-sm text-gray-600">
                  <p>• Acces facil cu transportul public</p>
                  <p>• Parcare gratuită disponibilă</p>
                  <p>• Vestiare și dușuri</p>
                  <p>• Zonă de așteptare confortabilă</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
