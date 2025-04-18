import { ISetupQrwcParams } from '../../index.interface';
export declare const setupQrwc: ({ coreIpAddress, maxReconnectAttempts, reconnectDelay, componentFilter, pollingInterval, onError, onDisconnect, onStartComplete, onControlsUpdated, onComponentsReceived }: ISetupQrwcParams) => {
    closeQrwc: () => void;
};
