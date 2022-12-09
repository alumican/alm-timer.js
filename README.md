# Timer
特定の処理を一定間隔で指定回数だけ繰り返すことができるJavaScriptライブラリです。

## ✨ 主な特徴
- 遅延時間をミリ秒単位で指定可能（ブラウザ依存の誤差あり）
- 無制限の繰り返し回数を指定可能
- 一時停止と再開が可能
- イベント駆動

## 🚀 導入
以下のコードをによって読み込みます。
```js
<script src="https://cdn.jsdelivr.net/npm/alm-timer.js/dist/index.min.js"></script>
```

## ✍ 使い方
```js
// 5秒おきに10回繰り返すタイマーを作成する
const timer = new alm_timer.Timer(5000, 10);

// 繰り返すごとに呼ばれるイベントハンドラ
timer.addEventListener('tick', (event) => {
    console.log(`${event.detail.elapsedCount}回目`);
});

// 指定回数繰り返したら呼ばれるイベントハンドラ
timer.addEventListener('complete', (event) => {
    console.log('完了');
});

// タイマーを開始
timer.start();
```

### 主な機能
```js
// delay: ミリ秒（デフォルト 1000）
// repeatCount: 繰り返し回数（デフォルト 0 = 無制限）
timer = new alm_timer.Timer(delay, repeatCount);
```

```js
// タイマーを実行または再開します
timer.start();
```

```js
// タイマーを一時停止します
timer.stop();
```

```js
// タイマーを実行前の状態に戻して停止します
timer.reset();
```

```js
// タイマーを実行前の状態に戻して開始します
timer.restart();
```

### ドキュメント
[APIリファレンス](https://alumican.github.io/alm-timer.js/doc/)
