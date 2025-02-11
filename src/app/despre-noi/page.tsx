import { Metadata } from 'next';
import { RegistrationForm } from '@/components/RegistrationForm';
import { getAvailableCourses, submitRegistration } from '@/services/registration';

export const metadata: Metadata = {
  title: 'Înscriere Cursuri | Salsa Family',
  description: 'Înscrie-te la cursurile noastre de dans.',
};

export default async function RegistrationPage() {
  const courses = await getAvailableCourses();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Înscriere la curs
            </h1>
            <p className="mt-2 text-gray-600">
              Completează formularul pentru a te înscrie la cursurile noastre de dans.
            </p>
          </div>

          <RegistrationForm 
            courses={courses}
            onSubmit={async (data) => {
              'use server';
              const response = await submitRegistration(data);
              return response;
            }}
          />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Pentru mai multe informații ne puteți contacta la{' '}
            <a 
              href="tel:+40123456789" 
              className="text-purple-600 hover:text-purple-500"
            >
              0123 456 789
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}