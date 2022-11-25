export declare enum TimerEventType {
    tick = "tick",
    complete = "complete"
}
export interface TimerEventDetail {
    elapsedCount: number;
    repeatCount: number;
    restCount: number;
}
export declare class TimerEvent extends CustomEvent<TimerEventDetail> {
    constructor(type: TimerEventType, options: CustomEventInit<TimerEventDetail>);
}
