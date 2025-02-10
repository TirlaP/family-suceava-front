"use client";

import { DanceClass } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ClassesSectionProps {
  classes: DanceClass[];
}

export default function ClassesSection({ classes }: ClassesSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !Array.isArray(classes) || classes.length === 0) return null;

  // Enhanced class card with animations and better visual hierarchy
  const renderClassCard = (danceClass: DanceClass) => {
    if (!danceClass?.attributes) {
      console.warn("Invalid class data:", danceClass);
      return null;
    }
    
    const { title, description, level, schedule, image, price, typeOfDance } = danceClass.attributes;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href={`/classes/${danceClass.id}`} 
          key={danceClass.id}
          className="block transition-all duration-300 hover:scale-105"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full border border-gray-100">
            {/* Image Container */}
            <div className="relative h-48 w-full">
              {image?.data ? (
                <Image
                  src={image.data.attributes.url}
                  alt={title || "Dance Class"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                  <span className="text-purple-500 font-medium">Coming Soon</span>
                </div>
              )}
              {/* Level Badge */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-700 rounded-full text-sm font-medium shadow-sm">
                  {level}
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-5">
              {/* Dance Type Tag */}
              <div className="mb-3">
                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  {typeOfDance}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                {title || "Untitled Class"}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {description || "No description available"}
              </p>

              {/* Details */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="text-gray-600 text-sm">
                  <i className="far fa-clock mr-2"></i>
                  {schedule || "Schedule TBA"}
                </div>
                <div className="text-purple-700 font-bold">
                  {price} RON
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-purple-600 font-medium text-sm uppercase tracking-wider">
              Dans & Ritm
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
              Explorează cursurile noastre de dans
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              De la salsa la bachata, descoperă pasiunea pentru dans într-un mediu prietenos și profesionist.
            </p>
          </motion.div>
        </div>

        {/* Enhanced Slider */}
        <div className="relative -mx-4 px-4">
          <Swiper
            modules={[FreeMode, Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView="auto"
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {classes.map((danceClass) => (
              <SwiperSlide key={danceClass.id}>
                {renderClassCard(danceClass)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Enhanced Call-to-Action */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="/classes">Vezi toate cursurile</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}