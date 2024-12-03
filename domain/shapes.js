import COLORS from "./color.js";

export default class ShapeManager {
  constructor() {
    this.shapes = [StarShape.draw, BallShape.draw, SockShape.draw];
  }

  isIndexAvailable(position) {
    return position > 0 && position <= this.shapes.length;
  }

  drawIndex(context, position, options) {
    this.shapes[position - 1](context, options);
  }
}

class BaseShape {
  draw(context) {
    throw new Error("Method not implemented");
  }
}

class StarShape extends BaseShape {
  static draw(context, options) {
    const outerRadius = options.size / 2;
    const innerRadius = outerRadius / 2;
    //5 sides polygon
    const pointCount = 10;

    //begin the path for a long draw
    context.beginPath();
    for (let index = 0; index < pointCount; index++) {
      const angle = Math.PI * 2 * (index / pointCount);
      const radius = index % 2 === 0 ? outerRadius : innerRadius;
      const surfaceX = options.x - Math.sin(angle) * radius;
      const surfaceY = options.y - Math.cos(angle) * radius;
      context.lineTo(surfaceX, surfaceY);
    }
    context.fillStyle = COLORS.normal(options.hue);
    context.fill();
  }
}

class BallShape extends BaseShape {
  static #circle(context, options) {
    context.beginPath();

    let radius = options.radius;

    if (options.outline == "inside") {
      radius -= options.lineWidth / 2;
    }

    Object.assign(context, options);
    context.arc(options.x, options.y, radius, 0, Math.PI * 2);

    options.fillStyle && context.fill();
    options.strokeStyle && context.stroke();
  }

  static #createBody(options)
  {
    const top = options.y - options.size / 2;
    return [
        {
          x: options.x,
          get y() {
            return top + this.radius;
          },
          isFill: false,
          radius: options.size * 0.1,
          thickness: options.size * 0.05,
          color: COLORS.darker(options.hue),
          outline: "inside"
        },
        {
          x: options.x,
          get y() {
            return top + this.radius + options.size * 0.1;
          },
          isFill: true,
          radius: options.size * 0.45,
          thickness: options.size * 0.05,
          color: COLORS.normal(options.hue),
          outline: "outside"
        },
      ];
  }

  static draw(context, options) {
    const circles = BallShape.#createBody(options);

    circles.forEach((circle) => {
        BallShape.#circle(context, {
        x: circle.x,
        y: circle.y,
        radius: circle.radius,
        lineWidth: circle.thickness,
        strokeStyle: !circle.isFill ? circle.color : null,
        outline: circle.outline,
        fillStyle: circle.isFill ? circle.color : null,
      });
    });
  }
}

class SockShape extends BaseShape {
  static draw(context, options) {
    const top = options.y - options.size / 2;
    const left = options.x - options.size / 2;
    context.strokeRect(top, left, options.size, options.size);
  }
}

/*
const top = options.y - options.size / 2;
    const left = options.x - options.size / 2;
    context.strokeRect(top, left, options.size, options.size);

    */
