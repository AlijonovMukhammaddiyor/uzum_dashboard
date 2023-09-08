import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React from 'react';

// import 'ag-grid-enterprise';
import clsxm from '@/lib/clsxm';

import RuLocale from '@/assets/localeRussian.json';

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
  pageSize?: number;
  isBalham?: boolean;
  isMaterial?: boolean;
}

const PAGE_SIZE = 20;

const PaginatedTable = <T,>({
  className,
  fetchData,
  rowHeight,
  pageSize = PAGE_SIZE,
  id,
  isBalham,
  isMaterial,
  setLoading,
  ...props
}: TableProps<T>) => {
  const [modules, setModules] = React.useState<any[]>([]);
  const gridApiRef = React.useRef<GridApi | null>(null);
  const { i18n } = useTranslation('common');

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
          const pageNum = Math.floor(startRow / pageSize) + 1;
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
    <div
      className={clsxm(
        'min-w-full overflow-hidden rounded-lg shadow-sm',
        className,
        isBalham
          ? 'ag-theme-balham'
          : isMaterial
          ? 'ag-theme-material'
          : 'ag-theme-alpine'
      )}
    >
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
        enableRangeSelection={true}
        suppressColumnMoveAnimation={true}
        allowDragFromColumnsToolPanel={true}
        pagination={true}
        headerHeight={props.headerHeight ?? 55}
        rowSelection='multiple'
        floatingFiltersHeight={isMaterial ? 65 : 35}
        suppressMenuHide={true}
        // enableCharts={true}
        paginationPageSize={pageSize}
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
        cacheBlockSize={pageSize}
        maxBlocksInCache={10}
        onGridReady={onGridReady}
        localeText={RuLocale}
        // containerStyle={{
        //   height: `${height}px`,
        // }}
        {...props}
      />
    </div>
  );
};

export default PaginatedTable;
