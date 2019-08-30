import { RenderTimer, FPS, Scroller } from '../util/util.js';

async function init() {
    const response = await fetch('../util/10000.json');
    const json = await response.json();

    RenderTimer.start({
        sync : false,
        callback() {
            $("#container").dxDataGrid({
                dataSource: json,
                showBorders: true,
                scrolling: {
                    mode: 'virtual'
                    // rowRenderingMode : 'virtual' // This mode does not render row contents while scrolling, not comparable to the others
                },
                sorting: {
                    mode: "none"
                },
                columns: [
                    { dataField : 'id', caption : 'Id', width : 100 },
                    { dataField : 'firstName', caption : 'First name', width : 130 },
                    { dataField : 'surname', caption : 'Surname', width : 130 },
                    { dataField : 'city', caption : 'City', width : 150 },
                    { dataField : 'age', caption : 'Age', width : 100 },
                    {
                        dataField : 'color',
                        caption : 'Color',
                        width : 120,
                        cellTemplate : (element, info) => element.text(info.text).css('background-color', info.text)
                    },
                    {
                        dataField : 'score',
                        caption : 'Score',
                        width : 120,
                        cellTemplate(element, info) {
                            element.append(`
                            <div style="
                                width : ${info.text / 10}%; 
                                background-color: blue; 
                                height : 3px;
                                position: absolute;
                                top: 0;
                                left :0;
                                "></div>
                            ${info.text}
                            `).css('position', 'relative');
                        }
                    },
                    { dataField : 'start', caption : 'Start', width : 120, dataType : 'date' },
                    { dataField : 'done', caption : 'Done', width : 90, dataType : 'text', customizeText : ({ value }) => value ? 'Yes' : 'No' },
                    { dataField : 'rating', caption : 'Rating', width : 90 }
                ],
                onContentReady() {
                    if (RenderTimer.running) {
                        RenderTimer.stop();
                    }
                }
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element: document.querySelector('.dx-scrollable-container'),
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
