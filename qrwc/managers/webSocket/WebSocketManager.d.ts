import { EventManager } from '..';
export default class WebSocketManager {
    private socket;
    eventManager: EventManager;
    constructor(socket: WebSocket, eventManager: EventManager);
    onMessage(event: MessageEvent): void;
    private onError;
    private onClose;
    private isOpen;
    send: (data: object) => void;
    getReadyState(): number;
    close(code?: number, reason?: string): void;
    cleanUp(): void;
}
