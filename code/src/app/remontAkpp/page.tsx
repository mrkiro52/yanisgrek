import "./remontAkpp.scss";
import ButtonGoForm from '../../components/BtnGoForm/BtnGoForm';
import ImageBlock from '../services/[slug]/ImageBlock';
import Header from '../../components/Header/Header';
import Contacts from '../contacts/page';
import EngineSelector from '../../components/EngineSelector/EngineSelector';

export default function RemontAkpp() {

    const categories = [
        {
          title: 'Бензиновый',
          items: [
            { name: 'N13B16', models: 'F20, F21 (116i, 118i)' },
            { name: 'N20B16/N20B20', models: 'F10, F30, F32, F25, F26 (520i, 328i, X3 20i)' },
            // …и т.д.
          ],
          note: '*Стоимость услуг зависит от заправочного объема масла в двигателе',
        },
        {
          title: 'Гибрид/Электро',
          items: [
            { name: 'E-Series 1', models: 'i3, i8' },
            // …
          ],
        },
        {
          title: 'Дизельный',
          items: [
            { name: 'N47D20', models: 'E90, F10 (320d, 520d)' },
            // …
          ],
        },
      ];

    return (
        <div className="RemontAkpp">
            <Header />
            <div className="Startscreen"> 
                <div className="content">
                    <div className="left">
                        <div className="info">
                        <h1>Ремонт КПП</h1>
                        <p>При ремонте коробки передач мы используем оригинальные компоненты и строгие допуски: гарантия плавного переключения, герметичности и долговечности узла.</p>
                        </div>
                        <ButtonGoForm/>
                    </div>
                    <div className="right">
                        <ImageBlock image={'remont-kpp'} />
                    </div>
                </div>
            </div>
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
            />
            <Contacts/>
        </div>
    )
}
