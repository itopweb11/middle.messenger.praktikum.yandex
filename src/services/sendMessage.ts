import { IChat, IUser } from "../typesModels/typesModels.ts"; // Импортируем интерфейсы для чата и пользователя
import { BASE_SOCKET_CHAT } from "../config.ts"; // Импортируем базовый URL для WebSocket чата
import SocketIO from "../chatApi/socketApi.ts"; // Импортируем класс для работы с WebSocket

// Функция для подключения к чату и получения сообщений
export const connectMessages = (chat: IChat, currentUser: IUser) => {
    // Проверяем, есть ли ID чата
    if (!chat.id) return;
    // Проверяем, есть ли пользователи в чате
    if (!chat.users) return;
    // Проверяем, что в чате больше одного пользователя
    if (chat.users.length < 2) return chat;
    // Проверяем, открыто ли уже соединение
    if (chat.connection && chat.connection.getState() === 'OPEN') return;

    // Создаем новое соединение WebSocket
    const socket = new SocketIO(BASE_SOCKET_CHAT, currentUser.id, String(chat.id), chat.token);
    // Открываем соединение
    socket.open(() => {
        getAllNewMessage(0, chat); // Получаем все новые сообщения при открытии соединения
        // Устанавливаем интервал для отправки ping-сообщений каждые 5 секунд
        setInterval(() => { socket.ping(); }, 5000);
    });

    // Обрабатываем входящие сообщения
    socket.message((event: MessageEvent) => {
        let message = null;
        try {message = JSON.parse(event.data); // Парсим входящее сообщение
        } catch (e) {alert('Неизвестное сообщение!')} // Обработка ошибки парсинга
        if (!message) return; // Если сообщение не удалось распарсить, выходим
        // Обрабатываем сообщения типа 'message', массивы сообщений и файлы
        if (message.type === 'message' || Array.isArray(message) || message.type === 'file') {
            if (!chat.messages) chat.messages = []; // Инициализируем массив сообщений, если он отсутствует
            if (Array.isArray(message)) {message.reverse(); // Реверсируем массив сообщений
                chat.messages = chat.messages.concat(message); // Добавляем новые сообщения
            } else {chat.messages.push(message)} // Добавляем одно сообщение


            // Если текущий чат совпадает с чатом, в который пришло сообщение, обновляем состояние
            if (chat.id === window.store.getState().currentChat?.id) {window.store.set({ currentChat: chat });
            } else {
                // Если чат не активен, увеличиваем счетчик непрочитанных сообщений
                const foundedChat = window.store.getState().chats?.find(_chat => _chat.id === chat.id);
                if (foundedChat) {foundedChat.unreadCount += 1; // Увеличиваем количество непрочитанных сообщений
                    window.store.set({ chats: window.store.getState().chats }); // Обновляем состояние чатов
                }
            }
            // Прокручиваем страницу вниз, если элемент существует
            const element = document.querySelector('.scroll-bottom');
            if (element) element.scrollIntoView({ behavior: 'auto', block: 'end' });
        }
    });

    chat.connection = socket; // Сохраняем соединение в объекте чата
    return chat; // Возвращаем объект чата
}

// Функция для отправки сообщения в текущий чат
export const sendMessage = (message: string) => {
    const chat = window.store.getState().currentChat; // Получаем текущий чат
    const user = window.store.getState().user; // Получаем текущего пользователя
    if (!chat) throw Error('Select Chat!'); // Если чат не выбран, выбрасываем ошибку

    // Если соединение открыто, отправляем сообщение
    if (chat.connection && chat.connection.getState() === 'OPEN') {chat.connection.sendMessage(message);
    } else if (user) {
        // Если соединение не открыто, подключаемся к чату
        connectMessages(chat, user);
    }
}

// Функция для получения всех новых сообщений в чате
export const getAllNewMessage = (limit: number, chat: IChat | null) => {
    // Если чат не выбран, выбрасываем ошибку
    if (!chat) throw Error('Select Chat!');
    if (chat.connection) {
        // Отправляем запрос на получение новых сообщений
        chat.connection.sendRequestForgetMessage(limit);
        // Сбрасываем счетчик непрочитанных сообщений
        chat.unreadCount = 0;
        // Обновляем состояние текущего чата в хранилище
        window.store.set({ currentChat: { ...chat } });
    }
}
