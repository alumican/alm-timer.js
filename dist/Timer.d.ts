export declare class Timer extends EventTarget {
    constructor(interval?: number, repeatCount?: number);
    start(): void;
    stop(): void;
    reset(): void;
    restart(): void;
    private startInterval;
    private stopInterval;
    private dispatch;
    private timerHandler;
    getIsRunning(): boolean;
    getInterval(): number;
    setInterval(interval: number): void;
    getElapsedTime(): number;
    getRestTime(): number;
    getElapsedCount(): number;
    getRepeatCount(): number;
    setRepeatCount(count: number): void;
    getRestCount(): number;
    private isRunning;
    private interval;
    private elapsedCount;
    private repeatCount;
    private tStartTime;
    private tRestTime;
    private tInterval;
    private tId;
}
