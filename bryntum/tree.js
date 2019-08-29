import { TreeGrid } from './js/grid.module.js';
import { RenderTimer, FPS, Scroller, TreeGenerator } from '../util/util.js';

window.bryntum.DISABLE_DEBUG = true;

async function init() {
    const data = TreeGenerator.generate({ nodeCount : 10000, depth : 5, childrenProperty : 'children' });

    RenderTimer.start({
        callback() {
            const grid = window.grid = new TreeGrid({
                appendTo : 'container',

                columns : [
                    { field : 'id', text : 'Id', width : 100, locked : true },
                    { field : 'name', text : 'Name', width : 250, locked : true, type : 'tree' },
                    { field : 'number1', text : 'Num1', width : 50 },
                    {
                        field : 'number2',
                        text : 'Num2',
                        width : 50,
                        renderer({ value, cellElement }) {
                            cellElement.style.backgroundColor = value === 0 ? 'skyblue' : '';
                            return value;
                        }
                    },
                    { field : 'number3', text : 'Num3', width : 50 },
                    { field : 'number4', text : 'Num4', width : 50 },
                    { field : 'number5', text : 'Num5', width : 50 },
                    { field : 'number6', text : 'Num6', width : 50 },
                    { field : 'number7', text : 'Num7', width : 50 },
                    { field : 'number8', text : 'Num8', width : 50 },
                    {
                        field : 'number9',
                        text : 'Num9',
                        width : 50,
                        htmlEncode : false,
                        renderer({ value }) {
                            return `
                            <div style="
                                width : ${value * 10}%; 
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
                    { field : 'number10', text : 'Num10', width : 50 },
                    { field : 'number11', text : 'Num11', width : 50 },
                    { field : 'number12', text : 'Num12', width : 50 },
                    { field : 'number13', text : 'Num13', width : 50 },
                    { field : 'number14', text : 'Num14', width : 50 },
                    { field : 'number15', text : 'Num15', width : 50 },
                    { field : 'number16', text : 'Num16', width : 50 },
                    { field : 'number17', text : 'Num17', width : 50 },
                    { field : 'number18', text : 'Num18', width : 50 },
                    { field : 'number19', text : 'Num19', width : 50 },
                    { field : 'number20', text : 'Num20', width : 50 }
                ],

                data : data.tree
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
