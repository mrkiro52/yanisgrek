"use client";
import "./services.scss";
import { useState, useEffect } from "react";
import Form from "../../components/Form/Form";
import Header from "@/components/Header/Header";
import servicesData from '@/data/servicesPage/data.json'; // путь под себя
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import BtnGoForm from '../../components/BtnGoForm/BtnGoForm';
import TeamBlock from "../../components/TeamBlock/TeamBlock";
import Image from "next/image";
import Discounts from "../../components/Discounts/Discounts";
import Chillzone from "../../components/Chillzone/Chillzone";
 
export default function ServicesPage() {
  const LOCAL_STORAGE_KEY = 'activeServiceTabIndex';

  const router = useRouter();

  const formRef = useRef(null);
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: 'smooth' });

  const categoryTitles = {
    technical_maintenance:        'Техническое обслуживание',
    transmission_service:         'Обслуживание трансмиссии и АКПП',
    brake_system:                 'Тормозная система',
    suspension_and_steering:      'Подвеска и рулевое управление',
    engine:                       'Двигатель (ДВС)',
    electronics_and_tuning:       'Электроника и чип-тюнинг',
    ac_and_cooling:               'Кондиционер и охлаждение',
    special_and_tuning:           'Специальные работы и тюнинг',
  };

  const categoryKeys = Object.keys(servicesData);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const storedIndex = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedIndex !== null) {
      setActiveIndex(Number(storedIndex));
    }
  }, []);

  const activeKey   = categoryKeys[activeIndex];

  const servicesOfActiveCategory = Object.values(servicesData[activeKey]); 
  return (
    <div className="Services">
      <Header/>
      <div className="Startscreen">
        <h2 className="title">Услуги</h2>
        <div className="buttons">
          <BtnGoForm/>
        </div>
      </div>
      <h1 className="hero_title white">
        Все услуги Yanis Grek
      </h1>
      <div className="buttons_container" id="Calculator">
        {categoryKeys.map((key, index) => (
          <button
            key={key}
            type="button"
            className={
              activeIndex === index
                ? 'button_menu button_menu_active'
                : 'button_menu'
            }
            onClick={() => {
              setActiveIndex(index);
              localStorage.setItem(LOCAL_STORAGE_KEY, index);
            }}
          >
            {categoryTitles[key] ?? key}
          </button>
        ))}
      </div>
      <div className="services_container">
      {servicesOfActiveCategory.map(service => {
        const handleClick = () => {
          if (service.slug === 'remont-kpp') {
            router.push('/remontAkpp');
          } else if (service.slug === 'remont-dvs') {
            router.push('/remontDvs');
          } else {
            router.push(`/services/${service.slug}`);
          }
        };

        return (
          <div
            key={service.slug}
            className="service"
            onClick={handleClick}
            style={{
              backgroundImage: `url(/images/servicesImages/${service.slug}.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <span>{service.name}</span>
            <span className="price">
              от {service.price.toString().length === 5 
                  ? `${service.price.toString().slice(0, 2)}.${service.price.toString().slice(2)}`
                  : service.price.toString().length === 6
                  ? `${service.price.toString().slice(0, 3)}.${service.price.toString().slice(3)}`
                  : service.price
              } руб.
            </span>
          </div>
        );
      })}
      </div>
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
      <div className="block_about_services">
        <h2 className="hero_title">
          Премиальный автосервис BMW<br/>YanisGrek — в Москве
        </h2>
        <div className="row_1_description_photo">
          <p className="description_about_block_founder">
          Любая, даже идеальная на вид машина, однажды может подвести. И дело не только в пробеге или возрасте — часто всё начинается с мелочей: немного не так заехал на бордюр, не заметил вибрации, проигнорировал странный звук при запуске двигателя. Даже неправильно выбранное масло или затянутый визит на ТО могут привести к серьёзным последствиям. Именно поэтому так важно регулярно обслуживать автомобиль, даже если кажется, что “всё нормально”. Своевременное техническое обслуживание — это не расходы, это инвестиция в надёжность, безопасность и спокойствие. Лучше вовремя поменять фильтр, чем потом менять двигатель. Сервис — это не про сломалось, это про сохранить. Машина требует внимания, даже если пока не просит его вслух.
          </p>
          <img src="/images/car_slides/car_slide_11.jpg" alt="" />
        </div>
        <div className="row_2_description_photo">
          <img
            src="/images/car_slides/car_slide_17.jpg"
            alt=""
            className="photo_worker"
          />
          <p className="description_about_block_founder">
          Мы в YanisGrek не просто чиним машины — мы понимаем, что за каждым автомобилем стоит человек. С любыми задачами по BMW, MINI или Rolls-Royce мы справляемся без суеты и лишних слов. У нас не просто опыт — у нас внутренняя система, где каждый мастер не только делает свою работу, но и умеет внятно объяснить, что, почему и зачем. И делает это с уважением, спокойно, без давления. Мы создаём атмосферу, в которую хочется возвращаться — когда и техника в порядке, и ты сам чувствуешь, что попал в правильное место. К нам приходят не только за ремонтом, а за доверием. Мы не просто сервис, мы команда людей, которые действительно любят своё дело. И любят своих клиентов.
          </p>
        </div>
      </div>
      <TeamBlock/>
      <Chillzone/>
      <Form />
    </div>
  );
}
