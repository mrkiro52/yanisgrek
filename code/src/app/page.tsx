import { Metadata } from "next";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header/Header';
import '../styles/globals.css';
import '../styles/mainPage.scss';
import Form from '../components/Form/Form';
import Calculator from '../components/Calculator/Calculator';
import BtnGoCalc from '../components/BtnGoCalc/BtnGoCalc';
import BtnGoForm from '../components/BtnGoForm/BtnGoForm';

import TeamBlock from '../components/TeamBlock/TeamBlock';
import Discounts from '../components/Discounts/Discounts';
import Chillzone from '../components/Chillzone/Chillzone';
import Quiz from '../components/Quiz/Quiz';
import WhyUs from '../components/WhyUs/WhyUs';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "YANIS GREK - Премиальный автосервис BMW в Москве | Ремонт АКПП и ДВС",
  description: "Авторизованный технический центр YANIS GREK в Москве. Профессиональный ремонт, диагностика и обслуживание BMW, MINI, Rolls-Royce. Опыт 14+ лет, гарантия до 2 лет. Честные цены и фотоотчёты.",
  keywords: "автосервис BMW Москва, ремонт АКПП, ремонт ДВС, техническое обслуживание BMW, диагностика, честный сервис",
  openGraph: {
    title: "YANIS GREK - Авторизованный технический центр BMW в Москве",
    description: "Ремонт АКПП, ДВС, диагностика и обслуживание BMW с гарантией до 2 лет",
    url: "https://yanisgrek.ru",
    type: "website",
  },
  alternates: {
    canonical: "https://yanisgrek.ru",
  },
};

export default async function Home() {
  const serviceSlugs = [
    'zamena-masla-v-akpp',
    'diagnostika-akpp',
    'diagnostika-dvs',
  ];

  // Статические данные услуг
  const serviceData = [
    { title: 'Замена масла в АКПП', text2: 'Профессиональная замена масла в автоматической коробке передач' },
    { title: 'Диагностика АКПП', text2: 'Комплексная диагностика автоматической коробки передач' },
    { title: 'Диагностика ДВС', text2: 'Полная диагностика двигателя внутреннего сгорания' },
  ];

  return (
    <main className="Home">
      <Header />

      <div className="startscreen">
        <div className="firstRow">
          <Image
            src="/images/techCenter.webp"
            alt="Логотип YANIS GREK - Технический центр по ремонту BMW"
            width={374}
            height={104}
            priority
          />
          <div className="buttons">
            <BtnGoCalc />
            <BtnGoForm />
          </div>
        </div>
        <div className="secondRow">
          <p>
            Сертифицированное оборудование, фирменный инструмент и опыт команды —
            для быстрого и качественного ремонта.
          </p>
        </div>
      </div>

      <Calculator initialModel={null} />
      <Quiz propModel={null} />
      <Discounts />
      <div style={{paddingTop: "130px"}}></div>
      <div dangerouslySetInnerHTML={{ __html: '<review-lab data-widgetid="68ef05ca67defc8041d3ab95"></review-lab><script src="https://app.reviewlab.ru/widget/index-es2015.js" defer></script>' }} />

      <div className="blackInfo">
        <div className="content">
          <h2>
            ОБСЛУЖИВАНИЕ BMW <span>НА</span> УРОВНЕ,
            <br /> <span>КОТОРОМУ</span> ДОВЕРЯЮТ ТЫСЯЧИ.
          </h2>
          <div className="row row1">
            <Image 
              src="/images/blackInfoImg1.webp" 
              alt="Оригинальные запчасти BMW - обеспечение совместимости и надёжности"
              width={285} 
              height={380} 
            />
            <div className="textBlock">
              <h3>Оригинальные запчасти BMW</h3>
              <p>
                Мы используем только оригинальные комплектующие, одобренные
                производителем. Это гарантирует максимальную совместимость,
                надёжность и долговечность каждого узла вашего автомобиля.
              </p>
            </div>
          </div>
          <div className="row row2">
            <Image 
              src="/images/blackInfoImg2.webp" 
              alt="Сертифицированные мастера BMW с официальным обучением"
              width={489} 
              height={402} 
            />
            <div className="textBlock">
              <h3>Сертифицированные мастера</h3>
              <p>
                Наши специалисты прошли официальное обучение и сертификацию BMW.
                Они досконально знают особенности каждой модели и работают строго
                по регламентам завода-изготовителя.
              </p>
            </div>
          </div>
          <div className="row row3">
            <div className="textBlock">
              <h3>Прозрачные цены и фотоотчёт</h3>
              <p>
                Перед началом работ вы получаете точную смету. В процессе — фотоотчёт
                с каждым этапом. Никаких скрытых платежей, только честный сервис и
                открытость.
              </p>
            </div>
            <Image 
              src="/images/blackInfoImg3.webp" 
              alt="Прозрачные цены и подробный фотоотчёт о выполненных работах"
              width={387} 
              height={516}
              priority
            />
          </div>
        </div>
      </div>

      <div className="numbersBlock">
        <div className="content">
          <div className="stats">
            <div className="statItem">
              <div className="statNumber">10</div>
              <div className="statText">лет опыта</div>
            </div>
            <div className="statItem">
              <div className="statNumber">4.9</div>
              <div className="statText">
                <a
                  href="https://yandex.ru/profile/1175654222?lang=ru"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Отзывы о YANIS GREK на Яндекс Карты"
                >
                  рейтинг в Google и Яндекс
                </a>
              </div>
            </div>
            <div className="statItem">
              <div className="statNumber">2</div>
              <div className="statText">года гарантии</div>
            </div>
            <div className="statItem">
              <div className="statNumber">8000+</div>
              <div className="statText">машин обслужено</div>
            </div>
          </div>
        </div>
      </div>

      <div className="topServices">
        <div className="content">
          <h2>Наши ТОП услуги</h2>
          <div className="remont">
            <Link href="/remontAkpp" prefetch className="block" title="Перейти на страницу ремонта АКПП">
              <h3>Ремонт АКПП</h3>
              <span>
                Ремонт и обслуживание всех типов коробок переключения передач — АКПП,
                МКПП, DCT, EV.
                <br />
                <br />Перейти...
              </span>
            </Link>
            <Link href="/remontDvs" prefetch className="block" title="Перейти на страницу ремонта ДВС">
              <h3>Ремонт ДВС</h3>
              <span>
                Ремонт и обслуживание всех типов ДВС — бензиновые и дизельные
                двигатели, гибридные и электрические силовые установки.
                <br />
                <br />Перейти...
              </span>
            </Link>
          </div>
          <div className="infoBlock">
            <h3>
              Даже надёжные и новые автомобили BMW со временем могут потребовать
              своевременного ремонта.
            </h3>
            <p>
              Если работ по устранению вашей неисправности нет в списке, это не
              значит, что мы её не производим. Ознакомиться с полным списком наших
              услуг можно <Link href="/services" title="Полный список услуг YANIS GREK">здесь</Link>.
            </p>
          </div>
          <div className="rows">
            {serviceSlugs.map((slug, idx) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                prefetch
                className={`row row${idx + 1}`}
                title={`Услуга: ${serviceData[idx].title}`}
              >
                <span className="num">0{idx + 1}</span>
                <span className="name">{serviceData[idx].title}</span>
                <p>{serviceData[idx].text2}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <WhyUs/>
      <TeamBlock/>
      <Chillzone/>
      <Form />
    </main>
  );
}
