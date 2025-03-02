import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

interface FooterProps {
  locale: string;
}

const translations = {
  about: {
    en: "About Us",
    fr: "À propos",
    ar: "من نحن",
  },
  initiatives: {
    en: "Initiatives",
    fr: "Initiatives",
    ar: "المبادرات",
  },
  events: {
    en: "Events",
    fr: "Événements",
    ar: "الفعاليات",
  },
  blog: {
    en: "Blog",
    fr: "Blog",
    ar: "المدونة",
  },
  contact: {
    en: "Contact Us",
    fr: "Contactez-nous",
    ar: "اتصل بنا",
  },
  subscribe: {
    en: "Subscribe to our newsletter",
    fr: "Abonnez-vous à notre newsletter",
    ar: "اشترك في نشرتنا الإخبارية",
  },
  email: {
    en: "Email",
    fr: "Email",
    ar: "البريد الإلكتروني",
  },
  subscribeButton: {
    en: "Subscribe",
    fr: "S'abonner",
    ar: "اشترك",
  },
  followUs: {
    en: "Follow Us",
    fr: "Suivez-nous",
    ar: "تابعنا",
  },
  copyright: {
    en: "© 2025 El Attaouia Association. All rights reserved.",
    fr: "© 2025 Association El Attaouia. Tous droits réservés.",
    ar: "© 2025 جمعية العطاوية. جميع الحقوق محفوظة.",
  },
};

export function Footer({ locale }: FooterProps) {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                {/* Replace with actual logo */}
                <div className="text-blue-900 font-bold">EA</div>
              </div>
              <div className="font-bold text-xl">
                {locale === "ar"
                  ? "جمعية العطاوية"
                  : locale === "fr"
                  ? "Association El Attaouia"
                  : "El Attaouia Association"}
              </div>
            </div>
            <p className="text-blue-100 mb-6">
              {locale === "ar"
                ? "جمعية خيرية تهدف إلى تحسين الحياة في العطاوية من خلال المبادرات المجتمعية والعمل التطوعي"
                : locale === "fr"
                ? "Une association caritative visant à améliorer la vie à El Attaouia à travers des initiatives communautaires et du bénévolat"
                : "A charitable association aimed at improving life in El Attaouia through community initiatives and volunteer work"}
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-white hover:text-amber-400 transition-colors"
              >
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {locale === "ar"
                ? "روابط سريعة"
                : locale === "fr"
                ? "Liens rapides"
                : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  {
                    translations.about[
                      locale as keyof typeof translations.about
                    ]
                  }
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/initiatives`}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  {
                    translations.initiatives[
                      locale as keyof typeof translations.initiatives
                    ]
                  }
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/events`}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  {
                    translations.events[
                      locale as keyof typeof translations.events
                    ]
                  }
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/blog`}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  {translations.blog[locale as keyof typeof translations.blog]}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  {
                    translations.contact[
                      locale as keyof typeof translations.contact
                    ]
                  }
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {
                translations.contact[
                  locale as keyof typeof translations.contact
                ]
              }
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-amber-400" />
                <a
                  href="mailto:contact@association-elattaouia.ma"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  contact@association-elattaouia.ma
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-amber-400" />
                <a
                  href="tel:+212600000000"
                  className="text-blue-100 hover:text-white transition-colors"
                >
                  +212 6 00 00 00 00
                </a>
              </li>
              <li>
                <address className="text-blue-100 not-italic">
                  {locale === "ar"
                    ? "العطاوية، قلعة السراغنة، المغرب"
                    : locale === "fr"
                    ? "El Attaouia, Kelaa des Sraghna, Maroc"
                    : "El Attaouia, Kelaa des Sraghna, Morocco"}
                </address>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6">
              {
                translations.subscribe[
                  locale as keyof typeof translations.subscribe
                ]
              }
            </h3>
            <form className="space-y-3">
              <div className="flex flex-col">
                <label htmlFor="email" className="sr-only">
                  {
                    translations.email[
                      locale as keyof typeof translations.email
                    ]
                  }
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder={
                    locale === "ar"
                      ? "البريد الإلكتروني"
                      : locale === "fr"
                      ? "Adresse e-mail"
                      : "Email address"
                  }
                  className="px-4 py-2 rounded-md bg-blue-800 text-white placeholder-blue-300 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-semibold rounded-md transition-colors"
              >
                {
                  translations.subscribeButton[
                    locale as keyof typeof translations.subscribeButton
                  ]
                }
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-6 text-center">
          <p className="text-blue-200">
            {
              translations.copyright[
                locale as keyof typeof translations.copyright
              ]
            }
          </p>
        </div>
      </div>
    </footer>
  );
}
