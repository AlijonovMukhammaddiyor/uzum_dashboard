import { GridReadyEvent } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { AxiosResponse } from 'axios';
import React from 'react';

import clsxm from '@/lib/clsxm';

import Uzlocale from '@/assets/localeuzbek.json';

interface TableProps<T> extends AgGridReactProps {
  className?: string;
  categoryId?: string;
  fetchData: (
    page: number,
    sortModel: {
      colId: string;
      sort: string;
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
}

const PAGE_SIZE = 20;

const PaginatedTable = <T,>({
  className,
  fetchData,
  setLoading,
  categoryId,
  ...props
}: TableProps<T>) => {
  const [modules, setModules] = React.useState<any[]>([]);

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

  const onGridReady = (params: GridReadyEvent) => {
    let sortColumn: {
      colId: string;
      sort: string;
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
        const pageNum = Math.floor(startRow / PAGE_SIZE) + 1;
        if (!fetchData) return;
        const response = await fetchData(pageNum, sortColumn);
        if (setLoading) setLoading(false);
        successCallback(response.data.results, response.data.count);
      },
    };

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
        params.api.refreshServerSide({ purge: true });
      }
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
        enableFillHandle={true}
        rowHeight={45}
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
