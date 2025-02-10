import { Instructor } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InstructorsSectionProps {
  instructors: Instructor[];
}

export default function InstructorsSection({ instructors }: InstructorsSectionProps) {
  if (!Array.isArray(instructors) || instructors.length === 0) {
    return null;
  }

  const renderInstructorCard = (instructor: Instructor) => {
    if (!instructor?.attributes) return null;
    const { name, bio, specialties, image } = instructor.attributes;

    return (
      <Link 
        href={`/instructors/${instructor.id}`} 
        key={instructor.id}
        className="group"
      >
        <Card className="h-full transition-all duration-300 hover:shadow-lg bg-white">
          {/* Fixed image area with a consistent aspect ratio */}
          <div className="relative w-full aspect-video">
            {image?.data ? (
              <Image
                src={image.data.attributes.url}
                alt={name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600">No Image</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Consistent content area */}
          <div className="p-6 flex flex-col h-64 justify-between text-left">
            <div>
              <h3 className="text-2xl font-bold text-[#000066] mb-2 group-hover:text-purple-600 transition-colors">
                {name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {specialties?.map((specialty, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-sm font-medium text-purple-600 bg-purple-50 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 line-clamp-3 mb-4">{bio}</p>
            </div>
            <span className="text-purple-600 font-medium inline-flex items-center group-hover:gap-2 transition-all">
              Află mai multe 
              <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </span>
          </div>
        </Card>
      </Link>
    );
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <span className="text-purple-600 font-medium mb-2 block">Echipa Noastră</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#000066] mb-6">
            Instructori cu Experiență
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            Cunoaște instructorii noștri pasionați care te vor ghida în călătoria ta
            prin lumea dansului latino.
          </p>
        </div>

        {/* All instructors in a uniform grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((instructor) => renderInstructorCard(instructor))}
        </div>

        <div className="mt-16 text-left">
          <Button 
            asChild 
            size="lg" 
            className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8"
          >
            <Link href="/instructors">
              Vezi Toți Instructorii
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
