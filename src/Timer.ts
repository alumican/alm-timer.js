import { TimerEvent, TimerEventType } from './TimerEvent';
import { DateUtil } from 'alm_coreutil';

/**
 * 指定した時間だけ遅延させて処理をおこなうためのクラスです。
 * 遅延時間と繰り返し回数を指定することができます。
 */
export class Timer extends EventTarget {
	// --------------------------------------------------
	//
	// CONSTRUCTOR
	//
	// --------------------------------------------------

	/**
	 * 遅延と繰り返し回数を指定してタイマーオブジェクトを生成します。
	 * @param delay - タイマーの遅延（ミリ秒）です。
	 * @param repeatCount - タイマーの繰り返し回数です。0以下を指定すると無限に繰り返します。
	 */
	constructor(delay: number = 1000, repeatCount: number = 0) {
		super();
		this.delay = delay;
		this.repeatCount = repeatCount;
		this.isRunning = false;
		this.isComplete = false;
		this.tId = -1;
		this.reset();
	}

	// --------------------------------------------------
	//
	// METHOD
	//
	// --------------------------------------------------

	/**
	 * タイマーを実行します。
	 * タイマーが停止中の場合は停止時の残りの時間から再開します。
	 */
	public start(): void {
		if (this.isComplete) return;
		if (this.isRunning) return;
		this.isRunning = true;
		this.tStartTime = this.tRestTime !== -1 ? DateUtil.now() - this.tElapsedTime : DateUtil.now();
		this.startDelay(this.tRestTime !== -1 ? this.tRestTime : this.delay);
		this.dispatch(TimerEventType.start);
	}

	/**
	 * 起動中のタイマーを一時停止します。
	 */
	public stop(): void {
		if (!this.isRunning) return;
		this.stopInternal();
		this.dispatch(TimerEventType.stop);
	}

	private stopInternal(): void {
		if (!this.isRunning) return;
		this.isRunning = false;
		this.tElapsedTime = DateUtil.now() - this.tStartTime;
		this.tRestTime = this.delay - this.tElapsedTime;
		this.stopDelay();
	}

	/**
	 * タイマーの残り時間および既に繰り返している回数をリセットします。
	 * 起動中のタイマーは停止されます。
	 */
	public reset(): void {
		this.stopInternal();
		this.isComplete = false;
		this.elapsedCount = 0;
		this.tStartTime = 0;
		this.tElapsedTime = 0;
		this.tRestTime = -1;
		this.dispatch(TimerEventType.reset);
	}

	/**
	 * タイマーをリセットした上で開始します。
	 */
	public restart(): void {
		this.reset();
		this.start();
	}

	/**
	 * setInterval制御
	 */
	private startDelay(delay: number): void {
		this.stopDelay();
		this.tDelay = delay;
		this.tId = window.setInterval(this.timerHandler, this.tDelay);
	}

	private stopDelay(): void {
		if (this.tId !== -1) {
			clearInterval(this.tId);
			this.tId = -1;
		}
	}

	private timerHandler = (): void => {
		++this.elapsedCount;
		let isComplete: boolean = false;
		if (this.repeatCount > 0 && this.elapsedCount >= this.repeatCount) {
			isComplete = true;
			this.isRunning = false;
			this.tElapsedTime = this.tDelay;
			this.stopDelay();
		} else {
			this.tStartTime = DateUtil.now();
			if (this.tDelay !== this.delay) {
				this.startDelay(this.delay);
			}
		}
		this.dispatch(TimerEventType.count);
		if (isComplete) {
			this.isComplete = true;
			this.dispatch(TimerEventType.complete);
		}
	};

	/**
	 * イベント管理
	 */
	private dispatch(eventType: TimerEventType): void {
		this.dispatchEvent(
			new TimerEvent(eventType, {
				detail: {
					elapsedCount: this.elapsedCount,
					repeatCount: this.repeatCount,
					restCount: this.getRestCount(),
				},
			}),
		);
	}

	/**
	 * タイマーが実行中かどうかを取得します。
	 * @return - タイマーが実行中の場合はtrue、それ以外の場合はfalseを返します。
	 */
	public getIsRunning(): boolean {
		return this.isRunning;
	}

	/**
	 * タイマーが完了済みかどうかを取得します。
	 * @return - タイマーが完了済みの場合はtrue、それ以外の場合はfalseを返します。
	 */
	public getIsComplete(): boolean {
		return this.isComplete;
	}

	/**
	 * タイマーのカウント間隔（ミリ秒）を取得します。
	 * @return - タイマーのカウント間隔（ミリ秒）です。
	 */
	public getDelay(): number {
		return this.delay;
	}

	/**
	 * タイマーのカウント間隔（ミリ秒）を設定します。
	 * @param delay - タイマーのカウント間隔（ミリ秒）です。
	 */
	public setDelay(delay: number): void {
		this.delay = delay;
	}

	/**
	 * タイマーの経過時間（ミリ秒）を取得します。
	 * タイマーがカウントをおこなうごとに0にリセットされます。
	 * @return - タイマーの経過時間（ミリ秒）です。
	 */
	public getElapsedTime(): number {
		return this.isRunning ? DateUtil.now() - this.tStartTime : this.tElapsedTime;
	}

	/**
	 * タイマーが次にカウントをおこなうまでの残り時間（ミリ秒）を取得します。
	 * @return - タイマーの残り時間（ミリ秒）です。
	 */
	public getRestTime(): number {
		return this.delay - this.getElapsedTime();
	}

	/**
	 * タイマーの現在のカウント回数を取得します。
	 * @return - 現在のカウント回数です。
	 */
	public getElapsedCount(): number {
		return this.elapsedCount;
	}

	/**
	 * タイマーの設定されたカウント回数を取得します。
	 * @return - 設定されたカウント回数です。
	 */
	public getRepeatCount(): number {
		return this.repeatCount;
	}

	/**
	 * タイマーの設定されたカウント回数を設定します。
	 * @param count - 設定されたカウント回数です。
	 */
	public setRepeatCount(count: number): void {
		this.repeatCount = count;
	}

	/**
	 * タイマーの残りのカウント回数を設定します。
	 * @return - 残りのカウント回数です。
	 */
	public getRestCount(): number {
		return this.repeatCount - this.elapsedCount;
	}

	// --------------------------------------------------
	//
	// MEMBER
	//
	// --------------------------------------------------

	private isRunning: boolean;
	private isComplete: boolean;
	private delay: number;
	private elapsedCount: number;
	private repeatCount: number;
	private tStartTime: number;
	private tElapsedTime: number;
	private tRestTime: number;
	private tDelay: number;
	private tId: number;
}
