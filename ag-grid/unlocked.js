import { RenderTimer, FPS, Scroller } from '../util/util.js';

async function init() {
    const response = await fetch('../util/10000.json');
    const json = await response.json();

    RenderTimer.start({
        sync : false,
        callback() {
            const grid = new agGrid.Grid(document.getElementById('container'), {
                columnDefs : [
                    { field : 'id', headerName : 'Id', width : 100 },
                    { field : 'firstName', headerName : 'First name', width : 130 },
                    { field : 'surname', headerName : 'Surname', width : 130 },
                    { field : 'city', headerName : 'City', width : 150 },
                    { field : 'age', headerName : 'Age', width : 100 },
                    {
                        field : 'color',
                        headerName : 'Color',
                        width : 120,
                        cellStyle : params => ({ backgroundColor : params.value })
                    },
                    {
                        field : 'score', headerName : 'Score', width : 120, cellRenderer({ value }) {
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
                    { field : 'start', headerName : 'Start', width : 120 },
                    {
                        field : 'done',
                        headerName : 'Done',
                        width : 90,
                        cellRenderer : params => params.value ? 'Yes' : 'No'
                    },
                    { field : 'rating', headerName : 'Rating', width : 90 }
                ],

                rowData : json,

                onGridReady() {
                   RenderTimer.stop();
                }
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element : document.querySelector('.ag-body-viewport'),
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
