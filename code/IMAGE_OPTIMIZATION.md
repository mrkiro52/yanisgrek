# Image Optimization Configuration

## Автоматическая оптимизация изображений

### 1. Быстрая оптимизация текущих изображений

```bash
# Дайте права на выполнение
chmod +x optimize-images.sh

# Запустите оптимизацию
./optimize-images.sh
```

### 2. Конвертация в WebP (после оптимизации)

```bash
# Установите webp если ещё не установлен
brew install webp

# Конвертируйте PNG в WebP
for file in public/images/**/*.png; do
  cwebp -q 80 "$file" -o "${file%.png}.webp"
done

# Конвертируйте JPG в WebP
for file in public/images/**/*.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done
```

### 3. Использование ResponsiveImage компонента

```tsx
import { ResponsiveImage } from '@/components/ResponsiveImage/ResponsiveImage';

// Простое использование (только PNG/JPG)
<ResponsiveImage 
  src="/images/photo.png" 
  alt="Photo" 
/>

// С WebP support
<ResponsiveImage 
  src="/images/photo.png"
  webp="/images/photo.webp"
  alt="Photo" 
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// С AVIF (максимальное сжатие)
<ResponsiveImage 
  src="/images/photo.png"
  avif="/images/photo.avif"
  webp="/images/photo.webp"
  alt="Photo"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## Ожидаемые результаты

| Формат | Размер | Сэкономка |
|--------|--------|-----------|
| PNG (оригинал) | 293 KiB | 0% |
| PNG (оптимизированный) | ~220 KiB | 25% |
| WebP (оптимизированный) | ~100-120 KiB | 60% |
| AVIF (оптимизированный) | ~80-100 KiB | 70% |

## Советы по оптимизации

1. **Используйте правильные размеры** - изображение должно быть размером контейнера:
   ```tsx
   // ❌ Неправильно (889x656 в контейнере 158x116)
   <img src="/images/cars/bmw-x7.png" style="width:90px" alt="bmw">
   
   // ✅ Правильно
   <ResponsiveImage 
     src="/images/cars/bmw-x7-small.png"
     alt="BMW X7"
     style={{ width: 90 }}
   />
   ```

2. **Для баннеров используйте srcset:**
   ```tsx
   <ResponsiveImage
     src="/images/banner1.png"
     srcSet="/images/banner1-small.webp 637w, /images/banner1.webp 1274w"
     sizes="(max-width: 768px) 100vw, 50vw"
     alt="Discount"
   />
   ```

3. **Кешируйте изображения:**
   ```
   # В next.config.ts уже добавлены заголовки:
   Cache-Control: public, max-age=31536000, immutable
   ```

4. **Проверьте PageSpeed:**
   - Откройте страницу в браузере
   - F12 → Lighthouse
   - Запустите аудит
   - Проверьте размеры изображений

## Дополнительные инструменты

```bash
# Проверка размера изображений
du -sh public/images/**/*.{png,jpg,webp}

# Конвертация всех PNG в WebP (параллельная обработка)
find public/images -name "*.png" | xargs -P 4 -I {} bash -c 'cwebp -q 80 "$1" -o "${1%.png}.webp"' _ {}

# Удаление больших исходных файлов после конвертации
find public/images -name "*.png" -size +100k -exec rm {} \;
```

## Автоматизация с GitHub Actions

Если используете GitHub, добавьте в `.github/workflows/optimize-images.yml`:

```yaml
name: Optimize Images
on:
  pull_request:
    paths:
      - 'public/images/**'

jobs:
  optimize:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: |
          apt-get update
          apt-get install -y imagemagick webp
          chmod +x optimize-images.sh
          ./optimize-images.sh
      - run: git diff --exit-code
```

## Результаты после оптимизации

**Ожидаемое улучшение PageSpeed:**
- LCP: 3.6s → 2.0s (44% улучшение)
- FCP: 3.4s → 1.8s (47% улучшение)
- Performance: 52/100 → 75-80/100

**Ожидаемая экономия трафика:**
- Всего изображений: ~2.5 MB
- После оптимизации: ~900 KB
- Сэкономка: **64%** (1.6 MB)
