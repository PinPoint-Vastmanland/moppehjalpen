import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const defaultSettings = {
  companyName: "Moppehjälpen",
  email: "moppehjalpen@gmail.com",
  instagram: "@moppehjalpen",
  tiktok: "@moppehjalpen",
  phone: "",
  address: "",
  workArea: "",
  openingHours: "",
};

const defaultServices = [
  {
    name: "Service",
    description: "Regelbunden service och underhåll av mopeder.",
    price: "Pris efter behov",
  },
  {
    name: "Reparationer",
    description: "Hjälp med vanliga mekaniska problem och trasiga delar.",
    price: "Pris efter behov",
  },
  {
    name: "Felsökning",
    description: "Hjälp med exempelvis startproblem, tändningsfel och andra tekniska problem.",
    price: "Pris efter behov",
  },
  {
    name: "Styling",
    description: "Anpassningar och förbättringar av mopedens utseende.",
    price: "Pris efter behov",
  },
  {
    name: "Lackering av kåpor",
    description: "Hjälp med att förnya mopedens utseende genom lackering av kåpor.",
    price: "Pris efter behov",
  },
] as const;

export async function GET() {
  const [settingsData, servicesData, galleryData] = await Promise.all([
    prisma.setting.findMany(),
    prisma.service.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  if (settingsData.length === 0) {
    await Promise.all(
      Object.entries(defaultSettings).map(([key, value]) =>
        prisma.setting.create({ data: { key, value } })
      )
    );
  }

  if (servicesData.length === 0) {
    await Promise.all(
      defaultServices.map((service) =>
        prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            active: true,
          },
        })
      )
    );
  }

  const settings = Object.fromEntries(
    (await prisma.setting.findMany()).map((item) => [item.key, item.value])
  );

  const fundedGallery = (await prisma.galleryItem.findMany({ orderBy: { createdAt: "desc" } })).map((item) => ({
    ...item,
    images: JSON.parse(item.images || "[]"),
  }));

  const services = await prisma.service.findMany({ orderBy: { createdAt: "asc" } });

  return NextResponse.json({
    settings: { ...defaultSettings, ...settings },
    services,
    gallery: fundedGallery,
  });
}
