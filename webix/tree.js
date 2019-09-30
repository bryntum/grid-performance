import { RenderTimer, FPS, Scroller, TreeGenerator } from '../util/util.js';

async function init() {
    const data = TreeGenerator.generate({ nodeCount : 10000, depth : 5, childrenProperty : 'data' });
console.log(data)
    RenderTimer.start({
        callback() {
            const grid = window.grid = webix.ui({ view:"treetable", container : 'container',
                leftSplit:2, rowHeight:46,
                columns : [
                    { id : 'id', header : 'Id', width : 100 },
                    { id : 'name', header : 'Name', width : 250, template : '{common.treetable()}#name#' },
                    { id : 'number1', header : 'Num1', width : 60 },
                    {
                        id : 'number2',
                        header : 'Num2',
                        width : 60,
                        css       : "no_padding_box",
                        template  : obj => `<div style="background-color:${obj.number2 === 0 ? 'skyblue' : ''}">${obj.number2}</div>`
                    },
                    { id : 'number3', header : 'Num3', width : 59 },
                    { id : 'number4', header : 'Num4', width : 59 },
                    { id : 'number5', header : 'Num5', width : 59 },
                    { id : 'number6', header : 'Num6', width : 59 },
                    { id : 'number7', header : 'Num7', width : 59 },
                    { id : 'number8', header : 'Num8', width : 59 },
                    {
                        id : 'number9',
                        header : 'Num9',
                        width : 59,
                        css : "relative_box",
                        template : obj => `
                            <div style="
                                width : ${obj.number9 * 10}%; 
                                background-color: blue; 
                                height : 3px;
                                position: absolute;
                                top: 0;
                                left :0;
                                "></div>${obj.number9}`
                    },
                    { id : 'number10', header : 'Num10', width : 59 },
                    { id : 'number11', header : 'Num11', width : 59 },
                    { id : 'number12', header : 'Num12', width : 59 },
                    { id : 'number13', header : 'Num13', width : 59 },
                    { id : 'number14', header : 'Num14', width : 59 },
                    { id : 'number15', header : 'Num15', width : 59 },
                    { id : 'number16', header : 'Num16', width : 59 },
                    { id : 'number17', header : 'Num17', width : 59 },
                    { id : 'number18', header : 'Num18', width : 59 },
                    { id : 'number19', header : 'Num19', width : 59 },
                    { id : 'number20', header : 'Num20', width : 59 }
                ],

                data : data.tree
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element : grid.$view.querySelector(".webix_ss_vscroll"),
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
