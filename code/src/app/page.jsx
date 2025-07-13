import Link from 'next/link';
import "../styles/globals.css";
import Image from 'next/image';
import Header from '../components/Header/Header';
import '../styles/mainPage.scss';
import Contacts from "./contacts/page";
import Calculator from '../components/Calculator/Calculator';
import BtnGoCalc from '../components/BtnGoCalc/BtnGoCalc';
import BtnGoForm from '../components/BtnGoForm/BtnGoForm';

import fs from "fs";
import path from "path";

export default async function Home() {

  const filePath1 = path.join(
    process.cwd(),
    "src",
    "data",
    "services",
    "zamena-masla-v-akpp.json"
  );
  const raw1 = fs.readFileSync(filePath1, "utf-8");
  const serviceData1 = JSON.parse(raw1);

  const filePath2 = path.join(
    process.cwd(),
    "src",
    "data",
    "services",
    "kalibrovka-pnevmopodveski.json"
  );
  const raw2 = fs.readFileSync(filePath2, "utf-8");
  const serviceData2 = JSON.parse(raw2);

  const filePath3 = path.join(
    process.cwd(),
    "src",
    "data",
    "services",
    "remont-rulevoy-reyki.json"
  );
  const raw3 = fs.readFileSync(filePath3, "utf-8");
  const serviceData3 = JSON.parse(raw3);

  /* 1. Загружаем всё, что нужно на сервере  */
  const [
    modelsRes,
    submodelsRes, 
    seriesRes,
    servicesRes,
  ] = await Promise.all([
    fetch('http://89.104.65.124/api/models/',          { next: { revalidate: 60 } }),
    fetch('http://89.104.65.124/api/submodels/',       { next: { revalidate: 60 } }),
    fetch('http://89.104.65.124/api/series/',          { next: { revalidate: 60 } }),
    fetch('http://89.104.65.124/api/maintenance-services/', { next: { revalidate: 60 } }),
  ]);

  if (![modelsRes, submodelsRes, seriesRes, servicesRes].every(r => r.ok)) {
    throw new Error('Не удалось загрузить данные с API');
  }

  const [models, submodels, series, services] = await Promise.all([
    modelsRes.json(),
    submodelsRes.json(),
    seriesRes.json(),
    servicesRes.json(),
  ]);

  /* 2. Склеиваем вложенную иерархию для калькулятора  */
  const data = models.map(model => {
    const subs = submodels
      .filter(sm => sm.model.id === model.id)
      .map(sm => ({
        ...sm,
        series: series.filter(s => s.submodel.id === sm.id),
      }));
    return { ...model, submodels: subs };
  });

  return (
    <main className="Home">
      <Header/>
      <div className="startscreen">
        <div className="firstRow">
          <Image 
            src="/images/techCenter.png"
            alt="tech"
            width={374}
            height={104}
          />
          <div className="buttons">
            <BtnGoCalc/>
            <BtnGoForm/>
          </div>
        </div>
        <div className="secondRow">
          <p>Сертифицированное оборудование, фирменный инструмент и опыт команды — для быстрого и качественного ремонта.</p>
        </div>
      </div>
      <Calculator data={data} services={services} />
      <div className="blackInfo">
        <div className="content">
          <h2>ОБСЛУЖИВАНИЕ BMW <span>НА</span> УРОВНЕ,<br/> <span>КОТОРОМУ</span> ДОВЕРЯЮТ ТЫСЯЧИ.</h2>
          <div className="row row1">
            <Image 
              src="/images/blackInfoImg1.png"
              alt="info"
              width={285}
              height={380}
            />
            <div className="textBlock">
              <h3>Оригинальные запчасти BMW</h3>
              <p>Мы используем только оригинальные комплектующие, одобренные производителем. Это гарантирует максимальную совместимость, надёжность и долговечность каждого узла вашего автомобиля.</p>
            </div>
          </div>
          <div className="row row2">
            <Image 
              src="/images/blackInfoImg2.png"
              alt="info"
              width={489}
              height={402}
            />
            <div className="textBlock">
              <h3>Сертифицированные мастера</h3>
              <p>Наши специалисты прошли официальное обучение и сертификацию BMW. Они досконально знают особенности каждой модели и работают строго по регламентам завода-изготовителя.</p>
            </div>
          </div>
          <div className="row row3">
            <div className="textBlock">
              <h3>Прозрачные цены и фотоотчёт</h3>
              <p>Перед началом работ вы получаете точную смету. В процессе — фотоотчёт с каждым этапом. Никаких скрытых платежей, только честный сервис и открытость.</p>
            </div>
            <Image 
              src="/images/blackInfoImg3.png"
              alt="info"
              width={387}
              height={516}
            />
          </div>
        </div>
      </div>
      <div className="numbersBlock">
        <div className="content">
          <div className="row1">
            <div className="block1">
              <Image 
                src="/images/number1.png"
                alt="info"
                width={256}
                height={178}
              />
              <span>лет опыта</span>
            </div>
            <div className="block2">
              <Image 
                src="/images/number2.png"
                alt="info"
                width={360}
                height={178}
              />
              <span><a href="https://yandex.ru/profile/1175654222?lang=ru" target="_blank">рейтинг в Google и Яндекс</a></span>
            </div>
          </div>
          <div className="row2">
            <div className="block3">
              <Image 
                src="/images/number3.png"
                alt="info"
                width={138}
                height={178}
              />
              <span>года гарантии</span>
            </div>
            <div className="block4">
              <Image 
                src="/images/number4.png"
                alt="info"
                width={780}
                height={178}
              />
              <span>машин обслужено</span>
            </div>
          </div>
        </div>
      </div>
      <div className="topServices">
        <div className="content">
          <h2>Наши ТОП услуги</h2>
          <div className="infoBlock">
            <h3>Даже надёжные и новые автомобили BMW со временем могут потребовать своевременного ремонта.</h3>
            <p>Если работ по устранению вашей неисправности нет в списке, это не значит, что мы ее не производим. Ознакомиться с полным списком наших услуг можно <Link href="/services">здесь</Link>.</p>
          </div>
          <div className="rows">
            <Link href="/services/zamena-masla-v-akpp" className="row row1">
              <span className="num">01</span>
              <span className="name">{serviceData1.title}</span>
              <p>{serviceData1.text2}</p>
              <Image 
                  src="/images/goCircle.png"
                  alt="info"
                  width={43}
                  height={43}
              />
            </Link>
            <Link href="/services/kalibrovka-pnevmopodveski" className="row row2">
              <span className="num">02</span>
              <span className="name">{serviceData2.title}</span>
              <p>{serviceData2.text2}</p>
              <Image 
                  src="/images/goCircle.png"
                  alt="info"
                  width={43}
                  height={43}
              />
            </Link>
            <Link href="services/remont-rulevoy-reyki" className="row row3">
              <span className="num">03</span>
              <span className="name">{serviceData3.title}</span>
              <p>{serviceData3.text2}</p>
              <Image 
                  src="/images/goCircle.png"
                  alt="info"
                  width={43}
                  height={43}
              />
            </Link>
          </div>
        </div>
      </div>
      <Contacts/>
    </main>
  );
}
