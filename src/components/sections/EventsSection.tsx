import { Event } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EventsSectionProps {
  events: Event[];
}

export default function EventsSection({ events }: EventsSectionProps) {
  if (!Array.isArray(events) || events.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString().padStart(2, "0"),
      month: new Intl.DateTimeFormat("ro-RO", { month: "short" }).format(date),
      time: date.toLocaleTimeString("ro-RO", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const renderFeaturedEvent = (event: Event) => {
    if (!event?.attributes) return null;

    const { title, description, date, location, image } = event.attributes;
    const formattedDate = formatDate(date);

    return (
      <Link href={`/events/${event.id}`} className="block group">
        <div className="relative h-[500px] rounded-3xl overflow-hidden">
          {/* Image and Overlay */}
          <div className="absolute inset-0">
            {image?.data ? (
              <Image
                src={image.data.attributes.url}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-purple-100" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="max-w-3xl">
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {formattedDate.day} {formattedDate.month},{" "}
                    {formattedDate.time}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{location}</span>
                </div>
              </div>

              <h3 className="text-3xl font-bold mb-4 group-hover:text-purple-300 transition-colors">
                {title}
              </h3>

              <p className="text-gray-200 mb-6 line-clamp-2">{description}</p>

              <Button
                variant="secondary"
                className="rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors"
              >
                Detalii și Înscriere
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const renderEventCard = (event: Event) => {
    if (!event?.attributes) return null;

    const { title, description, date, location, image } = event.attributes;
    const formattedDate = formatDate(date);

    return (
      <Link key={event.id} href={`/events/${event.id}`} className="group">
        <Card className="overflow-hidden h-full hover:shadow-lg transition-all duration-300">
          <div className="relative h-48">
            {image?.data ? (
              <Image
                src={image.data.attributes.url}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-purple-100" />
            )}

            {/* Date Badge */}
            <div className="absolute top-4 left-4 bg-white rounded-xl p-2 text-center min-w-[60px]">
              <div className="text-2xl font-bold text-purple-600">
                {formattedDate.day}
              </div>
              <div className="text-sm text-gray-600">{formattedDate.month}</div>
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
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600 line-clamp-2">{description}</p>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12">Evenimente</h2>
        {/* Featured Event */}
        <div className="mb-12">{renderFeaturedEvent(events[0])}</div>
        {/* Other Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(1).map((event) => renderEventCard(event))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-purple-600 font-medium hover:text-purple-800"
          >
            Vezi toate evenimentele <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
