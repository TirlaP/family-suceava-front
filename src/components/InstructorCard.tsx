import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Instructor } from "@/types";

interface InstructorCardProps {
  instructor: Instructor;
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  if (!instructor || !instructor.attributes) {
    return null;
  }

  const { attributes } = instructor;
  const initials = attributes.name
    ? attributes.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
    : '';

  const imageUrl = attributes.image?.data?.attributes?.url || '';

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row space-x-4 items-start">
        <Avatar className="w-16 h-16">
          {imageUrl && (
            <AvatarImage 
              src={imageUrl} 
              alt={attributes.name || 'Instructor'} 
            />
          )}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl font-bold">
            {attributes.name || 'Unnamed Instructor'}
          </CardTitle>
          <CardDescription className="mt-1 line-clamp-2">
            {attributes.bio || 'Bio coming soon...'}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {Array.isArray(attributes.specialties) && attributes.specialties.map((specialty, index) => (
              <Badge key={index} variant="outline">
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}