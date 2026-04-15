export default function AboutHero() {
  const openQuickRequest = () => {
    window.dispatchEvent(new CustomEvent('openQuickRequest'));
  };

  return (
    <div className="about-hero">
      <div className="about-hero__content">
        <h1 className="about-hero__title">О нас — автосервис в Москве с человеческим подходом</h1>
        <p className="about-hero__subtitle">Мы — не просто техцентр в Москве, как их привыкли видеть.</p>
        <button className="about-hero__button" onClick={openQuickRequest}>
          Записаться
        </button>
      </div>
    </div>
  );
}
