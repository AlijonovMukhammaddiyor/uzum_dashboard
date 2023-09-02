import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React from 'react';

// import 'ag-grid-enterprise';
import clsxm from '@/lib/clsxm';

import RuLocale from '@/assets/localeRussian.json';
import UzLocale from '@/assets/localeuzbek.json';

interface TableProps<T> extends AgGridReactProps {
  className?: string;
  setCount?: (count: number) => void;
  fetchData: (
    startRow: number,
    endRow: number,
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
  shouldRefetch?: boolean;
  setTotal?: (total: number) => void;
}

const PAGE_SIZE = 20;

const InfiniteTable = <T,>({
  className,
  fetchData,
  rowHeight,
  setTotal,
  pageSize = PAGE_SIZE,
  id,
  shouldRefetch = false,
  setCount,
  setLoading,
  ...props
}: TableProps<T>) => {
  const [modules, setModules] = React.useState<any[]>([]);
  const gridApiRef = React.useRef<GridApi | null>(null);
  const { i18n } = useTranslation('common');
  const [sortColumns, setSortColumns] = React.useState<{
    colId: string;
    sort: string;
  } | null>(null);
  const sortColumnRef = React.useRef<{ colId: string; sort: string } | null>(
    null
  );

  const sortColumn: {
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
      endRow,
      successCallback,
    }: {
      startRow: number;
      endRow: number;
      successCallback: <T>(data: T[], totalCount: number) => void;
    }) {
      try {
        if (!fetchData) return;

        const response = await fetchData(
          startRow,
          endRow,
          sortColumnRef.current ?? sortColumns,
          searchColumn
        );
        if (setLoading) setLoading(false);
        if (setCount) setCount(response.data.count);
        console.log(response.data.count, 'count');
        const results = response.data.results ?? [];
        const count = results.length ? response.data.count : 0;
        successCallback(results, count);
        setTotal && setTotal(response.data.count);
        // params.api.setRowCount(response.data.results.length);
      } catch (err) {
        setLoading && setLoading(false);
      }
    },
  };

  React.useEffect(() => {
    console.log('REFETCHING');
    if (gridApiRef.current) {
      gridApiRef.current.setDatasource(dataSource);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRefetch]);

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
    gridApiRef.current = params.api;
    params.api.setDatasource(dataSource);

    params.api.addEventListener('sortChanged', () => {
      const colState = params.columnApi.getColumnState();
      const sortState = colState.filter(function (s) {
        return s.sort != null;
      });

      console.log('SORT STATE', sortState);

      if (sortState.length > 0) {
        const sortModel = sortState[0];
        const updatedSortColumn = {
          colId: sortModel.colId,
          sort: sortModel.sort ?? 'asc',
        };

        sortColumnRef.current = updatedSortColumn;
        setSortColumns(updatedSortColumn);
        // params.api.refreshServerSide({ purge: true });
      }
    });

    params.api.addEventListener('filterChanged', async () => {
      const filterModel = params.api.getFilterModel();
      console.log(filterModel);
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
        'ag-theme-balham min-w-full overflow-hidden border border-none shadow-none',
        className
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
        headerHeight={60}
        floatingFiltersHeight={45}
        animateRows={true}
        enableCellChangeFlash={true}
        alwaysShowVerticalScroll={true}
        alwaysShowHorizontalScroll={true}
        debounceVerticalScrollbar={true}
        // enableRangeSelection={true}
        paginationPageSize={100}
        // enableFillHandle={true}
        rowHeight={rowHeight ?? 45}
        rowModelType='infinite'
        tooltipShowDelay={0}
        modules={modules}
        cacheBlockSize={100}
        cacheOverflowSize={100}
        maxBlocksInCache={10}
        maxConcurrentDatasourceRequests={2}
        onGridReady={onGridReady}
        localeText={i18n.language === 'uz' ? UzLocale : RuLocale}
        domLayout='autoHeight'
        {...props}
      />
    </div>
  );
};

export default InfiniteTable;
