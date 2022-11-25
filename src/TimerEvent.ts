export enum TimerEventType {
	tick = 'tick',
	complete = 'complete',
}

export interface TimerEventDetail {
	elapsedCount:number;
	repeatCount:number;
	restCount:number;
}

export class TimerEvent extends CustomEvent<TimerEventDetail> {
	constructor(type:TimerEventType, options:CustomEventInit<TimerEventDetail>) {
		super(type, options);
	}
}
