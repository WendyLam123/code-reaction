import MiniGame from "./MiniGame";

export default function Variable10() {
  const variableSketch = (p) => {
    p.setup = () => {
      p.createCanvas(300, 200);
    };

    p.draw = () => {
      p.background(220);
    };
  };

  return <MiniGame sketch={variableSketch} />;
}