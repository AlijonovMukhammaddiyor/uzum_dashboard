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
}

const PAGE_SIZE = 20;

const PaginatedTable = <T,>({
  className,
  fetchData,
  rowHeight,
  pageSize = PAGE_SIZE,
  id,
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
            sortColumn,
            searchColumn
          );
          if (setLoading) setLoading(false);

          successCallback(response.data.results ?? [], response.data.count);
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
        paginationPageSize={200}
        // enableFillHandle={true}
        rowHeight={rowHeight ?? 45}
        rowModelType='infinite'
        tooltipShowDelay={0}
        modules={modules}
        cacheBlockSize={200}
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

export default PaginatedTable;
