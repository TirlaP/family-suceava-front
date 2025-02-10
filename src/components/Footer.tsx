import Image from 'next/image';
import Link from 'next/link';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Newsletter Section */}
          <div className="md:col-span-1">
            <Link href="/" className="block mb-6">
              <Image
                src="/logo.png"
                alt="Salsa Family"
                width={150}
                height={75}
                className="w-auto h-16"
              />
            </Link>
            <p className="text-gray-600 mb-4">
              Înscrie-te la newsletter pentru a fi la curent cu noutățile și
              evenimentele.
            </p>
            <form className="space-y-4">
              <Input
                type="email"
                placeholder="Introduceți emailul"
                className="rounded-full bg-gray-50"
              />
              <Button 
                className="w-full rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              >
                Abonează-te
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Prin abonare, ești de acord cu Politica noastră de Confidențialitate și primești
              actualizări.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Coloana Unu</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-purple-600">Link Unu</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-purple-600">Link Doi</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-purple-600">Link Trei</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-purple-600">Link Patru</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-purple-600">Link Cinci</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Coloana Doi</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-600 hover:text-purple-600">Link Șase</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-purple-600">Link Șapte</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-purple-600">Link Opt</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-purple-600">Link Nouă</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-purple-600">Link Zece</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Urmărește-ne</h3>
            <div className="space-y-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <Facebook className="w-5 h-5" />
                <span>Facebook</span>
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
              >
                <Youtube className="w-5 h-5" />
                <span>Youtube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 Salsa Family. Toate drepturile rezervate.
            </p>
            <div className="flex gap-6">
              <Link href="/politica-de-confidentialitate" className="text-sm text-gray-500 hover:text-purple-600">
                Politica de Confidențialitate
              </Link>
              <Link href="/termeni-de-serviciu" className="text-sm text-gray-500 hover:text-purple-600">
                Termeni de Serviciu
              </Link>
              <Link href="/setari-cookies" className="text-sm text-gray-500 hover:text-purple-600">
                Setări Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}