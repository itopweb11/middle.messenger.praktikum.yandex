import HTTPPath from "../helpers/http.ts"; // Импортируем класс HTTPPath для выполнения HTTP-запросов

export class ResourcesApi { // Класс для работы с API ресурсов
    private httpPath = new HTTPPath(); // Экземпляр класса HTTPPath для отправки HTTP-запросов
    private readonly mainUrl: string = '/resources'; // Основной URL-адрес API для ресурсов

    constructor(mainUrl?: string) { // Конструктор класса
        if (mainUrl) this.mainUrl = mainUrl; // Если передан mainUrl, устанавливаем его
    }

    // Метод для загрузки ресурса
    public uploadResource(file: FormData) {
        return this.httpPath.post(this.mainUrl, { data: file }); // Отправляем POST-запрос на /resources с данными файла
    }
}

export default ResourcesApi;
