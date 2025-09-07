import Link from "next/link";

export default function EquipmentCard({ equipment }) {
  return (
    <div className="bg-card text-card-foreground rounded-xl shadow-md p-4 flex flex-col h-full">
      <img
        src={equipment.photo}
        alt={equipment.name}
        className="h-48 w-full object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{equipment.name}</h2>
      <p className="text-gray-600 line-clamp-3 mb-4">{equipment.description}</p>
      <Link
        href={`/equipments/${equipment._id}`}
        className="mt-auto bg-primary text-primary-foreground py-2 px-4 rounded-lg text-center hover:bg-primary/90 transition-colors"
      >
        View Details
      </Link>
    </div>
  );
}
