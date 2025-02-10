// src/components/EventCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/types";

interface EventCardProps {
  eventData: Event;
}

export default function EventCard({ eventData }: EventCardProps) {
  const { title, description, date, location, image } = eventData.attributes;

  return (
    <Link
      href={`/events/${eventData.id}`}
      className="block p-4 border rounded-lg hover:shadow-lg transition-all"
    >
      <div className="relative h-48 w-full mb-4">
        {image?.data ? (
          <Image
            src={image.data.attributes.url}
            alt={title || "Untitled Event"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold mb-2">{title || "Untitled Event"}</h3>
      <p className="text-gray-600 mb-2 line-clamp-2">
        {description || "No description available"}
      </p>
      <p className="text-sm text-gray-500">{date}</p>
      <p className="text-sm text-gray-500">{location}</p>
    </Link>
  );
}
