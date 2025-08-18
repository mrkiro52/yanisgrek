import './TeamBlock.scss';

export default function TeamBlock() {
    return (
        <div className="TeamBlock">
            <div className="block_assets_about">
                <div className="asset">
                    <img src="/images/preim3.jpg" alt="" />
                    <p>14 лет стабильной работы одной и той же командой.</p>
                </div>
                <div className="asset">
                    <img src="/images/preim1.jpg" alt="" />
                    <p>Честная диагностика, прозрачные цены, никаких скрытых услуг.</p>
                </div>
                <div className="asset">
                    <img src="/images/preim2.jpg" alt="" />
                    <p>Всегда на связи, всегда готовы объяснить и пойти навстречу.</p>
                </div>
                <div className="asset">
                    <img src="/images/preim4.jpg" alt="" />
                    <p>Уважение к каждому клиенту, даже в форс-мажорных ситуациях.</p>
                </div>
            </div>
        </div>
    )
}