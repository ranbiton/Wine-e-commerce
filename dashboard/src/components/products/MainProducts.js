import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const MainProducts = () => {
  const [keyword, setKeyword] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;

  useEffect(() => {
    dispatch(listProducts()); 
  }, [dispatch, successDelete]);


  const submitHandler = (e) => {
    e.preventDefault();
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase()) ||
      product.color.toLowerCase().includes(keyword.toLowerCase()) ||
      product.grapeVariety.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchResults(results);
    console.log('Searching for:', keyword);
  };

  const filteredProducts = searchResults.length > 0 ? searchResults : products;

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products</h2>
        <div>
          <Link to="/addproduct" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-6 col-md-8 mx-auto d-flex justify-content-center">
              <form onSubmit={submitHandler} className="input-group">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control p-2"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="btn btn-primary ms-2">
                  Search
                </button>
              </form>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {filteredProducts.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainProducts;
