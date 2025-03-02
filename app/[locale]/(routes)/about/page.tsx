import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { Button } from "@/components/ui/button";

const translations = {
  title: {
    en: "About Us",
    fr: "À propos",
    ar: "من نحن",
  },
  mission: {
    title: {
      en: "Our Mission",
      fr: "Notre Mission",
      ar: "مهمتنا",
    },
    content: {
      en: "El Attaouia Association is dedicated to improving the quality of life in our community through charitable initiatives, educational programs, and humanitarian assistance.",
      fr: "L'Association El Attaouia se consacre à l'amélioration de la qualité de vie dans notre communauté grâce à des initiatives caritatives, des programmes éducatifs et une assistance humanitaire.",
      ar: "تكرس جمعية العطاوية جهودها لتحسين نوعية الحياة في مجتمعنا من خلال المبادرات الخيرية والبرامج التعليمية والمساعدات الإنسانية.",
    },
  },
  vision: {
    title: {
      en: "Our Vision",
      fr: "Notre Vision",
      ar: "رؤيتنا",
    },
    content: {
      en: "We envision a thriving El Attaouia where every resident has access to education, healthcare, and economic opportunities, fostering a strong sense of community and mutual support.",
      fr: "Nous envisageons une El Attaouia prospère où chaque résident a accès à l'éducation, aux soins de santé et aux opportunités économiques, favorisant un fort sentiment de communauté et de soutien mutuel.",
      ar: "نتطلع إلى عطاوية مزدهرة حيث يتمتع كل مقيم بإمكانية الوصول إلى التعليم والرعاية الصحية والفرص الاقتصادية، مما يعزز الشعور القوي بالمجتمع والدعم المتبادل.",
    },
  },
  values: {
    title: {
      en: "Our Values",
      fr: "Nos Valeurs",
      ar: "قيمنا",
    },
    items: {
      en: [
        {
          title: "Integrity",
          description:
            "We maintain the highest ethical standards in all our actions.",
        },
        {
          title: "Compassion",
          description: "We approach our work with empathy and understanding.",
        },
        {
          title: "Inclusivity",
          description:
            "We serve all members of our community without discrimination.",
        },
        {
          title: "Transparency",
          description:
            "We are open and accountable in our operations and decision-making.",
        },
        {
          title: "Sustainability",
          description:
            "We develop solutions that create lasting positive impact.",
        },
      ],
      fr: [
        {
          title: "Intégrité",
          description:
            "Nous maintenons les plus hauts standards éthiques dans toutes nos actions.",
        },
        {
          title: "Compassion",
          description:
            "Nous abordons notre travail avec empathie et compréhension.",
        },
        {
          title: "Inclusivité",
          description:
            "Nous servons tous les membres de notre communauté sans discrimination.",
        },
        {
          title: "Transparence",
          description:
            "Nous sommes ouverts et responsables dans nos opérations et prises de décision.",
        },
        {
          title: "Durabilité",
          description:
            "Nous développons des solutions qui créent un impact positif durable.",
        },
      ],
      ar: [
        {
          title: "النزاهة",
          description: "نحافظ على أعلى المعايير الأخلاقية في جميع أعمالنا.",
        },
        { title: "التعاطف", description: "نتناول عملنا بتعاطف وتفهم." },
        {
          title: "الشمولية",
          description: "نخدم جميع أفراد مجتمعنا دون تمييز.",
        },
        {
          title: "الشفافية",
          description: "نحن منفتحون ومسؤولون في عملياتنا وصنع القرار.",
        },
        {
          title: "الاستدامة",
          description: "نطور حلولاً تخلق تأثيرًا إيجابيًا دائمًا.",
        },
      ],
    },
  },
  team: {
    title: {
      en: "Our Team",
      fr: "Notre Équipe",
      ar: "فريقنا",
    },
    description: {
      en: "Meet the dedicated individuals who work tirelessly to make our vision a reality.",
      fr: "Rencontrez les personnes dévouées qui travaillent sans relâche pour faire de notre vision une réalité.",
      ar: "تعرف على الأفراد المتفانين الذين يعملون بلا كلل لجعل رؤيتنا حقيقة واقعة.",
    },
  },
  contact: {
    title: {
      en: "Get Involved",
      fr: "Participez",
      ar: "شارك معنا",
    },
    description: {
      en: "Join us in making a difference in El Attaouia and the surrounding communities.",
      fr: "Rejoignez-nous pour faire la différence à El Attaouia et dans les communautés environnantes.",
      ar: "انضم إلينا لإحداث فرق في العطاوية والمجتمعات المحيطة.",
    },
    button: {
      en: "Contact Us",
      fr: "Contactez-nous",
      ar: "اتصل بنا",
    },
  },
};

// This would normally be fetched from Sanity
const mockTeamMembers = [
  {
    name: "Mohammed Alami",
    role: {
      en: "President",
      fr: "Président",
      ar: "الرئيس",
    },
    image: "/images/placeholder-team.jpg",
  },
  {
    name: "Fatima Benali",
    role: {
      en: "Vice President",
      fr: "Vice-présidente",
      ar: "نائبة الرئيس",
    },
    image: "/images/placeholder-team.jpg",
  },
  {
    name: "Younes Tazi",
    role: {
      en: "Secretary General",
      fr: "Secrétaire Général",
      ar: "الأمين العام",
    },
    image: "/images/placeholder-team.jpg",
  },
  {
    name: "Nadia Mansouri",
    role: {
      en: "Treasurer",
      fr: "Trésorière",
      ar: "أمينة الصندوق",
    },
    image: "/images/placeholder-team.jpg",
  },
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: translations.title[locale as keyof typeof translations.title],
  };
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // In a real app, fetch team members from Sanity
  // const teamMembers = await client.fetch(getTeamMembersQuery, { language: locale });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:py-32 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {translations.title[locale as keyof typeof translations.title]}
          </h1>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-blue-900">
                {
                  translations.mission.title[
                    locale as keyof typeof translations.mission.title
                  ]
                }
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {
                  translations.mission.content[
                    locale as keyof typeof translations.mission.content
                  ]
                }
              </p>
              <h2 className="text-3xl font-bold mb-6 text-blue-900">
                {
                  translations.vision.title[
                    locale as keyof typeof translations.vision.title
                  ]
                }
              </h2>
              <p className="text-lg text-gray-700">
                {
                  translations.vision.content[
                    locale as keyof typeof translations.vision.content
                  ]
                }
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              {/* Replace with an actual image from your association */}
              <Image
                src="/images/placeholder-about.jpg"
                alt="El Attaouia Association"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-blue-900">
            {
              translations.values.title[
                locale as keyof typeof translations.values.title
              ]
            }
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {translations.values.items[
              locale as keyof typeof translations.values.items
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-3 text-teal-600">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-900">
              {
                translations.team.title[
                  locale as keyof typeof translations.team.title
                ]
              }
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              {
                translations.team.description[
                  locale as keyof typeof translations.team.description
                ]
              }
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockTeamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">
                  {member.role[locale as keyof typeof member.role]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-6 bg-amber-500 text-black">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {
              translations.contact.title[
                locale as keyof typeof translations.contact.title
              ]
            }
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            {
              translations.contact.description[
                locale as keyof typeof translations.contact.description
              ]
            }
          </p>
          <Button
            asChild
            size="lg"
            className="bg-blue-900 hover:bg-blue-800 text-white"
          >
            <Link href={`/${locale}/contact`}>
              {
                translations.contact.button[
                  locale as keyof typeof translations.contact.button
                ]
              }
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
