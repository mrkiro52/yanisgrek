'use client'
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './EngineSelector.scss';

const EngineSelector = ({
  categories,
  firstColumnHeader = 'Название',
  secondColumnHeader = 'Модели',
  type = '',
  propActiveIndex
}) => {
  const LOCAL_STORAGE_KEY = `EngineSelector_${type}_activeTab`;

  const [activeIndex, setActiveIndex] = useState(propActiveIndex);

  useEffect(() => {
    const savedIndex = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedIndex !== null) {
      setActiveIndex(Number(savedIndex));
    }
  }, []);

  const handleTabClick = (index) => {
    setActiveIndex(index);
    localStorage.setItem(LOCAL_STORAGE_KEY, index);
  };

  const activeCategory = categories[activeIndex];

  return (
    <div className="EngineSelector" id='EngineSelector'>
      {type === 'remontAkpp' && <h2>Выберите тип коробки переключения передач</h2>}
      {type === 'remontDvs' && <h2>Выберите тип вашего двигателя</h2>}
      <div className="engine-selector">
        <div className="tabs">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              className={idx === activeIndex ? 'tab active' : 'tab'}
              onClick={() => handleTabClick(idx)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>{firstColumnHeader}</th>
              <th>{secondColumnHeader}</th>
            </tr>
          </thead>
          <tbody>
            {activeCategory.items.map((item, idx) => (
              <tr key={idx}>
                <td>
                  <Link href={`/${type}/${item.path}`} style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                    {item.name}
                    <span>{'>'}</span>
                  </Link>
                </td>
                <td>{item.models}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="hint">* Нажмите на название для перехода на соответствующую страницу</p>
        {activeCategory.note && (
          <a href="https://wa.me/74957676500" target="_blank">
            <p className="note">{activeCategory.note}</p>
          </a>
        )}
      </div>
    </div>
  );
};

EngineSelector.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          models: PropTypes.string.isRequired,
        })
      ).isRequired,
      note: PropTypes.string,
    })
  ).isRequired,
  firstColumnHeader: PropTypes.string,
  secondColumnHeader: PropTypes.string,
};

export default EngineSelector;
