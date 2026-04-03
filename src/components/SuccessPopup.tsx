import { useEffect } from 'react';
import { X } from 'lucide-react';

interface SuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessPopup({ isOpen, onClose }: SuccessPopupProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="success-overlay" onClick={onClose}>
      <div className="success-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Закрыть">
          <X size={24} />
        </button>
        <div className="success-icon">✓</div>
        <h2 className="success-title">Заявка отправлена!</h2>
        <p className="success-message">Скоро мы свяжемся с вами</p>
      </div>

      <style>{`
        .success-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .success-popup {
          position: relative;
          background: white;
          padding: 48px 40px;
          border-radius: 0;
          max-width: 500px;
          width: 90%;
          text-align: center;
          animation: slideUp 0.3s ease;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .close-button {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s;
          border-radius: 4px;
        }

        .close-button:hover {
          background: #f5f5f5;
          color: #262626;
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: #4CAF50;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: bold;
          margin: 0 auto 24px;
          animation: scaleIn 0.5s ease 0.2s both;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        .success-title {
          font-family: 'Russo One', sans-serif;
          font-size: 28px;
          color: #262626;
          margin: 0 0 16px 0;
          text-transform: uppercase;
        }

        .success-message {
          font-size: 18px;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .success-popup {
            padding: 40px 30px;
          }

          .close-button {
            top: 12px;
            right: 12px;
          }

          .success-icon {
            width: 70px;
            height: 70px;
            font-size: 40px;
            margin-bottom: 20px;
          }

          .success-title {
            font-size: 24px;
            margin-bottom: 12px;
          }

          .success-message {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .success-popup {
            padding: 32px 24px;
            width: 85%;
          }

          .close-button {
            top: 8px;
            right: 8px;
          }

          .success-icon {
            width: 60px;
            height: 60px;
            font-size: 36px;
            margin-bottom: 16px;
          }

          .success-title {
            font-size: 20px;
            margin-bottom: 10px;
          }

          .success-message {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
