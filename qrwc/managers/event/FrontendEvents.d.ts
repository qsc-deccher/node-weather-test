import { IEventEmitter } from '../../index.interface';
declare class FrontendEventEmitter implements IEventEmitter {
    private eventTarget;
    private listeners;
    constructor();
    on(event: string, listener: (...args: unknown[]) => void): void;
    emit(event: string, ...args: unknown[]): void;
    removeListener(event: string, listener: (...args: unknown[]) => void): void;
    removeAllListeners(): void;
}
export default FrontendEventEmitter;
