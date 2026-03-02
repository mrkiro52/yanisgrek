# 🚀 Быстрая инструкция по ленивой загрузке изображений

## Что нужно делать?

Замените обычные `<img>` теги на `<LazyImage>` компонент:

### Шаг 1: Импортируйте компонент
```jsx
import { LazyImage } from '@/components/LazyImage/LazyImage';
```

### Шаг 2: Замените img теги
```jsx
// ❌ Было:
<img src="/images/photo.jpg" alt="Photo" />

// ✅ Стало:
<LazyImage src="/images/photo.jpg" alt="Photo" />
```

---

## Для фоновых изображений

### Импорт:
```jsx
import { LazyBackgroundImage } from '@/components/LazyBackgroundImage/LazyBackgroundImage';
```

### Использование:
```jsx
// ❌ Было:
<div style={{ backgroundImage: `url(${src})` }}>
  Content
</div>

// ✅ Стало:
<LazyBackgroundImage src={src}>
  Content
</LazyBackgroundImage>
```

---

## ✅ Уже готово

Эти компоненты уже обновлены:
- ✅ TeamBlock (4 картинки преимуществ)
- ✅ Chillzone (4 фото зоны отдыха)
- ✅ ImageBlock (все сервис-картинки)
- ✅ Главная страница (все информационные картинки)
- ✅ Works страница (2 картинки работ)

---

## 📝 Что еще нужно обновить (опционально)

1. **About страница** - много фото worker, photo, car_slides
2. **Header** - если нужны не критичные иконки
3. **Services страница** - car_slide_11.jpg, car_slide_17.jpg
4. **Ремонт страницы** - phoneCall.png на других страницах

---

## 🧪 Как проверить что работает?

1. Откройте DevTools (F12)
2. Перейти на вкладку **Network**
3. Отфильтруйте по **Images**
4. Скролльте страницу вверх-вниз
5. Видите как картинки загружаются при скролле? ✅ Работает!

---

## 💡 Советы

- **Скорость загрузки:** Изображения начнут загружаться за 50px до видимости
- **Плавность:** При загрузке идет плавный переход opacity (0.7 → 1)
- **Совместимость:** Работает со всеми браузерами, которые поддерживают Intersection Observer

---

## 🔗 Подробная документация

- 📄 `LAZY_LOADING_GUIDE.md` - полное руководство с примерами
- 📄 `OPTIMIZATION_REPORT.md` - подробный отчет об оптимизации

---

Все готово! Начните с замены img тегов на LazyImage 🎉
