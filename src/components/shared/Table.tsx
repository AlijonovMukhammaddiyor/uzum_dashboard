import { GridReadyEvent } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { AxiosResponse } from 'axios';
import React from 'react';
import Uzlocale from '@/assets/localeuzbek.json';
import clsxm from '@/lib/clsxm';

interface TableProps<T> extends AgGridReactProps {
  className?: string;
  fetchData: () => Promise<AxiosResponse<T[]>>;
  setLoading?: (loading: boolean) => void;
}

const Table = <T,>({
  className,
  fetchData,
  setLoading,
  ...props
}: TableProps<T>) => {
  const [rowData, setRowData] = React.useState<T[]>([]);

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
        rowSelection='multiple'
        floatingFiltersHeight={35}
        suppressMenuHide={true}
        enableCharts={true}
        animateRows={true}
        enableCellChangeFlash={true}
        alwaysShowVerticalScroll={true}
        alwaysShowHorizontalScroll={true}
        debounceVerticalScrollbar={true}
        enableRangeSelection={true}
        enableFillHandle={true}
        rowHeight={45}
        tooltipShowDelay={0}
        rowData={rowData}
        onGridReady={onGridReady}
        localeText={Uzlocale}
        {...props}
      />
    </div>
  );
};

export default Table;
