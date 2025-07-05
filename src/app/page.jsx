import Link from 'next/link';
import "../styles/globals.css";
import Image from 'next/image';
import Header from '../components/Header/Header';
import '../styles/mainPage.scss';
import Contacts from "./contacts/page";
import Calculator from '../components/Calculator/Calculator';

export default async function Home() {

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
            <button className="calculate_cost">Рассчитать стоимость</button>
            <button className="send_request">Оставить заявку</button>
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
              <h3>Оригинальные запчасти BMW</h3>
              <p>Мы используем только оригинальные комплектующие, одобренные производителем. Это гарантирует максимальную совместимость, надёжность и долговечность каждого узла вашего автомобиля.</p>
            </div>
          </div>
          <div className="row row3">
            <div className="textBlock">
              <h3>Оригинальные запчасти BMW</h3>
              <p>Мы используем только оригинальные комплектующие, одобренные производителем. Это гарантирует максимальную совместимость, надёжность и долговечность каждого узла вашего автомобиля.</p>
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
              <span>рейтинг в Google и Яндекс</span>
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
            <h3>Даже надёжные и динамичные автомобили BMW со временем могут потребовать капитального ремонта.</h3>
            <p>Если работ по устранению Вашей неисправности нет в списке, это не значит, что мы ее не производим. Это лишь малый список сервисных работ, которые мы исполняем.</p>
          </div>
          <div className="rows">
            <div className="row row1">
              <span className="num">01</span>
              <span className="name">Замена масла АККП</span>
              <p>Своевременная замена масла — залог долгой и надёжной работы коробки передач. Мы используем оригинальные масла BMW, проводим диагностику и меняем фильтр при необходимости.</p>
              <Image 
                  src="/images/goCircle.png"
                  alt="info"
                  width={43}
                  height={43}
              />
            </div>
            <div className="row row2">
              <span className="num">02</span>
              <span className="name">Капитальный ремонт двигателя</span>
              <p>Капремонт требуется при серьёзном износе или повреждениях мотора. Мы восстанавливаем двигатель по заводским стандартам: полная разборка, диагностика, замена изношенных деталей, сборка и настройка. Используем только оригинальные запчасти BMW.</p>
              <Image 
                  src="/images/goCircle.png"
                  alt="info"
                  width={43}
                  height={43}
              />
            </div>
            <div className="row row3">
              <span className="num">03</span>
              <span className="name">Капитальный ремонт двигателя</span>
              <p>Капремонт требуется при серьёзном износе или повреждениях мотора. Мы восстанавливаем двигатель по заводским стандартам: полная разборка, диагностика, замена изношенных деталей, сборка и настройка. Используем только оригинальные запчасти BMW.</p>
              <Image 
                  src="/images/goCircle.png"
                  alt="info"
                  width={43}
                  height={43}
              />
            </div>
          </div>
        </div>
      </div>
      <Contacts/>
    </main>
  );
}
