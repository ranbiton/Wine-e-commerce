import React from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import { useSelector } from "react-redux";

const OrderMain = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  return (
    <section className="content-main">
    <div className="content-header">
      <h2 className="content-title">Orders</h2>
    </div>

    <div className="card mb-4 shadow-sm">
      <header className="card-header bg-white">
        <div className="row gx-3 py-3">
          <div className="col-lg-6 col-md-8 mx-auto d-flex justify-content-center">
            <input
              type="text"
              placeholder="Search..."
              className="form-control p-2"
            />
            <button type="submit" className="search-button btn btn-primary ms-2">
              Search
            </button>
          </div>
        </div>
      </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <Orders orders={orders} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
