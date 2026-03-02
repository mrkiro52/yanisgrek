# 📋 Инструкция по оптимизации загрузки изображений

## ✅ Что было сделано

Я создал два новых компонента для ленивой загрузки изображений:

### 1. **LazyImage** - для обычных `<img>` тегов
**Путь:** `src/components/LazyImage/LazyImage.tsx`

Использование:
```jsx
import { LazyImage } from '../LazyImage/LazyImage';

export default function MyComponent() {
  return (
    <LazyImage 
      src="/images/myimage.jpg" 
      alt="Description"
      className="my-class"
    />
  );
}
```

### 2. **LazyBackgroundImage** - для фоновых изображений
**Путь:** `src/components/LazyBackgroundImage/LazyBackgroundImage.tsx`

Использование:
```jsx
import { LazyBackgroundImage } from '../LazyBackgroundImage/LazyBackgroundImage';

export default function MyComponent() {
  return (
    <LazyBackgroundImage 
      src="/images/background.jpg"
      className="my-class"
      style={{ height: '300px' }}
    >
      {/* Содержимое */}
    </LazyBackgroundImage>
  );
}
```

### 3. **useImageLazyLoad** - Hook для кастомной реализации
**Путь:** `src/hooks/useImageLazyLoad.ts`

Использование:
```tsx
import { useImageLazyLoad } from '@/hooks/useImageLazyLoad';

export default function MyComponent() {
  const { ref, isLoaded } = useImageLazyLoad();

  return (
    <div ref={ref}>
      {isLoaded ? <img src="..." /> : <Skeleton />}
    </div>
  );
}
```

## 🔄 Уже обновлены компоненты

- ✅ **TeamBlock** - все картинки преимуществ теперь загружаются лениво
- ✅ **Chillzone** - все изображения зоны отдыха
- ✅ **ImageBlock** (сервис-страницы) - фоновые и наложенные изображения

## 📝 Как обновить остальные компоненты

### Для простых картинок:
**Было:**
```jsx
<img src="/images/picture.jpg" alt="Description" />
```

**Стало:**
```jsx
import { LazyImage } from '@/components/LazyImage/LazyImage';

<LazyImage src="/images/picture.jpg" alt="Description" />
```

### Для фоновых картинок:
**Было:**
```jsx
<div style={{ backgroundImage: `url(${src})` }}>
  {children}
</div>
```

**Стало:**
```jsx
import { LazyBackgroundImage } from '@/components/LazyBackgroundImage/LazyBackgroundImage';

<LazyBackgroundImage src={src}>
  {children}
</LazyBackgroundImage>
```

## 🎯 Места для обновления

### 1. **Header компонент** (`src/components/Header/Header.jsx`)
- `logo.svg`
- `burger.svg`
- `cross.svg`

### 2. **Footer компонент** 
- `logo.svg`

### 3. **Главная страница** (`src/app/page.tsx` / `page.jsx`)
- `techCenter.png`
- `blackInfoImg1.png`, `blackInfoImg2.png`, `blackInfoImg3.png`
- `number1.png`, `number2.png`, `number3.png`, `number4.png`
- `goCircle.png`

### 4. **Works страница** (`src/app/works/page.jsx`)
- `worksImg1.png`
- `worksImg2.png`

### 5. **Страницы ремонта** (`remontAkpp`, `remontDvs`, `remontMkpp`)
- Изображения KPP/DVS подгружаются динамически (уже оптимально)

### 6. **Services страница** (`src/app/services/page.jsx`)
- `car_slide_11.jpg`
- `car_slide_17.jpg`

### 7. **About страница** (`src/app/about/page.tsx`)
- `black_car_about.jpg`
- `photo_block_about.jpg`
- `photo_office.jpg`
- `photo_worker.jpg`
- Все `worker*.jpg` изображения

## ⚡ Преимущества

✅ **Страница грузится быстрее** - только видимые изображения загружаются  
✅ **Меньше трафика** - не загружаются картинки за видимой областью  
✅ **Лучше UX** - плавная загрузка при скролле  
✅ **SEO улучшается** - быстрее Core Web Vitals  

## 🔧 Настройка

Если нужно изменить расстояние загрузки (по умолчанию 50px), отредактируйте в компонентах:

```jsx
const observer = new IntersectionObserver(
  ([entry]) => { ... },
  {
    rootMargin: '100px', // Измените это значение (было 50px)
  }
);
```

Большое значение = загрузка начинается раньше  
Маленькое значение = загрузка ближе к экрану
