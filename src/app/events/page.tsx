"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchEvents } from "@/services/strapi";
import { Event } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // "all" is the sentinel value for no category filter.
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  // Preselect category from the URL query (if provided)
  useEffect(() => {
    const categoryFromQuery = searchParams.get("category");
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const fetchedEvents = await fetchEvents();
        // Sort events by date (ascending)
        const sortedEvents = fetchedEvents.sort(
          (a, b) =>
            new Date(a.attributes.date).getTime() -
            new Date(b.attributes.date).getTime()
        );
        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter((event) => {
      const matchesSearch =
        event.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.attributes.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Use substring matching (case‑insensitive) for category filtering.
      const matchesCategory =
        selectedCategory === "all" ||
        (event.attributes.category ?? "")
          .toLowerCase()
          .includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, events]);

  // Compute unique categories from the events.
  const categories = Array.from(
    new Set(events.map((event) => event.attributes.category))
  ).filter(Boolean) as string[];

  // Helper function to format dates.
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ro-RO", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Helper function to decide if an event is upcoming.
  const isUpcoming = (dateString: string) => new Date(dateString) > new Date();

  const renderEventCard = (event: Event) => {
    const { title, description, date, location, image, category } =
      event.attributes;
    const upcoming = isUpcoming(date);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-300"
      >
        <Link href={`/events/${event.attributes.slug}`} legacyBehavior>
          <a>
            <div className="relative h-48">
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
                  <span className="text-purple-500 font-medium">Event Image</span>
                </div>
              )}
              {upcoming && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-medium">
                    Upcoming
                  </span>
                </div>
              )}
            </div>

            <div className="p-6">
              {category && (
                <div className="mb-3">
                  <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                    {category}
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">{formatDate(date)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{location}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center text-purple-600">
                  Vezi detalii
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
                {upcoming && (
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Participă
                  </Button>
                )}
              </div>
            </div>
          </a>
        </Link>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const upcomingEvents = filteredEvents.filter((event) =>
    isUpcoming(event.attributes.date)
  );
  const pastEvents = filteredEvents.filter(
    (event) => !isUpcoming(event.attributes.date)
  );

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
            Evenimente
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descoperă evenimentele noastre speciale și participă la comunitatea noastră de dans.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Caută evenimente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Alege categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate categoriile</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Upcoming Events Section */}
        {upcomingEvents.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Evenimente viitoare
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderEventCard(event)}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Past Events Section */}
        {pastEvents.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Evenimente trecute
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {renderEventCard(event)}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium text-gray-600">
              Nu am găsit evenimente care să corespundă criteriilor tale.
            </h3>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-4"
            >
              Resetează filtrele
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
