# 🚀 SEO и Производительность - Полная Оптимизация

## 📊 Текущие Проблемы и Решения

### ❌ Проблема 1: Запросы, блокирующие отрисовку страницы (900 мс)
**Решение:**
- ✅ Добавлены `preconnect` и `dns-prefetch` в layout.tsx
- ✅ Включена SWC минификация в next.config.ts
- ✅ Оптимизирован webpack для разделения кода (chunk splitting)
- ✅ Скрипты загружаются асинхронно (afterInteractive, lazyOnload)

**Что еще можно сделать:**
```bash
# 1. Проверить Network tab в DevTools - какие запросы блокируют?
# 2. Отложить загрузку неритичных скриптов:
<Script strategy="lazyOnload" src="..." />
```

---

### ❌ Проблема 2: Неэффективный период кеша (642 КиБ)
**Решение:**
- ✅ Добавлены Cache-Control заголовки (max-age=31536000)
- ✅ Включены immutable флаги для статичных файлов
- ✅ Настроены onDemandEntries для оптимизации памяти

**Что проверить:**
```bash
# Проверьте заголовки кеша в DevTools:
# Application tab → Storage → Cookies/Cache
# Должны быть Cache-Control: public, max-age=31536000, immutable
```

---

### ❌ Проблема 3: Улучшить загрузку изображений (2128 КиБ)
**Решение:**
- ✅ Уже реализована ленивая загрузка (LazyImage, LazyBackgroundImage)
- ✅ Поддержка AVIF и WebP форматов в next.config.ts
- ✅ Автоматическое создание оптимальных размеров

**Дополнительно:**
```bash
# 1. Конвертируйте JPG в WebP (сэкономите ~30-40%):
# Используйте: https://squoosh.app или ImageMagick

# 2. Используйте responsive images:
<LazyImage 
  src="/images/photo.jpg" 
  alt="Photo"
  sizes="(max-width: 768px) 100vw, 50vw"
/>

# 3. Установите правильные dimensions для избежания layout shift
```

---

### ❌ Проблема 5: Устаревший код JavaScript (40 КиБ)
**Решение:**
- ✅ Обновлен target в tsconfig.json до ES2020
- ✅ Добавлена конфигурация @babel/plugin-transform-runtime

**Проверка:**
```bash
npm install --save-dev @babel/plugin-transform-runtime
npm install @babel/runtime
```

---

### ❌ Проблема 6-7: Сократить время выполнения JS (3,3 сек / 4,6 сек)
**Решение:**
```typescript
// 1. Динамический импорт для больших компонентов:
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Загрузка...</p>,
  ssr: false, // Не рендериться на сервере
});

// 2. Разделение кода (code splitting):
// Уже настроено в next.config.ts webpack optimization

// 3. Отложить инициализацию тяжелых скриптов
```

**Проверка в DevTools:**
```
Performance tab → Recording → Анализируйте "Main Thread" блокировки
```

---

### ❌ Проблема 8: Удалить неиспользуемый JS (740 КиБ)
**Решение:**
1. **Проверить неиспользуемые зависимости:**
```bash
npm install -g depcheck
depcheck
```

2. **Удалить ненужные пакеты:**
```bash
# Проверьте, действительно ли используются:
# - prop-types (если используется React 16.3+)
# - lodash (если используются только 1-2 функции)
# - moment.js (замените на date-fns)

npm uninstall prop-types
```

3. **Tree-shaking для используемых пакетов:**
```javascript
// ❌ Неправильно (импортирует все):
import _ from 'lodash';

// ✅ Правильно (импортирует только нужные):
import { map, filter } from 'lodash-es';
```

---

### ❌ Проблема 9: Удалить неиспользуемый CSS (64 КиБ)
**Решение:**
```bash
# 1. Используйте PurgeCSS или Tailwind (они уже в проекте!)
# Они автоматически удаляют неиспользуемый CSS

# 2. Проверьте глобальные стили:
# src/styles/globals.css - удалите ненужные правила

# 3. Разберитесь с SCSS:
# - Удалите неиспользуемые миксины
# - Объедините похожие стили
# - Используйте CSS переменные вместо дубликатов
```

