import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { sendToTelegram } from '../utils/telegram';
import SuccessPopup from './SuccessPopup';

interface QuickRequestPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickRequestPopup({ isOpen, onClose }: QuickRequestPopupProps) {
  const [phone, setPhone] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d+]/g, '');
    
    if (value.startsWith('+')) {
      if (value.length > 12) value = value.slice(0, 12);
    } else {
      if (value.length > 11) value = value.slice(0, 11);
    }
    
    setPhone(value);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Валидация номера телефона
    if (!phone) {
      setError('Введите номер телефона');
      return;
    }

    const phoneLength = phone.startsWith('+') ? 12 : 11;
    if (phone.length !== phoneLength) {
      setError('Неверный формат телефона');
      return;
    }

    setIsLoading(true);

    try {
      const success = await sendToTelegram({
        type: 'quick-request',
        data: {
          phone: phone
        },
        url: window.location.href
      });

      if (success) {
        setShowSuccessPopup(true);
        handleClose();
      } else {
        setError('Ошибка при отправке. Попробуйте позже.');
      }
    } catch (err) {
      setError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setPhone('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="quick-request-overlay" onClick={handleClose}>
        <div className="quick-request-modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={handleClose} aria-label="Закрыть">
            <X size={24} />
          </button>
          
          <h3 className="modal-title">Оставить заявку</h3>
          <p className="modal-subtitle">Введите ваш номер телефона и мы вам перезвоним</p>
          
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="form-group">
              <input
                id="quick-request-phone"
                name="phone"
                type="tel"
                placeholder="+7 XXX XXX XX XX"
                value={phone}
                onChange={handlePhoneChange}
                autoComplete="tel"
                className={`form-input ${error ? 'error' : ''}`}
                disabled={isLoading}
              />
              {error && <span className="form-error">{error}</span>}
            </div>
            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? 'Отправка...' : 'Отправить'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .quick-request-overlay {
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

        .quick-request-modal {
          position: relative;
          background: white;
          padding: 48px 40px;
          border-radius: 0;
          max-width: 420px;
          width: 90%;
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

        .modal-close {
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

        .modal-close:hover {
          background: #f5f5f5;
          color: #262626;
        }

        .modal-title {
          font-family: 'Russo One', sans-serif;
          font-size: 24px;
          color: #262626;
          margin: 0 0 8px 0;
          text-transform: uppercase;
        }

        .modal-subtitle {
          font-size: 14px;
          color: #999;
          margin: 0 0 32px 0;
          line-height: 1.5;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-input {
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 16px;
          font-family: inherit;
          transition: all 0.3s;
          color: #262626;
        }

        .form-input:focus {
          outline: none;
          border-color: #000;
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
        }

        .form-input.error {
          border-color: #e53935;
          background-color: rgba(229, 57, 53, 0.05);
        }

        .form-input:disabled {
          background-color: #f5f5f5;
          color: #999;
          cursor: not-allowed;
        }

        .form-error {
          font-size: 13px;
          color: #e53935;
          margin: -4px 0 0 0;
        }

        .btn-submit {
          padding: 14px 24px;
          background-color: #000;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-family: inherit;
          margin-top: 8px;
        }

        .btn-submit:hover:not(:disabled) {
          background-color: #262626;
        }

        .btn-submit:active:not(:disabled) {
          transform: scale(0.98);
        }

        .btn-submit:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .quick-request-modal {
            padding: 40px 30px;
            max-width: 90%;
          }

          .modal-close {
            top: 12px;
            right: 12px;
          }

          .modal-title {
            font-size: 20px;
          }

          .modal-subtitle {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .quick-request-modal {
            padding: 32px 24px;
            width: 90%;
          }

          .modal-close {
            top: 8px;
            right: 8px;
          }

          .modal-title {
            font-size: 18px;
            margin-bottom: 6px;
          }

          .modal-subtitle {
            font-size: 12px;
            margin-bottom: 24px;
          }

          .form-input {
            font-size: 16px;
          }

          .btn-submit {
            padding: 12px 20px;
            font-size: 14px;
          }
        }
      `}</style>

      <SuccessPopup isOpen={showSuccessPopup} onClose={() => setShowSuccessPopup(false)} />
    </>
  );
}
