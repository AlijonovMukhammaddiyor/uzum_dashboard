import { GridReadyEvent } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { AxiosResponse } from 'axios';
import React from 'react';
import Uzlocale from '@/assets/localeuzbek.json';
import clsxm from '@/lib/clsxm';

interface TableProps<T> extends AgGridReactProps {
  className?: string;
  fetchData: (page: number) => Promise<
    AxiosResponse<{
      results: T[];
      count: number;
      links: { next: string | null; previous: string | null };
    }>
  >;
  setLoading?: (loading: boolean) => void;
}

const PAGE_SIZE = 20;

const PaginatedTable = <T,>({
  className,
  fetchData,
  setLoading,
  ...props
}: TableProps<T>) => {
  const [modules, setModules] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function loadModules() {
      const [
        { default: ClientSideRowModelModule },
        { default: InfiniteRowModelModule },
        { default: MenuModule },
        { default: ColumnsToolPanelModule },
      ] = await Promise.all([
        import('@ag-grid-community/client-side-row-model'),
        import('@ag-grid-community/infinite-row-model'),
        import('@ag-grid-enterprise/menu'),
        import('@ag-grid-enterprise/column-tool-panel'),
      ]);
      setModules([
        ClientSideRowModelModule,
        InfiniteRowModelModule,
        MenuModule,
        ColumnsToolPanelModule,
      ]);
    }
    loadModules();
  }, []);

  const onGridReady = (params: GridReadyEvent) => {
    const dataSource = {
      getRows: async function ({
        startRow,
        endRow,
        successCallback,
      }: {
        startRow: number;
        endRow: number;
        successCallback: <T>(data: T[], totalCount: number) => void;
      }) {
        const pageNum = Math.floor(startRow / PAGE_SIZE) + 1;
        if (!fetchData) return;
        const response = await fetchData(pageNum);
        if (setLoading) setLoading(false);
        successCallback(response.data.results, response.data.count);
      },
    };
    params.api.setDatasource(dataSource);
  };

  return (
    <div className={clsxm('ag-theme-alpine h-[800px] w-full', className)}>
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
        enableCharts={true}
        paginationPageSize={PAGE_SIZE}
        animateRows={true}
        enableCellChangeFlash={true}
        alwaysShowVerticalScroll={true}
        alwaysShowHorizontalScroll={true}
        debounceVerticalScrollbar={true}
        enableRangeSelection={true}
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
