"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchClasses } from "@/services/strapi";
import { DanceClass } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AllCoursesPage() {
  const [allCourses, setAllCourses] = useState<DanceClass[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<DanceClass[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // "all" is used as the sentinel value for no filter.
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Read the query parameter "category" from the URL.
  const searchParams = useSearchParams();

  // Load courses from the API.
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const courses = await fetchClasses();
        setAllCourses(courses);
        setFilteredCourses(courses);
      } catch (error) {
        console.error("Error loading courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  // After courses are loaded, update selectedType from the query parameter if available.
  useEffect(() => {
    if (!isLoading && allCourses.length > 0) {
      const queryCategory = searchParams.get("category");
      if (queryCategory) {
        // Get all dance types from loaded courses.
        const allDanceTypes = Array.from(
          new Set(allCourses.map(course => course.attributes.typeOfDance))
        ).filter(Boolean) as string[];

        // Find a dance type that includes the queryCategory (case-insensitive).
        const matchingType = allDanceTypes.find(
          type => type.toLowerCase().includes(queryCategory.toLowerCase())
        );
        if (matchingType) {
          setSelectedType(matchingType);
        } else {
          setSelectedType("all");
        }
      }
    }
  }, [isLoading, allCourses, searchParams]);

  // Update the filtered courses list whenever search term, level, type, or course list change.
  useEffect(() => {
    const filtered = allCourses.filter((course) => {
      const matchesSearch =
        course.attributes.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.attributes.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel =
        selectedLevel === "all" || course.attributes.level === selectedLevel;

      // Use a fallback empty string if typeOfDance is undefined,
      // then perform a case-insensitive substring match.
      const matchesType =
        selectedType === "all" ||
        (course.attributes.typeOfDance ?? "")
          .toLowerCase()
          .includes(selectedType.toLowerCase());

      return matchesSearch && matchesLevel && matchesType;
    });

    setFilteredCourses(filtered);
  }, [searchTerm, selectedLevel, selectedType, allCourses]);

  // Compute unique values for dance types and levels.
  const danceTypes = Array.from(
    new Set(allCourses.map((course) => course.attributes.typeOfDance))
  ).filter(Boolean) as string[];
  const levels = Array.from(
    new Set(allCourses.map((course) => course.attributes.level))
  );

  // Render a single course card.
  const renderCourseCard = (course: DanceClass) => {
    const {
      title,
      description,
      level,
      schedule,
      image,
      price,
      typeOfDance,
    } = course.attributes;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        {/* Use the course slug if available; otherwise fallback to course id */}
        <Link href={`/courses/${course.attributes.slug || course.id}`} className="block">
          <div className="relative h-56">
            {image?.data ? (
              <Image
                src={image.data.attributes.url}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                <span className="text-purple-500 font-medium">Coming Soon</span>
              </div>
            )}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-purple-700 rounded-full text-sm font-medium">
                {level}
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-3">
              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                {typeOfDance}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {description || "No description available"}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-gray-600 text-sm">
                <i className="far fa-clock mr-2"></i>
                {schedule || "Schedule TBA"}
              </div>
              <div className="text-purple-700 font-bold">{price} RON</div>
            </div>

            <div className="mt-4 flex items-center text-purple-600 font-medium">
              Vezi detalii
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cursurile noastre de dans
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explorează varietatea de cursuri și găsește-l pe cel care ți se potrivește.
          </p>
        </motion.div>

        {/* Quick Links */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
          {danceTypes.map((type) => (
            <Button
              key={type}
              variant={
                selectedType.toLowerCase() === type.toLowerCase() ? "default" : "outline"
              }
              onClick={() =>
                setSelectedType(
                  selectedType.toLowerCase() === type.toLowerCase() ? "all" : type
                )
              }
              className="whitespace-nowrap"
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Advanced Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Caută cursuri..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Alege nivelul" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate nivelurile</SelectItem>
                {levels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Tip de dans" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toate tipurile</SelectItem>
                {danceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Section */}
        {filteredCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium text-gray-600">
              Nu am găsit cursuri care să corespundă criteriilor tale.
            </h3>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedLevel("all");
                setSelectedType("all");
              }}
              className="mt-4"
            >
              Resetează filtrele
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {renderCourseCard(course)}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
