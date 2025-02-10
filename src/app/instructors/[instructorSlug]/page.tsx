import { Metadata } from 'next';
import InstructorSlugClient from './InstructorSlugClient';

interface Props {
  params: {
    instructorSlug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page(props: Props) {
  return <InstructorSlugClient {...props} />;
}