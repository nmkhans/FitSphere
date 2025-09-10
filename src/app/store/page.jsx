import Link from "next/link";
import { Button } from "@/components/ui/button";
import StoreFilter from "./StoreFilter";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
import CartButton from "./CartButton";
export default async function StorePage({ searchParams }) {
  const params = await searchParams;
  const search = params?.search || "";
  const category = params?.category || "All";
  const sort = params?.sort || "asc";
  const page = parseInt(params?.page ?? "1", 10);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?search=${search}&category=${category}&sort=${sort}&page=${page}`,
    { cache: "no-store" }
  );

  const { products, totalPages } = await res.json();

  return (
    <section className="py-16 px-6 md:px-12 space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">FitSphere Store</h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Buy gym accessories, supplements, and equipment for your training.
        </p>
      </div>

      {/* Filters */}
      {/* <StoreFilter
        initialSearch={search}
        initialCategory={category}
        initialSort={sort}
      /> */}
      <div className="flex justify-between flex-col-reverse md:flex-row gap-6 items-center">
        <div className="w-full">
          <StoreFilter
            initialSearch={search}
            initialCategory={category}
            initialSort={sort}
          />
        </div>
        <div className="-mt-6">
          <CartButton />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="group relative bg-card text-card-foreground min-h-[400px] rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            {/* Product Image with transition */}
            <div className="relative w-full h-70 transition-all duration-300 group-hover:h-45">
              <Image
                src={product.photo}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>

            {/* Name + Price + Rating */}
            <div className="p-4 text-center space-y-1">
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-yellow-500 font-medium">
                ⭐ {product.rating || "4.5"}
              </p>
              <p className="text-primary font-bold text-lg">${product.price}</p>
            </div>

            {/* Hover Buttons */}
            <div
              className="absolute bottom-0 w-full flex flex-col gap-2 px-4 pb-4 translate-y-4 
               transition-all opacity-0 group-hover:opacity-100 duration-300  group-hover:translate-y-0"
            >
              <Link
                href={`/store/${product._id}`}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-center py-2 rounded-md font-semibold transition"
              >
                View Details
              </Link>
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNumber = idx + 1;
            const params = new URLSearchParams({
              search,
              category,
              sort,
              page: pageNumber,
            }).toString();

            return (
              <Link key={idx} href={`/store?${params}`} passHref>
                <Button
                  variant={pageNumber === page ? "default" : "outline"}
                  size="sm"
                >
                  {pageNumber}
                </Button>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
