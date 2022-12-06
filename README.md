# Timer
特定の処理を一定間隔で指定回数だけ繰り返すことができるJavaScriptライブラリです。

## ✨ 主な特徴
- 遅延時間をミリ秒単位で指定可能（ブラウザ依存の誤差あり）
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

// 繰り返し終わったら呼ばれるイベントハンドラ
timer.addEventListener('complete', (event) => {
    console.log('完了');
});

// タイマーを開始
timer.start();
```

## 📗 ドキュメント
APIリファレンス  
https://alumican.github.io/alm-timer.js/
