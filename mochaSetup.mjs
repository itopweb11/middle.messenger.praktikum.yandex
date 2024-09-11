const { JSDOM } = require('jsdom');
import { describe, it } from 'mocha';

// Создаем экземпляр JSDOM с базовой HTML-структурой
const jsdom = new JSDOM(`<body>
<div id="app"></div>
</body>`, {
    url: "https://example.org/", // Устанавливаем URL для контекста
    referrer: "https://example.com/", // Устанавливаем referrer
    contentType: "text/html", // Устанавливаем тип контента
    includeNodeLocations: true, // Включаем информацию о местоположении узлов
    storageQuota: 10000000, // Устанавливаем квоту хранилища
});

// Устанавливаем глобальные переменные для доступа к window и document в тестах
global.window = jsdom.window;
global.document = jsdom.window.document;

// Устанавливаем глобальные функции Mocha для использования в тестах
global.describe = describe;
global.it = it;