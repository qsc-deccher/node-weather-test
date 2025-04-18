import { IComponent, IServerMessage } from '../../index.interface';
import { JSONRPCMessage } from '../../utils';
export default class ComponentManager {
    private onMessage;
    private emit;
    private websocketSend;
    private componentFilter?;
    componentList: Record<string, IComponent>;
    componentNames: string[];
    private getComponentsId;
    constructor(onMessage: (event: string, listener: (message: IServerMessage) => void) => void, emit: (event: string, ...args: unknown[]) => void, websocketSend: (message: JSONRPCMessage) => void, componentFilter?: (component: IComponent) => boolean);
    getComponentNames(): string[];
    private setComponentNames;
    private parseMessage;
    getComponents(): void;
    private setComponentList;
    private handleComponentGetResponse;
}
