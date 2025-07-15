import "./service.scss";
import Header from "../../../components/Header/Header";
import fs from "fs";
import path from "path";
import Contacts from "../../contacts/page";
import ButtonGoForm from '../../../components/BtnGoForm/BtnGoForm';
import ImageBlock from './ImageBlock';

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
            </div>
            <ButtonGoForm/>
          </div>
          <div className="right">
            <ImageBlock/>
          </div>
        </div>
      </div>
      <div className="calculator">
        <div className="content">
          <h2>Стоимость услуги {serviceData.title}</h2>
          <h3>от {serviceData.price} рублей</h3>
          <ButtonGoForm/>
        </div>
      </div>
      <div className="block_about_from_founder">
        <h1 className="hero_title">
          Работа без излишнего пафоса, исключительно человеческий подход.
        </h1>
        <div>
          <div className="row_1_description_photo">
            <p className="description_about_block_founder">
              {serviceData.text1}
            </p>
            <img src="/images/photo_office.jpg" alt="office" />
          </div>
          <div className="row_2_description_photo">
            <img
              src="/images/photo_worker.jpg"
              alt=""
              className="photo_worker"
            />
            <p className="description_about_block_founder">
              {serviceData.text2}
            </p>
          </div>
        </div>
      </div>
      <Contacts/>
    </div>
  );
}
