import Chillzone from '../../../components/Chillzone/Chillzone';
import Discounts from '../../../components/Discounts/Discounts';
import Form from '../../../components/Form/Form';
import TeamBlock from '../../../components/TeamBlock/TeamBlock';
import './Work.scss';

export default function work() {
    return (
        <div className="work">
                <div className="Service_steps">
                <div className="Service_steps__wrapper">
                    <h2>Этапы работы</h2>
                    <div className="steps">
                    <div className="step">
                        <span>1</span>
                        <h3>Диагностика коробки передач</h3>
                        <p>
                        Полная компьютерная и ручная диагностика для выявления точных
                        причин неисправности: шумов, пробуксовок и подтеков масла.
                        </p>
                    </div>
                    <div className="step">
                        <span>2</span>
                        <h3>Демонтаж и разборка узла</h3>
                        <p>
                        Снятие КПП с автомобиля, разборка внутренних компонентов и
                        оценка износа шестерён, синхронизаторов и подшипников.
                        </p>
                    </div>
                    <div className="step">
                        <span>3</span>
                        <h3>Замена изношенных деталей</h3>
                        <p>
                        Установка оригинальных или высококачественных аналогов всех
                        изношенных элементов: фрикционных колец, прокладок и уплотнений.
                        </p>
                    </div>
                    <div className="step">
                        <span>4</span>
                        <h3>Сборка и тестирование</h3>
                        <p>
                        Сборка коробки передач с заводскими настройками, заливка нового
                        масла и проведение контрольного тест-драйва.
                        </p>
                    </div>
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