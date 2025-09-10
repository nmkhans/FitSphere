"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function AddToCartButton({ product }) {
  const { data: session } = useSession();

  const addToCart = async () => {
    if (!session) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const res = await fetch("/api/carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          name: product.name,
          price: product?.price,
          photo: product?.photo,
          category: product?.category,
          brand: product?.brand,
          quantity: 1,
          createdAt: new Date(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item added to cart",
          showConfirmButton: false,
          timer: 1500,
        })
        
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to add to cart",
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (err) {
      console.error(err);
      return new Response(
        JSON.stringify({ error: "Failed to add to cart" }),
        { status: 500 }
      );
    }
  };

  return (
    <Button onClick={addToCart} variant="secondary" className="cursor-pointer">
      Add to Cart
    </Button>
  );
}
