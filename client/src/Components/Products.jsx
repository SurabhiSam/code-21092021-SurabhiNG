import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import CarsListing from "./CarsListing";

function Products() {
  const url =
    "https://614709df65467e0017384a20.mockapi.io/api/v1/cars?page=1&limit=10";
  const [products, setProducts] = useState({
    loading: false,
    data: null,
    error: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const getProducts = () => {
    const searchUrl = url + "&search=" + searchQuery;
    axios
      .get(searchUrl)
      .then((response) => {
        setProducts({
          loading: false,
          data: response.data,
          error: false,
        });
      })
      .catch(() => {
        setProducts({
          loading: false,
          data: null,
          error: true,
        });
      });
  };
  useEffect(() => {
    setProducts({
      loading: true,
      data: null,
      error: false,
    });
    searchProduct();
  }, [searchQuery]);

  let content = null;
  if (products.error) {
    content = <p>There was an error please refresh or try again later</p>;
  }

  const searchProduct = useCallback(debounce(getProducts, 500), [searchQuery]);

  const searchProductHandler = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      <h1>Cars</h1>
      <form class="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={searchProductHandler}
          value={searchQuery}
        />
      </form>

      <div className="container">
        <div className="row hidden-md-up">
          <CarsListing />
        </div>
      </div>
    </div>
  );
}

export default Products;
