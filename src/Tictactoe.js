//react ライブラリから useState関数（フック）を読み込み
import { useState } from 'react';
//cssの読み込み
import './Tictactoe.css';

//Square関数を定義（Tic-Tac-Toeボード内の個々のマスを表す）
//value（X、O、またはnull）と onSquareClick（クリックイベントを処理するための関数）の2つのプロップを受け取る
function Square({ value, onSquareClick }) {
  //returnで呼び出し元に値を返す
  return (
    //JSX 要素はJavaScriptコードとHTMLタグの組み合わせ
    //className="square" はクラス属性を指定
    //ボタンを描画し、その中に value を表示
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

//Board関数を定義（Tic-Tac-Toeボード全体を表す）
//xIsNext（次がXのプレイヤーかどうかを示すブール値）、squares（ボードの状態）、onPlay（プレイヤーの移動を処理する関数）の3つのプロップを受け取る
function Board({ xIsNext, squares, onPlay }) {
  //handleClick関数を定義（クリックされたときにボードの状態を更新する）
  function handleClick(i) {
    //calculateWinner 関数で勝者を計算し、ゲームのステータスを表示する
    //勝者がいるか、またはすでにマスが埋まっているかを確認
    if (calculateWinner(squares) || squares[i]) {
      //trueの場合は何も返さないで終了する
      return;
    }
    // 現在のボード状態をコピーして新しい配列を作成
    const nextSquares = squares.slice();
    // xIsNext が true なら 'X'、そうでなければ 'O' をマスにセットする
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // 親コンポーネントに更新されたボード情報を伝える
    onPlay(nextSquares);
  }

  // calculateWinner 関数を使用して現在のボードの勝者を計算
  const winner = calculateWinner(squares);
  // ゲームのステータスを表示する変数
  let status;
  // 勝者がいる場合は 'Winner: ' と勝者のシンボルを表示、そうでなければ 'Next player: ' と次のプレイヤーのシンボルを表示
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    //単一のJSX要素を返すためのフラグメント
    <>
      <div className="status">{status}</div>
      {/* 3つの行のボードを表示する div 要素 */}
      <div className="board-row">
        {/* Squareコンポーネントの読み込み */}
        {/* 各Squareコンポーネントにpropsとしてvalueを追加し、クリック時のハンドラを設定 */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

//exportで外部アクセス可能にする
//defaultでこのコードを使用する他のファイルに、これがこのファイルのメイン関数であるということを伝える。
// Gameコンポーネントを定義
export default function Game() {
  // ゲームの履歴と現在の手番を管理するstate
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  // 現在の手番がXかどうかを判定する変数
  const xIsNext = currentMove % 2 === 0;

  // 現在の手番に対応するボードの状態
  const currentSquares = history[currentMove];

  // プレイヤーが新しい手を打ったときのハンドラ関数
  function handlePlay(nextSquares) {

    // 新しいボード状態を含む履歴のコピーを作成し、stateを更新
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);

    // 現在の手番を更新
    setCurrentMove(nextHistory.length - 1);
  }

  // 特定の手へジャンプするハンドラ関数
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // ゲームの履歴を表示するためのリスト
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        {/* ジャンプボタンをクリックしたときに対応する手へジャンプ */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* Boardコンポーネントに現在の手番とボードの状態を渡し、プレイハンドラを設定 */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {/* ジャンプボタンのリストを表示 */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// calculateWinner関数を定義（盤面の状態から勝者を判定する）
function calculateWinner(squares) {
  // 勝利の可能性のある行、列、対角線の組み合わせを定義
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // 各組み合わせに対して勝者かどうかを判定
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    // 3つのマスが同じシンボルで埋まっているか確認
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      // 勝者がいればそのシンボルを返す
      return squares[a];
    }
  }
  // 勝者がいない場合はnullを返す
  return null;
}
