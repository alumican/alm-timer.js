/*! alm-timer.js 1.0.0 (c) 2022 alumican, licensed under the MIT, more information https://github.com/alumican/alm-timer.js */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('alm')) :
    typeof define === 'function' && define.amd ? define(['exports', 'alm'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.alm = global.alm || {}, global.alm));
})(this, (function (exports, alm) { 'use strict';

    exports.TimerEventType = void 0;
    (function (TimerEventType) {
        TimerEventType["tick"] = "tick";
        TimerEventType["complete"] = "complete";
    })(exports.TimerEventType || (exports.TimerEventType = {}));
    class TimerEvent extends CustomEvent {
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
        constructor(interval = 1000, repeatCount = 0) {
            super();
            this.timerHandler = () => {
                this.tStartTime = alm.DateUtil.now();
                ++this.elapsedCount;
                let isCompleted = false;
                if (this.repeatCount > 0 && this.elapsedCount >= this.repeatCount) {
                    isCompleted = true;
                    this.stop();
                }
                else if (this.tInterval !== this.interval) {
                    this.startInterval(this.interval);
                }
                this.dispatch(exports.TimerEventType.tick);
                if (isCompleted) {
                    this.dispatch(exports.TimerEventType.complete);
                }
            };
            this.interval = interval;
            this.repeatCount = repeatCount;
            this.isRunning = false;
            this.tId = -1;
            this.reset();
            alm.DateUtil.now();
        }
        // --------------------------------------------------
        //
        // METHOD
        //
        // --------------------------------------------------
        start() {
            if (this.isRunning)
                return;
            this.isRunning = true;
            this.tStartTime = alm.DateUtil.now();
            this.startInterval(this.tRestTime !== -1 ? this.tRestTime : this.interval);
        }
        stop() {
            if (!this.isRunning)
                return;
            this.isRunning = false;
            this.tRestTime = alm.DateUtil.now() - this.tStartTime;
            this.stopInterval();
        }
        reset() {
            this.stop();
            this.elapsedCount = 0;
            this.tRestTime = -1;
        }
        restart() {
            this.reset();
            this.start();
        }
        startInterval(interval) {
            this.stopInterval();
            this.tInterval = interval;
            this.tId = window.setInterval(this.timerHandler, this.tInterval);
        }
        stopInterval() {
            if (this.tId !== -1) {
                clearInterval(this.tId);
                this.tId = -1;
            }
        }
        dispatch(eventType) {
            this.dispatchEvent(new TimerEvent(eventType, { detail: {
                    elapsedCount: this.elapsedCount,
                    repeatCount: this.repeatCount,
                    restCount: this.getRestCount(),
                } }));
        }
        getIsRunning() {
            return this.isRunning;
        }
        getInterval() {
            return this.interval;
        }
        setInterval(interval) {
            this.interval = interval;
        }
        getElapsedTime() {
            return alm.DateUtil.now() - this.tStartTime;
        }
        getRestTime() {
            return this.interval - this.getElapsedTime();
        }
        getElapsedCount() {
            return this.elapsedCount;
        }
        getRepeatCount() {
            return this.repeatCount;
        }
        setRepeatCount(count) {
            this.repeatCount = count;
        }
        getRestCount() {
            return this.repeatCount - this.elapsedCount;
        }
    }

    exports.Timer = Timer;
    exports.TimerEvent = TimerEvent;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
