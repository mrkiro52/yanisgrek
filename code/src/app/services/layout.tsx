import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Все услуги YANIS GREK - Ремонт и обслуживание BMW в Москве",
  description: "Полный список услуг техцентра YANIS GREK: ремонт АКПП, ДВС, техническое обслуживание, диагностика BMW, MINI, Rolls-Royce. Прозрачные цены и гарантия.",
  keywords: "услуги автосервиса, ремонт АКПП BMW, ремонт ДВС, диагностика, техническое обслуживание, тюнинг",
  openGraph: {
    title: "Услуги YANIS GREK - Полный список работ",
    description: "Ремонт АКПП, ДВС, диагностика, ТО и другие услуги для BMW в Москве",
    url: "https://yanisgrek.ru/services",
    type: "website",
  },
  alternates: {
    canonical: "https://yanisgrek.ru/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
