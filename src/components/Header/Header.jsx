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
                            <Link className='linkSmall' href="/cars/bmw-m5-f90">
                                BMW M5 F90
                            </Link>
                            <Link className='linkSmall' href="/cars/rolls-royce">
                                Rolls Royce
                            </Link>
                            <Link className='linkSmall' href="/cars/mini-cooper">
                                Mini Cooper
                            </Link>
                        </div>
                        <div className="linksCol">
                            <Link className='linkTitle' href='/services'>УСЛУГИ YANIS GREK</Link>
                            <Link className='linkSmall' href="/services/zamena-masla-dvs-filtra-maslyanogo">
                                Замена масла ДВС/ фильтра масляного
                            </Link>
                            <Link className='linkSmall' href="/services/zamena-vozdushnogo-filtra">
                                Замена воздушного фильтра
                            </Link>
                            <Link className='linkSmall' href="/services/zamena-toplivnogo-filtra">
                                Замена топливного фильтра
                            </Link>
                            <Link className='linkSmall' href="/services/zamena-salonnogo-filtra">
                                Замена салонного фильтра
                            </Link>
                            <Link className='linkSmall' href="/services/prokachka-toplivnoy-sistemy">
                                Прокачка топливной системы
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
