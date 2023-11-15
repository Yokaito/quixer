'use client';

import { useState } from 'react';

interface CounterProps {
  // @attribute(type:number, default: 99)
  initialCount?: number;
}

function Counter({ initialCount = 99 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((prevCount) => prevCount + 1);

  const decrement = () => setCount((prevCount) => prevCount - 1);

  return (
    <div className="container flex gap-2">
      <button className="bg-slate-200 p-2 text-lg text-red-400" onClick={decrement}>
        -
      </button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

export default Counter;
