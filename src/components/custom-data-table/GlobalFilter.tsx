import { FormControl, InputGroup } from "react-bootstrap";

type props = {
  filterText: any;
  onFilter: any;
  onClear: any;
};

const GlobalFilter: React.FC<props> = ({ filterText, onFilter, onClear }) => {
  return (
    <InputGroup size="sm" className="mb-3" style={{ width: "200px" }}>
      <FormControl
        aria-label="Small"
        type="text"
        placeholder="Filter By Name"
        value={filterText}
        onChange={onFilter}
      />
      {filterText && (
        <InputGroup.Append onClick={onClear}>
          <InputGroup.Text id="inputGroup-sizing-sm">X</InputGroup.Text>
        </InputGroup.Append>
      )}
    </InputGroup>
  );
};

export default GlobalFilter;
