/*! alm-timer.js 1.0.5 (c) 2022 alumican, licensed under the MIT, more information https://github.com/alumican/alm-timer.js */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('alm_coreutil')) :
    typeof define === 'function' && define.amd ? define(['exports', 'alm_coreutil'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.alm_timer = global.alm_timer || {}, global.alm_coreutil));
})(this, (function (exports, alm_coreutil) { 'use strict';

    exports.TimerEventType = void 0;
    (function (TimerEventType) {
        /**
         * タイマーがカウントしたときに送出されるイベントタイプです。
         */
        TimerEventType["tick"] = "tick";
        /**
         * タイマーが設定回数までカウントしたときに送出されるイベントタイプです。
         */
        TimerEventType["complete"] = "complete";
    })(exports.TimerEventType || (exports.TimerEventType = {}));
    class TimerEvent extends CustomEvent {
        /**
         * Timerクラスから送出されるイベントオブジェクトです。
         * @param type - 送出されたイベントオブジェクトのイベントタイプです。
         * @param options - イベントオブジェクトに付随するプロパティです。
         */
        constructor(type, options) {
            super(type, options);
        }
    }

    class Timer extends EventTarget {
        // --------------------------------------------------
        //
        // CONSTRUCTOR
        //
        // --------------------------------------------------
        /**
         * 時間間隔と繰り返し回数を指定してタイマーオブジェクトを生成します。
         * @param delay - タイマーのカウント間隔（ミリ秒）です。
         * @param repeatCount - タイマーの繰り返し回数です。0以下を指定すると無限に繰り返します。
         */
        constructor(delay = 1000, repeatCount = 0) {
            super();
            this.timerHandler = () => {
                this.tStartTime = alm_coreutil.DateUtil.now();
                ++this.elapsedCount;
                let isCompleted = false;
                if (this.repeatCount > 0 && this.elapsedCount >= this.repeatCount) {
                    isCompleted = true;
                    this.stop();
                }
                else if (this.tDelay !== this.delay) {
                    this.startDelay(this.delay);
                }
                this.dispatch(exports.TimerEventType.tick);
                if (isCompleted) {
                    this.dispatch(exports.TimerEventType.complete);
                }
            };
            this.delay = delay;
            this.repeatCount = repeatCount;
            this.isRunning = false;
            this.tId = -1;
            this.reset();
            alm_coreutil.DateUtil.now();
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
        start() {
            if (this.isRunning)
                return;
            this.isRunning = true;
            this.tStartTime = alm_coreutil.DateUtil.now();
            this.startDelay(this.tRestTime !== -1 ? this.tRestTime : this.delay);
        }
        /**
         * 起動中のタイマーを一時停止します。
         */
        stop() {
            if (!this.isRunning)
                return;
            this.isRunning = false;
            this.tRestTime = alm_coreutil.DateUtil.now() - this.tStartTime;
            this.stopDelay();
        }
        /**
         * タイマーの残り時間および既に繰り返している回数をリセットします。
         * 起動中のタイマーは停止されます。
         */
        reset() {
            this.stop();
            this.elapsedCount = 0;
            this.tRestTime = -1;
        }
        /**
         * タイマーをリセットした上で開始します。
         */
        restart() {
            this.reset();
            this.start();
        }
        startDelay(delay) {
            this.stopDelay();
            this.tDelay = delay;
            this.tId = window.setInterval(this.timerHandler, this.tDelay);
        }
        stopDelay() {
            if (this.tId !== -1) {
                clearInterval(this.tId);
                this.tId = -1;
            }
        }
        dispatch(eventType) {
            this.dispatchEvent(new TimerEvent(eventType, {
                detail: {
                    elapsedCount: this.elapsedCount,
                    repeatCount: this.repeatCount,
                    restCount: this.getRestCount(),
                },
            }));
        }
        /**
         * タイマーが実行中かどうかを取得します。
         * @return - タイマーが実行中の場合はtrue、それ以外の場合はfalseを返します。
         */
        getIsRunning() {
            return this.isRunning;
        }
        /**
         * タイマーのカウント間隔（ミリ秒）を取得します。
         * @return - タイマーのカウント間隔（ミリ秒）です。
         */
        getDelay() {
            return this.delay;
        }
        /**
         * タイマーのカウント間隔（ミリ秒）を設定します。
         * @param delay - タイマーのカウント間隔（ミリ秒）です。
         */
        setDelay(delay) {
            this.delay = delay;
        }
        /**
         * タイマーの経過時間（ミリ秒）を取得します。
         * タイマーがカウントをおこなうごとに0にリセットされます。
         * @return - タイマーの経過時間（ミリ秒）です。
         */
        getElapsedTime() {
            return alm_coreutil.DateUtil.now() - this.tStartTime;
        }
        /**
         * タイマーが次にカウントをおこなうまでの残り時間（ミリ秒）を取得します。
         * @return - タイマーの残り時間（ミリ秒）です。
         */
        getRestTime() {
            return this.delay - this.getElapsedTime();
        }
        /**
         * タイマーの現在のカウント回数を取得します。
         * @return - 現在のカウント回数です。
         */
        getElapsedCount() {
            return this.elapsedCount;
        }
        /**
         * タイマーの設定されたカウント回数を取得します。
         * @return - 設定されたカウント回数です。
         */
        getRepeatCount() {
            return this.repeatCount;
        }
        /**
         * タイマーの設定されたカウント回数を設定します。
         * @param count - 設定されたカウント回数です。
         */
        setRepeatCount(count) {
            this.repeatCount = count;
        }
        /**
         * タイマーの残りのカウント回数を設定します。
         * @return - 残りのカウント回数です。
         */
        getRestCount() {
            return this.repeatCount - this.elapsedCount;
        }
    }

    exports.Timer = Timer;
    exports.TimerEvent = TimerEvent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
