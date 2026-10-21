import { useEffect, useRef } from "react";
import p5 from "p5";
import planck from "planck";

export default function MiniGame({ sketch }) {
    const containerRef = useRef(null);

    useEffect(() => {
        let game = null;
        let cancelled = false;

        async function startGame() {
            try {
                window.p5 = p5;
                window.planck = planck;

                await import("p5play");

                // Component may have unmounted while importing
                if (cancelled || !containerRef.current || !sketch) {
                    return;
                }

                game = new p5(sketch, containerRef.current);
            } catch (error) {
                if (!cancelled) {
                    console.error("Failed to initialize p5play:", error);
                }
            }
        }

        startGame();

        return () => {
            cancelled = true;

            if (game) {
                game.remove();
                game = null;
            }
        };
    }, [sketch]);

    return <div ref={containerRef} />;
}
