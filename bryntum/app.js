import { Grid } from './js/grid.module.js';
import { RenderTimer, FPS, Scroller } from '../util/util.js';

window.bryntum.DISABLE_DEBUG = true;

async function init() {
    const response = await fetch('../util/10000.json');
    const json = await response.json();

    RenderTimer.start({
        callback() {
            const grid = new Grid({
                appendTo : 'container',

                // features : {
                //     group : 'city'
                // },

                columns : [
                    { field : 'id', text : 'Id', width : 100, locked : true },
                    { field : 'firstName', text : 'First name', width : 130, locked : true },
                    { field : 'surname', text : 'Surname', width : 130, locked : true },
                    { field : 'city', text : 'City', width : 150 },
                    { field : 'age', text : 'Age', width : 100 },
                    {
                        field : 'color',
                        text : 'Color',
                        width : 120,
                        renderer : ({ value, cellElement }) => cellElement.style.backgroundColor = value
                    },
                    {
                        field : 'score',
                        text : 'Score',
                        width : 120,
                        htmlEncode : false,
                        //autoSyncHtml : true,
                        renderer({ value }) {
                            return `
                            <div style="
                                width : ${value / 10}%; 
                                background-color: blue; 
                                height : 3px;
                                position: absolute;
                                top: 0;
                                left :0;
                                "></div>
                            ${value}
                            `;
                        }
                    },
                    { field : 'start', text : 'Start', width : 120, type : 'date', format : 'YYYY-MM-DD' },
                    { field : 'done', text : 'Done', width : 90, renderer : ({ value }) => value ? 'Yes' : 'No' },
                    { field : 'rating', text : 'Rating', width : 90 }
                ],

                data : json
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element : grid.bodyContainer,
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
