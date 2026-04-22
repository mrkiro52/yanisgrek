import React from 'react';

interface Stage {
  image: string;
  name: string;
  description: string;
}

interface ServiceStagesProps {
  stages?: Stage[];
}

export default function ServiceStages({ stages }: ServiceStagesProps) {
  if (!stages || stages.length === 0) {
    return null;
  }

  return (
    <section className="service-stages">
      <div className="stages-container">
        <h2>Этапы выполнения работ</h2>
        <div className="stages-grid">
          {stages.map((stage, index) => (
            <div key={index} className="stage-card">
              <div className="stage-number">{index + 1}</div>
              {stage.image && (
                <div
                  className="stage-image"
                  style={{
                    backgroundImage: `url('${stage.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
              )}
              <div className="stage-content">
                <h3>{stage.name}</h3>
                <p>{stage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
