'use client';

import { useState, useEffect } from 'react';
import { RegistrationForm } from '@/components/RegistrationForm';
import { submitRegistration, getAvailableCourses } from '@/services/registration';
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Users2, GraduationCap } from "lucide-react";

export default function RegistrationPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await getAvailableCourses();
        setCourses(data);
      } catch (err) {
        setError('Error loading courses');
        console.error('Error loading courses:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleSubmit = async (data: any) => {
    try {
      await submitRegistration(data);
      toast({
        title: "Înscriere reușită!",
        description: "Vei primi un email de confirmare în curând.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Eroare",
        description: "A apărut o eroare la înregistrare. Te rugăm să încerci din nou.",
      });
      console.error('Registration error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      icon: CalendarDays,
      title: "Program Flexibil",
      description: "Cursuri în diferite intervale orare"
    },
    {
      icon: MapPin,
      title: "Mai Multe Locații",
      description: "Prezență în Suceava, Botoșani și Rădăuți"
    },
    {
      icon: Users2,
      title: "Instructori Profesioniști",
      description: "Experiență vastă în dans"
    },
    {
      icon: GraduationCap,
      title: "Progres Garantat",
      description: "De la începător la avansat"
    }
  ];

  return (
    <div className="-mt-16 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Începe Călătoria Ta în Dans
              </h1>
              <p className="text-xl text-gray-200 mb-6">
                Descoperă pasiunea pentru dans într-un mediu prietenos și profesionist.
                Înscrie-te la cursurile noastre și fă primul pas spre o nouă aventură.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <feature.icon className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-xl p-8"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Formular de Înscriere
                </h2>
                <p className="mt-2 text-gray-600">
                  Completează formularul pentru a te înscrie la cursurile noastre de dans.
                </p>
              </div>

              <RegistrationForm 
                courses={courses}
                onSubmit={handleSubmit}
              />
            </motion.div>
          </div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-xl sticky top-8">
              <h3 className="text-xl font-semibold mb-4">Informații Importante</h3>
              <div className="space-y-4 text-gray-600">
                <p>• Vei primi confirmarea înscrierii pe email</p>
                <p>• Plata se face la prima ședință</p>
                <p>• Cursurile încep în funcție de completarea grupelor</p>
                <p>• Echipament recomandat: haine comode și pantofi de dans</p>
              </div>

              <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-700 mb-2">Ai întrebări?</h4>
                <p className="text-purple-600 mb-4">
                  Contactează-ne și îți vom răspunde în cel mai scurt timp.
                </p>
                <p className="text-purple-700 font-medium">
                  📞 0712 345 678
                </p>
                <p className="text-purple-700 font-medium">
                  ✉️ contact@dans.com
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}