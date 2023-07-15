import { GridReadyEvent } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { AxiosResponse } from 'axios';
import React, { useCallback } from 'react';

import clsxm from '@/lib/clsxm';

import Uzlocale from '@/assets/localeuzbek.json';

interface TableProps<T> extends AgGridReactProps {
  className?: string;
  fetchData?: () => Promise<AxiosResponse<T[]>>;
  setLoading?: (loading: boolean) => void;
  withCheckbox?: boolean;
  columnDefs: any[];
  rowHeight?: number;
}

const Table = <T,>({
  className,
  fetchData,
  setLoading,
  rowHeight = 45,
  withCheckbox = false,
  columnDefs,
  ...props
}: TableProps<T>) => {
  const [rowData, setRowData] = React.useState<T[]>(props.rowData || []);
  const selectedRowsRef = React.useRef<T[]>([]);
  const onSelectionChanged = useCallback((event: any) => {
    if (!withCheckbox) return;
    selectedRowsRef.current = event.api.getSelectedRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className={clsxm('ag-theme-alpine h-[800px] w-full', className)}>
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
        headerHeight={30}
        floatingFiltersHeight={35}
        suppressMenuHide={true}
        animateRows={true}
        enableCellChangeFlash={true}
        alwaysShowVerticalScroll={true}
        alwaysShowHorizontalScroll={true}
        debounceVerticalScrollbar={true}
        rowHeight={rowHeight}
        tooltipShowDelay={0}
        rowData={rowData ?? []}
        onGridReady={onGridReady}
        localeText={Uzlocale}
        onSelectionChanged={onSelectionChanged}
        columnDefs={columnDefs}
        {...props}
      />
    </div>
  );
};

export default React.memo(Table);
