"use client";

import React, { useEffect } from "react";
import "./SuccessModal.scss";

export default function SuccessModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <button className="success-modal-close" onClick={onClose} aria-label="Закрыть">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="success-modal-icon">
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="38" stroke="#2b6eff" strokeWidth="4"/>
            <path d="M25 40L35 50L55 30" stroke="#2b6eff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h2 className="success-modal-title">Заявка успешно отправлена!</h2>
        <p className="success-modal-text">
          Мы получили вашу заявку и свяжемся с вами в ближайшее время.
        </p>
        <p className="success-modal-subtext">
          Наш специалист перезвонит вам в рабочее время с 10:00 до 20:00.
        </p>

        <button className="success-modal-button" onClick={onClose}>
          Отлично
        </button>
      </div>
    </div>
  );
}
