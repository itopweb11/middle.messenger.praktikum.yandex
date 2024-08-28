import { BASE_URLS } from "../config.ts"; // Импортируем базовые URL-адреса из конфигурации
import Router from "../helpers/router.ts"; // Импортируем маршрутизатор для управления навигацией
import { IResult } from "../helpers/http.ts"; // Импортируем интерфейс для результата HTTP-запроса

// Функция для проверки наличия ошибок в ответе API
export const responseHasError = (response: IResult) => {
    switch (response.status) { // Проверяем статус ответа
        case 200:
            return false; // Если статус 200, ошибок нет
        case 500:
            Router.getRouter().go(BASE_URLS['page-500']); // Если статус 500, перенаправляем на страницу 500 (внутренняя ошибка сервера)
            break;
        default: {
            // Обработка других статусов
            const error = (response.data as unknown as { reason: string }).reason; // Извлекаем сообщение об ошибке из ответа
            if (error.includes('Cookie')) {console.log(error, 'Пожалуйста, войдите в систему!'); // Если ошибка связана с куками, уведомляем пользователя
                return error; // Возвращаем сообщение об ошибке
            } else {console.log(error)} // Обработка других ошибок (можно улучшить)
            return error; // Возвращаем сообщение об ошибке
        }
    }
}

