import "./remontDvs.scss";
import ButtonGoForm from '../../components/BtnGoForm/BtnGoForm';
import ImageBlock from '../services/[slug]/ImageBlock';
import Header from '../../components/Header/Header';
import Contacts from '../contacts/page';

export default function RemontDvs() {
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
            <Contacts/>
        </div>
    )
}
