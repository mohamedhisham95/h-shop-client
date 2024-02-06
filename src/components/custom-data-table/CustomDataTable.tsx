import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

// Components
import GlobalFilter from "./GlobalFilter";

type props = {
  columns: any;
  data: any;
  globalFilterColumn: any;
  isLoading: boolean;
  globalSearchPlaceholder: string;
  setSelectedRows: any;
  isCreateAllowed: boolean;
  createLink: string;
  isRowSelectAllowed?: boolean;
  clearSelectedRows?: boolean;
};

const CustomDataTable: React.FC<props> = ({
  columns,
  data,
  globalFilterColumn,
  isLoading,
  globalSearchPlaceholder,
  setSelectedRows,
  isCreateAllowed,
  createLink,
  isRowSelectAllowed = true,
  clearSelectedRows,
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
    // console.log("Selected Rows: ", selectedRows);
    setSelectedRows(selectedRows);
  };

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };
    return (
      <div className="w-100 d-flex justify-content-between align-items-start">
        {isCreateAllowed && (
          <Link to={createLink} className="btn btn-primary btn-sm">
            Create
          </Link>
        )}

        <GlobalFilter
          onFilter={(e: any) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          placeholder={globalSearchPlaceholder}
        />
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      columns={columns}
      data={filteredItems}
      selectableRows={isRowSelectAllowed}
      pagination
      onSelectedRowsChange={handleChange}
      dense
      paginationResetDefaultPage={resetPaginationToggle}
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      highlightOnHover
      pointerOnHover
      progressPending={isLoading}
      clearSelectedRows={clearSelectedRows}
    />
  );
};

export default CustomDataTable;
