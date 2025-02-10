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
    <div className="lg:-mt-16 relative w-full min-h-screen flex flex-col lg:flex-row items-center">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-16 lg:p-24 relative z-20 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#000066] mb-4 sm:mb-6 leading-tight animate-fade-in">
          Bine ați venit la Salsa Family Dance Club!
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in" 
           style={{ animationDelay: '0.2s' }}>
          La Salsa Family, misiunea noastră este să aducem bucuria dansului în
          viața fiecărei persoane. Împreună, creăm o comunitate vibrantă unde
          fiecare pas contează.
        </p>
        <div className="flex sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in" 
             style={{ animationDelay: '0.4s' }}>
          <Button 
            className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
          >
            Înscrie-te
          </Button>
          <Button 
            className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
          >
            Află mai multe
          </Button>
        </div>
      </div>

      {/* Image Grid Section */}
      <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative overflow-hidden z-20">
        <div className="flex gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8 h-full">
          {/* Column 1 - Sliding Up */}
          <div className="w-1/2 relative">
            <div 
              className="absolute inset-0 flex flex-col gap-3 sm:gap-4 animate-slide-up"
              style={{ height: 'fit-content' }}
            >
              {firstColumn.map((img, index) => (
                <div 
                  key={`col1-${index}`}
                  className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                >
                  <Image
                    src={img}
                    alt={`Dance ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="w-full h-full object-cover"
                    priority={index < 2}
                  />  
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 - Sliding Down */}
          <div className="w-1/2 relative">
            <div 
              className="absolute inset-0 flex flex-col gap-3 sm:gap-4 animate-slide-down"
              style={{ height: 'fit-content' }}
            >
              {secondColumn.map((img, index) => (
                <div 
                  key={`col2-${index}`}
                  className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105"
                >
                  <Image
                    src={img}
                    alt={`Dance ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="w-full h-full object-cover"
                    priority={index < 2}
                  />  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 z-10 w-full lg:w-1/3 h-1/2 lg:h-full bg-purple-50 rounded-b-full lg:rounded-b-none lg:rounded-l-full opacity-50" />
      <div className="absolute bottom-0 left-0 lg:left-1/4 z-10 w-full lg:w-1/4 h-1/4 lg:h-1/2 bg-yellow-50 rounded-t-full opacity-50" />
    </div>
  );
}