// SwapOn — runtime RU->EN localization. Walks rendered text nodes and translates
// against a dictionary; a MutationObserver re-applies after dc-runtime re-renders.
// Language is stored in engine prefs (getConfig().lang); switching reloads the page.
(function () {
  // exact whole-text-node translations (trimmed match)
  var DICT = {
    "+ Вручную": "+ Manually",
    "ID голоса из ElevenLabs": "ElevenLabs voice ID",
    "АДРЕС ТРАНСЛЯЦИИ": "STREAM ADDRESS",
    "Автоматически поворачивает видео под ориентацию телефона.": "Automatically rotates the video to the phone's orientation.",
    "Автоповорот видео": "Auto-rotate video",
    "Авторизован в Telegram-боте": "Signed in to the Telegram bot",
    "Баланс": "Balance",
    "Баланс:": "Balance:",
    "В реальном времени": "Real-time",
    "ВЫБЕРИ КАМЕРУ ДЛЯ ЗАМЕНЫ ИЗОБРАЖЕНИЯ": "CHOOSE A CAMERA TO REPLACE",
    "Вариант": "Variant",
    "Видео": "Video",
    "ГОЛОС": "VOICE",
    "Готовые голоса": "Ready voices",
    "Готовый голос": "Ready voice",
    "Добавить": "Add",
    "Добавить в список": "Add to list",
    "ЗАМЕНА ГОЛОСА": "VOICE REPLACEMENT",
    "ЗАМЕНА КАМЕРЫ": "CAMERA REPLACEMENT",
    "ЗАМЕНА ЛИЦА": "FACE SWAP",
    "За месяц": "This month",
    "Загрузите лицо, чтобы увидеть результат": "Upload a face to see the result",
    "Загрузить": "Upload",
    "Загрузить образцы": "Upload samples",
    "Замена голоса": "Voice replacement",
    "Замена лица": "Face swap",
    "Заменить": "Replace",
    "Записать образец": "Record a sample",
    "Запишите или загрузите образец.": "Record or upload a sample.",
    "Заполнить": "Fill",
    "Звук из видео/трансляции": "Audio from video/stream",
    "Зеркалить фронтальную камеру": "Mirror the front camera",
    "История": "History",
    "КАК ВПИСАТЬ ВИДЕО": "HOW TO FIT THE VIDEO",
    "КАЧЕСТВО": "QUALITY",
    "Качество": "Quality",
    "Когда модуль включён, приложения (камера, мессенджеры, браузер) вместо настоящей камеры видят ваше видео. Чтобы это работало, выберите источник видео в настройках.": "When the module is on, apps (camera, messengers, browser) see your video instead of the real camera. For this to work, choose a video source in settings.",
    "Купить в Telegram": "Buy in Telegram",
    "ЛИЦО": "FACE",
    "Локальное видео": "Local video",
    "Микрофон телефона": "Phone microphone",
    "Модель": "Model",
    "Мои голоса": "My voices",
    "Мягкое": "Soft",
    "НАИВЫСШЕЕ": "ULTIMATE",
    "НАСТРОЙКИ ЗАМЕНЫ": "SWAP SETTINGS",
    "Нажмите, чтобы выключить": "Tap to turn off",
    "Нажмите, чтобы включить": "Tap to turn on",
    "Название (напр. Signal)": "Name (e.g. Signal)",
    "Настройки": "Settings",
    "Непрозрачность наложения лица": "Face overlay opacity",
    "ОТКУДА БЕРЕМ ЗВУК": "AUDIO SOURCE",
    "ОТКУДА БРАТЬ ВИДЕО": "VIDEO SOURCE",
    "Оплата минут замены": "Pay for replacement minutes",
    "Оплата откроется в Telegram-боте": "Payment will open in the Telegram bot",
    "Основная": "Rear",
    "Отмена": "Cancel",
    "Отражает фронтальную камеру, как в зеркале — привычный вид селфи.": "Mirrors the front camera like a mirror — the familiar selfie view.",
    "ПРЕДПРОСМОТР": "PREVIEW",
    "ПРИЛОЖЕНИЯ ДЛЯ ЗАМЕНЫ": "APPS TO REPLACE",
    "ПРОФИЛЬ": "PROFILE",
    "Плавное смешивание": "Smooth blending",
    "Повышает детализацию и чёткость": "Increases detail and sharpness",
    "Подключается к камере напрямую — быстрее и стабильнее, но работает не во всех приложениях.": "Connects to the camera directly — faster and more stable, but doesn't work in all apps.",
    "Пока нет операций": "No operations yet",
    "Пока нет своих голосов.": "No voices of your own yet.",
    "Помощь": "Help",
    "Пополнение": "Top up",
    "Пополнить баланс": "Top up balance",
    "Прайс": "Pricing",
    "Профиль": "Profile",
    "Прямая подмена камеры": "Direct camera swap",
    "Реалистичное": "Realistic",
    "Резкость наложения лица": "Face overlay sharpness",
    "Сессий": "Sessions",
    "Сначала выберите лицо — нажмите, чтобы перейти к «Замена лица»": "Select a face first — tap to go to “Face swap”",
    "Созданный голос": "Created voice",
    "Сохранить": "Save",
    "Ссылка на вашу трансляцию. Приложение подключается к ней и берёт оттуда видео.": "A link to your stream. The app connects to it and pulls the video from there.",
    "Текущий баланс": "Current balance",
    "Трансляция": "Stream",
    "УЛУЧШЕНИЕ ЛИЦА · PRO": "FACE ENHANCEMENT · PRO",
    "Убрать синеву камеры": "Remove camera blue tint",
    "Удалить": "Delete",
    "Улучшение лица": "Face enhancement",
    "ФАЙЛ ВИДЕО": "VIDEO FILE",
    "Фронтальная": "Front",
    "Целиком": "Fit",
    "Чёткое": "Sharp",
    "ЯЗЫК": "LANGUAGE",
    "— берётся файл с телефона.": "— a file from the phone is used.",
    "— видео заполняет весь кадр, края немного обрезаются.": "— the video fills the whole frame, edges are slightly cropped.",
    "— видео помещается полностью, по краям могут быть чёрные поля.": "— the video fits fully, there may be black bars on the sides.",
    "— видео приходит по сети с вашего сервера.": "— the video comes over the network from your server.",
    // dynamic (JS-generated) full strings
    "Стандартная": "Standard",
    "Высокое разрешение": "High resolution",
    "Стабильная (для видео)": "Stable (for video)",
    "Быстрая": "Fast", "Точная": "Precise", "Обычное": "Normal", "Чёткое HD": "Sharp HD", "Плавная": "Smooth", "Максимум": "Maximum",
    "Мой голос": "My voice", "Импортированный голос": "Imported voice", "Клонированный · ElevenLabs": "Cloned · ElevenLabs",
    "Выбранный файл": "Selected file", "Идёт запись…": "Recording…", "Создаём голос…": "Creating voice…",
    "ВЫБЕРИТЕ ПАКЕТ": "CHOOSE A PACK", "СПИСАНИЕ ЗА МИНУТУ": "PER-MINUTE RATE", "ОПЕРАЦИИ": "OPERATIONS",
    "Фоновый режим": "Background mode", "Замена камеры": "Camera replacement",
    "Бонус за приглашение": "Referral bonus", "Бонус": "Bonus", "Корректировка": "Adjustment", "Возврат": "Refund",
    "Пополнение · Telegram": "Top up · Telegram",
    "Мужской · Глубокий": "Male · Deep", "Женский · Мягкий": "Female · Soft", "Робот · Нейтральный": "Robot · Neutral",
    "Не авторизован": "Not signed in", "Гость": "Guest",
    "Главная": "Home", "Пополнить": "Top up", "Выбрать": "Choose", "Загрузить фото лица": "Upload a face photo",
    "Будет подставлено вместо вашего": "Will replace yours", "Стандартная · среднее качество": "Standard · medium quality",
    "вкл": "on", "выкл": "off", "Клонированный голос": "Cloned voice", "Мужской": "Male", "Женский": "Female"
  };
  // substring replacements for strings with variable parts (dates, counts)
  var PH = [
    ["Сегодня,", "Today,"], ["Вчера,", "Yesterday,"],
    [" янв,", " Jan,"], [" фев,", " Feb,"], [" мар,", " Mar,"], [" апр,", " Apr,"], [" мая,", " May,"], [" июн,", " Jun,"],
    [" июл,", " Jul,"], [" авг,", " Aug,"], [" сен,", " Sep,"], [" окт,", " Oct,"], [" ноя,", " Nov,"], [" дек,", " Dec,"],
    ["Swaps/min", "Swaps/min"], [" мин", " min"]
  ];

  function lang() { return window.__i18nLang || "RU"; }
  function txNode(node) {
    var t = node.nodeValue; if (!t) return;
    var trimmed = t.trim(); if (!trimmed) return;
    var en = DICT[trimmed];
    if (en !== undefined) { node.nodeValue = t.replace(trimmed, en); return; }
    var out = t, changed = false;
    for (var i = 0; i < PH.length; i++) { if (PH[i][0] !== PH[i][1] && out.indexOf(PH[i][0]) >= 0) { out = out.split(PH[i][0]).join(PH[i][1]); changed = true; } }
    if (changed) node.nodeValue = out;
  }
  function walk(root) {
    try {
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var n; while ((n = w.nextNode())) txNode(n);
      var ph = root.querySelectorAll ? root.querySelectorAll("[placeholder]") : [];
      for (var i = 0; i < ph.length; i++) { var v = ph[i].getAttribute("placeholder"); var en = v && DICT[v.trim()]; if (en) ph[i].setAttribute("placeholder", en); }
    } catch (e) {}
  }
  var obs = new MutationObserver(function () { if (lang() !== "EN") return; apply(); });
  function apply() {
    if (lang() !== "EN") return;
    obs.disconnect();
    walk(document.body);
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  window.__applyI18n = apply;

  function boot() {
    // initial language from the engine (native app) — before React fills the DOM
    try { var c = window.SwapOnNative && JSON.parse(window.SwapOnNative.getConfig()); if (c && c.lang) window.__i18nLang = c.lang; } catch (e) {}
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    apply();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
