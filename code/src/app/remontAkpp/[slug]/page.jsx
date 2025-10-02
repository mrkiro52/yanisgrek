// app/remontDvs/[slug]/page.jsx
import fs from 'fs/promises';
import path from 'path';
import '../../../styles/slugKppAndDvs.scss';
import Header from '@/components/Header/Header';
import Form from '../../../components/Form/Form';
import Image from 'next/image';
import Discounts from '../../../components/Discounts/Discounts';
import Chillzone from '../../../components/Chillzone/Chillzone';
import Quiz from '../../../components/Quiz/Quiz';
import QuizAkpp from '../../../components/QuizAkpp/QuizAkpp';
import WhyUs from '../../../components/WhyUs/WhyUs';

// ISR: пересобираем страницу раз в минуту
export const revalidate = 60;

// Генерация путей для статической сборки
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src', 'data', 'akpp');
  const files = await fs.readdir(dir);
  return files
    .filter(f => f.endsWith('.json'))
    .map(f => ({ slug: f.replace(/\.json$/, '') }));
}

export default async function RemontAkppSpecial({ params }) {
  const { slug } = params;

  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'akpp',
    `${slug}.json`
  );

  const fileRaw = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileRaw);

  return (
    <div className="RemontAkppSpecial">
      <Header/>
      <div className="wrapper">
        <div className="title_row">
          <div className="left">
            <h1>Ремонт {data.type}<br/>{data.name}</h1>
            <span>- Гарантия на ремонт до 2-х лет</span>
            <span>- Мастера по АКПП с опытом более 15 лет</span>
            <a href='#Form' className='goform'>Записаться в автосервис</a>
          </div>
          <div className="image_wrapper">
            <Image
              src={`/images/kpp/${slug}.jpg`}
              alt="remont-kpp"
              width={500}     // тут достаточно произвольного числа, важно: оно будет перезаписано стилями
              height={500}    // то же самое
              className="img_full_height"
              priority
            />
          </div>
        </div>
        <div className="row">
            <div className="block">
                <h2>Слабые места {data.name}</h2>
                <p>{data.slabie_mesta}</p>
            </div>
            <div className="block">
                <h2>Как обслуживать {data.name}</h2>
                <p>{data.kak_obslujivat}</p>
            </div>
        </div>
        <div className="row">
            <div className="block">
                <h2>Как ремонтировать {data.name}</h2>
                <p>{data.kak_remontirovat}</p>
            </div>
            <div className="block">
                <h2>как увеличить срок службы {data.name}</h2>

                <p>{data.kak_uvelichit_srok_slujby}</p>
            </div>
        </div>
      </div>
      <QuizAkpp />
      <div className="Service_steps">
        <div className="Service_steps__wrapper">
          <h2>Этапы работы</h2>
          <div className="steps">
            <div className="step">
              <span>1</span>
              <h3>Диагностика коробки передач</h3>
              <p>
                Полная компьютерная и ручная диагностика для выявления точных
                причин неисправности: шумов, пробуксовок и подтеков масла.
              </p>
            </div>
            <div className="step">
              <span>2</span>
              <h3>Демонтаж и разборка узла</h3>
              <p>
                Снятие КПП с автомобиля, разборка внутренних компонентов и
                оценка износа шестерён, синхронизаторов и подшипников.
              </p>
            </div>
            <div className="step">
              <span>3</span>
              <h3>Замена изношенных деталей</h3>
              <p>
                Установка оригинальных или высококачественных аналогов всех
                изношенных элементов: фрикционных колец, прокладок и уплотнений.
              </p>
            </div>
            <div className="step">
              <span>4</span>
              <h3>Сборка и тестирование</h3>
              <p>
                Сборка коробки передач с заводскими настройками, заливка нового
                масла и проведение контрольного тест-драйва.
              </p>
            </div>
          </div>
        </div>
      </div>
      <WhyUs/>
      <Quiz/>
      <div style={{paddingTop: "80px"}}></div>
      <review-lab data-widgetid="68adc1e5122d897a4957fded"></review-lab>
      <div style={{paddingBottom: "130px"}}></div>
      <script src="https://app.reviewlab.ru/widget/index-es2015.js" defer></script>
      <Discounts/>
      <div className="Service_phone">
        <div className="Service_phone__wrapper">
          <Image
            src="/images/phoneCall.png"
            alt="Phone Call"
            width={390} // укажи нужную ширину
            height={430} // и высоту
            priority // если важно для LCP
          />
          <div className="block">
            <h2>Получите консультацию по услугам и ценам по телефону</h2>
            <span>
              <a href="tel:+74957676500">+7 (495) 76-76-500</a>
            </span>
          </div>
        </div>
      </div>
      <Chillzone/>
      <Form />
    </div>
  );
}
