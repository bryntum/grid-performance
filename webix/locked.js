import { RenderTimer, FPS, Scroller } from '../util/util.js';

async function init() {
    const response = await fetch('../util/10000.json');
    const json = await response.json();

    RenderTimer.start({
        callback() {
            const dateFormat = webix.Date.dateToStr("%Y-%m-%d");
            const grid = webix.ui({
                scheme:{
                    $init: obj => obj.start = new Date(obj.start)
                },
                view:"datatable", container:"container",
                leftSplit:3, rowHeight:46,
                columns : [
                    { id : 'id', header : 'Id', width : 100 },
                    { id : 'firstName', header : 'First name', width : 130 },
                    { id : 'surname', header : 'Surname', width : 130 },
                    { id : 'city', header : 'City', width : 150 },
                    { id : 'age', header : 'Age', width : 100 },
                    {
                        id        : 'color',
                        header    : 'Color',
                        css       : "no_padding_box",
                        width     : 120,
                        template  : obj => `<div style="background-color:${obj.color}">${obj.color}</div>`
                    },
                    {
                        id         : 'score',
                        header     : 'Score',
                        width      : 120,
                        css        : "relative_box",
                        template   : obj => `
                            <div style="
                                width : ${obj.score / 10}%; 
                                background-color: blue; 
                                height : 3px;
                                position: absolute;
                                top: 0;
                                left :0;
                                "></div>${obj.score}`
                    },
                    { id : 'start', header : 'Start', width : 120, format: dateFormat },
                    { id : 'done', header : 'Done', width : 90, template : obj => obj.done ? 'Yes' : 'No' },
                    { id : 'rating', header : 'Rating', fillspace:true }
                ],
                data:json
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
