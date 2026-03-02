#!/bin/bash
# 📊 Скрипт для анализа размера JS бандла и выявления неиспользуемого кода

echo "🔍 Анализ размера бандла..."
echo ""

# Функция для показа размера папки
show_size() {
    local path=$1
    local name=$2
    if [ -d "$path" ]; then
        size=$(du -sh "$path" | cut -f1)
        echo "📦 $name: $size"
    fi
}

# Анализ основных папок
show_size "./node_modules" "node_modules"
show_size "./.next/static" "Next.js Static"
show_size "./src/components" "Components"
show_size "./src/pages" "Pages"

echo ""
echo "🔨 Разбор бандла по размерам:"
if command -v webpack-bundle-analyzer &> /dev/null; then
    echo "✅ webpack-bundle-analyzer найден"
else
    echo "❌ webpack-bundle-analyzer НЕ установлен"
    echo "   Установите: npm install --save-dev webpack-bundle-analyzer"
fi

echo ""
echo "🎯 Рекомендации:"
echo "1. Удалите неиспользуемые зависимости: npm prune"
echo "2. Проверьте динамический импорт для больших компонентов"
echo "3. Используйте tree-shaking для удаления неиспользуемого кода"
echo "4. Минимизируйте библиотеки (используйте lodash-es вместо lodash)"
