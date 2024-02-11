import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

type Props = {
  setExpanded: any;
};

const SearchBox: React.FC<Props> = ({ setExpanded }) => {
  // History
  const history = useHistory();

  // Location
  const { search } = useLocation();

  // State
  const [keyword, setKeyword] = useState("");

  // Submit Handler
  const submitHandler = (e: any) => {
    e.preventDefault();
    setExpanded(false);
    if (keyword !== "") {
      history.push(`/?search=${encodeURIComponent(keyword)}`);
    } else {
      history.push("/");
    }
  };

  // UseEffect
  useEffect(() => {
    setKeyword(search !== "" ? search.split("=")[1] : "");

    return () => {};
  }, [search]);

  return (
    <Form inline className="search" onSubmit={submitHandler}>
      <InputGroup>
        <FormControl
          placeholder="Search products..."
          aria-describedby="search"
          value={keyword}
          onChange={(e: any) => setKeyword(e.target.value)}
        />
        <InputGroup.Append className="cursor-pointer">
          <InputGroup.Text id="search" onClick={submitHandler}>
            <BsSearch />
          </InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
