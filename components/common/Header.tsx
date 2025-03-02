"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface NavItem {
  label: {
    en: string;
    fr: string;
    ar: string;
  };
  href: string;
}

const navItems: NavItem[] = [
  {
    label: {
      en: "Home",
      fr: "Accueil",
      ar: "الرئيسية",
    },
    href: "/",
  },
  {
    label: {
      en: "About",
      fr: "À propos",
      ar: "من نحن",
    },
    href: "/about",
  },
  {
    label: {
      en: "Initiatives",
      fr: "Initiatives",
      ar: "المبادرات",
    },
    href: "/initiatives",
  },
  {
    label: {
      en: "Events",
      fr: "Événements",
      ar: "الفعاليات",
    },
    href: "/events",
  },
  {
    label: {
      en: "Blog",
      fr: "Blog",
      ar: "المدونة",
    },
    href: "/blog",
  },
  {
    label: {
      en: "Contact",
      fr: "Contact",
      ar: "اتصل بنا",
    },
    href: "/contact",
  },
];

export function Header({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname?.startsWith(`/${locale}${path}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="font-bold text-xl">
            {locale === "ar" ? "جمعية العطاوية" : locale === "fr" ? "AA" : "AA"}
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}${item.href}`}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {item.label[locale as keyof typeof item.label]}
            </Link>
          ))}
          <LanguageSwitcher locale={locale} />
        </nav>

        <div className="flex md:hidden items-center gap-4">
          <LanguageSwitcher locale={locale} />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side={locale === "ar" ? "right" : "left"}>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={`/${locale}${item.href}`}
                    onClick={() => setOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label[locale as keyof typeof item.label]}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
