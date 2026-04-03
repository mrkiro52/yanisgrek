export default function AboutHero() {
  const scrollToForm = () => {
    const contactForm = document.querySelector('.ContactForm');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="about-hero">
      <div className="about-hero__content">
        <h1 className="about-hero__title">О нас — автосервис в Москве с человеческим подходом</h1>
        <p className="about-hero__subtitle">Мы — не просто техцентр в Москве, как их привыкли видеть.</p>
        <button className="about-hero__button" onClick={scrollToForm}>
          Записаться
        </button>
      </div>
    </div>
  );
}
