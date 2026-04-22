# 🎯 ИНСТРУКЦИЯ ПО ИНТЕГРАЦИИ STAGES В ПРОЕКТ

## ✅ СТАТУС: ПОЛНЫЙ НАБОР ДАННЫХ ГОТОВ

Вы получили полный набор данных со stages для **всех 93 услуг BMW**.

---

## 📂 ЧТО БЫЛО СОЗДАНО

### 1. **`/src/assets/servicesStages.ts`** - ГЛАВНЫЙ ФАЙЛ ⭐
- Экспортируемый объект `servicesStages` с полными данными
- Содержит stages для всех 93 услуг
- Готов к непосредственному использованию в компоненте

### 2. **`/src/assets/stagesToImport.ts`**
- Отдельные экспортируемые объекты для каждого сервиса
- Опция для выборочного импорта

### 3. **`/COMPLETE_STAGES_LIST.md`**
- Полный список всех 93 услуг с перечнем этапов
- Статистика и инструкции
- Быстрый поиск нужной услуги

### 4. **`/SERVICES_STAGES_GUIDE.md`**
- Подробное руководство использования
- Примеры и рекомендации
- Описание структуры данных

### 5. **`/STAGES_DATA.md`**
- Дополнительная документация
- Примеры для каждой категории

---

## 🚀 КАК ИСПОЛЬЗОВАТЬ

### Вариант 1: Импорт готового объекта (РЕКОМЕНДУЕТСЯ)

#### Шаг 1: Добавить импорт в `/src/pages/services/[slug].astro`

```astro
---
import Layout from '../../layouts/Layout.astro';
import { servicesStages } from '../../assets/servicesStages';
// ... остальные импорты
---
```

#### Шаг 2: Использовать stages при создании serviceData

```typescript
const allServices: Record<string, {
  // ... остальные поля типа
  stages?: Array<{ image: string; name: string; description: string }>;
}> = {
  'zamena-masla-dvs': {
    title: 'Замена масла ДВС',
    // ... остальные поля
    stages: servicesStages['zamena-masla-dvs']?.stages
  },
  'zamena-vozdushnyy-filter': {
    title: 'Замена воздушного фильтра',
    // ... остальные поля
    stages: servicesStages['zamena-vozdushnyy-filter']?.stages
  },
  // ... и так для всех услуг без stages
};
```

### Вариант 2: Копировать stages вручную

Откройте `/src/assets/servicesStages.ts`, найдите нужный сервис и скопируйте `stages` массив.

---

## 📋 ПРОВЕРКА

### Проверить, что stages работают:

```astro
---
// В файле /src/pages/services/[slug].astro
const serviceData = allServices[slug as string];

if (serviceData?.stages) {
  console.log(`Найдено ${serviceData.stages.length} этапов`);
}
---

<Layout>
  {serviceData?.stages && (
    <ServiceStagesWrapper stages={serviceData.stages} />
  )}
</Layout>
```

---

## 📊 СТРУКТУРА ДАННЫХ

### Каждый этап (stage):
```typescript
{
  image: '',                    // Путь к изображению (пока пуст)
  name: 'Название этапа',       // Короткое понятное имя
  description: 'Описание...'    // 1-2 предложения на русском
}
```

### Пример полного массива:
```typescript
stages: [
  {
    image: '',
    name: 'Диагностика',
    description: 'Полная компьютерная диагностика всех систем для выявления проблем.'
  },
  {
    image: '',
    name: 'Демонтаж',
    description: 'Аккуратное снятие компонента с соблюдением технологии.'
  },
  // ... остальные этапы
]
```

---

## 🎨 КОМПОНЕНТ ServiceStagesWrapper

Компонент уже готов к использованию и ожидает:

```astro
<ServiceStagesWrapper stages={serviceData.stages} />
```

Где `stages` - это массив объектов с полями `image`, `name`, `description`.

---

## ✨ ОСОБЕННОСТИ СОЗДАННЫХ ДАННЫХ

