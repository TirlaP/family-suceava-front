import { Service } from "@/types";
import Link from "next/link";
import { 
  Music, 
  Users, 
  HeartHandshake, 
  Sparkles,
  GraduationCap,
  PartyPopper
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

export default function ServicesSection({ services }: ServicesSectionProps) {
  if (!Array.isArray(services) || services.length === 0) {
    return null;
  }

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Sparkles;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16">
          <span className="text-purple-600 font-medium mb-2 block">Serviciile Noastre</span>
          <h2 className="text-4xl md:text-5xl font-bold text-[#000066] mb-6">
            Descoperiți magia dansului cu serviciile noastre de excepție!
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl">
            La Salsa Family Suceava, oferim servicii complete de dans pentru toate nivelurile.
            Indiferent dacă sunteți începător sau avansat, veți găsi serviciul perfect pentru voi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.attributes?.link || "#"}
              className="group relative bg-white p-8 rounded-3xl transition-all duration-300 hover:shadow-xl"
            >
              {/* Background Pattern (fades in on hover) */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

              {/* Content */}
              <div className="relative">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <div className="text-purple-600">
                    {getIcon(service.attributes?.icon || "sparkles")}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-[#000066] mb-4 group-hover:text-purple-600 transition-colors">
                  {service.attributes?.title || "Serviciu fără titlu"}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {service.attributes?.description || "Serviciu fără descriere"}
                </p>

                <div className="flex items-center text-purple-600 font-medium">
                  <span className="group-hover:mr-2 transition-all">Află mai multe</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </div>

              {/* Border Gradient */}
              <div className="absolute inset-0 border border-transparent group-hover:border-purple-100 rounded-3xl transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
