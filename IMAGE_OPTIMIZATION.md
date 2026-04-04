# Рекомендации по оптимизации изображений

## Критические изображения для оптимизации

### Мобильные фоны (высокий приоритет)
- `mainbgmobi.webp` - должен быть < 100KB
- `formbgmobi.webp` - должен быть < 100KB

Рекомендуемые параметры:
- Ширина: 768px (максимум)
- Качество WebP: 75-80%
- Формат: WebP с оптимизацией

### Команды для оптимизации (используя cwebp):

```bash
# Для mainbgmobi.webp
cwebp -q 75 -resize 768 0 mainbg.jpg -o mainbgmobi.webp

# Для formbgmobi.webp  
cwebp -q 75 -resize 768 0 formbg.jpg -o formbgmobi.webp
```

### Десктопные фоны
- `mainbg.webp` - должен быть < 200KB
- `formbg.webp` - должен быть < 200KB

Рекомендуемые параметры:
- Ширина: 1920px (максимум)
- Качество WebP: 80-85%

### Логотипы и иконки
- `logo.svg` - уже оптимизирован (SVG)
- `techCenter.webp` - должен быть < 20KB

### Изображения в галереях
Все изображения в папках:
- `/images/cars/` - < 50KB каждое
- `/images/chillzone/` - < 80KB каждое
- `/images/preim/` - < 60KB каждое
- `/images/services/` - < 50KB каждое

## Автоматическая оптимизация

Можно использовать онлайн сервисы:
- https://squoosh.app/ (Google)
- https://tinypng.com/
- https://imageoptim.com/

Или установить локальные инструменты:
```bash
npm install -g @squoosh/cli
# или
brew install webp
```

## Проверка результата

После оптимизации проверьте:
1. PageSpeed Insights: https://pagespeed.web.dev/
2. Размер файлов: все критические изображения < 100KB
3. LCP должен улучшиться до < 2.5s на мобильных
