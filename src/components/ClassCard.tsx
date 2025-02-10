import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import { DanceClass } from "@/types";

interface ClassCardProps {
  classData: DanceClass;
  onEnroll?: () => void;
}

export default function ClassCard({ classData, onEnroll }: ClassCardProps) {
  if (!classData || !classData.attributes) {
    return null;
  }

  const { attributes } = classData;

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{attributes.title}</CardTitle>
          <Badge variant="secondary" className={getLevelColor(attributes.level)}>
            {attributes.level}
          </Badge>
        </div>
        <CardDescription>{attributes.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CalendarDays className="w-4 h-4" />
            <span>{attributes.schedule}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>60 minutes</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          ${attributes.price}/month
        </div>
        <Button onClick={onEnroll}>
          Enroll Now
        </Button>
      </CardFooter>
    </Card>
  );
}