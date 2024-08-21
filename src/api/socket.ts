//'wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>'
class SocketIO {
    private STATES = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
    private readonly socket: WebSocket | null = null;

    constructor(url: string, user_id?: string, chat_id?: string, token?: string) {
        let _url = url;
        if (user_id) _url = _url + '/' + user_id;
        if (chat_id) _url = _url + '/' + chat_id;
        if (token) _url = _url + '/' + token;
        this.socket = this.init(_url)
    }

    private init = (url: string) => {
        return new WebSocket(url);
    }

    public getState = () => {
        if (!this.socket) return this.STATES[3];
        return this.STATES[this.socket.readyState];
    }
    public open = (callBack: () => void) => {
        this.socket?.addEventListener('open', callBack);
    }

    public close = (callBack: (event: CloseEvent) => void) => {
        const funk = (event: CloseEvent) => {
            callBack(event);

        }
        this.socket?.addEventListener('close', funk);
    }

    public message = (callBack: (event: MessageEvent) => void) => {
        const funk = (event: MessageEvent) => {
            callBack(event);
        }
        this.socket?.addEventListener('message', funk);
    }

    public error(callBack: (event: Event) => void) {
        this.socket?.addEventListener('error', callBack);
    }

    public sendMessage = (message: string) => {
        const _message = JSON.stringify(
            {
                content: message,
                type: "message"
            })
        this.socket?.send(_message);
    }
    public sendFile = (idResource: string) => {
        const _message = JSON.stringify(
            {
                content: idResource,
                type: "file"
            })
        this.socket?.send(_message);
    }
    public sendRequestForgetMessage = (limit: number = 0) => {
        const _message = JSON.stringify(
            {
                content: String(limit),
                type: "get old"
            })
        this.socket?.send(_message);
    }

    public ping = () => {
        this.socket?.send(JSON.stringify({
            type: "ping"
        }));
    }


}

export default SocketIO;
