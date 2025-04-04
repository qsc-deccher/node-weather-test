export default class EventManager {
    private emitter;
    initializeEmitter(): Promise<void>;
    on(event: string, listener: (...args: unknown[]) => void): void;
    emit(event: string, ...args: unknown[]): void;
    removeListener(event: string, listener: (...args: unknown[]) => void): void;
    removeAllEventListeners(): void;
}
