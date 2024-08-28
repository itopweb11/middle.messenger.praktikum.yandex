class SocketIO {
    // Массив состояний WebSocket
    private STATES = [
        'CONNECTING',
        'OPEN',
        'CLOSING',
        'CLOSED'
    ];
    private readonly socket: WebSocket | null = null; // Экземпляр WebSocket, инициализируется как null

    constructor(url: string, user_id?: string, chat_id?: string, token?: string) {
        let _url = url; // Инициализируем URL
        if (user_id)
            _url = _url + '/' + user_id; // Добавляем user_id к URL, если он передан
        if (chat_id)
            _url = _url + '/' + chat_id; // Добавляем chat_id к URL, если он передан
        if (token)
            _url = _url + '/' + token; // Добавляем token к URL, если он передан
        this.socket = this.init(_url); // Инициализируем WebSocket с построенным URL
    }

    // Метод для инициализации WebSocket
    private init = (url: string) => {

        return new WebSocket(url); // Создаем новый экземпляр WebSocket
    }

    // Метод для получения текущего состояния WebSocket
    public getState = () => {

        if (!this.socket) return this.STATES[3]; // Если сокет не инициализирован, возвращаем 'CLOSED'
        return this.STATES[this.socket.readyState]; // Возвращаем текущее состояние сокета
    }

    // Метод для добавления обработчика события открытого соединения
    public open = (callBack: () => void) => {

        this.socket?.addEventListener('open', callBack); // Добавляем обработчик события 'open'
    }

    // Метод для добавления обработчика события закрытия соединения
    public close = (callBack: (event: CloseEvent) => void) => {

        const funk = (event: CloseEvent) => {
            callBack(event); // Вызов колбека при закрытии соединения
        }
        this.socket?.addEventListener('close', funk); // Добавляем обработчик события 'close'
    }

    // Метод для добавления обработчика события получения сообщения
    public message = (callBack: (event: MessageEvent) => void) => {

        const funk = (event: MessageEvent) => {
            callBack(event); // Вызов колбека при получении сообщения
        }
        this.socket?.addEventListener('message', funk); // Добавляем обработчик события 'message'
    }

    // Метод для добавления обработчика события ошибки
    public error(callBack: (event: Event) => void) {
        this.socket?.addEventListener('error', callBack); // Добавляем обработчик события 'error'
    }

    // Метод для отправки текстового сообщения
    public sendMessage = (message: string) => {
        const _message = JSON.stringify(
            {
                content: message, // Содержимое сообщения
                type: "message" // Тип сообщения
            });
        this.socket?.send(_message); // Отправляем сообщение через сокет
    }

    // Метод для отправки файла
    public sendFile = (idResource: string) => {
        const _message = JSON.stringify(
            {
                content: idResource, // ID ресурса (файла)
                type: "file" // Тип сообщения
            });
        this.socket?.send(_message); // Отправляем сообщение через сокет
    }



    // Метод для отправки запроса на получение старых сообщений
    public sendRequestForgetMessage = (limit: number = 0) => {
        const _message = JSON.stringify(
            {

                content: String(limit), // Лимит старых сообщений
                type: "get old" // Тип сообщения
            });

        this.socket?.send(_message); // Отправляем сообщение через сокет
    }

    public ping = () => {
        // Проверяем, что сокет существует и его состояние открыто
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: "ping" // Тип сообщения
            }));
        } else {
            console.log('WebSocket не открыт. Состояние готовности:', this.socket?.readyState);
        }
    }
}

export default SocketIO;
