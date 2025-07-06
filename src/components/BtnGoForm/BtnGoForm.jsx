'use client';

export default function BtnGoForm() {
  const scrollToForm= () => {
    if (typeof window !== 'undefined') {
      const target = document.getElementById('Form');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <button className="send_request" onClick={scrollToForm}>
      Оставить заявку
    </button>
  );
}
