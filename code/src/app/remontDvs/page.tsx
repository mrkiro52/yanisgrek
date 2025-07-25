import "./remontDvs.scss";
import ButtonGoForm from '../../components/BtnGoForm/BtnGoForm';
import ImageBlock from '../services/[slug]/ImageBlock';
import Header from '../../components/Header/Header';
import Contacts from '../contacts/page';
import EngineSelector from '../../components/EngineSelector/EngineSelector';

export default function RemontDvs() {
    
    const categories = [
        {
          title: 'Бензиновый',
          items: [
            { name: 'N13B16', models: 'F20, F21 (116i, 118i)', path: 'n13b16' },
            { name: 'N20B16/N20B20', models: 'F10, F30, F32, F25, F26 (520i, 328i, X3 20i)', path: 'n20b16-n20b20' },
            { name: 'N26B20', models: 'F30 (328i, 428i в США)', path: 'n26b20' },
            { name: 'N52B30', models: 'F10, F25 (528i, X3 28i)', path: 'n52b30' },
            { name: 'N54B30', models: 'F01, F10, F07, F13 (740i, 535i, 335is)', path: 'n54b30' },
            { name: 'N55B30', models: 'F20, F22, F30, F32, F10, F15, F16 (M135i, 335i, 435i, 535i, X5 35i)', path: 'n55b30' },
            { name: 'N63B44', models: 'F01, F07, F10, F15, F16 (750i, X5 50i)', path: 'n63b44' },
            { name: 'S55B30', models: 'F80 M3, F82 M4, F87 M2 Comp', path: 's55b30' },
            { name: 'S63B44', models: 'F10 M5, F13 M6, F85 X5 M, F86 X6 M', path: 's63b44' },
            { name: 'B38B15', models: 'F20, F22, F45, F46 (218i, 118i)', path: 'b38b15' },
            { name: 'B48B20', models: 'F30, F32, G20, G30, G11, G01 (320i, 330i, X3 20i)', path: 'b48b20' },
            { name: 'B58B30', models: 'G20, G30, G11, G01, G05 (M340i, 540i, X3 M40i)', path: 'b58b30' },
            { name: 'N63B44 (TU/TU2/TU3)', models: 'G11, G30, G05, G07, G15 (750i, X5 50i, M850i)', path: 'n63b44-tu-tu2-tu3' },
            { name: 'S58B30', models: 'G80 M3, G82 M4, G87 M2', path: 's58b30' },
            { name: 'S63B44', models: 'G90 M5, G15 M8, G05 X5 M', path: 's63b44' },
            { name: 'S68B44', models: 'G70 760i, G99 X5 M', path: 's68b44' },
          ],
          note: '* Стоимость услуг уточняйте по номеру +7 495 76 76 500',
        },
        {
          title: 'Гибрид/Электро',
          items: [
            { name: 'N20 + электромотор (eDrive)', models: 'F30 330e', path: 'n20-elektromotor-edrive' },
            { name: 'B48 + электромотор', models: 'G20 330e, G30 530e', path: 'b48-elektromotor' },
            { name: 'B58 + электромотор', models: 'G11 745e, G05 X5 45e', path: 'b58-elektromotor' },
            { name: 'S68 + электромотор', models: 'G09 XM', path: 's68-elektromotor' },
            { name: 'iX3 eDrive 80', models: 'G08 iX3', path: 'ix3-edrive80' },
            { name: 'i4 eDrive 40 / M50', models: 'G26 i4', path: 'i4-edrive40-m50' },
            { name: 'iX xDrive 40 / 50 / M60', models: 'G09 iX', path: 'ix-xdrive40-50-m60' },
          ],
          note: '* Стоимость услуг уточняйте по номеру +7 495 76 76 500',
        },
        {
          title: 'Дизельный',
          items: [
            { name: 'N47D16/N47D20', models: 'F20, F30, F10, F25 (116d, 320d, 520d, X3 20d)', path: 'n47d160-n47d20' },
            { name: 'N57D30', models: 'F10, F15, F16, F01 (530d, 730d, X5 30d)', path: 'n57d30' },
            { name: 'B37D15', models: 'F20, F45, F46, F48 (116d, 218d, X1 18d)', path: 'b37d15' },
            { name: 'B47D20', models: 'F30, G20, G30, G01, G11 (320d, 520d, X3 20d)', path: 'b47d20' },
            { name: 'B57D30', models: 'G30, G11, G01, G05, G07 (530d, 730d, X3 30d, X5 30d)', path: 'b57d30' },
          ],
          note: '* Стоимость услуг уточняйте по номеру +7 495 76 76 500',
        },
      ];      

    return (
        <div className="RemontDvs">
            <Header />
            <div className="Startscreen"> 
                <div className="content">
                    <div className="left">
                        <div className="info">
                        <h1>Ремонт ДВС</h1>
                        <p>При ремонте двигателей внутреннего сгорания мы применяем оригинальные комплектующие и современные технологии: гарантия восстановления мощности, герметичности и ресурса мотора.</p>
                        </div>
                        <ButtonGoForm/>
                    </div>
                    <div className="right">
                        <ImageBlock image={'remont-dvs'} />
                    </div>
                </div>
            </div>
            <div className="problems_block">
                    <div className="problems_block_top">
                        <h1 className="title_problem">
                        Даже самый отлаженный<br />мотор может дать сбой
                        </h1>
                        <h2>YANIS GREK</h2>
                    </div>
                    <div className="container_problems">
                        <div className="block_title">
                            <h1 className="title">Дизель</h1>
                            <p className="subtitle">Засорение форсунок и клапанов из-за сажи снижает динамику и вызывает вибрации.</p>
                        </div>
                        <div className="block_title">
                            <h1 className="title">Гибрид</h1>
                            <p className="subtitle">Износ сцепления и перегрев при частых переключениях режимов уменьшают ресурс ДВС.</p>
                        </div>
                        <div className="block_title">
                            <h1 className="title">Бензин</h1>
                            <p className="subtitle">Проблемы с системой зажигания и датчиками приводят к неустойчивому холостому ходу и провалам при разгоне.</p>
                        </div>
                        <div className="block_title">
                            <h1 className="title">Электро</h1>
                            <p className="subtitle">Для электромоторов критичны износ подшипников и перегрев контроллера — источник шумов и потери КПД.</p>
                        </div>
                    </div>
            </div>
            <EngineSelector
                categories={categories}
                firstColumnHeader="Название"
                secondColumnHeader="Модели BMW"
                type="remontDvs"
            />
            <Contacts/>
        </div>
    )
}
