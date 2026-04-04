import React, { useState } from 'react';
import { transmissions, transmissionTypes, getTransmissionsByType } from '../assets/transmissionData';
import type { TransmissionModel } from '../assets/transmissionData';

type TransmissionType = 'mkpp' | 'akpp' | 'dct' | 'elektro';

export default function TransmissionSelector() {
  const [selectedType, setSelectedType] = useState<TransmissionType>('akpp');
  const selectedTransmissions = getTransmissionsByType(selectedType);

  const types: TransmissionType[] = ['mkpp', 'akpp', 'dct', 'elektro'];

  return (
    <div className="transmission-selector">
      <div className="container">
        <h2 className="section-title">Выберите тип коробки передач</h2>

        <div className="type-selector">
          {types.map((type) => (
            <button
              key={type}
              className={`type-button ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              <div className="type-name">{transmissionTypes[type].name}</div>
              <div className="type-desc">{transmissionTypes[type].description}</div>
            </button>
          ))}
        </div>

        <div className="transmissions-grid">
          {selectedTransmissions.map((transmission) => (
            <a
              key={transmission.id}
              href={`/services/remont-korobki-peredach/${transmission.id}`}
              className="transmission-card"
            >
              <div className="card-header">
                <h3>{transmission.name}</h3>
              </div>
              <div className="card-body">
                <p className="card-models">Данная коробка стоит в: {transmission.models}</p>
                <p className="card-description">{transmission.description}</p>
              </div>
              <div className="card-footer">
                <span className="card-link">Подробнее →</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .transmission-selector {
          padding: 80px 20px;
          background: #fff;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-title {
          font-family: 'Russo One', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #262626;
          text-align: center;
          margin-bottom: 60px;
          text-transform: uppercase;
        }

        .type-selector {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 80px;
        }

        .type-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 40px 24px;
          background: rgb(208, 208, 208);
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          font-family: 'Helvetica', sans-serif;
        }

        .type-button:hover {
          background: black;
          color: white;
        }

        .type-button.active {
          background: black;
          color: white;
        }

        .type-name {
          font-size: 22px;
          font-weight: 700;
          margin: 0;
          transition: all 0.3s;
        }

        .type-desc {
          font-size: 14px;
          color: #666;
          margin: 0;
          text-align: center;
          transition: all 0.3s;
        }

        .type-button:hover .type-desc,
        .type-button.active .type-desc {
          color: #ccc;
        }

        .transmissions-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .transmission-card {
          display: flex;
          flex-direction: column;
          padding: 32px;
          background: rgb(208, 208, 208);
          text-decoration: none;
          color: inherit;
          transition: all 0.3s;
          cursor: pointer;
        }

        .transmission-card:hover {
          background: black;
          color: white;
        }

        .card-header {
          margin-bottom: 16px;
        }

        .card-header h3 {
          font-size: 24px;
          font-weight: 700;
          color: #262626;
          margin: 0;
          font-family: 'Helvetica', sans-serif;
          transition: all 0.3s;
        }

        .transmission-card:hover .card-header h3 {
          color: white;
        }

        .card-body {
          flex-grow: 1;
          margin-bottom: 20px;
        }

        .card-models {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          margin: 0 0 12px 0;
          line-height: 1.5;
          transition: all 0.3s;
        }

        .transmission-card:hover .card-models {
          color: #ccc;
        }

        .card-description {
          font-size: 15px;
          color: #666;
          line-height: 1.6;
          margin: 0;
          transition: all 0.3s;
        }

        .transmission-card:hover .card-description {
          color: #ccc;
        }

        .card-footer {
          border-top: 1px solid #e0e0e0;
          padding-top: 16px;
          transition: all 0.3s;
        }

        .transmission-card:hover .card-footer {
          border-top-color: #ccc;
        }

        .card-link {
          font-size: 14px;
          font-weight: 600;
          color: #262626;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s;
        }

        .transmission-card:hover .card-link {
          color: white;
          gap: 12px;
        }

        @media (max-width: 1280px) {
          .transmission-selector {
            padding: 90px 40px;
          }

          .type-selector {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 80px;
          }

          .type-button {
            padding: 38px 28px;
          }

          .type-name {
            font-size: 22px;
          }

          .section-title {
            font-size: 32px;
            margin-bottom: 54px;
          }

          .transmissions-grid {
            gap: 20px;
          }
        }

        @media (max-width: 1024px) {
          .type-selector {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-title {
            font-size: 28px;
            margin-bottom: 48px;
          }

          .transmissions-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .transmission-selector {
            padding: 60px 20px;
          }

          .type-selector {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-bottom: 60px;
          }

          .type-button {
            padding: 32px 20px;
          }

          .type-name {
            font-size: 20px;
          }

          .type-desc {
            font-size: 13px;
          }

          .section-title {
            font-size: 24px;
            margin-bottom: 40px;
          }

          .transmission-card {
            padding: 24px;
          }

          .card-header h3 {
            font-size: 20px;
          }

          .card-models {
            font-size: 13px;
          }

          .card-description {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .transmission-selector {
            padding: 40px 16px;
          }

          .type-selector {
            gap: 12px;
            margin-bottom: 40px;
          }

          .type-button {
            padding: 24px 16px;
            gap: 10px;
          }

          .type-name {
            font-size: 18px;
          }

          .type-desc {
            font-size: 12px;
          }

          .section-title {
            font-size: 20px;
            margin-bottom: 32px;
          }

          .transmission-card {
            padding: 20px;
          }

          .card-header h3 {
            font-size: 18px;
          }

          .card-models {
            font-size: 12px;
          }

          .card-description {
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
}
