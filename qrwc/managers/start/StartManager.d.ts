import { JSONRPCMessage } from '../../utils';
import { IComponentFilter, IPollingInterval } from '../../index.interface';
import { ControlManager, EventManager, ComponentManager } from '..';
export default class StartManager {
    private websocketSend;
    private componentManager;
    private controlManager;
    private eventManager;
    private newPollingRate?;
    private getControlIds;
    private startChangeGroupId;
    private changeGroupManager;
    componentFilter: IComponentFilter | null;
    constructor(websocketSend: (message: JSONRPCMessage) => void, componentManager: ComponentManager, controlManager: ControlManager, eventManager: EventManager, newPollingRate?: IPollingInterval);
    private parseMessage;
    start(): void;
    private getControls;
    private handleControlGetResponse;
    private createStartChangeGroup;
    private createStartChangePollingManager;
    cleanUp(): void;
}
