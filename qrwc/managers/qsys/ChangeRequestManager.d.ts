import { IOnChangeRequest } from '../../index.interface';
import { EventManager } from '..';
export default class ChangeRequestManager {
    private eventManager;
    private changeRequestIds;
    constructor(eventManager: EventManager);
    private parseMessage;
    createChangeRequest(componentName: string, requestId: string, onChangeRequest: IOnChangeRequest): void;
    private addChangeRequest;
    private handleChangeRequest;
    private removeChangeRequest;
    private findChangeRequestById;
    private emitSuccessfulChangeRequest;
    private emitFailedChangeRequest;
    private isArrayNotEmpty;
    cleanUp(): void;
}
