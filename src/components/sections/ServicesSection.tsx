"use client";

import { Service } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Music, 
  Users, 
  HeartHandshake, 
  Sparkles,
  GraduationCap,
  PartyPopper,
  ArrowRight
} from "lucide-react";

interface ServicesSectionProps {
  services: Service[];
}

const iconMap = {
  music: Music,
  users: Users,
  heart: HeartHandshake,
  sparkles: Sparkles,
  graduation: GraduationCap,
  party: PartyPopper,
};

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

export default function ServicesSection({ services }: ServicesSectionProps) {
  if (!Array.isArray(services) || services.length === 0) {
    return null;
  }

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Sparkles;
    return <IconComponent className="w-7 h-7" />;
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-purple-600 font-medium text-sm uppercase tracking-wider mb-4 block">
            Serviciile Noastre
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#000066] mb-6">
            Descoperiți magia dansului cu 
            <span className="text-purple-600"> serviciile noastre </span> 
            de excepție!
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            La Salsa Family Suceava, oferim servicii complete de dans pentru toate nivelurile.
            Indiferent dacă sunteți începător sau avansat, veți găsi serviciul perfect pentru voi.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
            >
              <Link
                href={service.attributes?.link || "#"}
                className="group block relative"
              >
                <div className="relative bg-white rounded-3xl p-8 h-full transition-all duration-500 
                              hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1">
                  {/* Service Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 
                                rounded-2xl flex items-center justify-center mb-8 
                                group-hover:scale-110 transition-transform duration-500">
                    <div className="text-purple-600 transition-colors duration-300 
                                  group-hover:text-purple-700">
                      {getIcon(service.attributes?.icon || "sparkles")}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-[#000066] mb-4 
                               group-hover:text-purple-600 transition-colors">
                    {service.attributes?.title || "Serviciu fără titlu"}
                  </h3>

                  <p className="text-gray-600 mb-8 line-clamp-3">
                    {service.attributes?.description || "Serviciu fără descriere"}
                  </p>

                  {/* Call to Action */}
                  <div className="flex items-center text-purple-600 font-medium absolute bottom-8">
                    <span className="group-hover:mr-4 transition-all duration-300">
                      Află mai multe
                    </span>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 
                                       group-hover:opacity-100 group-hover:translate-x-0 
                                       transition-all duration-300" />
                  </div>

                  {/* Border Gradient */}
                  <div className="absolute inset-0 border-2 border-transparent 
                                group-hover:border-purple-100 rounded-3xl 
                                transition-colors duration-300" />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-16 h-16 
                                border-t-2 border-l-2 border-transparent 
                                group-hover:border-purple-300 rounded-tl-3xl 
                                transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 
                                border-b-2 border-r-2 border-transparent 
                                group-hover:border-purple-300 rounded-br-3xl 
                                transition-colors duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}