import { NextRequest, NextResponse } from 'next/server';

// 🔐 Безопасность: Токен и chat_id хранятся только на сервере в .env
// Клиент никогда не имеет доступа к этим данным
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// 🛡️ Простая защита от спама - храним время последнего запроса по IP
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_SECONDS = 5; // Минимум 5 секунд между запросами с одного IP

interface TelegramRequest {
  name?: string;
  phone?: string;
  message?: string;
  page?: string;
  vin?: string;
  date?: string;
  time?: string;
}

/**
 * POST /api/telegram
 * 
 * Безопасный endpoint для отправки уведомлений в Telegram
 * 
 * Требования безопасности:
 * - Токен и chat_id не попадают в браузер
 * - Валидация данных на сервере
 * - Защита от спама
 * - Клиент получает только { ok: true/false }
 */
export async function POST(request: NextRequest) {
  try {
    // 1️⃣ Проверяем наличие переменных окружения
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('❌ Telegram environment variables not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // 2️⃣ Получаем IP клиента для защиты от спама
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

    // 3️⃣ Проверяем rate limiting
    const lastRequestTime = rateLimitMap.get(clientIp);
    if (lastRequestTime) {
      const secondsElapsed = (Date.now() - lastRequestTime) / 1000;
      if (secondsElapsed < RATE_LIMIT_SECONDS) {
        return NextResponse.json(
          { error: 'Too many requests. Please wait.' },
          { status: 429 }
        );
      }
    }

    // 4️⃣ Парсим тело запроса
    const body: TelegramRequest = await request.json();

    // 5️⃣ Валидируем обязательные поля
    if (!body.name || !body.phone) {
      return NextResponse.json(
        { error: 'Name and phone are required' },
        { status: 400 }
      );
    }

    // 6️⃣ Очищаем данные (базовая санитизация)
    const name = String(body.name).slice(0, 100).trim();
    const phone = String(body.phone).slice(0, 20).trim();
    const vin = body.vin ? String(body.vin).slice(0, 30).trim() : '';
    const date = body.date ? String(body.date).slice(0, 10).trim() : '';
    const time = body.time ? String(body.time).slice(0, 5).trim() : '';
    const page = body.page ? String(body.page).slice(0, 50).trim() : 'unknown';
    const customMessage = body.message ? String(body.message).slice(0, 500).trim() : '';

    // 7️⃣ Формируем сообщение для Telegram
    let telegramMessage = `📋 <b>Новая заявка из формы</b>\n`;
    telegramMessage += `🔗 Страница: <code>${page}</code>\n`;
    telegramMessage += `👤 Имя: <b>${name}</b>\n`;
    telegramMessage += `📞 Телефон: <b>${phone}</b>\n`;
    
    if (vin) {
      telegramMessage += `🚗 VIN: <code>${vin}</code>\n`;
    }
    if (date && time) {
      telegramMessage += `📅 Дата: <b>${date}</b>\n`;
      telegramMessage += `⏰ Время: <b>${time}</b>\n`;
    }
    if (customMessage) {
      telegramMessage += `💬 Сообщение: <code>${customMessage}</code>\n`;
    }
    
    telegramMessage += `\n⏱️ Отправлено: ${new Date().toLocaleString('ru-RU')}`;

    // 8️⃣ Отправляем сообщение в Telegram через серверный запрос
    // 🔐 Токен передаётся только на сервере, не видим клиенту
    const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    // 9️⃣ Обрабатываем ответ Telegram
    if (!telegramResponse.ok) {
      const errorText = await telegramResponse.text();
      console.error('❌ Telegram API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to send message' },
        { status: 500 }
      );
    }

    // 🔟 Обновляем время последнего запроса для rate limiting
    rateLimitMap.set(clientIp, Date.now());

    // 1️⃣1️⃣ Возвращаем успех (не прокидываем ответ Telegram)
    console.log(`✅ Заявка отправлена: ${name} (${phone})`);
    
    return NextResponse.json(
      { ok: true, message: 'Заявка успешно отправлена' },
      { status: 200 }
    );

  } catch (error) {
    console.error('❌ Ошибка в API Telegram:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Отключаем методы GET для безопасности
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
