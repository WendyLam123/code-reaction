import React from "react";
import { useSortable } from "@dnd-kit/react/sortable";

export default function Item({
  id,
  index,
  column,
  content,
  item,
  updateBlockValues,
  updateIfVelocity
}) {
  const { ref, isDragging } = useSortable({
    id,
    index,
    type: "item",
    accept: "item",
    group: column,
  });

  return (
  <button className="item" ref={ref} data-dragging={isDragging}>
    {item?.type === "declaration" ? (
      <>
        let{" "}
        <input
          value={item.values.name}
          onChange={(event) =>
            updateBlockValues(item.id, "name", event.target.value)
          }
        />
        ;
      </>
    ) : item?.type === "if" ? (
      item.values.actions.map((action, actionIndex) => {
        if (action.type !== "set_velocity") return null;

        return (
          <span key={actionIndex}>
            if (touching(block, crateCollider))
            <br/>SetVelocity: 
            <br/>
            x: 
            <input
              type="number"
              value={action.values.vel.x ?? ""}
              onChange={(event) =>
                updateIfVelocity(
                  item.id,
                  actionIndex,
                  "x",
                  Number(event.target.value)
                )
              }
            />
            <br/>
            y:
            <input
              type="number"
              value={action.values.vel.y ?? ""}
              onChange={(event) =>
                updateIfVelocity(
                  item.id,
                  actionIndex,
                  "y",
                  Number(event.target.value)
                )
              }
            />
          </span>
        );
      })
    ) : (
      content
    )}
  </button>
);
}