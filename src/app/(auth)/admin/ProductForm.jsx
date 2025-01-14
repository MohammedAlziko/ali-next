"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductForm = () => {

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);

  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);


  const handleSubmit = async (eo) => {
    eo.preventDefault();
    setisLoading(true);
    seterror(null);

    if (!title || !price  || !description) {
      seterror("All input must be filled");
      setisLoading(false);
      return;
    }


const formData =new FormData()

formData.set("img",image);
formData.set("title",title);
formData.set("price",price);
formData.set("description",description);

       // Go to api/addProduct/route.js
   const resAddProduct = await fetch("api/addProduct", {
    method: "POST",
    body: formData,
  });

  const data = await resAddProduct.json();
  console.log(data)



  if (resAddProduct.ok) {
    eo.target.reset();
    toast.success(data.message);
console.log("toast")
  } else {
    setisLoading(false);
    seterror("faild to add Product, Please try again");
  }
 

  setisLoading(false)
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
      <div className="mb-4">
        <label htmlFor="username" className="form-label">
          Product Image :
        </label>
        <input
          onChange={(eo) => {
            setImage(eo.target.files[0])
          }}
          required
          type="file"
          className="form-control"
          id="username"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Product Title:
        </label>
        <input
          required
          onChange={(eo) => {
            setTitle(eo.target.value)
          }}
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="T-shirt"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Product Price:
        </label>
        <input
        step={.01}
          placeholder="$99.99"
          required
          onChange={(eo) => {
            setPrice(eo.target.value)
          }}
          type="number"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Product Description:
        </label>

        <textarea
          placeholder="Product Description....."
          required
          onChange={(eo) => {
            setDescription(eo.target.value)
          }}
          rows={3}
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>

      <button
        disabled={!image || !title || !description || !price }
        type="submit"
        className="btn btn-primary"
      >
        {isLoading ? (
     
          <div
            style={{ width: "1.5rem", height: "1.5rem" }}
            className="spinner-border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          "Add Product"
        )}
      </button>

      <p style={{ color: "#ff7790", fontSize: "1.1rem", marginTop: "1rem" }}>
        {" "}
        {error}
      </p>
    </form>
  );
};

export default ProductForm;