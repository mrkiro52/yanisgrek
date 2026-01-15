import Chillzone from '../../components/Chillzone/Chillzone';
import Discounts from '../../components/Discounts/Discounts';
import Form from '../../components/Form/Form';
import TeamBlock from '../../components/TeamBlock/TeamBlock';
import Header from '../../components/Header/Header';
import './Works.scss';

export default function Works() {
    return (
        <div className="Works">
                <Header />
                <div className="Startscreen">
                    <div className="Startscreen_wrapper">
                        <div className="left">
                            <h2>Наши работы</h2>
                            <div className="info">
                                <h3>Блог о прроведенных ремонтах</h3>
                                <p>На этой странице вы можете ознакомиться с решением той или иной проблемы, с которой столкнулись наши клиенты</p>
                            </div>
                        </div>
                        <div className="right">
                            <img src="/images/worksImg1.png" alt="Примеры выполненных ремонтов в YANIS GREK" />
                            <img src="/images/worksImg2.png" alt="Фотоотчёт о выполненной работе" />
                        </div>
                    </div>
                </div>
                <Discounts/>
                <TeamBlock/>
                <Chillzone/>
                <Form/>
        </div>
    )
}