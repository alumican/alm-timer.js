import {TimerEvent, TimerEventType} from "./TimerEvent";
import {DateUtil} from "alm";

export class Timer extends EventTarget {

	// --------------------------------------------------
	//
	// CONSTRUCTOR
	//
	// --------------------------------------------------

	constructor(interval:number = 1000, repeatCount:number = 0) {
		super();
		this.interval = interval;
		this.repeatCount = repeatCount;
		this.isRunning = false;
		this.tId = -1;
		this.reset();
		DateUtil.now();
	}





	// --------------------------------------------------
	//
	// METHOD
	//
	// --------------------------------------------------

	public start():void {
		if (this.isRunning) return;
		this.isRunning = true;
		this.tStartTime = DateUtil.now();
		this.startInterval(this.tRestTime !== -1 ? this.tRestTime : this.interval);
	}

	public stop():void {
		if (!this.isRunning) return;
		this.isRunning = false;
		this.tRestTime = DateUtil.now() - this.tStartTime;
		this.stopInterval();
	}

	public reset():void {
		this.stop();
		this.elapsedCount = 0;
		this.tRestTime = -1;
	}

	public restart():void {
		this.reset();
		this.start();
	}





	private startInterval(interval:number):void {
		this.stopInterval();
		this.tInterval = interval;
		this.tId = window.setInterval(this.timerHandler, this.tInterval);
	}

	private stopInterval():void {
		if (this.tId !== -1) {
			clearInterval(this.tId);
			this.tId = -1;
		}
	}

	private dispatch(eventType:TimerEventType):void {
		this.dispatchEvent(new TimerEvent(eventType, { detail: {
				elapsedCount: this.elapsedCount,
				repeatCount: this.repeatCount,
				restCount: this.getRestCount(),
			}}));
	}

	private timerHandler = ():void => {
		this.tStartTime = DateUtil.now();
		++this.elapsedCount;
		let isCompleted:boolean = false;
		if (this.repeatCount > 0 && this.elapsedCount >= this.repeatCount) {
			isCompleted = true;
			this.stop();
		} else if (this.tInterval !== this.interval) {
			this.startInterval(this.interval);
		}
		this.dispatch(TimerEventType.tick);
		if (isCompleted) {
			this.dispatch(TimerEventType.complete);
		}
	};





	public getIsRunning():boolean {
		return this.isRunning;
	}

	public getInterval():number {
		return this.interval;
	}

	public setInterval(interval:number):void {
		this.interval = interval;
	}

	public getElapsedTime():number {
		return DateUtil.now() - this.tStartTime;
	}

	public getRestTime():number {
		return this.interval - this.getElapsedTime();
	}

	public getElapsedCount():number {
		return this.elapsedCount;
	}

	public getRepeatCount():number {
		return this.repeatCount;
	}

	public setRepeatCount(count:number):void {
		this.repeatCount = count;
	}

	public getRestCount():number {
		return this.repeatCount - this.elapsedCount;
	}





	// --------------------------------------------------
	//
	// MEMBER
	//
	// --------------------------------------------------

	private isRunning:boolean;
	private interval:number;
	private elapsedCount:number;
	private repeatCount:number;
	private tStartTime:number;
	private tRestTime:number;
	private tInterval:number;
	private tId:number;
}