---

### ⏱️ Проблемы производительности

#### LCP 3.6 сек (Large Contentful Paint)
**Что это?** Время появления основного контента на странице

**Решение:**
```typescript
// 1. Приоритизируйте критичные изображения:
<Image 
  src="/images/hero.jpg" 
  priority // ✅ Загружается раньше других
  alt="Hero"
/>

// 2. Оптимизируйте критичный путь рендеринга (Critical Rendering Path):
// - Минимизируйте CSS в head
// - Отложите неритичные CSS/JS
// - Оптимизируйте шрифты
```

#### FCP 3.4 сек (First Contentful Paint)
**Что это?** Время когда видят первый контент

**Решение:**
```typescript
// 1. Используйте skeleton/loading screens:
export default function Page() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Content />
    </Suspense>
  );
}

// 2. Уменьшайте JavaScript до FCP
// 3. Оптимизируйте HTML размер
```

#### TTFB 1 сек (Time to First Byte)
**Что это?** Время получения первого байта от сервера

**Решение:**
```bash
# 1. Используйте CDN (CloudFlare, Vercel Edge)
# 2. Оптимизируйте backend:
#    - Кешируйте тяжелые запросы
#    - Используйте ISR (Incremental Static Regeneration)

# Пример ISR в Next.js:
export const revalidate = 3600; // Переvalidate каждый час
```

---

## 🎯 Быстрый Чек-Лист Оптимизации

- [ ] **CSS:**
  - [ ] Удален неиспользуемый CSS
  - [ ] Минимизирован CSS
  - [ ] Критичные CSS в head

- [ ] **JavaScript:**
  - [ ] Удален неиспользуемый JS
  - [ ] Включена минификация (SWC)
  - [ ] Используется code splitting
  - [ ] Динамический импорт для больших компонентов

- [ ] **Изображения:**
  - [ ] Используется Next.js Image
  - [ ] Ленивая загрузка (LazyImage)
  - [ ] WebP/AVIF форматы
  - [ ] Правильные размеры (no layout shift)

- [ ] **Шрифты:**
  - [ ] Используется font-display: swap
  - [ ] Загружаются локально или через CDN
  - [ ] Минимизирован набор символов

- [ ] **Скрипты:**
  - [ ] Аналитика загружается после
  - [ ] Блокирующие скрипты отложены
  - [ ] Используется async/defer

- [ ] **Кеширование:**
  - [ ] Cache-Control заголовки настроены
  - [ ] Static файлы с immutable флагом
  - [ ] ISR для динамического контента

---

## 📊 Ожидаемые результаты после оптимизации

| Метрика | Было | Ожидается |
|---------|------|-----------|
| Производительность (мобиль) | 52/100 | **70-80/100** |
| Производительность (ПК) | 66/100 | **80-90/100** |
| LCP | 3.6 сек | **< 2.5 сек** |
| FCP | 3.4 сек | **< 1.8 сек** |
| TTFB | 1 сек | **< 0.5 сек** |
| Разблокирующие ресурсы | 900 мс | **< 300 мс** |

---

## 🔧 Команды для проверки

```bash
# 1. Анализ бандла:
npm run build
npm install -g @next/bundle-analyzer
npm run analyze

# 2. Проверка неиспользуемых зависимостей:
npm install -g depcheck
depcheck

# 3. Локальное тестирование:
npm run build
npm start
# Откройте PageSpeed Insights в Chrome DevTools

# 4. Проверка размера JS:
ls -lh .next/static/chunks/*.js | sort -k5 -rn
```

---

## 📝 Дополнительные рекомендации

1. **Установите интеграцию с Vercel** - автоматическая оптимизация изображений
2. **Используйте Image Optimization API** - Vercel Edge Networks
3. **Настройте ISR (Incremental Static Regeneration)** для динамических страниц
4. **Рассмотрите Prerender** для критичных страниц
5. **Мониторьте Core Web Vitals** через Google Search Console

---

**Дата:** 2 марта 2026 г.  
**Версия:** 1.0
