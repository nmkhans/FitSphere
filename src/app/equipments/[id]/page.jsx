import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import BackButton from "./BackButton";

// ✅ Fetch one equipment with ISR (revalidate every 60s)
async function getEquipment(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/equipments/${id}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function EquipmentDetailsPage({ params, searchParams }) {
  const { id } = params;
  const equipment = await getEquipment(id);

  if (!equipment) return notFound();

  const search = searchParams?.search || "";
  const category = searchParams?.category || "All";
  const muscle = searchParams?.muscle || "All";
  const page = searchParams?.page || "1";
  // Split usage instructions into list items
  const instructions = equipment.usageInstruction
    .split(".")
    .map((inst) => inst.trim())
    .filter((inst) => inst.length > 0);

  return (
    <section className="py-12 px-6 md:px-12 max-w-6xl mx-auto">
      <Card className="overflow-hidden shadow-xl rounded-2xl">
        <div className="flex flex-col md:flex-row">
          {/* Image Left */}
          <div className="relative w-full md:w-1/2 h-80 md:h-auto">
            <Image
              src={equipment.photo}
              alt={equipment.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details Right */}
          <CardContent className="md:w-1/2 p-6 space-y-6">
            <CardHeader className="p-0">
              <CardTitle className="text-3xl font-bold">
                {equipment.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">{equipment.category}</Badge>
                <Badge variant="outline">{equipment.difficulty}</Badge>
                <Badge>{equipment.quantity} in stock</Badge>
              </div>
            </CardHeader>

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{equipment.description}</p>
            </div>

            {/* Usage Instructions */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Usage Instructions</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-1">
                {instructions.map((inst, idx) => (
                  <li key={idx}>{inst}.</li>
                ))}
              </ol>
            </div>

            {/* Muscles Targeted */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Muscles Targeted</h3>
              <div className="flex flex-wrap gap-2">
                {equipment.muscleTargeted.map((muscle, idx) => (
                  <Badge key={idx} variant="default">
                    {muscle}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button className="w-full md:w-auto mr-8">
                Add to Workout Plan
              </Button>
              {/* Back button */}
              <Link
                href={`/equipments?search=${search}&category=${category}&muscle=${muscle}&page=${page}`}
              >
                <BackButton></BackButton>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </section>
  );
}
