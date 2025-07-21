import "./remontAkpp.scss";
import ButtonGoForm from '../../components/BtnGoForm/BtnGoForm';
import ImageBlock from '../services/[slug]/ImageBlock';
import Header from '../../components/Header/Header';
import Contacts from '../contacts/page';
import EngineSelector from '../../components/EngineSelector/EngineSelector';

export default function RemontAkpp() {

    const categories = [
        {
          title: 'МКПП',
          items: [
            { name: 'Getrag GS6-17BG', models: 'F20, F21, F22, F30, F31 (1, 2, 3 серии)' },
            { name: 'Getrag GS6-45BZ', models: 'F30, F32, F36 (3, 4 серии)' },
            { name: 'ZF GS6-53DZ', models: 'F80 M3, F82 M4' },
            { name: 'ZF GS6-45DZ', models: 'G20, G21, G42, G87 (M2, 3 серии)' },
          ],
          note: '* Стоимость услуг уточняйте по номеру +7 495 76 76 500',
        },
        {
          title: 'АКПП',
          items: [
            { name: 'ZF 8HP45', models: 'F30, F32, F36, F10, F11 (3, 4, 5 серии)' },
            { name: 'ZF 8HP50', models: 'G20, G30, G11 (3, 5, 7 серии)' },
            { name: 'ZF 8HP51', models: 'G01, G02, G05 (X3, X4, X5)' },
            { name: 'ZF 8HP70', models: 'F15, F16, F01, F02 (X5, X6, 7 серия)' },
            { name: 'ZF 8HP75', models: 'G11, G12, G30 (7, 5 серии)' },
            { name: 'ZF 8HP76', models: 'G05, G06, G07 (X5, X6, X7)' },
            { name: 'ZF 8HP90', models: 'F90 M5, F92 M8, G80 M3, G82 M4' },
          ],
          note: '* Стоимость услуг уточняйте по номеру +7 495 76 76 500',
        },
        {
          title: 'DCT',
          items: [
            { name: 'Getrag 7DCT300', models: 'F39, F44, F48 (X2, 2 серии Gran Coupe)' },
            { name: 'Getrag 7DCT500', models: 'F87 M2 Competition' },
            { name: 'Getrag 7DCT600', models: 'F80 M3, F82 M4, F10 M5, F13 M6' },
            { name: 'Getrag 7DCT700', models: 'F90 M5, F92 M8' },
          ],
          note: '* Стоимость услуг уточняйте по номеру +7 495 76 76 500',
        },
        {
            title: 'Электро',
            items: [
              { name: 'BMW iX 1AT', models: 'iX, iX3' },
              { name: 'BMW i4 1AT', models: 'i4' },
              { name: 'BMW i7 1AT', models: 'i7' },
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
