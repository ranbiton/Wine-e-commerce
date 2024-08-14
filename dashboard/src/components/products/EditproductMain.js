import React, { useState, useEffect, useRef } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [grapeVariety, setGrapeVariety] = useState("");
  const [year, setYear] = useState(0);
  const canvasRef = useRef(null); 

  const dispatch = useDispatch();
  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Product Updated", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setDescription(product.description);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setPrice(product.price);
        setColor(product.color);
        setGrapeVariety(product.grapeVariety);
        setYear(product.year);
        if (product.image) {
          const img = new Image();
          img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = img.width; 
            canvas.height = img.height; 
            ctx.drawImage(img, 0, 0, img.width, img.height);
          };
          img.src = product.image;
        }
      }
    }
  }, [product, productId, dispatch, successUpdate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const defaultWidth = 300; 
        const defaultHeight = 300;
        canvas.width = defaultWidth;
        canvas.height = defaultHeight;
        ctx.drawImage(img, 0, 0, defaultWidth, defaultHeight);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const imageUrl = canvas.toDataURL('image/png');
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        description,
        image: imageUrl, 
        countInStock,
        grapeVariety,
        color,
        year,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && <Message variant="alert-danger">{errorUpdate}</Message>}
                  {loadingUpdate && <Loading />}
                  {loading ? <Loading /> : error ? <Message variant="alert-danger">{error}</Message> : (
                    <>
                      <div className="mb-4">
                        <label className="form-label">Product title</label>
                        <input type="text" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Price</label>
                        <input type="number" className="form-control" required value={price} onChange={(e) => setPrice(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Count In Stock</label>
                        <input type="number" className="form-control" required value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Year</label>
                        <input type="number" className="form-control" required value={year} onChange={(e) => setYear(e.target.value)} />
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Color</label>
                        <textarea className="form-control" required value={color} onChange={(e) => setColor(e.target.value)}></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Kind of Grape</label>
                        <textarea className="form-control" required value={grapeVariety} onChange={(e) => setGrapeVariety(e.target.value)}></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" required value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                      </div>
                      <div className="mb-4">
                        <label className="form-label">Images</label>
                        <input type="file" className="form-control" onChange={handleImageUpload} />
                        <canvas ref={canvasRef} style={{ marginTop: "20px", width: "300px", height: "300px" }}></canvas>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
