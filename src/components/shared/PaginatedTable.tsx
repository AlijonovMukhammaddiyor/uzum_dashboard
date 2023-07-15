import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { AxiosResponse } from 'axios';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Uzlocale from '@/assets/localeuzbek.json';

interface TableProps<T> extends AgGridReactProps {
  className?: string;
  fetchData: (
    page: number,
    sortModel: {
      colId: string;
      sort: string;
    } | null,
    filterModel: {
      [key: string]: {
        filterType: string;
        type: string;
        filter: string;
      };
    } | null
  ) => Promise<
    AxiosResponse<{
      results: T[];
      count: number;
      next?: string;
      previous?: string;
    }>
  >;
  setLoading?: (loading: boolean) => void;
  id?: any;
  rowHeight?: number;
}

const PAGE_SIZE = 20;

const PaginatedTable = <T,>({
  className,
  fetchData,
  rowHeight,
  id,
  setLoading,
  ...props
}: TableProps<T>) => {
  const [modules, setModules] = React.useState<any[]>([]);
  const gridApiRef = React.useRef<GridApi | null>(null);

  React.useEffect(() => {
    async function loadModules() {
      const [
        { default: ClientSideRowModelModule },
        { default: InfiniteRowModelModule },
      ] = await Promise.all([
        import('@ag-grid-community/client-side-row-model'),
        import('@ag-grid-community/infinite-row-model'),
      ]);
      setModules([ClientSideRowModelModule, InfiniteRowModelModule]);
    }
    loadModules();
  }, []);

  // React.useEffect(() => {
  //   if (gridApiRef.current) {
  //     // Reload data when sellerId changes
  //     gridApiRef.current.refreshServerSide({ purge: true });
  //   }
  // }, [id]);

  const onGridReady = (params: GridReadyEvent) => {
    let sortColumn: {
      colId: string;
      sort: string;
    } | null = null;

    let searchColumn: {
      [key: string]: {
        filterType: string;
        type: string;
        filter: string;
      };
    } | null = null;

    const dataSource = {
      getRows: async function ({
        startRow,
        successCallback,
      }: {
        startRow: number;
        endRow: number;
        successCallback: <T>(data: T[], totalCount: number) => void;
      }) {
        try {
          const pageNum = Math.floor(startRow / PAGE_SIZE) + 1;
          if (!fetchData) return;
          const response = await fetchData(pageNum, sortColumn, searchColumn);
          if (setLoading) setLoading(false);
          successCallback(response.data.results, response.data.count);
          // params.api.setRowCount(response.data.results.length);
        } catch (err) {
          setLoading && setLoading(false);
        }
      },
    };
    gridApiRef.current = params.api;
    params.api.setDatasource(dataSource);

    params.api.addEventListener('sortChanged', () => {
      const colState = params.columnApi.getColumnState();
      const sortState = colState.filter(function (s) {
        return s.sort != null;
      });

      if (sortState.length > 0) {
        const sortModel = sortState[0];
        sortColumn = {
          colId: sortModel.colId,
          sort: sortModel.sort ?? 'asc',
        };
        // params.api.refreshServerSide({ purge: true });
      }
    });

    params.api.addEventListener('filterChanged', async () => {
      const filterModel = params.api.getFilterModel();
      console.log('filterModel', filterModel, 'params');
      // if (filterModel) {
      // here, you may need to implement your own function to
      // convert the filterModel to your API's query format
      // const searchParams = convertFilterModelToSearchParams(filterModel);
      // if (fetchData) {
      //   const response = await fetchData(1, sortColumn, searchParams);
      //   if (setLoading) setLoading(false);
      //   successCallback(response.data.results, response.data.count);
      // }
      // only one filterType is text
      if (
        Object.values(filterModel).length > 0 &&
        Object.values(filterModel)[0].filterType === 'text'
      ) {
        searchColumn = filterModel;
      } else {
        searchColumn = null;
      }
      // params.api.refreshServerSide({ purge: true });
      // }
    });
  };

  return (
    <div className={clsxm('ag-theme-alpine h-[800px] min-w-full', className)}>
      <AgGridReact
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
          flex: 1,
          minWidth: 100,
          filterParams: {
            alwaysShowBothConditions: true,
          },
        }}
        suppressColumnMoveAnimation={true}
        allowDragFromColumnsToolPanel={true}
        pagination={true}
        headerHeight={30}
        rowSelection='multiple'
        floatingFiltersHeight={35}
        suppressMenuHide={true}
        // enableCharts={true}
        paginationPageSize={PAGE_SIZE}
        animateRows={true}
        enableCellChangeFlash={true}
        alwaysShowVerticalScroll={true}
        alwaysShowHorizontalScroll={true}
        debounceVerticalScrollbar={true}
        // enableRangeSelection={true}
        // enableFillHandle={true}
        rowHeight={rowHeight ?? 45}
        rowModelType='infinite'
        tooltipShowDelay={0}
        modules={modules}
        cacheBlockSize={PAGE_SIZE}
        maxBlocksInCache={10}
        onGridReady={onGridReady}
        localeText={Uzlocale}
        {...props}
      />
    </div>
  );
};

export default PaginatedTable;
