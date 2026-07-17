"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";

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
        const fresh = initGame();
        gameRef.current = fresh;
        setGame(fresh);
      }
      return;
    }

    const dir = KEY_DIRS[event.key.toLowerCase()];
    if (!dir) return;
    event.preventDefault();
    // Ignore direct reversals into the snake's own neck.
    if (dir.x === -g.dir.x && dir.y === -g.dir.y) return;
    gameRef.current = { ...g, nextDir: dir };
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
      aria-label="Snake game. Use arrow keys or WASD to move, Escape to quit."
      className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-3 outline-none"
    >
      <div className="flex w-full max-w-[22rem] items-center justify-between text-xs text-zinc-500">
        <span>
          score: <span className="text-zinc-200">{game.score}</span>
        </span>
        <span aria-hidden="true">↑↓←→ / wasd · esc quits</span>
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
            press enter to play again · esc to quit
          </div>
        </div>
      )}
    </div>
  );
}
