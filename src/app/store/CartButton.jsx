"use client";

import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import CartModal from "./CartModal";
import { useSession } from "next-auth/react";

export default function CartButton() {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const { data: session } = useSession();

  // Fetch cart count
  useEffect(() => {
    fetch("/api/carts")
      .then((res) => res.json())
      .then((data) => setCount(data.length));
  }, [open]);

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen(true)}
          className="relative p-2 rounded-full hover:bg-gray-100"
        >
          <ShoppingCart size={24} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {count}
            </span>
          )}
        </button>
      </div>

      <CartModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
