// app/instructors/[instructorSlug]/InstructorSlugClient.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchInstructors, fetchClasses } from "@/services/strapi";
import { Instructor, DanceClass } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  CalendarDays,
  Trophy,
  Star,
  Users,
  ArrowRight,
} from "lucide-react";
import { notFound } from "next/navigation";

interface Props {
  params: {
    instructorSlug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function InstructorSlugClient({ params }: Props) {
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [instructorClasses, setInstructorClasses] = useState<DanceClass[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInstructorAndClasses = async () => {
      try {
        const [instructors, allClasses] = await Promise.all([
          fetchInstructors(),
          fetchClasses(),
        ]);

        const foundInstructor = instructors.find(
          (inst) =>
            inst.attributes.name.toLowerCase().replace(/\s+/g, "-") === instructorSlug
        );

        if (!foundInstructor) {
          notFound();
        }

        setInstructor(foundInstructor);

        // Filter classes for this instructor
        const instructorClasses = allClasses.filter(
          (c) => c.attributes.instructor?.data?.id === foundInstructor.id
        );
        setInstructorClasses(instructorClasses);
      } catch (error) {
        console.error("Error loading instructor and classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInstructorAndClasses();
  }, [instructorSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!instructor) {
    return notFound();
  }

  const {
    name,
    bio,
    specialties,
    image,
    socialMedia,
    achievements,
    experience,
    certifications,
  } = instructor.attributes;

  const renderClassCard = (danceClass: DanceClass) => {
    const { title, schedule, level, typeOfDance, image } = danceClass.attributes;

    return (
      <motion.div
        key={danceClass.id}
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

  const achievements_data = [
    {
      icon: Trophy,
      title: "Experiență",
      value: experience || "10+ ani în dans",
    },
    {
      icon: Users,
      title: "Cursanți antrenați",
      value: "1000+",
    },
    {
      icon: Star,
      title: "Specializări",
      value: specialties?.join(", ") || "Multiple stiluri de dans",
    },
  ];

  return (
    <div className="-mt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
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
              <Button
                variant="outline"
                asChild
                className="mb-6 text-white border-white hover:bg-white/20"
              >
                <Link href="/instructors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Toți instructorii
                </Link>
              </Button>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{name}</h1>
              <p className="text-xl text-gray-200 mb-6">
                {specialties?.join(" • ")}
              </p>
              {/* Social Media */}
              {socialMedia && (
                <div className="flex space-x-4">
                  {socialMedia.facebook && (
                    <a
                      href={socialMedia.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple-400 transition-colors"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                  )}
                  {socialMedia.instagram && (
                    <a
                      href={socialMedia.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple-400 transition-colors"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  )}
                  {socialMedia.youtube && (
                    <a
                      href={socialMedia.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple-400 transition-colors"
                    >
                      <Youtube className="h-6 w-6" />
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4">Despre {name}</h2>
              <div className="prose max-w-none text-gray-600">{bio}</div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Realizări</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {achievements_data.map((achievement, index) => (
                  <div
                    key={index}
                    className="text-center p-4 bg-gray-50 rounded-lg"
                  >
                    <achievement.icon className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-medium text-gray-900 mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600">{achievement.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Classes */}
            {instructorClasses.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <h2 className="text-2xl font-bold mb-6">Cursuri predate</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {instructorClasses.map((danceClass) => (
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

          {/* Right Column - Additional Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 space-y-6">
              {/* Quick Contact */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4">Contact rapid</h3>
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Link href={`/contact?instructor=${name}`}>
                      Programează o lecție
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Contactează instructor
                  </Button>
                </div>
              </div>

              {/* Certifications */}
              {certifications && certifications.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-bold mb-4">Certificări</h3>
                  <ul className="space-y-3">
                    {certifications.map((cert, index) => (
                      <li key={index} className="flex items-start">
                        <Star className="h-5 w-5 text-yellow-500 mr-2 mt-1" />
                        <span className="text-gray-600">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Availability */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4">Program</h3>
                <div className="space-y-3 text-gray-600">
                  <p>• Luni - Vineri: 14:00 - 21:00</p>
                  <p>• Sâmbătă: 10:00 - 18:00</p>
                  <p>• Duminică: Închis</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
