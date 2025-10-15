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
import QuizDvs from '../../../components/QuizDvs/QuizDvs';
import WhyUs from '../../../components/WhyUs/WhyUs';

// ISR: пересобираем страницу раз в минуту
export const revalidate = 60;

// Генерация путей для статической сборки
export async function generateStaticParams() {
  const dir = path.join(process.cwd(), 'src', 'data', 'dvs');
  const files = await fs.readdir(dir);
  return files
    .filter(f => f.endsWith('.json'))
    .map(f => ({ slug: f.replace(/\.json$/, '') }));
}

export default async function RemontDvsPage({ params }) {
  const { slug } = params;

  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'dvs',
    `${slug}.json`
  );

  const fileRaw = await fs.readFile(filePath, 'utf-8');
  const data = JSON.parse(fileRaw);

  return (
    <div className="RemontDvsSpecial">
      <Header/>
      <div className="wrapper">
        <div className="title_row">
            <div className="left">
                <h1>Ремонт ДВС<br/>{data.name}</h1>
                <span>- Гарантия на ремонт до 2-х лет</span>
                <span>- Мастера по АКПП с опытом более 15 лет</span>
                <a href='#Form' className='goform'>Записаться в автосервис</a>
            </div>
          <div className="image_wrapper">
            <Image
              src={`/images/dvs/${slug}.jpg`}
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
      <QuizDvs />
      <div className="Service_steps">
          <div className="Service_steps__wrapper">
              <h2>Этапы работы</h2>
              <div className="steps">
              <div className="step">
                  <span>1</span>
                  <h3>Компьютерная и визуальная диагностика</h3>
                  <p>
                  Проверка давления, расхода масла и компрессии; сканирование на наличие ошибок
                  электронных блоков управления и оценка состояния внешних компонентов.
                  </p>
              </div>
              <div className="step">
                  <span>2</span>
                  <h3>Демонтаж и разборка двигателя</h3>
                  <p>
                  Снятие двигателя, разделение блока и головки цилиндров, оценка износа поршневых
                  колец, вкладышей и распредвалов.
                  </p>
              </div>
              <div className="step">
                  <span>3</span>
                  <h3>Ремонт и замена узлов</h3>
                  <p>
                  Шлифовка и притирка клапанов, замена прокладок, поршневых колец и маслосъёмных
                  колец, восстановление или замена шатунных вкладышей и масляного насоса.
                  </p>
              </div>
              <div className="step">
                  <span>4</span>
                  <h3>Сборка, регулировка и тест-драйв</h3>
                  <p>
                  Сборка двигателя с заводскими допусками, настройка фаз ГРМ и зазоров клапанов,
                  заливка нового масла и контрольный запуск с поездкой для проверки надёжности.
                  </p>
              </div>
              </div>
          </div>
      </div>
      <WhyUs/>
      <Quiz/>
      <div style={{paddingTop: "80px"}}></div>
      <review-lab data-widgetid="68ef05ca67defc8041d3ab95"></review-lab>
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
                  <a href="tel:+74957676500">+7 495 76 76 500</a>
              </span>
          </div>
          </div>
      </div>
      <Chillzone/>
      <Form />
    </div>
  );
}
