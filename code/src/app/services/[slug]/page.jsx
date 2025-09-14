import "./service.scss";
import Header from "../../../components/Header/Header";
import fs from "fs";
import path from "path";
import Form from "../../../components/Form/Form";
import ButtonGoForm from '../../../components/BtnGoForm/BtnGoForm';
import ImageBlock from './ImageBlock';
import Image from 'next/image';
import TeamBlock from '../../../components/TeamBlock/TeamBlock';
import Chillzone from "../../../components/Chillzone/Chillzone";
import Discounts from "../../../components/Discounts/Discounts";

export default async function Service({ params }) {

  const { slug } = await params; 

  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "services", 
    `${slug}.json`
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  const serviceData = JSON.parse(raw);
  
  return (
    <div className="Service">
      <Header />
      <div className="Startscreen"> 
        <div className="content">
          <div className="left">
            <div className="info">
              <h1>{serviceData.title}</h1>
              <p>{serviceData.subtitle}</p>
              <p>от {serviceData.price} рублей</p>
            </div>
            <ButtonGoForm/>
          </div>
          <div className="right">
            <ImageBlock image={slug} />
          </div>
        </div>
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
      <div style={{paddingTop: "130px"}}></div>
      <review-lab data-widgetid="68adc1e5122d897a4957fded"></review-lab>
      <div style={{paddingBottom: "130px"}}></div>
      <script src="https://app.reviewlab.ru/widget/index-es2015.js" defer></script>
      <div className="Service_steps">
        <div className="Service_steps__wrapper">
          <h2>Этапы работы</h2>
          <div className="steps">
            <div className="step">
              <span>1</span>
              <h3>{serviceData.step1_title}</h3>
              <p>{serviceData.step1_text}</p>
            </div>
            <div className="step">
              <span>2</span>
              <h3>{serviceData.step2_title}</h3>
              <p>{serviceData.step2_text}</p>
            </div>
            <div className="step">
              <span>3</span>
              <h3>{serviceData.step3_title}</h3>
              <p>{serviceData.step3_text}</p>
            </div>
            <div className="step">
              <span>4</span>
              <h3>{serviceData.step4_title}</h3>
              <p>{serviceData.step4_text}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="Service_informationBlock">
        <h2 className="service_informationBlock__title">
          Подробнее об услуге
          <br/>"{serviceData.title}"
        </h2>              
        <div className="service_informationBlock__description">
          <div className="row">
            <div className="info">
              <h3 className="service_informationBlock__description_title">{serviceData.text1_title}</h3>
              <p className="service_informationBlock__description_text">
                {serviceData.text1}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="info">
              <h3 className="service_informationBlock__description_title">{serviceData.text2_title}</h3>
              <p className="service_informationBlock__description_text">
                {serviceData.text2}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="info">
              <h3 className="service_informationBlock__description_title">{serviceData.text3_title}</h3>
              <p className="service_informationBlock__description_text">
                {serviceData.text3}
              </p>
            </div>
          </div>
          <div className="row">
            <div className="info">
              <h3 className="service_informationBlock__description_title">{serviceData.text4_title}</h3>
              <p className="service_informationBlock__description_text">
                {serviceData.text4}
              </p>
            </div>
          </div>
        </div>
      </div>
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
      <TeamBlock/>
      <Chillzone/>
<Form/>
    </div>
  );
}
