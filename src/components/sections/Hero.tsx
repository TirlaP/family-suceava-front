'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const column1Images = [
  '/salsa.jpg',
  '/salsa.jpg',
  '/salsa.jpg',
  '/salsa.jpg',
  '/salsa.jpg',
  '/salsa.jpg',
];

const column2Images = [
  '/salsa.jpg',
  '/salsa.jpg',
  '/salsa.jpg',
  '/salsa.jpg',
  '/salsa.jpg',
  '/salsa.jpg',
];

export default function Hero() {
  const [firstColumn, setFirstColumn] = useState([...column1Images, ...column1Images]);
  const [secondColumn, setSecondColumn] = useState([...column2Images, ...column2Images]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFirstColumn(prev => {
        const first = prev[0];
        return [...prev.slice(1), first];
      });
      setSecondColumn(prev => {
        const last = prev[prev.length - 1];
        return [last, ...prev.slice(0, -1)];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen flex items-center pt-20">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 relative z-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#000066] mb-6 leading-tight animate-fade-in">
          Bine ați venit la Salsa Family Dance Club!
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
          La Salsa Family, misiunea noastră este să aducem bucuria dansului în
          viața fiecărei persoane. Împreună, creăm o comunitate vibrantă unde
          fiecare pas contează.
        </p>
        <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg"
          >
            Înscrie-te
          </Button>
          <Button 
            className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-6 text-lg"
          >
            Află mai multe
          </Button>
        </div>
      </div>

      {/* Right Section - Animated Image Grid */}
      <div className="hidden lg:block lg:w-1/2 h-full relative overflow-hidden z-20">
        <div className="flex gap-4 p-8 h-full">
          {/* Column 1 - Sliding Up */}
          <div className="w-1/2 relative">
            <div 
              className="absolute inset-0 flex flex-col gap-4 animate-slide-up"
              style={{ height: 'fit-content' }}
            >
              {firstColumn.map((img, index) => (
                <div 
                  key={`col1-${index}`}
                  className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                >
                  <Image
                    src={img}
                    alt={`Dance ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover"
                  />  
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - Sliding Down */}
          <div className="w-1/2 relative">
            <div 
              className="absolute inset-0 flex flex-col gap-4 animate-slide-down"
              style={{ height: 'fit-content' }}
            >
              {secondColumn.map((img, index) => (
                <div 
                  key={`col2-${index}`}
                  className="w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                >
                  <Image
                    src={img}
                    alt={`Dance ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover"
                  />  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 z-10 w-1/3 h-full bg-purple-50 rounded-l-full opacity-50" />
      <div className="absolute bottom-0 left-1/4 z-10 w-1/4 h-1/2 bg-yellow-50 rounded-t-full opacity-50" />
    </div>
  );
}