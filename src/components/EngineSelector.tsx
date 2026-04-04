import React, { useState } from 'react';
import { engines, engineTypes, getEnginesByType } from '../assets/engineData';
import type { EngineModel } from '../assets/engineData';

type EngineType = 'benzine' | 'diesel' | 'hybrid';

export default function EngineSelector() {
  const [selectedType, setSelectedType] = useState<EngineType>('benzine');
  const selectedEngines = getEnginesByType(selectedType);

  const types: EngineType[] = ['benzine', 'diesel', 'hybrid'];

  return (
    <div className="engine-selector">
      <div className="container">
        <h2 className="section-title">Выберите тип двигателя</h2>

        <div className="type-selector">
          {types.map((type) => (
            <button
              key={type}
              className={`type-button ${selectedType === type ? 'active' : ''}`}
              onClick={() => setSelectedType(type)}
            >
              <div className="type-name">{engineTypes[type].name}</div>
              <div className="type-desc">{engineTypes[type].description}</div>
            </button>
          ))}
        </div>

        <div className="engines-grid">
          {selectedEngines.map((engine) => (
            <a
              key={engine.id}
              href={`/services/remont-dvigatelya/${engine.id}`}
              className="engine-card"
            >
              <div className="card-header">
                <h3>{engine.name}</h3>
              </div>
              <div className="card-body">
                <p className="card-models">Данный двигатель стоит в: {engine.models}</p>
                <p className="card-description">{engine.description}</p>
              </div>
              <div className="card-footer">
                <span className="card-link">Подробнее →</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .engine-selector {
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
          grid-template-columns: repeat(3, 1fr);
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

        .engines-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .engine-card {
          display: flex;
          flex-direction: column;
          padding: 24px;
          background: rgb(208, 208, 208);
          text-decoration: none;
          color: inherit;
          transition: all 0.3s;
          cursor: pointer;
        }

        .engine-card:hover {
          background: black;
          color: white;
        }

        .card-header {
          margin-bottom: 12px;
        }

        .card-header h3 {
          font-size: 18px;
          font-weight: 700;
          color: #262626;
          margin: 0;
          font-family: 'Helvetica', sans-serif;
          transition: all 0.3s;
          line-height: 1.3;
        }

        .engine-card:hover .card-header h3 {
          color: white;
        }

        .card-body {
          flex-grow: 1;
          margin-bottom: 16px;
        }

        .card-models {
          font-size: 13px;
          font-weight: 600;
          color: #666;
          margin: 0 0 8px 0;
          line-height: 1.4;
          transition: all 0.3s;
        }

        .engine-card:hover .card-models {
          color: #ccc;
        }

        .card-description {
          font-size: 14px;
          color: #666;
          line-height: 1.5;
          margin: 0;
          transition: all 0.3s;
        }

        .engine-card:hover .card-description {
          color: #ccc;
        }

        .card-footer {
          border-top: 1px solid #e0e0e0;
          padding-top: 12px;
          transition: all 0.3s;
        }

        .engine-card:hover .card-footer {
          border-top-color: #ccc;
        }

        .card-link {
          font-size: 13px;
          font-weight: 600;
          color: #262626;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s;
        }

        .engine-card:hover .card-link {
          color: white;
          gap: 10px;
        }

        @media (max-width: 1280px) {
          .engine-selector {
            padding: 90px 40px;
          }

          .type-selector {
            grid-template-columns: repeat(4, 1fr);
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

          .engines-grid {
            gap: 20px;
          }
        }

        @media (max-width: 1024px) {
          .type-selector {
            grid-template-columns: repeat(3, 1fr);
          }

          .engines-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .section-title {
            font-size: 28px;
            margin-bottom: 48px;
          }
        }

        @media (max-width: 768px) {
          .engine-selector {
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

          .engines-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }

          .engine-card {
            padding: 20px;
          }

          .card-header h3 {
            font-size: 16px;
          }

          .card-models {
            font-size: 12px;
          }

          .card-description {
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .engine-selector {
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

          .engines-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .engine-card {
            padding: 16px;
          }

          .card-header h3 {
            font-size: 14px;
          }

          .card-models {
            font-size: 11px;
          }

          .card-description {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
