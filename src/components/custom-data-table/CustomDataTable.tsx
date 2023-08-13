import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";

// Components
import GlobalFilter from "./GlobalFilter";

type props = {
  columns: any;
  data: any;
  globalFilterColumn: any;
  isLoading: boolean;
};

const CustomDataTable: React.FC<props> = ({
  columns,
  data,
  globalFilterColumn,
  isLoading,
}) => {
  // State
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const filteredItems = data?.filter(
    (item: any) =>
      item[globalFilterColumn] &&
      item[globalFilterColumn].toLowerCase().includes(filterText.toLowerCase())
  );

  const handleChange = ({ selectedRows }: any) => {
    console.log("Selected Rows: ", selectedRows);
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <GlobalFilter
        onFilter={(e: any) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      selectableRows
      pagination
      onSelectedRowsChange={handleChange}
      dense
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      highlightOnHover
      pointerOnHover
      progressPending={isLoading}
    />
  );
};

export default CustomDataTable;