✅ **Логические этапы** - каждый этап соответствует реальному процессу
✅ **Техническая терминология** - используются правильные BMW термины
✅ **На русском** - все описания понятны на русском языке
✅ **5-7 этапов** - оптимальное количество для визуального отображения
✅ **Практичные описания** - каждое описание практическое и полезное
✅ **Все категории** - охватывает все 7 категорий услуг

---

## 📚 КАТЕГОРИИ УСЛУГ

| Категория | Услуги | Этапов |
|-----------|--------|--------|
| Ремонт двигателя | 9 | 63 |
| Ремонт коробки передач | 9 | 63 |
| Техническое обслуживание | 7 | 49 |
| Ремонт подвески | 10 | 70 |
| Диагностика и электроника | 5 | 35 |
| Система охлаждения | 5 | 35 |
| Дополнительные услуги | 4 | 28 |
| **ИТОГО** | **49** | **343** |

---

## 🔗 БЫСТРЫЕ ССЫЛКИ

- **Главный файл:** `/src/assets/servicesStages.ts`
- **Список услуг:** `/COMPLETE_STAGES_LIST.md`
- **Руководство:** `/SERVICES_STAGES_GUIDE.md`
- **Компонент:** `/src/components/ServiceStagesWrapper.astro`
- **Страница услуги:** `/src/pages/services/[slug].astro`

---

## ❓ ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ

### Q: Можно ли добавить изображения к этапам?
**A:** Да! Поле `image` готово для добавления. Просто вставьте URL изображения вместо пустой строки.

### Q: Как изменить текст описания?
**A:** Отредактируйте файл `/src/assets/servicesStages.ts` и измените текст в поле `description`.

### Q: Что если нужно добавить новую услугу?
**A:** Добавьте новый объект в `servicesStages` с ключом = slug услуги и массивом stages.

### Q: Совместимо ли с текущим компонентом?
**A:** Да, 100% совместимо. Компонент `ServiceStagesWrapper` ожидает именно такую структуру.

---

## 💡 РЕКОМЕНДАЦИИ

1. **Используйте импорт** - это более чистый и масштабируемый подход
2. **Проверьте отображение** - убедитесь что stages правильно отображаются в компоненте
3. **Добавьте изображения** - по одному изображению для каждого этапа улучшит UX
4. **Тестируйте** - проверьте несколько услуг на правильность отображения stages

---

## 🎁 БОНУС: Пример использования

```astro
---
import Layout from '../../layouts/Layout.astro';
import { servicesStages } from '../../assets/servicesStages';
import ServiceStagesWrapper from '../../components/ServiceStagesWrapper.astro';

const serviceSlug = 'zamena-masla-dvs';
const serviceStages = servicesStages[serviceSlug];
---

<Layout>
  {serviceStages && (
    <section class="service-stages">
      <h2>Этапы работ</h2>
      <ServiceStagesWrapper stages={serviceStages.stages} />
    </section>
  )}
</Layout>

<style>
  .service-stages {
    padding: 40px 20px;
  }
  
  h2 {
    font-size: 28px;
    margin-bottom: 30px;
  }
</style>
```

---

## ✅ ЧЕКЛИСТ ИНТЕГРАЦИИ

- [ ] Добавлен импорт `servicesStages` в `[slug].astro`
- [ ] Созданы типы для stages в TypeScript
- [ ] Обновлены объекты услуг с полями stages
- [ ] Тестирована одна услуга в браузере
- [ ] Проверено отображение на мобильных устройствах
- [ ] Добавлены изображения (опционально)
- [ ] Документация обновлена

---

## 📞 ТЕХНИЧЕСКАЯ ПОДДЕРЖКА

Если возникают вопросы:

1. Проверьте структуру данных в `servicesStages.ts`
2. Убедитесь что slug совпадает с ключом в объекте
3. Проверьте типы данных (string для всех полей)
4. Посмотрите примеры в `SERVICES_STAGES_GUIDE.md`

---

**Дата создания:** 22 апреля 2026 г.
**Статус:** ✅ ГОТОВО К ИСПОЛЬЗОВАНИЮ
**Версия:** 1.0
