import { useEffect, useRef } from "react";
import p5 from "p5";

export default function MiniGame({ sketch }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !sketch) return undefined;

    const game = new p5(sketch, container);

    return () => {
      game.remove();
    };
  }, [sketch]);

  return <div ref={containerRef} />;
}