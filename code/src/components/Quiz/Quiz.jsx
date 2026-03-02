'use client';

import { useState } from 'react';
import './Quiz.scss';
import SuccessModal from '../SuccessModal/SuccessModal';

export default function Quiz({ propModel }) {

    const [step, setStep] = useState(1);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const bmwModels = [
        { id: 1, name: 'BMW 1', image: '/images/cars/bmw-1.png' },
        { id: 2, name: 'BMW 2', image: '/images/cars/bmw-2.png' },
        { id: 3, name: 'BMW 3', image: '/images/cars/bmw-3.png' },
        { id: 4, name: 'BMW 4', image: '/images/cars/bmw-4.png' },
        { id: 5, name: 'BMW 5', image: '/images/cars/bmw-5.png' },
        { id: 6, name: 'BMW 6', image: '/images/cars/bmw-6.png' },
        { id: 7, name: 'BMW 7', image: '/images/cars/bmw-7.png' },
        { id: 8, name: 'BMW 8', image: '/images/cars/bmw-8.png' },
        { id: 9, name: 'BMW X1', image: '/images/cars/bmw-x1.png' },
        { id: 10, name: 'BMW X2', image: '/images/cars/bmw-x2.png' },
        { id: 11, name: 'BMW X3', image: '/images/cars/bmw-x3.png' },
        { id: 12, name: 'BMW X4', image: '/images/cars/bmw-x4.png' },
        { id: 13, name: 'BMW X5', image: '/images/cars/bmw-x5.png' },
        { id: 14, name: 'BMW X6', image: '/images/cars/bmw-x6.png' },
        { id: 15, name: 'BMW X7', image: '/images/cars/bmw-x7.png' },
        { id: 16, name: 'BMW M2', image: '/images/cars/bmw-m2.png' },
        { id: 17, name: 'BMW M3', image: '/images/cars/bmw-m3.png' },
        { id: 18, name: 'BMW M4', image: '/images/cars/bmw-m4.png' },
        { id: 19, name: 'BMW M5', image: '/images/cars/bmw-m5.png' },
        { id: 20, name: 'BMW M8', image: '/images/cars/bmw-m8.png' },
        { id: 21, name: 'BMW i3', image: '/images/cars/bmw-i3.png' },
        { id: 22, name: 'BMW i4', image: '/images/cars/bmw-i4.png' },
        { id: 23, name: 'BMW i7', image: '/images/cars/bmw-i7.png' },
        { id: 24, name: 'BMW i8', image: '/images/cars/bmw-i8.png' },
        { id: 25, name: 'BMW iX', image: '/images/cars/bmw-ix.png' },
        { id: 26, name: 'BMW z3', image: '/images/cars/bmw-z3.png' },
        { id: 27, name: 'BMW z4', image: '/images/cars/bmw-z4.png' },
        { id: 28, name: 'Rolls Royce', image: '/images/cars/rolls-royce.png' },
        { id: 29, name: 'Mini Cooper', image: '/images/cars/mini-cooper.png' },
        { id: 30, name: 'Другая', image: null}
    ];

    const services = [
        "Диагностика Авто",
        "Консультация",

        // АКПП
        "Ремонт АКПП",
        "Диагностика АКПП",
      
        // Двигатель
        "Ремонт ДВС",
        "Диагностика ДВС",
      
        // Подвеска
        "Ремонт подвески",
      
        // Тормозная система
        "Ремонт тормозной системы",
      
        // Система охлаждения
        "Ремонт системы охлаждения",
      
        // Прочее
        "Ремонт и замена аккумуляторов",
        "Другое"
      ];
      

    // Состояние для выбранных услуг
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedModel, setSelectedModel] = useState(propModel || null);
    const [selectedSeries, setSelectedSeries] = useState(null);

    const [connection, setConnection] = useState(2);
    const [vinNumber, setVinNumber] = useState('');
    const [contact, setContact] = useState('');

    // Функция для обработки выбора услуги
    const handleServiceSelect = (service) => {
        if (selectedServices.includes(service)) {
        // Если услуга уже выбрана - удаляем из массива
        setSelectedServices(selectedServices.filter(item => item !== service));
        } else {
        // Если услуга не выбрана - добавляем в массив
        setSelectedServices([...selectedServices, service]);
        }
    };

    // Функция проверки возможности перехода на следующий шаг
    const canProceedToNextStep = () => {
        switch (step) {
        case 1:
            return selectedModel !== null;
        case 2:
            return selectedSeries !== null;
        case 5:
            return contact !== '';
        default:
            return true;
        }
    };

    // Функция для перехода к следующему шагу
    const handleNextStep = () => {
        if (step === 5) {
            handleSendMessage();
            return;
        }
    
        // Если модель "Другая" и мы на шаге 1 — сразу переходим на шаг 3
        if (step === 1 && selectedModel === 'Другая') {
            setSelectedSeries(null); // оставляем пустую строку
            setStep(3);
            return;
        }
    
        if (canProceedToNextStep()) {
            setStep(step + 1);
        }
    };    

    const bmwSeries = {
        'BMW 1': [
            "F20 LCI/F21 LCI B58 M140 - 340 л.с.",
            "F20 LCI/F21 LCI B47 120d/120dx - 190 л.с. / 125d - 224 л.с.",
            "F20-F20 LCI/F21-F21 LCI N55 135/M135 - 320 л.с.",
            "F20/F21 N20 125 - 184 л.с.",
            "F20/F21 N47 120d / 120dx - 184 л.с. / 125d - 218 л.с./",
            "F20-F20 LCI/F21-F21 LCI N13 116 - 109 л.с. / 118 - 136 л.с. / 120 - 177 л.с.",
            "F20 LCI/F21 LCI B38 116-136л.с. / 118-170л.с.",
            "F20 LCI/F21 LCI B47 118d-150 л.с. / 120d /120dx - 190 л.с.",
            "F20 LCI/F21 LCI B37 114d-95 л.с. / 116d-116 л.с",
            "E81/E87/E87LCI N52 130 - 258 л.с.",
            "E81/Е82/Е87/Е87LCI/Е88 N54 135/ 135 MCOUPE - 306 л.с.",
            "E81/Е82/Е87/Е87LCI/Е88 N46 118 - 129 л.с. / 120 - 150 л.с.",
            "E81/Е82/Е87/Е87LCI/Е88 N43 116 - 122 л.с. / 118 - 143 л.с.",
        ],
        'BMW 2': [
            "F22 B47 218d - 150 л.с. / 220d - 190 л.с. / 225d - 224 л.с.",
            "F22/F23-F23 LCI N55 M235i/M235iX - 326 л.с.",
            "F22/F23-F23 LCI B38 218i - 136 л.с.",
            "F22/F23-F23 LCI B58 M240/M240iX - 340 л.с.",
            "F22/F23-F23 LCI N20 220i - 184 л.с. / 228i - 245 л.с.",
            "F22/F23 N47 218d - 143 л.с. / 220d - 190 л.с. / 225d - 218 л.с.",
        ],
        'BMW 3': [
            "E90/E91/E92/E93 N54 335 -306 л.с.",
            "E90-E90LCI N52 325 - 177 л.с. / 328 - 204 л.с. / 330 - 218 л.с.",
            "E90-E90LCI N43 316 - 122 л.с. / 318 - 143 л.с. / 320 - 170 л.с.",
            "E90-E90LCI N46 316 - 129 л.с. / 318 - 143 л.с. / 320 - 150 л.с.",
            "F30/F31 N13 316i - 136 л.с.",
            "F30/F31 N55 335i - 326 л.с.",
            "F30/F31 B38 318i - 136 л.с.",
            "F30 LCI/F31 LCI B58 M340i - 360 л.с.",
            "F30-F30 LCI/F31-F31 LCI N20 320i - 184 л.с. / 328i - 245 л.с.",
            "F30-F30 LCI/F31-F31 LCI N47 316d - 116 л.с./318d - 143 л.с./320d - 184л.с. /325d -204 л.с.",
            "F30-F30 LCI/F31-F31 LCI B47 316d - 116 л.с. / 318d - 243 л.с.",
            "F34 N55 335i - 326 л.с.",
            "F34 LCI B58 M340i - 360 л.с.",
            "F34-F34 LCI N20 320i - 184 л.с. / 328i - 245 л.с.",
            "F34-F34 LCI/F31-F31 LCI N47 318d - 143 л.с./320d - 184л.с. /325d -204 л.с.",
            "FF34-F34 LCI B47 318d - 143 л.с. / 320d - 184 л.с",
            "G20 М340 В58",
            "G20 320 В46/B48",
            "G20 330dX B57D30A",
            "G20 320D B47D20B",
        ],
        'BMW 4': [
            "F32 B38 418i",
            "F32 N55 435i",
            "F32-F32 LCI B58 440i",
            "F32-F32 LCI N20 420i/428i",
            "F32-F32 LCI N47 420d - 184 л.с. / 125d - 218 л.с.",
            "F32-F32 LCI B47 418d - 150 л.с. / 420d - 190 л.с. / 425d - 224 л.с.",
            "F33 N55 435i",
            "F33-F33 LCI B58 440i",
            "F33-F33 LCI N20 420i/428i",
            "F33-F33 LCI N47 420d/425d",
            "F33-F33 LCI B47 420d/425d",
            "F36-F36 LCI B38 418i",
            "F36-F36 LCI N55 435i",
            "F36-F36 LCI B58 440i",
            "F36-F36 LCI N20 420i/428i",
            "F36-F36 LCI N47 418d/420d/425d",
            "F36-F36 LCI B47 418d/420d/425d",
        ],
        'BMW 5': [
            "E60 M54 525i",
            "E60-E60LCI M57T2 535d",
            "E60-E60LCI M47N2 520d",
            "E60-E60LCI N53 530xi",
            "E60-E60LCI N52 523i/525i/528i/530i",
            "E60-E60LCI N46 520i",
            "F10 LCI B47 518d/520d",
            "F10 N57X M550d",
            "F10 N57T/N57S 530d/535d",
            "F10 N47 520d/525d",
            "F10 N63 550i",
            "F10 N55 535i",
            "F10 523i N52N",
            "F10 N20 520i/528i",
            "G30 B57D30S M550dX",
            "G30 B57/B57D 530d/540d",
            "G30 B47 518d/520d/525d",
            "G30 B58C/B58D 540i",
            "G30 B48/B48D 520i/530i",
        ],
        'BMW 6': [
            "F06 N63 650i",
            "F06 N55 640i",
            "F12/F13 N63 650i",
            "F12/F13 N55 640i",
        ],
        'BMW 7': [
            "F01/F02 N74 760i",
            "F01/F02 N63 750i",
            "F01/F02 N57 730d",
            "F01/F02 N54 740i",
            "G11/G12 N74B66U M760LiX",
            "G11/G12 N63B44O 750LiX",
            "G11/G12 B57D30S 750LdX",
            "G11/G12 B58C/B58D 740i",
            "G11/G12 B48B20O 730i",
            "G11/G12 B47D20T 725d",
        ],
        'BMW 8': [
            "G14/G15/G16 N63 M850i",
            "G14/G15/G16 B58 840i",
        ],
        'BMW X1': [
            "F48 20i B48",
            "F48 18d B47",
            "F48 16d B37",
            "X1 E84 N47 S20D",
            "X1 E84 X25I N52K",
            "X1 E84 S18I N46T S18I",
        ],
        'BMW X2': [
            "F39 M35i B58",
            "F39 20i B48",
            "F39 18d B47",
        ],
        'BMW X3': [
            "X3 LCI F25 B47 18d/20d",
            "X3 F25 N57T 30d",
            "X3 F25 N47 20d",
            "X3 F25 N55 35i",
            "X3 F25 N20 20i/28i",
            "X3 G01 B58B30M M40iX",
            "X3 G01 B48/B48X 20i/30i",
            "X3 G01 B57 30d",
            "X3 G01 B47 18d/20d",
        ],
        'BMW X4': [
            "F26 M40i B58",
            "F26 35i N55",
            "F26 30d N57",
            "F26 28i N20",
            "F26 20d B47",
        ],
        'BMW X5': [
            "X5 E70 LCI N55 35i/40i",
            "X5 E70 LCI N57T 30D/40D",
            "X5 M E70 S63",
            "X5 E70 M57T2 30d",
            "X5 E70 LCI N63 50i",
            "X5 E70 N62 48i",
            "X5 E70 3.0si N52K",
            "X5 F15 N63B44O XDR50i",
            "X5 F15 N57D30S 50D",
            "X5 F15 N57D30T 25D/30D/40D",
            "X5 F15 N55 35i",
            "X5 G05 B58B30M 40i",
            "X5 M G05 S63B44T",
            "X5 G05 N63B44O XDR50i",
            "X5 G05 B57D30S M50dX",
            "X5 G05 B57D30O 25D/30D/40D",
            "X5 M S63B44T F85",
        ],
        'BMW X6': [
            "X6 E71 N57X 50D",
            "X6 M E71 S63",
            "X6 E71 LCI N63 50i",
            "X6 E71 N54 35i",
            "X6 E71 LCI N55 35i",
            "X6 E71 N57/N57S 30D/40D",
            "X6 E71 M57T2 30D",
            "X6 F16 N63B44O XDR50i",
            "X6 F16 N57D30S 50D",
            "X6 F16 N57D30T 40D",
            "X6 F16 N55 35i",
            "X6 G06 B58B30M 40i",
            "X6 M G06 S63B44T",
            "X6 G06 N63B44O XDR50i",
            "X6 G06 B57D30S M50dX",
            "X6 G06 B57D30O 30D",
            "X6 M S63B44T F86",
        ],
        'BMW X7': [
            "G07 M50i N63",
            "G07 40i B58",
            "G07 30d B57",
        ],
        'BMW M2': [
            "F87 M2 N55",
            "F87 M2 Competition S55",
        ],
        'BMW M3': [
            "F80 M3 S55",
            "G80 M3 S58",
        ],
        'BMW M4': [
            "F82/F83 M4 S55",
            "G82/G83 M4 S58",
        ],
        'BMW M5': [
            "F10 S63 M5",
            "F90 S63B44T M5",
        ],
        'BMW M8': [
            "F91 M8 Convertible",
            "F92 M8 Coupe",
            "F93 M8 Gran Coupe",
        ],
        'BMW i3': [
            "i3 I01 I12",
            "i3s I01 I12",
        ],
        'BMW i4': [
            "i4 eDrive40 G26",
            "i4 M50 G26",
        ],
        'BMW i7': [
            "i7 xDrive60 G70",
            "i7 M70 G70",
        ],
        'BMW i8': [
            "i8 I12",
            "i8 Roadster I15",
        ],
        'BMW iX': [
            "iX xDrive40 I20",
            "iX xDrive50 I20",
            "iX M60 I20",
        ],
        'BMW z3': [
            "Z3 E36 M52",
            "Z3 E36 M54",
            "Z3 M E36 S52",
            "Z3 M E36 S54",
        ],
        'BMW z4': [
            "Z4 E85/E86 N52",
            "Z4 E89 N20",
            "Z4 E89 N55",
            "Z4 G29 B58",
        ],
        'Rolls Royce': [
            "Rolls Royce RR11",
            "Rolls Royce RR12",
            "Rolls Royce RR4",
            "Rolls Royce RR5",
            "Rolls Royce RR6",
            "Cullinan RR31",
        ],
        'Mini Cooper': [
            "Mini Coupe",
            "Mini Clubman",
            "Mini Countryman",
        ]
    }

    // const generateWhatsAppMessage = () => {
    //     // Определяем тип
    //     const contactTypes = ['Телефон', 'Telegram', 'WhatsApp'];
    //     const contactType = contactTypes[connection];
        
    //     // Формируем список услуг
    //     const servicesList = selectedServices.map(service => `• ${service}`).join('%0A');
        
    //     // Формируем текст сообщения
    //     const message = `
    //   Модель: ${selectedModel || 'Не указана'} 
    //   Серия: ${selectedSeries || 'Не указана'} 
    //   VIN номер: ${vinNumber || 'Не указан'} 
    //   Контакт для связи (${contactType}): ${contact || 'Не указан'} 
      
    //   Выбранные услуги:
    //   ${servicesList}
    //     `.trim();
      
    //     // Кодируем сообщение для URL
    //     const encodedMessage = encodeURIComponent(message);
        
    //     return `https://wa.me/74957676500?text=${encodedMessage}`;
    // };
    
    // const handleSendMessage = () => {
    //     if (!canProceedToNextStep()) return;
        
    //     const whatsappUrl = generateWhatsAppMessage();
    //     window.open(whatsappUrl, '_blank');
    //   };

    const sendTelegramMessage = async () => {
        if (!canProceedToNextStep()) return;
      
        // Определяем тип
        const contactTypes = ["Телефон", "Telegram", "WhatsApp"];
        const contactType = contactTypes[connection];
      
        // Формируем список услуг
        const servicesList = selectedServices.map(service => `• ${service}`).join("\n");
      
        // Формируем текст сообщения
        const message = `
      Модель: ${selectedModel || "Не указана"}
      Серия: ${selectedSeries || "Не указана"}
      VIN номер: ${vinNumber || "Не указан"}
      Контакт для связи (${contactType}): ${contact || "Не указан"}
      
      Выбранные услуги:
      ${servicesList}
        `.trim();
      
        // 🔑 данные для Telegram
        const BOT_TOKEN = "8432413502:AAGc6KyVjREe9J1384idB9URnJpo_gjfy_k";
        const CHAT_ID = "-4730139718";
        const URI_API = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
      
        try {
          const response = await fetch(URI_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: CHAT_ID,
              text: message,
            }),
          });
      
          if (response.ok) {
            setIsSuccessModalOpen(true);
      
            // 🎯 Яндекс.Метрика — цель отправки квиза
                        if (typeof window !== "undefined" && typeof window.ym !== "undefined") {
                            const metrikaId = Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID || 94203012);
                            window.ym(metrikaId, "reachGoal", "sendQuizData");
                        }
          } else {
            alert("Ошибка при отправке. Попробуйте ещё раз.");
          }
        } catch (error) {
          console.error("Ошибка отправки:", error);
          alert("Не удалось отправить заявку.");
        }
      };
      
      const handleSendMessage = () => {
        sendTelegramMessage();
      };
      

      const scrollToQuizTitle = () => {
        const el = document.getElementById("quiz_title");
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 110; 
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      };      
      

    return (
        <div className="Quiz">
            <SuccessModal isOpen={isSuccessModalOpen} onClose={() => setIsSuccessModalOpen(false)} />
            
            <div className="Quiz_wrapper">
                <h2 id='quiz_title'>Получите расчет <span>конкретной</span> услуги</h2>
                <div className="slide">
                    {step === 1 && <h3>Выберите модель вашего БМВ:</h3>}
                    {step === 2 && <h3>Выберите кузов БМВ:</h3>}
                    {step === 3 && <h3>Выберите вид работ:</h3>}
                    {step === 4 && <h3>Введите VIN номер, сразу проверим стоимость и наличие запчастей:</h3>}
                    {step === 5 && <h3>Для отправки расчета введите ваш номер</h3>}
                    {step === 1 && (
                        <div className="content2">
                            {bmwModels.map(model => (
                            <div
                                key={model.id}
                                className={`block ${selectedModel === model.name ? 'selected' : ''}`}
                                onClick={() => setSelectedModel(model.name)}
                            >
                                <div className="sq"></div>
                                {model.image && <img src={model.image} style={{width: '90px'}} alt="bmw" />}
                                {!model.image && <div className='empty-image-for-other' style={{width: '90px'}}></div>}
                                <span>{model.name}</span>
                            </div>
                            ))}
                        </div>
                    )}
                    {step === 2 && (
                        <div className="content2">
                            {bmwSeries[selectedModel]?.map((series, index) => (
                            <div 
                                key={index} 
                                className={`block ${selectedSeries === series ? 'selected' : ''}`}
                                onClick={() => setSelectedSeries(series)}
                            >
                                <div className="sq"></div>
                                <span>{series}</span>
                            </div>
                        ))}
                    </div>
                    )}
                    {step === 3 && (
                        <div className="content3">
                            {services.map((service, index) => (
                            <div 
                                key={index}
                                className={`block ${selectedServices.includes(service) ? 'selected' : ''}`}
                                onClick={() => handleServiceSelect(service)}
                            >
                                <div className="sq"></div>
                                <span>{service}</span>
                            </div>
                            ))}
                        </div>
                    )}
                    {step === 4 && <div className='content4'>
                        <div className="row">
                            <span>VIN номер</span>
                            <input 
                                type="text" 
                                placeholder='JHMCM56557C404453'
                                value={vinNumber}
                                onChange={(e) => setVinNumber(e.target.value)}
                            />
                        </div>
                        <span>*необязательное поле</span>
                    </div>}
                    {step === 5 && <div className='content5'>
                        <div className="row">
                            <span>{connection === 0 ? 'Телефон' : connection === 1 ? 'Telegram' : 'Whatsapp'}</span>
                            <input 
                                type="text" 
                                placeholder={connection === 0 ? '+7 (XXX) XXX XX XX' : connection === 1 ? 'Имя пользователя' : 'Номер телефона'}
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                            />
                        </div>
                    </div>}
                </div>
                <div className="buttons_row">
                    <div className="left">
                        <span>Шаг {step}/5</span>
                    </div>
                    <div className="right">
                        <button 
                            className={step === 1 ? 'disabled' : ''} 
                            onClick={() => {
                                if (step !== 1) {
                                    if (step === 3 && selectedModel === 'Другая') {
                                        setStep(1);
                                    } else {
                                        setStep(step - 1);
                                    }
                                    scrollToQuizTitle();
                                }
                            }}
                        >
                            Назад
                        </button>
                        <button 
                        className={!canProceedToNextStep() ? 'disabled' : ''} 
                        onClick={() => {
                            handleNextStep();
                            scrollToQuizTitle();
                        }}
                        >
                        {step === 5 ? 'Отправить' : 'Дальше'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}