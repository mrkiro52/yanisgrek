import "./service.scss";
import Header from '../../../components/Header/Header';

export default function Service() {
  return (
    <div className="Service">
      <Header/>
      <div className="Startscreen">
        <h2 className="title_startscreen">
          Замена масла
          <br /> в двигателе
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
            <p className="subtitle-top">ИСПОЛЬЗУЕМ ОРИГИНАЛЬНОЕ МАСЛО</p>
            <p className="subtitle-bottom">BMW LL04</p>
          </div>
        </div>
      </div>
    </div>
  );
}
