import Matter from "matter-js";
import Block from "./Block.js";

const ALLOWED_PROPERTIES = ["x", "y", "vel.x", "vel.y"];

const ALLOWED_OPERATORS = [">", "<", ">=", "<=", "===", "!=="];

const IF_BLOCK1 = {
  id: 3,
  belong: "update",
  type: "if",
  order: 3,
  values: {
    condition: [
      {
        type: "detectDistance",
        target: {
          name: "crate",
          source: "userBlock",
        },
        property: "x",
        operator: ">",
        value: 300,
      },
    ],
    actions: [
      {
        type: "set_velocity",
        values: {
          target: {
            name: "block",
            source: "userBlock",
          },
          vel: { x: 0, y: 0 },
        },
      },
      {
        type: "set_velocity",
        values: {
          target: {
            name: "alien",
            source: "gameBlock",
          },
          vel: { x: 10, y: 15 },
        },
      },
    ],
  },
};

const IF_BLOCK2 = {
  id: 4,
  belong: "update",
  type: "if",
  order: 4,
  values: {
    condition: [
      {
        type: "detectCollision",
        from: {
          name: "block",
          source: "userBlock",
        },
        to: {
          name: "crateCollider",
          source: "gameBlock",
        },
      },
    ],
    actions: [
      {
        type: "set_velocity",
        values: {
          target: {
            name: "block",
            source: "userBlock",
          },
          vel: { x: 10, y: 15 },
        },
      },
      {
        type: "set_rotation",
        values: {
          target: {
            name: "alien",
            source: "gameBlock",
          },
          rotation: 0,
        },
      },
    ],
  },
};

function isValidNumber(value) {
  return (
    value !== "" &&
    value !== null &&
    value !== undefined &&
    String(value).trim() !== "" &&
    Number.isFinite(Number(value))
  );
}

function spriteExists(program, target) {
  if (!target?.name || !target?.source) {
    return false;
  }

  if (target.source === "userBlock") {
    return program.checkContext("create_sprite", target.name);
  }

  if (target.source === "gameBlock") {
    return Boolean(program.getSprite(target.name, target.source));
  }

  return false;
}

function checkCondition(program, condition) {
  if (condition.type === "detectDistance") {
    const { name, source } = condition.target;
    const sprite = program.getSprite(name, source);

    if (!sprite) {
      return false;
    }

    let actual;

    switch (condition.property) {
      case "x":
        actual = sprite.position.x;
        break;
      case "y":
        actual = sprite.position.y;
        break;
      case "vel.x":
        actual = sprite.velocity.x;
        break;
      case "vel.y":
        actual = sprite.velocity.y;
        break;
      default:
        return false;
    }

    const expected = Number(condition.value);

    switch (condition.operator) {
      case ">":
        return actual > expected;
      case "<":
        return actual < expected;
      case ">=":
        return actual >= expected;
      case "<=":
        return actual <= expected;
      case "===":
        return actual === expected;
      case "!==":
        return actual !== expected;
      default:
        return false;
    }
  }

  if (condition.type === "detectCollision") {
    const from = program.getSprite(condition.from.name, condition.from.source);

    const to = program.getSprite(condition.to.name, condition.to.source);

    if (!from?.position || !to?.position) {
      return false;
    }

    return Matter.Query.collides(from, [to]).length > 0;
  }

  return false;
}

function executeAction(program, action) {
  const target = action.values.target;
  const body = program.getSprite(target.name, target.source);

  if (!body?.position) {
    return false;
  }

  switch (action.type) {
    case "set_velocity": {
      const { x, y } = action.values.vel;

      if (!body.velocity) return false;
      Matter.Body.setVelocity(body, {
        x: Number(x),
        y: Number(y),
      });
      return true;
    }

    case "set_rotation":
      Matter.Body.setAngle(
        body,
        (Number(action.values.rotation) * Math.PI) / 180,
      );
      return true;

    default:
      return false;
  }
}

export default class IfStatement extends Block {
  constructor(block) {
    super(block);

    this.condition = this.values.condition;
    this.actions = this.values.actions;
  }

  validate(program) {
    // Validate conditions.
    for (const condition of this.condition) {
      switch (condition.type) {
        case "detectDistance":
          if (!spriteExists(program, condition.target)) {
            program.addError(
              this.id,
              `Target sprite "${condition.target?.name}" does not exist.`,
            );
            return false;
          }

          if (!ALLOWED_PROPERTIES.includes(condition.property)) {
            program.addError(
              this.id,
              `Invalid property "${condition.property}".`,
            );
            return false;
          }

          if (!ALLOWED_OPERATORS.includes(condition.operator)) {
            program.addError(
              this.id,
              `Invalid operator "${condition.operator}".`,
            );
            return false;
          }

          if (!isValidNumber(condition.value)) {
            program.addError(this.id, "Condition value must be a number.");
            return false;
          }

          break;

        case "detectCollision":
          if (!spriteExists(program, condition.from)) {
            program.addError(
              this.id,
              `Source sprite "${condition.from?.name}" does not exist.`,
            );
            return false;
          }

          if (!spriteExists(program, condition.to)) {
            program.addError(
              this.id,
              `Target sprite "${condition.to?.name}" does not exist.`,
            );
            return false;
          }

          break;

        default:
          program.addError(
            this.id,
            `Unsupported condition type "${condition.type}".`,
          );
          return false;
      }
    }

    // Validate actions.
    for (const action of this.actions) {
      const target = action.values.target;

      if (!spriteExists(program, target)) {
        program.addError(
          this.id,
          `Action target sprite "${target?.name}" does not exist.`,
        );
        return false;
      }

      switch (action.type) {
        case "set_velocity": {
          const vel = action.values.vel;

          if (!vel || !isValidNumber(vel.x) || !isValidNumber(vel.y)) {
            program.addError(this.id, "Velocity values must be numbers.");
            return false;
          }

          break;
        }

        case "set_rotation":
          if (!isValidNumber(action.values.rotation)) {
            program.addError(this.id, "Rotation value must be a number.");
            return false;
          }

          break;

        default:
          program.addError(
            this.id,
            `Unsupported action type "${action.type}".`,
          );
          return false;
      }
    }

    return true;
  }

  execute(program) {
    const allConditionsMet = this.condition.every((condition) =>
      checkCondition(program, condition),
    );

    if (!allConditionsMet) {
      return true;
    }

    for (const action of this.actions) {
      if (!executeAction(program, action)) {
        return false;
      }
    }

    return true;
  }
}
