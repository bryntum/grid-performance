import { RenderTimer, FPS, Scroller } from '../util/util.js';
import { TreeGenerator } from "../util/util";

async function init() {
    const data = TreeGenerator.generate({ nodeCount : 10000, depth : 5, childrenProperty : 'children' });

    // construct ag-grid grouping structure
    data.allNodes.sort((a, b) => a.id - b.id);

    data.allNodes.forEach(node => {
        let parent = node,
            path = [node.name];
        while (parent.parentId) {
            parent = data.allNodes.find(n => n.id === parent.parentId);
            if (parent) {
                path.unshift(parent.name);
            }
        }
        delete node.children;
        node.path = path;
    });

    RenderTimer.start({
        sync : false,
        callback() {
            const grid = new agGrid.Grid(document.getElementById('container'), {
                groupDefaultExpanded : -1, // expand all groups by default
                getDataPath : function (data) {
                    return data.path;
                },
                treeData : true,
                autoGroupColumnDef : {
                    headerName : "Path",
                    pinned : 'left',
                    width : 300,
                    cellRendererParams : {
                        suppressCount : true
                    }
                },
                columnDefs : [
                    { field : 'id', headerName : 'Id', width : 100, pinned : 'left' },
                    { field : 'number1', headerName : 'Num1', width : 50 },
                    {
                        field : 'number2',
                        headerName : 'Num2',
                        width : 50,
                        cellStyle : params => ({ backgroundColor : params.value == 0 ? 'skyblue' : '' })
                    },
                    { field : 'number3', headerName : 'Num3', width : 50 },
                    { field : 'number4', headerName : 'Num4', width : 50 },
                    { field : 'number5', headerName : 'Num5', width : 50 },
                    { field : 'number6', headerName : 'Num6', width : 50 },
                    { field : 'number7', headerName : 'Num7', width : 50 },
                    { field : 'number8', headerName : 'Num8', width : 50 },
                    {
                        field : 'number9',
                        headerName : 'Num9',
                        width : 50,
                        cellRenderer({ value }) {
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
                    { field : 'number10', headerName : 'Num10', width : 50 },
                    { field : 'number11', headerName : 'Num11', width : 50 },
                    { field : 'number12', headerName : 'Num12', width : 50 },
                    { field : 'number13', headerName : 'Num13', width : 50 },
                    { field : 'number14', headerName : 'Num14', width : 50 },
                    { field : 'number15', headerName : 'Num15', width : 50 },
                    { field : 'number16', headerName : 'Num16', width : 50 },
                    { field : 'number17', headerName : 'Num17', width : 50 },
                    { field : 'number18', headerName : 'Num18', width : 50 },
                    { field : 'number19', headerName : 'Num19', width : 50 },
                    { field : 'number20', headerName : 'Num20', width : 50 },

                    // { field : 'surname', headerName : 'Surname', width : 130, pinned : 'left' },
                    // { field : 'city', headerName : 'City', width : 150 },
                    // { field : 'age', headerName : 'Age', width : 100 },
                    // {
                    //     field : 'color',
                    //     headerName : 'Color',
                    //     width : 120,
                    //     cellStyle : params => ({ backgroundColor : params.value })
                    // },
                    // {
                    //     field : 'score', headerName : 'Score', width : 120, cellRenderer({ value }) {
                    //         return `
                    //         <div style="
                    //             width : ${value / 10}%;
                    //             background-color: blue;
                    //             height : 3px;
                    //             position: absolute;
                    //             top: 0;
                    //             left :0;
                    //             "></div>
                    //         ${value}
                    //         `;
                    //     }
                    // },
                    // { field : 'start', headerName : 'Start', width : 120/*, type: 'date', format: 'YYYY-MM-DD'*/ },
                    // {
                    //     field : 'done',
                    //     headerName : 'Done',
                    //     width : 90,
                    //     cellRenderer : params => params.value ? 'Yes' : 'No'
                    // },
                    // { field : 'rating', headerName : 'Rating', width : 90 }
                ],

                rowData : data.allNodes,

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
