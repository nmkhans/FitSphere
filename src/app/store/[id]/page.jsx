import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { notFound } from "next/navigation";
import AddToCartButton from "../AddToCartButton";
import ContinueBtn from "./ContinueBtn";

export default async function ProductPage({ params }) {
  const awaitedParams = await params;
  const { id } = awaitedParams;

  // Fetch product by ID from API
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const fetchUrl = baseUrl 
      ? `${baseUrl}/api/products/${id}`
      : `/api/products/${id}`;
    
    const res = await fetch(fetchUrl, {
      cache: "no-store", // always get fresh data
    });

    if (!res.ok) return notFound();

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API returned non-JSON response for product:", id);
      return notFound();
    }

    const product = await res.json();

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Image */}
        <div className="flex-1 relative w-full h-80 sm:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={product.photo}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          <p className="text-primary text-2xl font-semibold">
            ${product.price}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-5 h-5" />
              {product.rating || "4.5"}
            </div>
            <span className="text-muted-foreground">
              ({product.reviews?.length || 0} reviews)
            </span>
          </div>

          <p className="text-muted-foreground font-medium">
            Brand: {product.brand}
          </p>
          <p className="text-muted-foreground font-medium">
            Stock: {product.stock}
          </p>

          <p className="mt-4 text-gray-700">{product.description}</p>

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Features:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Usage Instructions */}
          {product.usageInstruction && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Usage Instructions:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {product.usageInstruction
                  .split(".")
                  .filter((s) => s.trim() !== "")
                  .map((ins, idx) => (
                    <li key={idx}>{ins.trim()}.</li>
                  ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="w-fit">
              <AddToCartButton product={product} />
            </div>
            <ContinueBtn></ContinueBtn>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="flex flex-col gap-4">
            {product.reviews.map((rev, idx) => (
              <div key={idx} className="border p-4 rounded-lg shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{rev.user}</span>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4" />
                    {rev.rating}
                  </div>
                </div>
                <p className="text-gray-700">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
  } catch (error) {
    console.error("Error fetching product:", error);
    return notFound();
  }
}
