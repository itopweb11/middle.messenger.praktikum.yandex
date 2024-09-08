import { responseHasError } from "../utils/apiUtils.ts"; // Импортируем утилиту для проверки ошибок в ответах API
import ResourcesApi from "../chatApi/resourcesApi.ts"; // Импортируем класс для работы с API ресурсов

// Создаем экземпляр ResourcesApi с базовым URL для ресурсов
const resourcesApi = new ResourcesApi('/resources');

// Асинхронная функция для загрузки ресурса
const uploadResource = async (file: FormData) => {
    // Вызываем метод API для загрузки ресурса
    const result = await resourcesApi.uploadResource(file);
    // Проверяем наличие ошибок в ответе
    const error = responseHasError(result);
    // Если есть ошибка, выбрасываем исключение
    if (error) throw Error(error);
    // Если ошибок нет, возвращаем данные результата
    if (!error) return result.data;
}

// Экспортируем функцию для использования в других модулях
export {uploadResource}


