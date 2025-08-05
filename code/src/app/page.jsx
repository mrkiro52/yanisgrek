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

import fs from 'fs/promises';
import path from 'path';

// ISR: обновляем страницу раз в минуту
export const revalidate = 60;

export default async function Home() {
  const serviceSlugs = [
    'zamena-masla-v-akpp',
    'kalibrovka-pnevmopodveski',
    'remont-rulevoy-reyki',
  ];

  // Асинхронное чтение данных услуг из файлов
  const serviceData = await Promise.all(
    serviceSlugs.map(async (slug) => {
      const filePath = path.join(
        process.cwd(),
        'src',
        'data',
        'services',
        `${slug}.json`
      );
      const raw = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(raw);
    })
  );

  const [serviceData1, serviceData2, serviceData3] = serviceData;

  return (
    <main className="Home">
      <Header />

      <div className="startscreen">
        <div className="firstRow">
          <Image
            src="/images/techCenter.png"
            alt="tech"
            width={374}
            height={104}
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

      <Calculator />

      <div className="blackInfo">
        <div className="content">
          <h2>
            ОБСЛУЖИВАНИЕ BMW <span>НА</span> УРОВНЕ,
            <br /> <span>КОТОРОМУ</span> ДОВЕРЯЮТ ТЫСЯЧИ.
          </h2>
          <div className="row row1">
            <Image src="/images/blackInfoImg1.png" alt="info" width={285} height={380} />
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
            <Image src="/images/blackInfoImg2.png" alt="info" width={489} height={402} />
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
            <Image src="/images/blackInfoImg3.png" alt="info" width={387} height={516} />
          </div>
        </div>
      </div>

      <div className="numbersBlock">
        <div className="content">
          <div className="row1">
            <div className="block1">
              <Image src="/images/number1.png" alt="info" width={256} height={178} />
              <span>лет опыта</span>
            </div>
            <div className="block2">
              <Image
                src="/images/number2.png"
                alt="info"
                width={360}
                height={178}
              />
              <span>
                <a
                  href="https://yandex.ru/profile/1175654222?lang=ru"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  рейтинг в Google и Яндекс
                </a>
              </span>
            </div>
          </div>
          <div className="row2">
            <div className="block3">
              <Image src="/images/number3.png" alt="info" width={138} height={178} />
              <span>года гарантии</span>
            </div>
            <div className="block4">
              <Image src="/images/number4.png" alt="info" width={780} height={178} />
              <span>машин обслужено</span>
            </div>
          </div>
        </div>
      </div>

      <div className="topServices">
        <div className="content">
          <h2>Наши ТОП услуги</h2>
          <div className="remont">
            <Link href="/remontAkpp" prefetch className="block">
              <h3>Ремонт АКПП</h3>
              <span>
                Ремонт и обслуживание всех типов коробок переключения передач — АКПП,
                МКПП, DCT, EV.
                <br />
                <br />Перейти...
              </span>
            </Link>
            <Link href="/remontDvs" prefetch className="block">
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
              услуг можно <Link href="/services">здесь</Link>.
            </p>
          </div>
          <div className="rows">
            {serviceSlugs.map((slug, idx) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                prefetch
                className={`row row${idx + 1}`}
              >
                <span className="num">0{idx + 1}</span>
                <span className="name">{serviceData[idx].title}</span>
                <p>{serviceData[idx].text2}</p>
                <Image
                  src="/images/goCircle.png"
                  alt="info"
                  width={43}
                  height={43}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Form />
    </main>
  );
}
