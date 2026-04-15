import { useState } from 'react';

interface PhonePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PhonePopup({ isOpen, onClose }: PhonePopupProps) {
  const phoneNumber = '+7 495 76 76 500';

  if (!isOpen) return null;

  return (
    <>
      <div className="phone-popup-overlay" onClick={onClose}></div>
      <div className="phone-popup">
        <button className="phone-popup-close" onClick={onClose}>
          ✕
        </button>
        <div className="phone-popup-content">
          <h3 className="phone-popup-title">Наш телефон</h3>
          <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} className="phone-popup-number">
            {phoneNumber}
          </a>
          <p className="phone-popup-hint">Кликните на номер для звонка или скопируйте его</p>
          <button 
            className="phone-popup-copy"
            onClick={() => {
              navigator.clipboard.writeText(phoneNumber.replace(/\s/g, ''));
              alert('Номер скопирован!');
            }}
          >
            Скопировать номер
          </button>
        </div>
      </div>

      <style>{`
        .phone-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .phone-popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 12px;
          padding: 40px;
          max-width: 400px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translate(-50%, -40%);
            opacity: 0;
          }
          to {
            transform: translate(-50%, -50%);
            opacity: 1;
          }
        }

        .phone-popup-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          color: #999;
          cursor: pointer;
          transition: color 0.3s;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .phone-popup-close:hover {
          color: #262626;
        }

        .phone-popup-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: center;
        }

        .phone-popup-title {
          font-size: 24px;
          font-weight: 600;
          color: #262626;
          margin: 0;
          font-family: 'Helvetica', sans-serif;
        }

        .phone-popup-number {
          font-size: 28px;
          font-weight: 700;
          color: #2b6eff;
          text-decoration: none;
          transition: color 0.3s;
          font-family: 'Courier New', monospace;
        }

        .phone-popup-number:hover {
          color: #1e4fbf;
        }

        .phone-popup-hint {
          font-size: 14px;
          color: #999;
          margin: 0;
          line-height: 1.5;
        }

        .phone-popup-copy {
          padding: 12px 24px;
          background: #2b6eff;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Helvetica', sans-serif;
        }

        .phone-popup-copy:hover {
          background: #1e4fbf;
          transform: translateY(-2px);
        }

        .phone-popup-copy:active {
          transform: translateY(0);
        }

        @media (max-width: 480px) {
          .phone-popup {
            padding: 30px 24px;
          }

          .phone-popup-title {
            font-size: 20px;
          }

          .phone-popup-number {
            font-size: 24px;
          }

          .phone-popup-hint {
            font-size: 13px;
          }

          .phone-popup-copy {
            font-size: 14px;
            padding: 10px 20px;
          }
        }
      `}</style>
    </>
  );
}
