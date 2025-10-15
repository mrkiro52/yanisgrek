'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Header.scss';

export default function Header() {
    const [menuOpened, setMenuOpened] = useState(false);
    const pathname = usePathname();

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

    const handleLinkClick = (href) => {
        // Если путь ссылки совпадает с текущим путем - закрываем меню
        if (pathname === href) {
            setMenuOpened(false);
        }
    };

    return (
        <div className="Header">
            <div className={menuOpened ? "menu opened" : "menu closed"}>
                <div className="content">
                    <img src="/cross.svg" alt="cross" className="cross" onClick={() => setMenuOpened(false)}/>
                    <div className="links">
                        <div className="linksCol">
                            <Link className='linkTitle' href='/' onClick={() => handleLinkClick('/')}>ГЛАВНАЯ</Link>
                            <Link className='linkSmall' href="/about" onClick={() => handleLinkClick('/about')}>
                                О нас
                            </Link>
                            <Link className='linkSmall' href="/contacts" onClick={() => handleLinkClick('/contacts')}>
                                Контакты
                            </Link>
                        </div>
                        <div className="linksCol">
                            <Link className='linkTitle' href='/services' onClick={() => handleLinkClick('/services')}>УСЛУГИ YANIS GREK</Link>
                            <Link className='linkSmall' href="/services" onClick={() => handleLinkClick('/services')}>
                                Все услуги
                            </Link>
                            <Link className='linkSmall' href="/remontAkpp" onClick={() => handleLinkClick('/remontAkpp')}>
                                Ремонт АКПП
                            </Link>
                            <Link className='linkSmall' href="/remontMkpp" onClick={() => handleLinkClick('/remontMkpp')}>
                                Ремонт МКПП
                            </Link>
                            <Link className='linkSmall' href="/remontDvs" onClick={() => handleLinkClick('/remontDvs')}>
                                Ремонт ДВС
                            </Link>
                        </div>
                    </div>
                    <div className="buttons">
                        <a href="tel:74957676500" target="_blank" className='phone_link'>+7 495 76 76 500</a>
                        <span><a href="https://maps.app.goo.gl/TH4XvY6H5MPaXN8w6" target='_blank'>Москва, Высоковольтный проезд, 1, стр. 29</a></span>
                        <span>Пн-Пт: 10:00-20:00</span>
                        <span>Сб: 11:00-20:00</span>
                        <span>Вс: 11:00-18:00</span>
                        <Link href="/contacts" className='calcButton' onClick={() => handleLinkClick('/contacts')}>Оставить заявку</Link>
                    </div>
                    <Link href="/"><img src="/logo.svg" alt="logo" className='logo'/></Link>
                </div>
            </div>
            <div className="content">
                <img
                    src="/burger.svg"
                    className="burger"
                    onClick={() => setMenuOpened(true)}
                    alt="burger"
                />
                <Link href="/" className="logo"><img src="/logo.svg" alt="logo" /></Link>
                <div className="info_col">
                    <span>Пн-Пт: 10:00-20:00</span>
                    <span>Сб: 11:00-20:00 Вс: 11:00-18:00</span>
                </div>
                <div className="info_col">
                    <span><a href="https://maps.app.goo.gl/kGVW3gsNcMsAKSQF7" target='_blank'>Москва</a></span>
                    <span><a href="https://maps.app.goo.gl/kGVW3gsNcMsAKSQF7" target='_blank'>Высоковольтный проезд, 1, стр. 29</a></span>
                </div>
                <a href="tel:+74957676500" target="_blank" className='phone'>+7 495 76 76 500</a>
                <a href="tel:+74957676500" target="_blank" className='phoneIcon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 1024 1024"><title>Phone-filled SVG Icon</title><path fill="currentColor" d="M885.6 230.2L779.1 123.8a80.83 80.83 0 0 0-57.3-23.8c-21.7 0-42.1 8.5-57.4 23.8L549.8 238.4a80.83 80.83 0 0 0-23.8 57.3c0 21.7 8.5 42.1 23.8 57.4l83.8 83.8A393.82 393.82 0 0 1 553.1 553A395.34 395.34 0 0 1 437 633.8L353.2 550a80.83 80.83 0 0 0-57.3-23.8c-21.7 0-42.1 8.5-57.4 23.8L123.8 664.5a80.89 80.89 0 0 0-23.8 57.4c0 21.7 8.5 42.1 23.8 57.4l106.3 106.3c24.4 24.5 58.1 38.4 92.7 38.4c7.3 0 14.3-.6 21.2-1.8c134.8-22.2 268.5-93.9 376.4-201.7C828.2 612.8 899.8 479.2 922.3 344c6.8-41.3-6.9-83.8-36.7-113.8"/></svg>
                </a>
            </div>
        </div>
    );
}