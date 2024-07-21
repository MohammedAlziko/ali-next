"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Link from "next/link";
import { useSession } from "next-auth/react";

const AdminBtn = ({ productId ,imgPuplicId }) => {

  const {data:session,status} =useSession();



  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  const router = useRouter();

  const handleDelete = async () => {
    setisLoading(true);
    seterror(null);

    // Go to api/register/route.js
    const response = await fetch("http://localhost:3000/api/deleteProduct", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId, imgPuplicId
      }),
    });

    if (response.ok) {
      toast.success("Your product has been deleted successfully");

      router.push("/");
    } else {
      setisLoading(false);
      seterror("faild to delete product, Please try again");
    }

    setisLoading(false);
  };


if(status === "authenticated" && session.user.email === "admin@admin.com"){

  return (
    <div
      style={{ justifyContent: "center", gap: "1rem", marginTop: "3rem" }}
      className="flex"
    >
      <Link href={`/update-product/${productId}`} className="flex update-product">
        <FontAwesomeIcon style={{ width: "1.1rem" }} icon={faPen} />
        Update Product
      </Link>

      <button onClick={handleDelete} className="flex delete-product">
        <FontAwesomeIcon style={{ width: "1.1rem" }} icon={faTrash} />

        {isLoading ? "Loading...." : "Delete Product"}
      </button>

      <p>{error}</p>
    </div>
  );
}else{
  return null;
}







};

export default AdminBtn;