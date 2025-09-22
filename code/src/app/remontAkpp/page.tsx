import "../../styles/KppAndDvs.scss";
import ImageBlock from '../services/[slug]/ImageBlock';
import Header from '../../components/Header/Header';
import Form from '../../components/Form/Form';
import EngineSelector from '../../components/EngineSelector/EngineSelector';
import Image from 'next/image';
import TeamBlock from "../../components/TeamBlock/TeamBlock";
import Discounts from "../../components/Discounts/Discounts";
import Chillzone from "../../components/Chillzone/Chillzone";
import QuizAkpp from "../../components/QuizAkpp/QuizAkpp";

export default function RemontAkpp() {

    const categories = [
        {
          title: 'МКПП',
          items: [
            { name: 'Getrag GS6-17BG', models: 'F20, F21, F22, F30, F31 (1, 2, 3 серии)', path: 'getrag-gs6-17bg' },
            { name: 'Getrag GS6-45BZ', models: 'F30, F32, F36 (3, 4 серии)', path: 'getrag-gs6-45bz' },
            { name: 'ZF GS6-53DZ', models: 'F80 M3, F82 M4', path: 'zf-gs6-53dz' },
            { name: 'ZF GS6-45DZ', models: 'G20, G21, G42, G87 (M2, 3 серии)', path: 'zf-gs6-45dz' },
          ],
          note: '* Стоимость услуг уточняйте по номеру +7 495 76 76 500',
        },
        {
          title: 'АКПП',
          items: [
            { name: 'ZF 8HP45', models: 'F30, F32, F36, F10, F11 (3, 4, 5 серии)', path: 'zf-8hp45' },
            { name: 'ZF 8HP50', models: 'G20, G30, G11 (3, 5, 7 серии)', path: 'zf-8hp50' },
            { name: 'ZF 8HP51', models: 'G01, G02, G05 (X3, X4, X5)', path: 'zf-8hp51' },
            { name: 'ZF 8HP70', models: 'F15, F16, F01, F02 (X5, X6, 7 серия)', path: 'zf-8hp70' },
            { name: 'ZF 8HP75', models: 'G11, G12, G30 (7, 5 серии)', path: 'zf-8hp75' },
            { name: 'ZF 8HP76', models: 'G05, G06, G07 (X5, X6, X7)', path: 'zf-8hp76' },
            { name: 'ZF 8HP90', models: 'F90 M5, F92 M8, G80 M3, G82 M4', path: 'zf-8hp90' },
          ],
          note: '* Стоимость услуг уточняйте по номеру +7 495 76 76 500',
        },
        {
          title: 'DCT',
          items: [
            { name: 'Getrag 7DCT300', models: 'F39, F44, F48 (X2, 2 серии Gran Coupe)', path: 'getrag-7dct300' },
            { name: 'Getrag 7DCT500', models: 'F87 M2 Competition', path: 'getrag-7dct500' },
            { name: 'Getrag 7DCT600', models: 'F80 M3, F82 M4, F10 M5, F13 M6', path: 'getrag-7dct600' },
            { name: 'Getrag 7DCT700', models: 'F90 M5, F92 M8', path: 'getrag-7dct700' },
          ],
          note: '* Стоимость услуг уточняйте по номеру +7 495 76 76 500',
        },
        {
            title: 'Электро',
            items: [
              { name: 'BMW iX 1AT', models: 'iX, iX3', path: 'bmw-ix-1at' },
              { name: 'BMW i4 1AT', models: 'i4', path: 'bmw-i4-1at' },
              { name: 'BMW i7 1AT', models: 'i7', path: 'bmw-i7-1at' },
            ],
            note: '* Стоимость услуг уточняйте по номеру +7 495 76 76 500',
          },
      ];

    return (
        <div className="RemontAkpp">
            <Header />
            <div className="Startscreen"> 
                <div className="content">
                    <div className="left">
                        <div className="info">
                          <h1>Ремонт и диагностика АКПП</h1>
                          <p>- Гарантия на ремонт до 2-х лет</p>
                          <p>- Мастера с опытом до 20 лет</p>
                        </div>
                        <a href="#EngineSelector" className="choose">Выбрать модель</a>
                        <a href="#Form" className="goform">Оставить заявку</a>
                    </div>
                    <div className="right">
                        <ImageBlock image={'remont-kpp'} />
                    </div>
                </div>
            </div>
            <QuizAkpp />
            <div className="problems_block">
                    <div className="problems_block_top">
                        <h1 className="title_problem">
                        Даже самая отлаженная<br />коробка может дать сбой
                        </h1>
                        <h2>YANIS GREK</h2>
                    </div>
                    <div className="container_problems">
                        <div className="block_title">
                            <h1 className="title">Гидромеханическая АКПП</h1>
                            <p className="subtitle">Износ фрикционных дисков и стальных пакетов приводит к пробуксовкам и задержкам при переключении.</p>
                        </div>
                        <div className="block_title">
                            <h1 className="title">Электронный блок управления</h1>
                            <p className="subtitle">Неисправности соленоидов и датчиков давления вызывают некорректное переключение и аварийный режим.</p>
                        </div>
                        <div className="block_title">
                            <h1 className="title">Роботизированная КПП (DST)</h1>
                            <p className="subtitle">Сбои мехатроника и износ муфт сцепления вызывают дергания и ошибки адаптации.</p>
                        </div>
                        <div className="block_title">
                            <h1 className="title">Вариатор (EV)</h1>
                            <p className="subtitle">Растяжение ремня или цепи и загрязнение масла приводят к шуму, перегреву и потере тяги.</p>
                        </div>
                    </div>
            </div>
            <EngineSelector
                categories={categories}
                firstColumnHeader="Название"
                secondColumnHeader="Модели BMW"
                type="remontAkpp"
            />
            <Discounts/>
            <div className="Service_why">
              <div className="Service_why__wrapper">
                <h2>Почему стоит делать у нас?</h2>
                <div className="row">
                  <div className="block">
                    <Image
                      src="/images/why1.png"
                      alt="Phone Call"
                      width={124} // укажи нужную ширину
                      height={124} // и высоту
                      priority // если важно для LCP
                    />
                    <span>Оригинальные или сертифицированные запчасти</span>
                  </div>
                  <div className="block">
                    <Image
                      src="/images/why2.png"
                      alt="Phone Call"
                      width={124} // укажи нужную ширину
                      height={124} // и высоту
                      priority // если важно для LCP
                    />
                    <span>Оборудование как в официальных сервисах</span>
                  </div>
                  <div className="block">
                    <Image
                      src="/images/why3.png"
                      alt="Phone Call"
                      width={124} // укажи нужную ширину
                      height={124} // и высоту
                      priority // если важно для LCP
                    />
                    <span>Мастера с опытом по BMW от 10 лет</span>
                  </div>
                </div>
                <div className="row">
                  <div className="block">
                    <Image
                      src="/images/why4.png"
                      alt="Phone Call"
                      width={134} // укажи нужную ширину
                      height={124} // и высоту
                      priority // если важно для LCP
                    />
                    <span>Гарантия на ремонт до 2-х лет</span>
                  </div>
                  <div className="block">
                    <Image
                      src="/images/why5.png"
                      alt="Phone Call"
                      width={104} // укажи нужную ширину
                      height={124} // и высоту
                      priority // если важно для LCP
                    />
                    <span>Честная цена</span>
                  </div>
                  <div className="block">
                    <Image
                      src="/images/why6.png"
                      alt="Phone Call"
                      width={112} // укажи нужную ширину
                      height={124} // и высоту
                      priority // если важно для LCP
                    />
                    <span>Быстрая запись прямо на сайте</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{paddingTop: "130px"}}></div>
            <div
              dangerouslySetInnerHTML={{
                __html: `
                  <review-lab data-widgetid="68adc1e5122d897a4957fded"></review-lab>
                  <div style={{paddingBottom: "130px"}}></div>
                  <script src="https://app.reviewlab.ru/widget/index-es2015.js" defer></script>
                `,
              }}
            />
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
            <TeamBlock/>
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
<Form/>
        </div>
    )
}
