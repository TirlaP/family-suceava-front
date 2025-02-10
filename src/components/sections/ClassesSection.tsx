"use client";

import { DanceClass } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
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
  const [swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !Array.isArray(classes) || classes.length === 0) return null;

  const NavigationButton = ({ direction }: { direction: 'prev' | 'next' }) => (
    <button
      onClick={() => direction === 'prev' ? swiper?.slidePrev() : swiper?.slideNext()}
      className={`
        absolute top-1/2 -translate-y-1/2 z-10
        ${direction === 'prev' ? '-left-6' : '-right-6'}
        w-12 h-12 rounded-full bg-white shadow-lg
        flex items-center justify-center
        text-purple-600 hover:text-purple-700
        transition-all duration-300 hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-purple-500
        group
      `}
    >
      {direction === 'prev' ? (
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      ) : (
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      )}
    </button>
  );

  const renderClassCard = (danceClass: DanceClass) => {
    if (!danceClass?.attributes) return null;
    
    const { title, description, level, schedule, image, price, typeOfDance, slug } = danceClass.attributes;

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Link 
          href={`/courses/${slug}`}
          className="block h-full transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full border border-purple-50 relative group">
            {/* Image Container with Gradient Overlay */}
            <div className="relative h-56 w-full overflow-hidden">
              {image?.data ? (
                <>
                  <Image
                    src={image.data.attributes.url}
                    alt={title || "Dance Class"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                  <span className="text-purple-500 font-medium">Coming Soon</span>
                </div>
              )}
              
              {/* Level Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-4 py-1.5 bg-white/95 backdrop-blur-sm text-purple-700 rounded-full text-sm font-medium shadow-sm">
                  {level}
                </span>
              </div>

              {/* Price Tag */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-4 py-1.5 bg-purple-600 text-white rounded-full text-sm font-medium shadow-sm">
                  {price} RON
                </span>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6">
              {/* Dance Type Tag */}
              <div className="mb-4">
                <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                  {typeOfDance}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-purple-600 transition-colors">
                {title || "Untitled Class"}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {description || "No description available"}
              </p>

              {/* Schedule */}
              <div className="flex items-center text-gray-600 text-sm mt-auto">
                <Calendar className="w-4 h-4 mr-2" />
                {schedule || "Schedule TBA"}
              </div>
            </div>

            {/* Hover Overlay for Card */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-200 rounded-2xl transition-colors duration-300" />
          </div>
        </Link>
      </motion.div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="mb-16 text-center">
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

        {/* Enhanced Slider with Custom Navigation */}
        <div className="relative px-8">
          <NavigationButton direction="prev" />
          <NavigationButton direction="next" />
          
          <Swiper
            onSwiper={setSwiper}
            modules={[FreeMode, Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !w-2.5 !h-2.5 !bg-purple-200',
              bulletActiveClass: '!bg-purple-600'
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {classes.map((danceClass) => (
              <SwiperSlide key={danceClass.id} className="h-auto">
                {renderClassCard(danceClass)}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Enhanced Call-to-Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Link href="/courses">
              Vezi toate cursurile
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}