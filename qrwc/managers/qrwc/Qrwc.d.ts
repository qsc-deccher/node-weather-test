import { WebSocketManager, ControlManager, EventManager, ChangeRequestManager, ChangeGroupManager, ComponentManager, StartManager } from '..';
import { IComponent, IComponentFilter, IStartOptions, IQrwcEvents } from '../../index.interface';
export declare class Qrwc {
    webSocketManager: WebSocketManager | null;
    startManager: StartManager | null;
    controlManager: ControlManager;
    eventManager: EventManager;
    componentManager: ComponentManager;
    changeGroupManagers: {
        [key: string]: ChangeGroupManager;
    };
    changeRequestManager: ChangeRequestManager;
    constructor();
    get components(): Record<string, IComponent>;
    attachWebSocket(socket: WebSocket): Promise<void>;
    start({ componentFilter, pollingInterval }?: IStartOptions): Promise<void>;
    private createStartManager;
    private createControlManager;
    private createComponentManager;
    validateComponentFilter(componentFilter: IComponentFilter): boolean;
    validatePollingInterval(pollingInterval: number): boolean;
    checkWebSocketManagerInitialized(): boolean;
    checkStartManagerInitialized(): boolean;
    getReadyState(): number;
    close(): void;
    on<T extends keyof IQrwcEvents, U extends IQrwcEvents[T]>(event: T, listener: U): void;
    qrwcCleanUp(): void;
}
