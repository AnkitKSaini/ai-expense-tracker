import { useEffect, useState } from "react";

interface Props {
  value: number;
  duration?: number;
  prefix?: string;
}

function AnimatedCounter({
  value,
  duration = 1500,
  prefix = "",
}: Props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return (
    <>
      {prefix}
      {count.toLocaleString()}
    </>
  );
}

export default AnimatedCounter;