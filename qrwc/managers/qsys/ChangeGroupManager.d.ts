import { EventManager, PollingManager } from '..';
import { IChange, IComponent, IComponentChangeGroup, IPollingInterval } from '../../index.interface';
export default class ChangeGroupManager {
    private send;
    private handleControlChanges;
    private eventManager;
    private newPollingRate?;
    private changeGroupUpdateRequests;
    private changeGroupId;
    private pollingManager;
    private changeGroupComponents;
    changeGroupName: string;
    constructor(changeGroupName: string, send: (data: object) => void, handleControlChanges: (changes: IChange[]) => void, eventManager: EventManager, newPollingRate?: IPollingInterval);
    get id(): string;
    get name(): string;
    set name(name: string);
    get components(): IComponentChangeGroup[];
    get polling(): PollingManager | null;
    initPollingManager(): void;
    private parseMessage;
    groomComponents(components: {
        [componentName: string]: IComponent;
    }): IComponentChangeGroup[];
    createChangeGroup(components: IComponentChangeGroup[]): void;
    addComponentToChangeGroup(component: IComponentChangeGroup): void;
    private handleChangeGroupResponse;
    cleanUp(): void;
}
