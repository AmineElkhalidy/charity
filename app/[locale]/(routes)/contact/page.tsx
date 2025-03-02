import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const translations = {
  title: {
    en: "Contact Us",
    fr: "Contactez-nous",
    ar: "اتصل بنا",
  },
  description: {
    en: "Have questions or want to get involved? Reach out to us!",
    fr: "Vous avez des questions ou souhaitez vous impliquer ? Contactez-nous!",
    ar: "هل لديك أسئلة أو ترغب في المشاركة؟ تواصل معنا!",
  },
  form: {
    name: {
      en: "Name",
      fr: "Nom",
      ar: "الاسم",
    },
    email: {
      en: "Email",
      fr: "Email",
      ar: "البريد الإلكتروني",
    },
    subject: {
      en: "Subject",
      fr: "Sujet",
      ar: "الموضوع",
    },
    message: {
      en: "Message",
      fr: "Message",
      ar: "الرسالة",
    },
    send: {
      en: "Send Message",
      fr: "Envoyer le message",
      ar: "إرسال الرسالة",
    },
  },
  contactInfo: {
    title: {
      en: "Contact Information",
      fr: "Informations de contact",
      ar: "معلومات الاتصال",
    },
    email: {
      en: "Email",
      fr: "Email",
      ar: "البريد الإلكتروني",
    },
    phone: {
      en: "Phone",
      fr: "Téléphone",
      ar: "الهاتف",
    },
    address: {
      en: "Address",
      fr: "Adresse",
      ar: "العنوان",
    },
    hours: {
      en: "Office Hours",
      fr: "Heures de bureau",
      ar: "ساعات العمل",
    },
    hoursValue: {
      en: "Monday - Friday: 9:00 AM - 5:00 PM",
      fr: "Lundi - Vendredi: 9h00 - 17h00",
      ar: "الاثنين - الجمعة: 9:00 صباحًا - 5:00 مساءً",
    },
  },
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: translations.title[locale as keyof typeof translations.title],
    description:
      translations.description[locale as keyof typeof translations.description],
  };
}

export default function ContactPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div className="container mx-auto py-12 px-4">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {translations.title[locale as keyof typeof translations.title]}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {
            translations.description[
              locale as keyof typeof translations.description
            ]
          }
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {
                    translations.form.name[
                      locale as keyof typeof translations.form.name
                    ]
                  }
                </Label>
                <Input
                  id="name"
                  placeholder={
                    locale === "ar"
                      ? "أدخل اسمك"
                      : locale === "fr"
                      ? "Entrez votre nom"
                      : "Enter your name"
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  {
                    translations.form.email[
                      locale as keyof typeof translations.form.email
                    ]
                  }
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={
                    locale === "ar"
                      ? "أدخل بريدك الإلكتروني"
                      : locale === "fr"
                      ? "Entrez votre email"
                      : "Enter your email"
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">
                {
                  translations.form.subject[
                    locale as keyof typeof translations.form.subject
                  ]
                }
              </Label>
              <Input
                id="subject"
                placeholder={
                  locale === "ar"
                    ? "أدخل موضوع رسالتك"
                    : locale === "fr"
                    ? "Entrez le sujet de votre message"
                    : "Enter the subject of your message"
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">
                {
                  translations.form.message[
                    locale as keyof typeof translations.form.message
                  ]
                }
              </Label>
              <Textarea
                id="message"
                rows={6}
                placeholder={
                  locale === "ar"
                    ? "اكتب رسالتك هنا"
                    : locale === "fr"
                    ? "Écrivez votre message ici"
                    : "Write your message here"
                }
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800"
            >
              {
                translations.form.send[
                  locale as keyof typeof translations.form.send
                ]
              }
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {
              translations.contactInfo.title[
                locale as keyof typeof translations.contactInfo.title
              ]
            }
          </h2>
          <div className="grid gap-6">
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <Mail className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">
                    {
                      translations.contactInfo.email[
                        locale as keyof typeof translations.contactInfo.email
                      ]
                    }
                  </h3>
                  <p className="text-muted-foreground">
                    contact@association-elattaouia.ma
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <Phone className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">
                    {
                      translations.contactInfo.phone[
                        locale as keyof typeof translations.contactInfo.phone
                      ]
                    }
                  </h3>
                  <p className="text-muted-foreground">+212 6 00 00 00 00</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">
                    {
                      translations.contactInfo.address[
                        locale as keyof typeof translations.contactInfo.address
                      ]
                    }
                  </h3>
                  <p className="text-muted-foreground">
                    {locale === "ar"
                      ? "العطاوية، قلعة السراغنة، المغرب"
                      : locale === "fr"
                      ? "El Attaouia, Kelaa des Sraghna, Maroc"
                      : "El Attaouia, Kelaa des Sraghna, Morocco"}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-start gap-4">
                <Clock className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-medium text-lg">
                    {
                      translations.contactInfo.hours[
                        locale as keyof typeof translations.contactInfo.hours
                      ]
                    }
                  </h3>
                  <p className="text-muted-foreground">
                    {
                      translations.contactInfo.hoursValue[
                        locale as keyof typeof translations.contactInfo.hoursValue
                      ]
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-16">
        <div className="w-full h-96 bg-gray-200 rounded-lg">
          {/* In a real application, you would integrate Google Maps or similar */}
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500">
              {locale === "ar"
                ? "خريطة الموقع ستظهر هنا"
                : locale === "fr"
                ? "La carte s'affichera ici"
                : "Map will display here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
