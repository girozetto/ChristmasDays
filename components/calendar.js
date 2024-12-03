import { LitElement, html, css } from "../lib/Lit3/lit-all.min.js";
import ShapeManager from "../domain/shapes.js";

class ChristmasCalendar extends LitElement {
  static properties = {
    cellSize: { type: Number },
    days: { type: Number },
  };

  static styles = css`
    canvas {
      border: 1px solid #000;
      margin: 5px 0px 0px 5px;
      background-color: #ccc;
      border-radius: 5px;
    }
  `;

  constructor() {
    super();
    this.days = 31;
    this.cellSize = 200;
    this.shapeManager = new ShapeManager();
  }

  #fillNumber(context, text, x, y, size) {
    context.font = size + "px Consolas";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(String(text), x, y, size);
  }

  #fillDay(canvas, day) {
    const context = canvas.getContext("2d");
    const centerY = canvas.height / 2;
    const centerX = canvas.width / 2;
    const daySize = canvas.width * 0.6;
    const hue = Math.random() * 360;

    if (this.shapeManager.isIndexAvailable(day)) {
      this.shapeManager.drawIndex(context, day, {
        x: centerX,
        y: centerY,
        size: daySize,
        hue: hue,
      });
    } else {
      this.#fillNumber(context, day, centerX, centerY, daySize);
    }
  }

  firstUpdated() {
    const days = this.shadowRoot.querySelectorAll(".days-container canvas");
    days.forEach((element) => {
      const day = parseInt(element.id.replace("day_", ""));
      this.#fillDay(element, day);
    });
  }

  render() {
    let array = Array.from({ length: this.days }, (_, index) => index + 1);
    return html`<div class="days-container">
      ${array.map(
        (d) =>
          html`<canvas
            id="day_${d}"
            height="${this.cellSize}"
            width="${this.cellSize}"
          ></canvas>`
      )}
    </div>`;
  }
}

customElements.define("christmas-calendar", ChristmasCalendar);
