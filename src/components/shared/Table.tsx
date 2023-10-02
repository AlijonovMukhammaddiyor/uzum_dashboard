import { GridReadyEvent } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { AxiosResponse } from 'axios';
import { useTranslation } from 'next-i18next';
import React, { useCallback } from 'react';

import clsxm from '@/lib/clsxm';

import RuLocale from '@/assets/localeRussian.json';
import Uzlocale from '@/assets/localeuzbek.json';
interface TableProps<T> extends AgGridReactProps {
  className?: string;
  fetchData?: () => Promise<AxiosResponse<T[]>>;
  setLoading?: (loading: boolean) => void;
  withCheckbox?: boolean;
  columnDefs: any[];
  rowHeight?: number;
  theme?: string;
  isMaterial?: boolean;
  isBalham?: boolean;
}

const Table = <T,>({
  className,
  fetchData,
  setLoading,
  rowHeight = 45,
  isBalham = false,
  withCheckbox = false,
  columnDefs,
  isMaterial = false,
  ...props
}: TableProps<T>) => {
  const [rowData, setRowData] = React.useState<T[]>(props.rowData || []);
  const selectedRowsRef = React.useRef<T[]>([]);
  const { i18n } = useTranslation('common');
  const onSelectionChanged = useCallback((event: any) => {
    if (!withCheckbox) return;
    selectedRowsRef.current = event.api.getSelectedRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [zoomLevel, setZoomLevel] = React.useState(1);

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1500) {
        setZoomLevel(0.85); // 90% zoom for windows less than 600px wide
      } else {
        setZoomLevel(1); // 100% zoom otherwise
      }
    }

    window.addEventListener('resize', handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    const uzanalitikaDiv = document.getElementById(
      'justtable'
    ) as HTMLDivElement;
    (uzanalitikaDiv.style as any).zoom = zoomLevel;
  }, [zoomLevel]);

  React.useEffect(() => {
    const getData = async () => {
      if (!fetchData) return;
      const response = await fetchData();
      if (setLoading) setLoading(false);
      setRowData(response.data);
    };

    getData();
  }, [fetchData, setLoading]);

  const onGridReady = (params: GridReadyEvent) => {
    params.api.sizeColumnsToFit();

    // if (withCheckbox) {
    //   params.api.forEachNode((node) => {
    //     const selectedRows = state.similarProductsSelected || [];
    //     const selected = selectedRows.some(
    //       (row: any) => row.product_id === node.data.product_id
    //     );
    //   });
    // }
  };

  return (
    <div
      className={clsxm(
        'h-[800px] w-full',
        className,
        isMaterial
          ? 'ag-theme-material'
          : isBalham
          ? 'ag-theme-balham'
          : 'ag-theme-alpine'
      )}
      id='justtable'
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
        suppressColumnMoveAnimation={true}
        allowDragFromColumnsToolPanel={true}
        rowSelection='multiple'
        headerHeight={props.headerHeight ?? 30}
        floatingFiltersHeight={35}
        suppressMenuHide={true}
        animateRows={true}
        cacheBlockSize={100}
        maxBlocksInCache={10}
        enableCellChangeFlash={true}
        alwaysShowVerticalScroll={true}
        alwaysShowHorizontalScroll={true}
        debounceVerticalScrollbar={true}
        rowHeight={rowHeight}
        tooltipShowDelay={0}
        rowData={rowData ?? []}
        onGridReady={onGridReady}
        localeText={i18n.language === 'uz' ? Uzlocale : RuLocale}
        onSelectionChanged={onSelectionChanged}
        columnDefs={columnDefs}
        {...props}
      />
    </div>
  );
};

export default React.memo(Table);
