import { RenderTimer, FPS, Scroller } from '../measuring/util.js';

async function init() {
    const response = await fetch('../data/10000.json');
    const json = await response.json();

    RenderTimer.start({
        callback() {
            const grid = new agGrid.Grid(document.getElementById('container'), {
                columnDefs: [
                    { field: 'id', headerName: 'Id', width: 100, pinned : 'left' },
                    { field: 'firstName', headerName: 'First name', width: 130, pinned : 'left' },
                    { field: 'surname', headerName: 'Surname', width: 130, pinned : 'left' },
                    { field: 'city', headerName: 'City', width: 150 },
                    { field: 'age', headerName: 'Age', width: 100 },
                    {
                        field: 'color',
                        headerName: 'Color',
                        width: 120,
                        cellStyle : params => ({ backgroundColor: params.value})
                    },
                    { field: 'score', headerName: 'Score', width: 120 },
                    { field: 'start', headerName: 'Start', width: 120/*, type: 'date', format: 'YYYY-MM-DD'*/ },
                    { field: 'done', headerName: 'Done', width: 90, cellRenderer : params => params.value ? 'Yes' : 'No' },
                    { field: 'rating', headerName: 'Rating', width: 90 }
                ],

                rowData: json
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element: document.querySelector('.ag-body-viewport'),
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
