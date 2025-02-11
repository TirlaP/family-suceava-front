'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, { message: "Numele trebuie să aibă cel puțin 2 caractere." }),
  firstName: z.string().min(2, { message: "Prenumele trebuie să aibă cel puțin 2 caractere." }),
  age: z.coerce.number().min(16, { message: "Trebuie să ai cel puțin 16 ani." }).max(100, { message: "Vârstă invalidă." }),
  phone: z.string().min(10, { message: "Numărul de telefon trebuie să aibă cel puțin 10 cifre." }),
  email: z.string().email({ message: "Email invalid." }),
  city: z.enum(["Suceava", "Botoșani", "Rădăuți"], {
    required_error: "Te rugăm să selectezi orașul.",
  }),
  courseType: z.string({
    required_error: "Te rugăm să selectezi un curs.",
  }),
  howDidYouFindUs: z.enum([
    "Facebook", 
    "Instagram", 
    "Google", 
    "Iulius Mall", 
    "Prieteni", 
    "Petrecere"
  ], {
    required_error: "Te rugăm să ne spui cum ai aflat despre noi.",
  }),
  gdprConsent: z.boolean().refine(val => val === true, {
    message: "Trebuie să accepți politica de confidențialitate."
  })
});

type FormData = z.infer<typeof formSchema>;

interface Course {
  id: number;
  title: string;
  registrationEnabled: boolean;
  availableSpots: number | null;
  waitlistEnabled: boolean;
  typeOfDance: string;
  level: string;
  schedule: string | null;
}

interface Props {
  courses: Course[];
  onSubmit: (data: FormData) => Promise<void>;
}

export function RegistrationForm({ courses, onSubmit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      firstName: "",
      phone: "",
      email: "",
      gdprConsent: false,
    },
  });

  const handleSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await onSubmit(data);
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableCourses = courses.filter(
    course => course.registrationEnabled || course.waitlistEnabled
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Informații Personale</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume</FormLabel>
                    <FormControl>
                      <Input placeholder="Popescu" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prenume</FormLabel>
                    <FormControl>
                      <Input placeholder="Ion" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vârstă</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="25" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="0712 345 678" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="nume@example.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </motion.div>

        {/* Course Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Detalii Curs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Oraș</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectează orașul" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Suceava">Suceava</SelectItem>
                        <SelectItem value="Botoșani">Botoșani</SelectItem>
                        <SelectItem value="Rădăuți">Rădăuți</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="courseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curs</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Alege cursul" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableCourses.map(course => (
                          <SelectItem 
                            key={course.id} 
                            value={String(course.id)}
                          >
                            <div className="flex flex-col">
                              <span>{course.title} - {course.typeOfDance}</span>
                              <span className="text-sm text-gray-500">
                                {course.level}{course.schedule && ` • ${course.schedule}`}
                                {course.availableSpots === 0 ? " • Listă de așteptare" : ""}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="howDidYouFindUs"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Cum ai aflat despre noi?</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selectează o opțiune" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="Iulius Mall">Iulius Mall</SelectItem>
                        <SelectItem value="Prieteni">Prieteni</SelectItem>
                        <SelectItem value="Petrecere">Petrecere</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </motion.div>

        {/* GDPR Consent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="p-6">
            <FormField
              control={form.control}
              name="gdprConsent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Accept ca datele să fie folosite conform politicii de confidențialitate
                    </FormLabel>
                    <FormDescription>
                      Datele tale vor fi folosite doar în scop profesional pentru a te putea contacta.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-semibold rounded-lg"
          >
            {isSubmitting ? "Se trimite..." : "Trimite Înscrierea"}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}