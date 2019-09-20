# JavaScript data grid performance comparison

A performance comparison of five popular JavaScript data grid components. Measures the initial rendering time and scroll performance for 
the following data grids:

* Ag-grid, https://www.ag-grid.com/
* Bryntum Grid, https://www.bryntum.com/products/grid/
* DevExtreme Grid, https://js.devexpress.com/Overview/DataGrid/ 
* DHTMLX Grid, https://dhtmlx.com/docs/products/dhtmlxGrid/
* ExtJS Modern Grid, https://www.sencha.com/products/extjs/
* ExtJS Classic Grid, https://www.sencha.com/products/extjs/
* Componentator j-DataGrid, https://componentator.com/components/j-datagrid/

To set each grid up, please see the README.md files in the corresponding folders.

## Methodology
To make comparison as fair as possible the following actions were taken:

* All grids have additional features (such as grouping, sorting) turned off.
* The same dataset consisting of an array of 10,000 JSON objects is used throughout.
* Grids have been configured with the same set of columns, with custom cell renderers matching each other as close as possible.
Measurements where taken once for a grid with locked/fixed/pinned columns and once without.
* All use the same size on their container: 1280 x 1024 px.
* Scrollbars where turned on.

Measurements where taking using the same approach and same code for the different grids:

* Timer for initial rendering started after page and data has loaded, before grid instance is created and populated with 
the data. Timer stopped when grid is completely rendered, which for some grids is a sync operation while others requires
listening for an event.
* Scroll FPS measured by using a JS frame counter and changing scroll programmatically. Time taken to reach a predefined 
scroll distance was measured and used to calculate an average FPS value.

## Results

All measurements taken on a 2016 MacBook Pro 13-inch (2 GHz Intel Core i5, 8GB RAM).

| Grid          | L: Initial rendering | L: Average FPS | U: Initial rendering | U: Average FPS |
|---------------|----------------------|----------------|----------------------|----------------|
| Ag-grid       | 219 ms               | 53 fps         | 210 ms               | 57 fps         |
| Bryntum       | 112 ms               | 59 fps         | 104 ms               | 60 fps         |
| DevExtreme    | 256 ms               | 29 fps         | 216 ms               | 38 fps         |
| DHTMLX        | 62 ms                | 19 fps         | 55 ms                | 25 fps         |
| ExtJS Modern  | 358 ms               | 54 fps         | 281 ms               | 59 fps         |
| ExtJS Classic | 211 ms               | 44 fps         | 179 ms               | 44 fps         |
| Componentator |                      |                |                      |                |

L = With locked/pinned/fixed columns, U = Without

The full set of results can be viewed in this [Google Sheet](https://docs.google.com/spreadsheets/d/1vP-tHSDiBZK7hfvoIaMDLAUAPbAPuxgsyoItMFt9Nu4)
