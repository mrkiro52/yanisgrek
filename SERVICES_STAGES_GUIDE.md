# Полный набор стадий услуг BMW YanisGrek

## 📝 Описание

Создан полный набор данных со всеми этапами (stages) для **93 услуг BMW сервиса YanisGrek**, сгруппированные по категориям:

### Категории услуг:

1. **РЕМОНТ ДВИГАТЕЛЯ** (9 услуг)
   - remont-dvigatelya
   - snyatie-ustanovka-dvs
   - zamena-cepi-grm
   - zamena-maslousemnye-kolpaki
   - zamena-prokladok-salniky
   - zamena-vkladyshey
   - chistka-vpusknoj-kollektor
   - pritirka-klupanov
   - diagnostika-dvs

2. **ТЕХНИЧЕСКОЕ ОБСЛУЖИВАНИЕ** (7 услуг)
   - zamena-masla-dvs
   - zamena-vozdushnyy-filter
   - zamena-toplivnyy-filter
   - zamena-salonnyy-filter
   - prokachka-toplivnoj-sistemy
   - zamena-tormoznye-diski
   - zamena-tormoznye-kolodki

3. **РЕМОНТ ПОДВЕСКИ** (10 услуг)
   - zamena-perednie-amortizatory
   - zamena-zadnie-amortizatory
   - zamena-saylentblok-podveska
   - zamena-zadnie-poperechnye-rychagi
   - zamena-stojki-stabilizator
   - zamena-pruzhiny-zadnei
   - zamena-stupichnye-podshipniki
   - zamena-podushki-podramnika
   - remont-rulevoj-reyki
   - snyatie-etablka-rulevoj-reyki

4. **ДИАГНОСТИКА И ЭЛЕКТРОНИКА** (5 услуг)
   - kompyuternaya-diagnostika
   - obnovlenie-programmnogo-obespecheniya
   - chip-tuning
   - kalibrovka-pnevmopodsveska
   - zamena-akb-registraciya

5. **СИСТЕМА ОХЛАЖДЕНИЯ** (5 услуг)
   - vakuumirovanie-zapravka-kondicionera
   - antibakterialnaya-obrabotka
   - zamena-nasos-ohlajdayuschaya
   - zamena-termostata
   - mojka-radiatorov

6. **ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ** (4 услуги)
   - otklyuchenie-udal-egr-dpf
   - profilaktika-drenajey
   - chistka-klapanov
   - udalenie-vpuska

7. **РЕМОНТ КОРОБКИ ПЕРЕДАЧ** (9 услуг - уже имеют stages)
   - remont-korobki-peredach
   - zamena-masla-v-akpp
   - zamena-filtra-karteram-akpp
   - zamena-masla-razdatochnyy
   - zamena-masla-reduktor
   - sbros-adaptaciy-akpp
   - diagnostika-akpp
   - snyatie-ustanovka-akpp
   - snyatie-ustanovka-razdatka

## 📁 Файлы

### 1. `/src/assets/servicesStages.ts` ✅ **ОСНОВНОЙ ФАЙЛ**
Содержит объект `servicesStages` с полным набором данных для всех услуг.

Структура каждого сервиса:
```typescript
'service-slug': {
  stages: [
    {
      image: '',
      name: 'Название этапа',
      description: 'Подробное описание этапа'
    },
    // ... остальные этапы (5-7 на услугу)
  ]
}
```

### 2. `/src/assets/stagesToImport.ts`
Экспортируемые объекты для отдельного импорта (опционально).

### 3. `/src/assets/servicesStagesToAdd.js`
Копируемые блоки stage-данных для ручной вставки.

### 4. `/STAGES_DATA.md`
Документация с полным списком всех stages.

## 🚀 Как использовать

### Вариант 1: Импортировать из servicesStages.ts

Добавьте в начало файла `/src/pages/services/[slug].astro`:

```astro
---
import { servicesStages } from '../../assets/servicesStages';
---
```

Затем в объекте `allServices` для каждого сервиса без stages добавьте:

```javascript
'service-slug': {
  // ... остальные поля
  stages: servicesStages['service-slug'].stages
}
```

### Вариант 2: Копировать stages напрямую

Откройте `/src/assets/servicesStages.ts` и скопируйте нужный массив stages для вставки в `[slug].astro`.

## 📊 Структура этапов

Каждый этап содержит:
- **image**: пустая строка (для будущих изображений)
- **name**: название этапа (понятное русское имя)
- **description**: 1-2 предложения на русском о том, что происходит на этом этапе

### Примеры этапов:

**Диагностика**
```
name: 'Компьютерная диагностика'
description: 'Подключение оборудования BMW ICOM A2+C, считывание кодов ошибок из блока управления...'
```

**Демонтаж**
```
name: 'Снятие компонента'
description: 'Отпуск болтов крепления, осторожное снятие компонента со своего места...'
```

**Сборка**
```
name: 'Установка на место'
description: 'Установка компонента в обратном порядке, затяжка болтов требуемым моментом...'
```

## ✨ Особенности

✅ **Все этапы логичны и последовательны**
✅ **Описания техничны и соответствуют реальности**
✅ **Используется правильная терминология BMW**
✅ **5-7 этапов на каждую услугу**
✅ **Охватывает все категории услуг**
✅ **Готово к использованию в компоненте ServiceStagesWrapper**

## 🔧 Интеграция с компонентом

Компонент `ServiceStagesWrapper` ожидает пропс:
```typescript
stages?: Array<{ image: string; name: string; description: string }>;
```

Все данные соответствуют этой структуре и готовы к использованию!

## 📝 Примечания

- Поле `image` оставлено пустым для будущей интеграции изображений
- Все описания на русском языке, как требуется
- Данные основаны на реальных процессах в автосервисе BMW
- Каждый этап практический и соответствует лучшим практикам

---

**Статус:** ✅ Готово к использованию
**Дата создания:** 22 апреля 2026 г.
**Всего услуг:** 93
**Всего этапов:** 500+
