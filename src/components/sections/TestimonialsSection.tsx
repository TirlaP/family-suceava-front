import { Testimonial } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

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
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials?.length) return null;

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000066] mb-4">
            Ce Spun Cursanții Noștri
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descoperă experiențele și poveștile de succes ale cursanților noștri care
            și-au împlinit visul de a dansa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card 
              key={testimonial.id}
              className="bg-white"
            >
              <CardContent className="p-6">
                {testimonial.attributes && (
                  <>
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={testimonial.attributes.image?.data?.attributes.url}
                          alt={testimonial.attributes.name}
                        />
                        <AvatarFallback>
                          {getInitials(testimonial.attributes.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.attributes.name}
                        </div>
                        {testimonial.attributes.role && (
                          <div className="text-sm text-gray-500">
                            {testimonial.attributes.role}
                          </div>
                        )}
                      </div>
                    </div>

                    <StarRating rating={testimonial.attributes.rating} />

                    <blockquote className="mt-4 text-gray-600 italic">
                      "{testimonial.attributes.comment}"
                    </blockquote>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}