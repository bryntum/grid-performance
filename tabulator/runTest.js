import { RenderTimer, FPS, Scroller } from "../util/util.js";
import {
  Tabulator,
  FormatModule,
  FrozenColumnsModule,
} from "./js/tabulator_esm.js";

export async function runTest(frozen) {
  const response = await fetch("../util/10000.json");
  const data = await response.json();
  Tabulator.registerModule(FormatModule);
  if (frozen) {
    Tabulator.registerModule(FrozenColumnsModule);
  }

  {
    RenderTimer.start({
      sync: false,
      callback() {
        const table = new Tabulator("#container", {
          data,
          height: "100%",
          columns: [
            { field: "id", title: "Id", width: 100, frozen },
            { field: "firstName", title: "First name", width: 130, frozen },
            { field: "surname", title: "Surname", width: 130, frozen },
            { field: "city", title: "City", width: 150 },
            { field: "age", title: "Age", width: 100 },
            {
              field: "color",
              title: "Color",
              width: 120,
              formatter: function (cell) {
                cell.getElement().style.backgroundColor = this.sanitizeHTML(
                  cell.getValue()
                );
                return cell.getValue();
              },
            },
            {
              field: "score",
              title: "Score",
              width: 120,
              formatter: (cell) => {
                const score = cell.getValue();
                return `
                <div style="
                    width : ${score / 10}%;
                    background-color: blue;
                    height : 3px;
                    position: absolute;
                    top: 0;
                    left :0;
                    "></div>
                ${score}
                `;
              },
            },
            {
              field: "start",
              title: "Start",
              width: 120,
              formatter: (cell) => {
                var b = cell.getValue().split(/\D+/);
                return b[2] + "/" + b[1] + "/" + b[0];
              },
            },
            {
              field: "done",
              title: "Done",
              width: 90,
              formatter: (cell) => (cell.getValue() ? "Yes" : "No"),
            },
            { field: "rating", title: "Rating", width: 90 },
          ],
        });
        table.on("dataProcessed", () => {
          RenderTimer.stop();
          {
            setTimeout(() => {
              FPS.start();
              Scroller.scroll({
                element: document.querySelector(".tabulator-tableholder"),
                callback() {
                  FPS.stop();
                },
              });
            }, 500);
          }
        });
      },
    });
  }
}
