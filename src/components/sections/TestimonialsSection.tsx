"use client";

import { Testimonial } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials?.length) return null;

  return (
    <section className="py-32 bg-gradient-to-b from-purple-50/30 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-100/50 
                      rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-100/50 
                      rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-purple-600 font-medium text-sm uppercase tracking-wider mb-4 block">
            Testimoniale
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#000066] mb-6">
            Ce Spun <span className="text-purple-600">Cursanții</span> Noștri
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descoperă experiențele și poveștile de succes ale cursanților noștri care
            și-au împlinit visul de a dansa.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.id} variants={itemVariants}>
              <Card className="bg-white p-8 h-full hover:shadow-xl transition-all duration-300 
                            transform hover:-translate-y-1 relative group">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center
                                transform -rotate-6 group-hover:rotate-0 transition-transform duration-300">
                    <Quote className="w-4 h-4 text-white" />
                  </div>
                </div>

                {testimonial.attributes && (
                  <>
                    {/* Rating */}
                    <div className="mb-6">
                      <StarRating rating={testimonial.attributes.rating} />
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-gray-600 text-lg mb-8 italic">
                      "{testimonial.attributes.comment}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 mt-auto">
                      <Avatar className="h-12 w-12 ring-2 ring-purple-100">
                        <AvatarImage
                          src={testimonial.attributes.image?.data?.attributes.url}
                          alt={testimonial.attributes.name}
                        />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {getInitials(testimonial.attributes.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.attributes.name}
                        </div>
                        {testimonial.attributes.role && (
                          <div className="text-sm text-purple-600">
                            {testimonial.attributes.role}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Decorative Corner */}
                <div className="absolute bottom-0 right-0 w-16 h-16 
                              border-b-2 border-r-2 border-purple-100 
                              rounded-br-2xl opacity-0 group-hover:opacity-100 
                              transition-opacity duration-300" />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}