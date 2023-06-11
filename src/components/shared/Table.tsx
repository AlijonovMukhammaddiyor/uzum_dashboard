import { GridApi } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import Link from 'next/link';
import React, { useState } from 'react';

import clsxm from '@/lib/clsxm';

export interface TableProps {
  className?: string;
  columnDefs: Record<string, any>[];
  data: any[];
}

const Table = ({ className, columnDefs, data }: TableProps) => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  return (
    <div className={clsxm('ag-theme-alpine h-[800px] w-full', className)}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data}
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true,
        }}
        suppressColumnMoveAnimation={true}
        allowDragFromColumnsToolPanel={true}
        onGridReady={onGridReady}
        // getRowHeight={() => 35}
        pagination={true}
        headerHeight={30}
        rowSelection='multiple'
        floatingFiltersHeight={35}
        suppressMenuHide={true}
        enableCharts={true}
        // onCellClicked={(e) => {
        //   console.log('e', e);
        // }}
        // onCellDoubleClicked={(e) => {
        //   console.log('e', e);
        // }}
        // loadingCellRenderer={CustomLoadingCellRenderer}
        // loadingCellRendererParams={{
        //   loadingMessage: 'Iltimos kuting...',
        // }}
        localeText={{}}
        paginationPageSize={20}
        // paginationAutoPageSize={true}
        animateRows={true}
        enableCellChangeFlash={true}
        alwaysShowVerticalScroll={true}
        alwaysShowHorizontalScroll={true}
        debounceVerticalScrollbar={true}
        enableRangeSelection={true}
        enableFillHandle={true}
        rowHeight={45}
        tooltipShowDelay={0}
      />
    </div>
  );
};

const CategoryNameCellRenderer: React.FC<any> = ({ value }) => {
  return (
    <Link href={`/category/${value}`}>
      <p className='text-blue-500 hover:underline'>{value}</p>
    </Link>
  );
};

const SellerNameCellRenderer: React.FC<any> = ({ value }) => {
  return (
    <Link href={`/seller/${value}`}>
      <p className='text-blue-500 hover:underline'>{value}</p>
    </Link>
  );
};

export default Table;
