"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const categories = [
  "Accessories",
  "Strength",
  "Cardio",
  "Flexibility",
  "Supplements",
];

// const products = [
//     {
//         id: 1,
//         name: "Stainless Water Bottle",
//         priceRange: "$18.00 – $22.00",
//         image: "/modern-gym-interior-with-equipment-and-people-work.jpg",
//         category: "Accessories",
//         isOnSale: false,
//         isFavorite: false,
//     },
//     {
//         id: 2,
//         name: "Skipping Rope",
//         priceRange: "$130.00 – $259.00",
//         image: "/modern-gym-interior-with-equipment-and-people-work.jpg",
//         category: "Accessories",
//         isOnSale: true,
//         isFavorite: false,
//     },
//     {
//         id: 3,
//         name: "Fitness Kettlebell",
//         priceRange: "$199.00 – $229.00",
//         image: "/modern-gym-interior-with-equipment-and-people-work.jpg",
//         category: "Accessories",
//         isOnSale: false,
//         isFavorite: false,
//     },
//     {
//         id: 4,
//         name: "Adjustable Dumbbells",
//         priceRange: "$45.00 – $60.00",
//         image: "/modern-gym-interior-with-equipment-and-people-work.jpg",
//         category: "Accessories",
//         isOnSale: false,
//         isFavorite: false,
//     },
// ];

export default function WorkoutGearSection() {
  const [activeCategory, setActiveCategory] = useState("Accessories");
  const [products, setProducts] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?limit=4&category=${activeCategory}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, [activeCategory]);

  // const filteredProducts = products.filter((product) => product.category === activeCategory);
  const addToCart = async (product) => {
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
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed to add to cart",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.error(err);
      return new Response(JSON.stringify({ error: "Failed to add to cart" }), {
        status: 500,
      });
    }
  };
  return (
    <section
      id="workout-gear"
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-l from-green-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-r from-green-primary/10 to-transparent rounded-full blur-3xl"></div>

      <div className="main-container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="w-fit bg-black-primary text-green-primary border-accent animate-float text-sm py-2 px-4 mx-auto"
            >
              Our Fitness, Upgraded
            </Badge>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-bold text-title-text text-balance leading-tight">
              Workout Gear
              <span className="block text-primary">Collection</span>
            </h2>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`
                                px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 border-2 cursor-pointer
                                ${
                                  activeCategory === category
                                    ? "bg-green-primary hover:bg-green-dark text-black-primary border-green-primary shadow-lg"
                                    : "bg-transparent hover:bg-green-primary/10 text-title-text border-gray-300 hover:border-green-primary"
                                }
                            `}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {products.map((product) => (
            // <Link key={product._id} href={`/store/${product._id}`}>
              <Card
                key={product._id}
                className="group cursor-pointer border border-gray-200 bg-white shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <div className="relative aspect-[4/3]">
                  {/* Sale Badge */}
                  {product.isOnSale && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-black-primary text-white text-xs px-2 py-1">
                        Sale
                      </Badge>
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.photo}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Add to Cart Button - Shows on hover */}
                  <div
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Button
                      size="sm"
                      className="bg-green-primary hover:bg-green-dark text-black-primary shadow-lg cursor-pointer"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6 space-y-2">
                  <h3 className="font-outfit font-semibold text-lg text-title-text group-hover:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sub-text font-medium">{product.price}</p>
                </CardContent>
              </Card>
            // {/* </Link> */}
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:gap-6">
          <Link href={"/store"}>
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-transparent hover:bg-green-primary/10 text-title-text border-2 border-title-text hover:border-green-primary hover:text-primary transition-all duration-300 transform hover:scale-105 cursor-pointer w-full sm:w-auto"
            >
              Check All Products
            </Button>
          </Link>
          <Link href="/equipments">
            <Button
              size="lg"
              className="text-lg px-8 py-4 bg-green-primary hover:bg-green-dark text-black-primary border-2 border-green-primary transition-all duration-300 transform hover:scale-105 cursor-pointer w-full sm:w-auto"
            >
              View Gym Equipment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
