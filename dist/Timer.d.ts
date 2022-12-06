export declare class Timer extends EventTarget {
    /**
     * 時間間隔と繰り返し回数を指定してタイマーオブジェクトを生成します。
     * @param delay - タイマーのカウント間隔（ミリ秒）です。
     * @param repeatCount - タイマーの繰り返し回数です。0以下を指定すると無限に繰り返します。
     */
    constructor(delay?: number, repeatCount?: number);
    /**
     * タイマーを実行します。
     * タイマーが停止中の場合は停止時の残りの時間から再開します。
     */
    start(): void;
    /**
     * 起動中のタイマーを一時停止します。
     */
    stop(): void;
    /**
     * タイマーの残り時間および既に繰り返している回数をリセットします。
     * 起動中のタイマーは停止されます。
     */
    reset(): void;
    /**
     * タイマーをリセットした上で開始します。
     */
    restart(): void;
    private startDelay;
    private stopDelay;
    private dispatch;
    private timerHandler;
    /**
     * タイマーが実行中かどうかを取得します。
     * @return - タイマーが実行中の場合はtrue、それ以外の場合はfalseを返します。
     */
    getIsRunning(): boolean;
    /**
     * タイマーのカウント間隔（ミリ秒）を取得します。
     * @return - タイマーのカウント間隔（ミリ秒）です。
     */
    getDelay(): number;
    /**
     * タイマーのカウント間隔（ミリ秒）を設定します。
     * @param delay - タイマーのカウント間隔（ミリ秒）です。
     */
    setDelay(delay: number): void;
    /**
     * タイマーの経過時間（ミリ秒）を取得します。
     * タイマーがカウントをおこなうごとに0にリセットされます。
     * @return - タイマーの経過時間（ミリ秒）です。
     */
    getElapsedTime(): number;
    /**
     * タイマーが次にカウントをおこなうまでの残り時間（ミリ秒）を取得します。
     * @return - タイマーの残り時間（ミリ秒）です。
     */
    getRestTime(): number;
    /**
     * タイマーの現在のカウント回数を取得します。
     * @return - 現在のカウント回数です。
     */
    getElapsedCount(): number;
    /**
     * タイマーの設定されたカウント回数を取得します。
     * @return - 設定されたカウント回数です。
     */
    getRepeatCount(): number;
    /**
     * タイマーの設定されたカウント回数を設定します。
     * @param count - 設定されたカウント回数です。
     */
    setRepeatCount(count: number): void;
    /**
     * タイマーの残りのカウント回数を設定します。
     * @return - 残りのカウント回数です。
     */
    getRestCount(): number;
    private isRunning;
    private delay;
    private elapsedCount;
    private repeatCount;
    private tStartTime;
    private tRestTime;
    private tDelay;
    private tId;
}
