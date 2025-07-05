import "./service.scss";
import Header from "../../../components/Header/Header";
import fs from "fs";
import path from "path";
import Contacts from "../../contacts/page";

export default function Service({ params }) {

  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "services",
    `${params.slug}.json`
  );
  const raw = fs.readFileSync(filePath, "utf-8");
  const serviceData = JSON.parse(raw);
  
  return (
    <div className="Service">
      <Header />
      <div className="Startscreen">
        <h2 className="title_startscreen">
          {serviceData.title}
          <span className="title_small"> BMW</span>
        </h2>

        <div className="images-wrapper">
          {/* небольшой «лево-верх» кадр */}
          <img
            src="/images/oil-pour.jpg"
            alt=""
            className="images-wrapper__img images-wrapper__img--small"
          />

          {/* большой «право-низ» кадр */}
          <img
            src="/images/mechanic.jpg"
            alt=""
            className="images-wrapper__img images-wrapper__img--large"
          />

          {/* подзаголовок справа от фото */}
          <div className="images-wrapper__subtitle">
            <p className="subtitle-top">{serviceData.subtitle}</p>
          </div>
          <div className="images-wrapper__subtitle_mobile">
            <p className="subtitle_mobile">
              {serviceData.subtitle}
            </p>
          </div>
        </div>
      </div>
      <div className="calculator">
        <h1 className="title_calculator">Здесь будет калькулятор</h1>
      </div>
      <div className="block_about_from_founder">
        <h1 className="hero_title">
          Сервис <span className="hero_title_small">без</span> понтов. <br />{" "}
          Просто по-человечески
        </h1>
        <div>
          <div className="row_1_description_photo">
            <p className="description_about_block_founder">
              {serviceData.text1}
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
              {serviceData.text2}
            </p>
          </div>
        </div>
      </div>
      <Contacts/>
    </div>
  );
}
