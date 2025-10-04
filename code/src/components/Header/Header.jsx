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
                        <a href="https://wa.me/79852707575" target="_blank" className='phone_link'>+7 985 270 75 75</a>
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
                <a href="https://wa.me/+79852707575" target="_blank" className='phone'>+7 985 270 75 75</a>
            </div>
        </div>
    );
}