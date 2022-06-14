// import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axios";

function DetailProduct() {
  // params.productId --> gunakan untuk ambil data
  const [filteredProduct, setfilteredProduct] = useState([]);
  const [quantity, setquantity] = useState(0);
  const params = useParams();

  const increment = () => {
    return setquantity(quantity + 1);
  };
  const decrement = () => {
    if (quantity > 0) return setquantity(quantity - 1);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const resGetProducts = await axiosInstance.get(
        `/products/${params.productId}`
      );
      setfilteredProduct(resGetProducts.data);
    } catch (error) {
      alert("Terjadi kesalahan. Api udah dinyalain ?");
      console.log({ error });
    }
  };

  const { productName, price, productImage, description } = filteredProduct;
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-6">
          <img style={{ width: "100%" }} src={productImage} alt="tulisan" />
        </div>
        <div className="col-6 d-flex flex-column justify-content-center">
          <h4>{productName}</h4>
          <h5>Rp.{price?.toLocaleString("id")}</h5>
          <p>{description}</p>
          <div className="d-flex flex-row align-items-center">
            <button className="btn btn-primary " onClick={decrement}>
              -
            </button>
            <strong className="text-center mx-4">{quantity}</strong>
            <button className="btn btn-primary " onClick={increment}>
              +
            </button>
          </div>
          <button className="btn btn-success mt-3">Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
