import { IQrwcEvents } from '../../index.interface';
export default class EventManager {
    private emitter;
    constructor();
    on<T extends keyof IQrwcEvents, U extends IQrwcEvents[T]>(event: T, listener: U): void;
    emit<T extends keyof IQrwcEvents, U extends Parameters<IQrwcEvents[T]>>(event: T, ...args: U): void;
    removeListener(event: string, listener: (...args: unknown[]) => void): void;
    removeAllEventListeners(): void;
}
