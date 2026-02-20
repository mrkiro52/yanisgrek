'use client';

import React from 'react';

export default function ScrollToFormButton() {
  const handleClick = () => {
    const formEl = document.getElementById('Form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <button 
      className="SeriesPage__problems-button"
      onClick={handleClick}
      style={{
        background: '#2b6eff',
        borderRadius: '0px',
        fontFamily: 'Helvetica, sans-serif'
      }}
    >
      Оставить заявку на ТО или ремонт
    </button>
  );
}
