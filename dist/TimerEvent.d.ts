export declare enum TimerEventType {
    /**
     * タイマーがカウントしたときに送出されるイベントタイプです。
     */
    count = "count",
    /**
     * タイマーが設定回数までカウントしたときに送出されるイベントタイプです。
     */
    complete = "complete",
    /**
     * タイマーを開始したときに送出されるイベントタイプです。
     */
    start = "start",
    /**
     * タイマーを停止したときに送出されるイベントタイプです。
     */
    stop = "stop",
    /**
     * タイマーをリセットしたときに送出されるイベントタイプです。
     */
    reset = "reset"
}
export interface TimerEventDetail {
    /**
     * タイマーの経過時間（ミリ秒）です。
     */
    elapsedCount: number;
    /**
     * タイマーの設定カウント回数です。
     */
    repeatCount: number;
    /**
     * タイマーの残りカウント回数です。
     */
    restCount: number;
}
export declare class TimerEvent extends CustomEvent<TimerEventDetail> {
    /**
     * Timerクラスから送出されるイベントオブジェクトです。
     * @param type - 送出されたイベントオブジェクトのイベントタイプです。
     * @param options - イベントオブジェクトに付随するプロパティです。
     */
    constructor(type: TimerEventType, options: CustomEventInit<TimerEventDetail>);
}
