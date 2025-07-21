'use client'
// src/components/EngineSelector/EngineSelector.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './EngineSelector.scss'; // импорт стилей (создайте файл и настройте по дизайну)

/**
 * EngineSelector — табы с категориями и таблица подкатегорий.
 *
 * Props:
 * - categories: [
 *     {
 *       title: string,            // заголовок таба
 *       items: [                  // список элементов для таблицы
 *         { name: string, models: string }
 *       ],
 *       note?: string,            // необязательная сноска под таблицей
 *     }
 *   ]
 * - firstColumnHeader: string = 'Название'
 * - secondColumnHeader: string = 'Модели'
 */
const EngineSelector = ({
  categories,
  firstColumnHeader = 'Название',
  secondColumnHeader = 'Модели',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeCategory = categories[activeIndex];

  return (
    <div className="EngineSelector">
        <h2>Выберите тип коробки переключения передач </h2>
        <div className="engine-selector">
            <div className="tabs">
                {categories.map((cat, idx) => (
                <button
                    key={idx}
                    className={idx === activeIndex ? 'tab active' : 'tab'}
                    onClick={() => setActiveIndex(idx)}
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
                    <td>{item.name}</td>
                    <td>{item.models}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <p className='hint'>* Нажмите на название для перехода на соответствующую страницу</p>
            <a href="https://wa.me/79852707575" target="_blank"><p className="note">{activeCategory.note}</p></a>
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
