import { RenderTimer, FPS, Scroller } from '../util/util.js';

async function init() {
    const response = await fetch('../util/10000.json');
    const data = await response.json();

    Ext.onReady(() => {
        RenderTimer.start({
            callback() {
                const grid = Ext.create('Ext.grid.Panel', {
                    store : {
                        fields : [{ name : 'start', type : 'date' }],
                        data
                    },

                    columns : [
                        { dataIndex : 'id', text : 'Id', width : 100 },
                        { dataIndex : 'firstName', text : 'First name', width : 130 },
                        { dataIndex : 'surname', text : 'Surname', width : 130 },
                        { dataIndex : 'city', text : 'City', width : 150 },
                        { dataIndex : 'age', text : 'Age', width : 100 },
                        {
                            dataIndex : 'color',
                            text : 'Color',
                            width : 120,
                            renderer(value, metaData) {
                                metaData.tdStyle = `background-color: ${value}`;
                                return value;
                            }
                        },
                        {
                            dataIndex : 'score',
                            text : 'Score',
                            width : 120,
                            renderer(score) {
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
                            `
                            }
                        },
                        { dataIndex : 'start', text : 'Start', width : 120, xtype : 'datecolumn' },
                        {
                            dataIndex : 'done',
                            text : 'Done',
                            width : 90,
                            renderer : (value) => value ? 'Yes' : 'No'
                        },
                        { dataIndex : 'rating', text : 'Rating', width : 90 }
                    ],

                    height : 1024,

                    renderTo : 'container',

                    bufferedRenderer : true
                });

                setTimeout(() => {
                    FPS.start();
                    Scroller.scroll({
                        scrollFn(scrollTop) {
                            grid.getScrollable().scrollTo(0, scrollTop, false);
                        },
                        callback() {
                            FPS.stop();
                        }

                    });
                }, 500);
            }
        });
    });
}

init();
