const TELEGRAM_BOT_TOKEN = '8432413502:AAGc6KyVjREe9J1384idB9URnJpo_gjfy_k';
const TELEGRAM_CHAT_ID = '-4730139718';

interface TelegramMessage {
  type: 'calculator' | 'service-quiz' | 'discount' | 'contact-form';
  data: Record<string, any>;
  url: string;
}

export async function sendToTelegram(message: TelegramMessage): Promise<boolean> {
  try {
    if (!TELEGRAM_CHAT_ID) {
      console.error('TELEGRAM_CHAT_ID не установлен. Пожалуйста, укажите chat_id в файле telegram.ts');
      return false;
    }

    const formattedMessage = formatMessage(message);
    
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: formattedMessage,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();
    
    if (!result.ok) {
      console.error('Ошибка Telegram API:', result);
    }
    
    return result.ok;
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error);
    return false;
  }
}

function formatMessage(message: TelegramMessage): string {
  const { type, data, url } = message;
  
  let text = '';
  
  switch (type) {
    case 'calculator':
      text = `
🧮 <b>КАЛЬКУЛЯТОР ТО</b>

📍 <b>Страница:</b> ${url}

🚗 <b>Модель:</b> ${data.model}
📋 <b>Серия:</b> ${data.series}
📊 <b>Пробег:</b> ${data.mileage} км
🔧 <b>Тип запчастей:</b> ${data.partType}

<b>Выбранные услуги:</b>
${data.services.map((s: any, i: number) => `${i + 1}. ${s.name} - ${s.total.toLocaleString()} ₽`).join('\n')}

💰 <b>Итоговая стоимость:</b> ${data.totalSum.toLocaleString()} ₽
`;
      break;

    case 'service-quiz':
      text = `
🎯 <b>РАСЧЕТ КОНКРЕТНОЙ УСЛУГИ</b>

📍 <b>Страница:</b> ${url}

🚗 <b>Модель:</b> ${data.model}
📋 <b>Серия:</b> ${data.series}

<b>Выбранные услуги:</b>
${data.services.map((s: string, i: number) => `${i + 1}. ${s}`).join('\n')}

${data.vin ? `🔢 <b>VIN:</b> ${data.vin}` : ''}
📱 <b>Телефон:</b> ${data.phone}
`;
      break;

    case 'discount':
      text = `
🎁 <b>ЗАЯВКА НА АКЦИЮ</b>

📍 <b>Страница:</b> ${url}

🏷️ <b>Акция:</b> ${data.discount}
👤 <b>Имя:</b> ${data.name}
📱 <b>Телефон:</b> ${data.phone}
`;
      break;

    case 'contact-form':
      text = `
📝 <b>ЗАПИСЬ НА ОБСЛУЖИВАНИЕ</b>

📍 <b>Страница:</b> ${url}

👤 <b>Имя:</b> ${data.name}
📱 <b>Телефон:</b> ${data.phone}
${data.vin ? `🔢 <b>VIN:</b> ${data.vin}` : ''}
📅 <b>Дата и время:</b> ${data.datetime}
`;
      break;
  }
  
  return text.trim();
}
