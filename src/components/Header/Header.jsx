'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './Header.scss';

export default function Header() {
    const [menuOpened, setMenuOpened] = useState(false);

    useEffect(() => {
        if (menuOpened) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpened]);


    return (
        <div className="Header">
            <div className={menuOpened ? "menu opened" : "menu closed"}>
                <div className="content">
                    <img src="/cross.svg" alt="cross" className="cross" onClick={() => setMenuOpened(false)}/>
                    <div className="links">
                        <div className="linksCol">
                            <Link className='linkTitle' href='/'>ГЛАВНАЯ</Link>
                            <Link className='linkSmall' href="/about">
                                О нас
                            </Link>
                            <Link className='linkSmall' href="/contacts">
                                Контакты
                            </Link>
                            <Link className='linkSmall' href="/cars/bmw-m5">
                                Ремонт BMW M5
                            </Link>
                            <Link className='linkSmall' href="/cars/bmw-x6">
                                Ремонт BMW X6
                            </Link>
                            <Link className='linkSmall' href="/cars/bmw-z4">
                                Ремонт BMW Z4
                            </Link>
                        </div>
                        <div className="linksCol">
                            <Link className='linkTitle' href='/services'>УСЛУГИ YANIS GREK</Link>
                            <Link className='linkSmall' href="/services/zamena-masla-dvs">
                                Замена масла ДВС
                            </Link>
                            <Link className='linkSmall' href="/services/kompyuternaya-diagnostika">
                                Компьютерная диагностика
                            </Link>
                            <Link className='linkSmall' href="/services/zamena-perednih-tormoznyh-diskov">
                                Замена передних тормозных дисков
                            </Link>
                            <Link className='linkSmall' href="/services/diagnostika-akpp">
                                Диагностика АКПП
                            </Link>
                            <Link className='linkSmall' href="/services/zamena-salonnogo-filtra">
                                Замена салонного фильтра
                            </Link>
                        </div>
                    </div>
                    <div className="buttons">
                        <Link href="/" className='calcButton'>Рассчитать стоимость</Link>
                        <Link href="/" className='formButton'>Оставить заявку</Link>
                    </div>
                    <img src="/logo.svg" alt="logo" className='logo'/>
                </div>
            </div>
            <div className="content">
                <img
                    src="/burger.svg"
                    className="burger"
                    onClick={() => setMenuOpened(true)}
                    alt="burger"
                />
                <img src="/logo.svg" className="logo" alt="logo" />
                <img
                    src="/burger.svg"
                    style={{ opacity: 0, userSelect: 'none' }}
                    alt="burger"
                />
            </div>
        </div>
    );
}
