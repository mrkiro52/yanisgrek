"use client";
import Header from "../../components/Header/Header";
import Form from "../../components/Form/Form";
import "./about.scss";
import EmblaCarousel from "@/components/embla/EmblaCarousel";
import Image from 'next/image';
import TeamBlock from '../../components/TeamBlock/TeamBlock';

const problemsImages = [
  { src: "/images/car_slides/aboutPhotoBuilding.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_17.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_18.jpg", caption: "" },
  { src: "/images/car_slides/aboutPhotoAvotmat.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_19.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_20.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_21.jpg", caption: "" },
  { src: "/images/car_slides/car_slide_22.jpg", caption: "" },
];

const images = [
  { src: "/images/alexandr_director.jpg", caption: "Александр — управляющий" },
  { src: "/images/alexandr_master.jpg", caption: "Александр — мастер" },
  { src: "/images/maksim_master.jpg", caption: "Максим — мастер" },
  { src: "/images/vitaly.jpg", caption: "Виталий — специалист" },
  { src: "/images/murad.jpg", caption: "Мурад — механик" },
  { src: "/images/dmitry.jpg", caption: "Дмитрий — инженер" },
];

export default function AboutPage() {
  return (
    <div className="About">
      <Header/>
      <div className="Startscreen">
        <div className="startscreen_text">
          <h1 className="about_title">О НАС</h1>
          <div className="car_mobile">
            <Image
              src="/images/black_car_about.jpg"    // путь относительно папки public
              alt="BMW"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="block_title">
            <h1 className="title">Опыт сквозь года</h1>
            <p className="subtitle">
              14 лет вместе: история сервиса, который понимает
            </p>
          </div>
          <div className="slider_hover">
            <EmblaCarousel
              slides={problemsImages}
              options={{
                loop: true,
                align: "start",
              }}
            />
          </div>
        </div>
      </div>
      <div className="block_about">
        <div className="block_about_photo_text">
          <div className="text_block_about">
            <h1 className="title_block_about">
              О нас — автосервис в Москве
              <br /> с человеческим подходом
            </h1>
            <p className="description_block_about">
              Мы — не просто техцентр в Москве, как их привыкли видеть. Наш
              автосервис открылся 14 лет назад с простой, но сильной идеей:
            </p>
            <div className="citation_block_about">
              <p>Первый сервис с человеческим подходом.</p>
            </div>
            <p className="description_block_about">
              С тех пор мы не изменили принципам. Мы действительно верим, что
              обслуживание автомобиля может быть честным, понятным и основанным
              на доверии. Мы не стремимся «выделиться ради эффекта» — мы просто
              делаем свою работу по-человечески и профессионально.
            </p>
          </div>
          <img src="/images/photo_block_about.jpg" alt="" />
        </div>
      </div>
      <TeamBlock/>
      <div className="block_box_citation">
        <div className="block_title_assets_about">
          <h1 className="title_block2">
            Не просто ремонт,
            <br /> а отношения с клиентом
          </h1>
          <p className="subtitle_block2">
          Мы не просто ремонтируем автомобили — мы строим долгосрочные отношения с каждым клиентом. Нам важна обратная связь, ведь именно она помогает нам становиться лучше и развивать сервис, которому действительно доверяют.
          </p>
        </div>
      </div>
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
      <div className="block_about_from_founder">
        <h1 className="hero_title">
        Работа без излишнего пафоса, исключительно человеческий подход.
        </h1>
        <div className="row_1_description_photo">
          <p className="description_about_block_founder">
            Для нашей компании приоритетом являются не автомобили, а люди — клиенты, обращающиеся к нам за обслуживанием. Мы ценим каждого, кто приезжает в наш сервис, тех, кому мы объясняем причины и порядок проводимых работ. Наша главная задача — обеспечить максимально высокий уровень удовлетворённости клиентов и качеством выполненных работ, и уровнем сервиса. Это непросто, поскольку у каждого человека свои ожидания и представления об обслуживании, но мы прилагаем все усилия для их превосходства ежедневно.
          </p>
          <img src="/images/photo_office.jpg" alt="" />
        </div>
        <div className="row_2_description_photo">
          <img
            src="/images/photo_worker.jpg"
            alt=""
            className="photo_worker"
          />
          <p className="description_about_block_founder">
            Мы не претендуем на статус «супермастеров», демонстрирующих свою компетентность с помощью дорогостоящего оборудования и громких заявлений. Мы выполняем свою работу профессионально и скрупулёзно: анализируем ситуацию, применяем навыки и опыт, тщательно осуществляем ремонт. При этом мы продолжаем совершенствоваться — изучаем новейшие технологии и методики, чтобы оставаться в курсе отраслевых трендов. Но несмотря на это развитие, мы сохраняем неподдельную человеческую составляющую в общении и подходе к делу, а не превращаемся в бездушных «роботов».
          </p>
        </div>
        <p className="signature">
          С уважением, Янис Грек, владелец мастерской
        </p>
      </div>
      <div className="team">
        <h2 className="team_title">Наша команда</h2>
        <div className="slider2">
          <EmblaCarousel
            slides={images}
            options={{
              loop: true,
              align: "start",
            }}
          />
        </div>
      </div>
<Form/>
    </div>
  );
}
