"use client";

import React, { useEffect, useState } from "react";
import { fetchClasses } from "@/services/strapi";
import { DanceClass } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft,
  CalendarDays,
  Users,
  Timer,
  MapPin,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { notFound } from "next/navigation";

interface CourseSlugPageProps {
  // In Next.js 13 the route params may be provided as a Promise.
  params: Promise<{ courseSlug: string }>;
}

export default function CourseSlugPage({ params }: CourseSlugPageProps) {
  // Unwrap the params promise.
  const resolvedParams = React.use(params);
  const { courseSlug } = resolvedParams;

  const [course, setCourse] = useState<DanceClass | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const allCourses = await fetchClasses();
        const foundCourse = allCourses.find((c) =>
          c.attributes.slug === courseSlug ||
          c.attributes.title.toLowerCase().replace(/\s+/g, '-') === courseSlug
        );
        
        if (!foundCourse) {
          notFound();
        }
        
        setCourse(foundCourse);
      } catch (error) {
        console.error("Error loading course:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourse();
  }, [courseSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!course) {
    return notFound();
  }

  const { 
    title, 
    description, 
    level, 
    schedule, 
    image, 
    price, 
    typeOfDance,
    location 
  } = course.attributes;

  const courseFeatures = [
    {
      icon: Users,
      title: "Nivel",
      value: level
    },
    {
      icon: CalendarDays,
      title: "Program",
      value: schedule || "TBA"
    },
    {
      icon: Timer,
      title: "Durată",
      value: "50 minute"
    },
    {
      icon: MapPin,
      title: "Locație",
      value: location?.data?.attributes?.name || "TBA"
    }
  ];

  const benefits = [
    "Instructori profesioniști cu experiență",
    "Grupe mici pentru atenție personalizată",
    "Program flexibil",
    "Atmosferă prietenoasă și relaxantă",
    "Progres monitorizat constant",
    "Acces la evenimente speciale"
  ];

  return (
    <div className="-mt-16 min-h-screen bg-gray-50">
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
              <Button
                variant="outline"
                asChild
                className="mb-6 text-white border-white hover:bg-white/20"
              >
                <Link href="/courses">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Înapoi la cursuri
                </Link>
              </Button>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-xl text-gray-200 mb-6">{description}</p>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  {typeOfDance}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
                  {level}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4">Descriere curs</h2>
              <p className="text-gray-600 mb-6">{description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {courseFeatures.map((feature, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <feature.icon className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                    <h3 className="text-sm font-medium text-gray-600 mb-1">{feature.title}</h3>
                    <p className="text-gray-900 font-medium">{feature.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Ce vei învăța</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Schedule Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h2 className="text-2xl font-bold mb-6">Program & Locație</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CalendarDays className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-medium">Zile și ore</h3>
                    <p className="text-gray-600">{schedule || "Program TBA"}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-medium">Locație</h3>
                    <p className="text-gray-600">
                      {location?.data?.attributes?.name || "Locație TBA"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Pricing & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-md sticky top-8">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-2">Preț / lună</p>
                <h2 className="text-4xl font-bold text-purple-600">{price} RON</h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                  <p className="text-gray-600">4 ședințe pe lună</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                  <p className="text-gray-600">50 minute / ședință</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                  <p className="text-gray-600">Instructori profesioniști</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3" />
                  <p className="text-gray-600">Acces la evenimente speciale</p>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full bg-purple-600 hover:bg-purple-700 mb-4"
              >
                <Link href="/contact" className="flex items-center justify-center">
                  Înscrie-te acum
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <p className="text-sm text-gray-500 text-center">
                Prima ședință de probă este gratuită!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
