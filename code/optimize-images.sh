#!/bin/bash

# Скрипт для оптимизации всех изображений в проекте
# Требует: imagemagick, cwebp (для WebP)
# Установка: brew install imagemagick webp

set -e

IMAGE_DIR="public/images"
BACKUP_DIR="public/images/.backup"
QUALITY=85
WEBP_QUALITY=80

echo "🖼️  Начинаем оптимизацию изображений..."

# Создаём backup директорию
mkdir -p "$BACKUP_DIR"

# Счётчики
total_files=0
optimized_files=0
saved_size=0

# Функция для форматирования размера
format_size() {
  local bytes=$1
  if [ $bytes -lt 1024 ]; then
    echo "${bytes}B"
  elif [ $bytes -lt 1048576 ]; then
    echo "$((bytes / 1024))KB"
  else
    echo "$((bytes / 1048576))MB"
  fi
}

# Процесс оптимизации
optimize_image() {
  local file=$1
  local filename=$(basename "$file")
  local extension="${filename##*.}"
  local name="${filename%.*}"
  
  if [ "$extension" = "jpg" ] || [ "$extension" = "jpeg" ] || [ "$extension" = "png" ]; then
    ((total_files++))
    
    # Получаем исходный размер
    local original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    
    # Копируем в backup
    cp "$file" "$BACKUP_DIR/${filename}.bak"
    
    echo "⏳ Обрабатываю: $filename ($(format_size $original_size))..."
    
    # Оптимизируем PNG
    if [ "$extension" = "png" ]; then
      # Используем ImageMagick для сжатия
      convert "$file" -quality $QUALITY -strip "$file.tmp"
      
      # Проверяем размер
      if [ -f "$file.tmp" ]; then
        if [ $(stat -f%z "$file.tmp" 2>/dev/null || stat -c%s "$file.tmp") -lt $original_size ]; then
          mv "$file.tmp" "$file"
        else
          rm "$file.tmp"
        fi
      fi
    fi
    
    # Оптимизируем JPG
    if [ "$extension" = "jpg" ] || [ "$extension" = "jpeg" ]; then
      convert "$file" -quality $QUALITY -strip "$file.tmp"
      
      if [ -f "$file.tmp" ]; then
        if [ $(stat -f%z "$file.tmp" 2>/dev/null || stat -c%s "$file.tmp") -lt $original_size ]; then
          mv "$file.tmp" "$file"
        else
          rm "$file.tmp"
        fi
      fi
    fi
    
    # Получаем новый размер
    local new_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file")
    local diff=$((original_size - new_size))
    
    if [ $diff -gt 0 ]; then
      ((optimized_files++))
      ((saved_size += diff))
      echo "✅ Оптимизировано! Сэкономлено: $(format_size $diff)"
    else
      echo "⏭️  Уже оптимизировано"
    fi
  fi
}

# Рекурсивно обрабатываем все изображения
find "$IMAGE_DIR" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read file; do
  optimize_image "$file"
done

echo ""
echo "════════════════════════════════════════════════════════"
echo "📊 ОТЧЁТ ОБ ОПТИМИЗАЦИИ"
echo "════════════════════════════════════════════════════════"
echo "Всего файлов обработано: $total_files"
echo "Оптимизировано: $optimized_files"
echo "Всего сэкономлено: $(format_size $saved_size)"
echo ""
echo "Backup исходных файлов: $BACKUP_DIR"
echo ""
echo "💡 Рекомендации:"
echo "1. Конвертируйте PNG в WebP для ещё большего сжатия:"
echo "   cwebp -q 80 image.png -o image.webp"
echo ""
echo "2. Используйте picture элемент для выбора формата:"
echo "   <picture>"
echo "     <source srcset=\"image.webp\" type=\"image/webp\">"
echo "     <source srcset=\"image.jpg\" type=\"image/jpeg\">"
echo "     <img src=\"image.jpg\" alt=\"...\">"
echo "   </picture>"
echo ""
echo "3. Добавьте width/height для избежания layout shift"
echo "4. Используйте responsive images с sizes"
echo ""
echo "🎉 Оптимизация завершена!"
