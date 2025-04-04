import { IPollingInterval } from '../../index.interface';
export default class PollingManager {
    private send;
    private newPollingInterval?;
    private pollInterval;
    private intervalId;
    private socketPollId;
    changeGroupId: string;
    constructor(changeGroupId: string, send: (data: object) => void, newPollingInterval?: IPollingInterval);
    get interval(): number;
    set interval(interval: number);
    private isValidInterval;
    start(): void;
    stop(): void;
    private poll;
    private incrementSocketPollId;
    cleanUp(): void;
}
