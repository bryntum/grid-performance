import { Grid } from './grid.module.js';
import { RenderTimer, FPS, Scroller } from '../measuring/util.js';

async function init() {
    const response = await fetch('../data/10000.json');
    const json = await response.json();

    RenderTimer.start({
        callback() {
            const grid = new Grid({
                appendTo: 'container',

                features : {
                    group : 'city'
                },

                columns: [
                    { field: 'id', text: 'Id', width: 100, locked: true },
                    { field: 'firstName', text: 'First name', width: 130, locked: true },
                    { field: 'surname', text: 'Surname', width: 130, locked: true },
                    { field: 'city', text: 'City', width: 150 },
                    { field: 'age', text: 'Age', width: 100 },
                    {
                        field: 'color',
                        text: 'Color',
                        width: 120,
                        renderer: ({ value, cellElement }) => cellElement.style.backgroundColor = value
                    },
                    { field: 'score', text: 'Score', width: 120 },
                    { field: 'start', text: 'Start', width: 120, type: 'date', format: 'YYYY-MM-DD' },
                    { field: 'done', text: 'Done', width: 90, renderer: ({ value }) => value ? 'Yes' : 'No' },
                    { field: 'rating', text: 'Rating', width: 90 }
                ],

                data: json
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element: grid.bodyContainer,
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
