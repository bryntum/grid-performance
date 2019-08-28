import { RenderTimer, FPS, Scroller } from '../util/util.js';

async function init() {
    const response = await fetch('../util/10000.json');
    const data = await response.json();

    Ext.onReady(() => {
        RenderTimer.start({
            callback() {
                const grid = Ext.create('Ext.grid.LockedGrid', {
                    store : {
                        fields : [{ name : 'start', type : 'date' }],
                        data
                    },

                    scrollable : true,

                    columns : [
                        { dataIndex : 'id', text : 'Id', width : 100, locked : true },
                        { dataIndex : 'firstName', text : 'First name', width : 130, locked : true },
                        { dataIndex : 'surname', text : 'Surname', width : 130, locked : true },
                        { dataIndex : 'city', text : 'City', width : 150 },
                        { dataIndex : 'age', text : 'Age', width : 100 },
                        {
                            dataIndex : 'color',
                            text : 'Color',
                            width : 120,
                            renderer(value, record, dataIndex, cell) {
                                cell.setStyle({ backgroundColor : value })
                                return value;
                            }
                        },
                        {
                            dataIndex : 'score',
                            text : 'Score',
                            width : 120,
                            cell : {
                                encodeHtml : false
                            },
                            tpl : `
                            <div style="
                                width : {score / 10}%;
                                background-color: blue;
                                height : 3px;
                                position: absolute;
                                top: 0;
                                left :0;
                                "></div>
                            {score}
                            `
                        },
                        { dataIndex : 'start', text : 'Start', width : 120, xtype : 'datecolumn' },
                        {
                            dataIndex : 'done',
                            text : 'Done',
                            width : 90,
                            renderer : ({ value }) => value ? 'Yes' : 'No'
                        },
                        { dataIndex : 'rating', text : 'Rating', width : 90 }
                    ],

                    height : '100%',

                    renderTo : 'container'
                });

                setTimeout(() => {
                    FPS.start();
                    Scroller.scroll({
                        scrollFn(scrollTop) {
                            grid.getRegion('center').getGrid().getScrollable().scrollTo(0, scrollTop, false);
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
