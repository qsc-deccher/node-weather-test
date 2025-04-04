import { WebSocketManager, ControlManager, EventManager, ChangeRequestManager, ChangeGroupManager, ComponentManager, StartManager } from '..';
import { IComponent, IComponentFilter, IStartOptions } from '../../index.interface';
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
    private initialize;
    get components(): {
        [componentName: string]: IComponent;
    };
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
    on(event: string, listener: (...args: unknown[]) => void): void;
    qrwcCleanUp(): void;
}
