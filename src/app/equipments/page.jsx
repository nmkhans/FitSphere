import Link from "next/link";
import { Button } from "@/components/ui/button";
import EquipmentFilter from "./EquipmentFilter";
export default async function EquipmentsPage({ searchParams }) {
   const params = await searchParams;

   const search = params?.search || "";
   const category = params?.category || "All";
   const muscle = params?.muscle || "All";
   const page = parseInt(params?.page ?? "1", 10);

   // Fetch equipments from API (server-side)
   const res = await fetch(
     `${process.env.NEXT_PUBLIC_BASE_URL}/api/equipments?search=${search}&category=${category}&muscle=${muscle}&page=${page}`,
     { cache: 'no-store' }
   );

   if (!res.ok) {
     throw new Error(`Failed to fetch equipments: ${res.status}`);
   }

   const { equipments, totalPages } = await res.json();

  return (
    <section className="py-16 px-6 md:px-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-primary">Gym Equipment Collection</h1>
        <p className="text-gray-600 text-lg md:text-xl mb-6">
          Discover our comprehensive collection of professional-grade gym equipment. 
          Each piece is carefully selected to help you achieve your fitness goals safely and effectively.
        </p>
        <Link href="/">
          <Button variant="outline" className="mb-8">
            ← Back to Home
          </Button>
        </Link>
      </div>
      <EquipmentFilter
        initialSearch={search}
        initialCategory={category}
        initialMuscle={muscle}
      />
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {equipments.map((eq) => (
          <div
            key={eq._id}
            className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={eq.photo}
              alt={eq.name}
              className="h-48 w-full object-cover"
            />
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-bold mb-2">{eq.name}</h2>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                {eq.description}
              </p>
              <Link
                href={`/equipments/${eq._id}?page=${page}&search=${search}&category=${category}&muscle=${muscle}`}
                className="mt-auto bg-primary text-primary-foreground hover:bg-primary/90 text-center py-2 rounded-md font-semibold transition"
              >
                View Details
              </Link>
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
              muscle,
              page: pageNumber,
            }).toString();

            return (
              <Link key={idx} href={`/equipments?${params}`} passHref>
                <Button
                  variant={pageNumber === page ? "default" : "outline"}
                  size="sm"
                  className={
                    pageNumber === page
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }
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
