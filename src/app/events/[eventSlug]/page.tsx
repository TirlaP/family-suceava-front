"use client";

import React, { useEffect, useState } from "react";
import { fetchEvents } from "@/services/strapi";
import { Event } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin, Users, Tag, Share2, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

// Helper to normalize a string into a slug.
function normalizeSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface EventSlugPageProps {
  params: Promise<{ eventSlug: string }>;
}

export default function EventSlugPage({ params }: EventSlugPageProps) {
  // Unwrap the promise to access the underlying parameters.
  const resolvedParams = React.use(params);
  const { eventSlug } = resolvedParams;

  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const allEvents = await fetchEvents();
        const foundEvent = allEvents.find((e) => {
          const slug = e.attributes.slug;
          const normalizedTitle = normalizeSlug(e.attributes.title);
          return slug === eventSlug || normalizedTitle === eventSlug;
        });
        if (!foundEvent) {
          notFound();
        }
        setEvent(foundEvent);
      } catch (error) {
        console.error("Error loading event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvent();
  }, [eventSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!event) {
    return notFound();
  }

  const {
    title,
    description,
    date,
    location,
    image,
    category,
    maxParticipants,
    organizer,
    price,
    additionalDetails,
  } = event.attributes;

  const formatDate = (dateString: string) => {
    const dateObj = new Date(dateString);
    return new Intl.DateTimeFormat("ro-RO", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);
  };

  const isUpcoming = (dateString: string) => new Date(dateString) > new Date();
  const upcoming = isUpcoming(date);

  const eventDetails = [
    {
      icon: Calendar,
      title: "Data și ora",
      value: formatDate(date),
    },
    {
      icon: MapPin,
      title: "Locație",
      value: location,
    },
    {
      icon: Users,
      title: "Participanți maximi",
      value: maxParticipants ? `${maxParticipants} persoane` : "Nelimitat",
    },
    {
      icon: Tag,
      title: "Categorie",
      value: category || "General",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[400px]">
        {image?.data ? (
          <Image
            src={image.data.attributes.url}
            alt={title}
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
                <Link href="/events">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Înapoi la evenimente
                </Link>
              </Button>
              {upcoming && (
                <span className="inline-block px-4 py-2 bg-green-500 text-white rounded-full text-sm font-medium mb-4">
                  Upcoming Event
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-xl text-gray-200 mb-6">{description}</p>
              {category && (
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  {category}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Event Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4">Despre eveniment</h2>
              <p className="text-gray-600 mb-6">{description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {eventDetails.map((detail, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <detail.icon className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <h3 className="text-sm font-medium text-gray-600 mb-1">{detail.title}</h3>
                    <p className="text-gray-900 font-medium">{detail.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Additional Information */}
            {additionalDetails && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-4">Informații suplimentare</h2>
                <div className="prose max-w-none text-gray-600">
                  {additionalDetails}
                </div>
              </motion.div>
            )}

            {/* Organizer Information */}
            {organizer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-4">Organizator</h2>
                <div className="flex items-center">
                  <div className="ml-4">
                    <h3 className="font-medium text-gray-900">{organizer.name}</h3>
                    <p className="text-gray-600">{organizer.description}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Registration & Share */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-8">
              {upcoming && (
                <>
                  {price && (
                    <div className="text-center mb-6">
                      <p className="text-gray-600 mb-2">Preț / persoană</p>
                      <h2 className="text-4xl font-bold text-purple-600">{price} RON</h2>
                    </div>
                  )}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-3" />
                      <p>{formatDate(date)}</p>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-3" />
                      <p>{location}</p>
                    </div>
                    {maxParticipants && (
                      <div className="flex items-center text-gray-600">
                        <Users className="h-5 w-5 mr-3" />
                        <p>Locuri disponibile: {maxParticipants}</p>
                      </div>
                    )}
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-purple-600 hover:bg-purple-700 mb-4"
                  >
                    Înregistrează-te
                  </Button>
                </>
              )}
              {/* Share Section */}
              <div className="pt-4 border-t border-gray-100">
                <p className="text-gray-600 mb-4 text-center">Distribuie evenimentul</p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Similar Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-8">Evenimente similare</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Add similar events here */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
