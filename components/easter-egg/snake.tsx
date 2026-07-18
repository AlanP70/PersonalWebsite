"use client";

import { useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  TouchEvent as ReactTouchEvent,
} from "react";

const COLS = 24;
const ROWS = 14;
const TICK_MS = 120;

type Cell = { x: number; y: number };
type Game = {
  snake: Cell[];
  dir: Cell;
  nextDir: Cell;
  food: Cell;
  score: number;
  over: boolean;
};

function randomFood(snake: Cell[]): Cell {
  let food: Cell;
  do {
    food = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
  } while (snake.some((s) => s.x === food.x && s.y === food.y));
  return food;
}

function initGame(): Game {
  const snake: Cell[] = [
    { x: 8, y: 7 },
    { x: 7, y: 7 },
    { x: 6, y: 7 },
  ];
  return {
    snake,
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: randomFood(snake),
    score: 0,
    over: false,
  };
}

const KEY_DIRS: Record<string, Cell> = {
  arrowup: { x: 0, y: -1 },
  w: { x: 0, y: -1 },
  arrowdown: { x: 0, y: 1 },
  s: { x: 0, y: 1 },
  arrowleft: { x: -1, y: 0 },
  a: { x: -1, y: 0 },
  arrowright: { x: 1, y: 0 },
  d: { x: 1, y: 0 },
};

export function Snake({ onExit }: { onExit: () => void }) {
  const [game, setGame] = useState<Game>(() => initGame());
  // Mirror of the latest game state so the tick and key handlers read fresh
  // values without re-subscribing every frame.
  const gameRef = useRef<Game>(game);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const g = gameRef.current;
      if (g.over) return;

      const dir = g.nextDir;
      const head = { x: g.snake[0].x + dir.x, y: g.snake[0].y + dir.y };
      const hitWall =
        head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS;
      const hitSelf = g.snake.some((s) => s.x === head.x && s.y === head.y);

      let next: Game;
      if (hitWall || hitSelf) {
        next = { ...g, over: true };
      } else {
        const ate = head.x === g.food.x && head.y === g.food.y;
        const snake = [head, ...g.snake];
        let food = g.food;
        let score = g.score;
        if (ate) {
          score += 1;
          food = randomFood(snake);
        } else {
          snake.pop();
        }
        next = { ...g, snake, dir, food, score };
      }

      gameRef.current = next;
      setGame(next);
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const restart = () => {
    const fresh = initGame();
    gameRef.current = fresh;
    setGame(fresh);
  };

  // Queue a turn, ignoring direct reversals into the snake's own neck.
  const steer = (dir: Cell) => {
    const g = gameRef.current;
    if (g.over) return;
    if (dir.x === -g.dir.x && dir.y === -g.dir.y) return;
    gameRef.current = { ...g, nextDir: dir };
  };

  const onKeyDown = (event: ReactKeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onExit();
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      return;
    }

    const g = gameRef.current;
    if (g.over) {
      if (event.key === "Enter") {
        event.preventDefault();
        restart();
      }
      return;
    }

    const dir = KEY_DIRS[event.key.toLowerCase()];
    if (!dir) return;
    event.preventDefault();
    steer(dir);
  };

  // Swipe steering for touch — the mobile stand-in for arrow keys. A short
  // drag under the threshold counts as a tap (used to restart on game over).
  const touchStartRef = useRef<Cell | null>(null);
  const SWIPE_THRESHOLD = 24;

  const onTouchStart = (event: ReactTouchEvent) => {
    const t = event.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (event: ReactTouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const t = event.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (absX < SWIPE_THRESHOLD && absY < SWIPE_THRESHOLD) {
      if (gameRef.current.over) restart();
      return;
    }

    if (absX > absY) {
      steer(dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
    } else {
      steer(dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
    }
  };

  const rows: string[] = [];
  for (let y = 0; y < ROWS; y++) {
    let line = "";
    for (let x = 0; x < COLS; x++) {
      const isHead = game.snake[0].x === x && game.snake[0].y === y;
      const isBody =
        !isHead && game.snake.some((s) => s.x === x && s.y === y);
      const isFood = game.food.x === x && game.food.y === y;
      line += isHead ? "@" : isBody ? "o" : isFood ? "*" : "·";
    }
    rows.push(line);
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Snake game. Use arrow keys or WASD to move, or swipe on touch. Escape to quit."
      className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-3 outline-none touch-none"
    >
      <div className="flex w-full max-w-[22rem] items-center justify-between text-xs text-zinc-500">
        <span>
          score: <span className="text-zinc-200">{game.score}</span>
        </span>
        <span aria-hidden="true">swipe / ↑↓←→ / wasd</span>
      </div>
      <pre
        aria-hidden="true"
        className="rounded border border-white/10 bg-black/40 p-2 text-[10px] leading-[1.15] tracking-[0.2em] text-zinc-300 select-none sm:text-xs"
      >
        {rows.join("\n")}
      </pre>
      {game.over && (
        <div className="text-center text-xs">
          <div className="text-zinc-100">game over — score {game.score}</div>
          <div className="mt-1 text-zinc-500">
            tap or press enter to play again
          </div>
        </div>
      )}
    </div>
  );
}
