import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const SearchBox = () => {
  // History
  const history = useHistory();

  const [keyword, setKeyword] = useState("");

  const submitHandler = (e: any) => {
    e.preventDefault();
    if (keyword === "") {
      history.push(`/?search=${encodeURIComponent(keyword)}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form inline className="search" onSubmit={submitHandler}>
      <Form.Control
        type="text"
        placeholder="Search products..."
        className="mr-sm-2"
        name="q"
        value={keyword}
        onChange={(e: any) => setKeyword(e.target.value)}
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
