"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import Swal from "sweetalert2";

export default function CartModal({ open, onClose }) {
  const [cartItems, setCartItems] = useState([]);
  const [removing, setRemoving] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  // ✅ Load cart from API
  useEffect(() => {
    if (open) {
      fetch("/api/carts")
        .then((res) => res.json())
        .then((data) => setCartItems(data));
    }
  }, [open]);

  const removeFromCart = async (id) => {
    setRemovingId(id);
    setRemoving(true);
    await fetch(`/api/carts/${id}`, { method: "DELETE" });
    setCartItems((prev) => prev.filter((item) => item._id !== id));
    setRemoving(false);
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    Swal.fire({
      icon: "success",
      title: "Checkout successful 🎉",
      text: "Your order has been placed!",
      confirmButtonColor: "#22c55e",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className={`flex items-center justify-between gap-4 border-b pb-2 ${removing && removingId === item._id ? "opacity-50" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16">
                    <Image
                      src={item.photo || "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  disabled={removing}
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
              </div>
            ))}

            {/* Footer */}
            <div className="pt-4 space-y-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
