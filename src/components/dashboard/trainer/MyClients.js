"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';

export default function MyClients() {
  const { data: session } = useSession();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Diet plan state
  const [totalCalories, setTotalCalories] = useState("");
  const [proteinPct, setProteinPct] = useState("");
  const [carbPct, setCarbPct] = useState("");
  const [fatPct, setFatPct] = useState("");

  // Exercise plan state
  const [day, setDay] = useState("");
  const [cardio, setCardio] = useState("");
  const [strength, setStrength] = useState("");
  const [flexibility, setFlexibility] = useState("");

  // Fetch clients
  useEffect(() => {
    if (session?.user?.email) {
      setLoading(true);
      fetch(
        `/api/users?assignedTrainer=${encodeURIComponent(
          session.user.email
        )}`
      )
        .then((res) => res.json())
        .then((data) => setClients(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [session?.user?.email]);

  // Handle suggest plan
  const handleSuggestPlan = async (clientId, type) => {
    setSaving(true);
    try {
      let body = {};

      if (type === "diet") {
        const calories = parseInt(totalCalories, 10);
        const protein = Math.round((calories * (parseInt(proteinPct, 10) / 100)) / 4);
        const carbs = Math.round((calories * (parseInt(carbPct, 10) / 100)) / 4);
        const fats = Math.round((calories * (parseInt(fatPct, 10) / 100)) / 9);

        body = {
          dietPlan: { calories, protein, carbs, fats },
        };
      }

      if (type === "exercise") {
        body = {
          exercisePlan: {
            day,
            cardio: cardio.split(",").map((ex) => ex.trim()),
            strength: strength.split(",").map((ex) => ex.trim()),
            flexibility: flexibility.split(",").map((ex) => ex.trim()),
          },
        };
      }

      await fetch(`/api/users/${clientId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      Swal.fire({
        title: "Success!",
        text: "Plan suggested successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });

    //   Refresh list
      const updated = await fetch(
        `/api/users?assignedTrainer=${encodeURIComponent(
          session?.user?.email
        )}`
      ).then((res) => res.json());
      setClients(updated);

    //   Reset form
      setTotalCalories("");
      setProteinPct("");
      setCarbPct("");
      setFatPct("");
      setDay("");
      setCardio("");
      setStrength("");
      setFlexibility("");
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
      
    }
  };

  if (loading) {
    return <p className="p-6 text-gray-500">Loading clients...</p>;
  }

  if (clients.length === 0) {
    return <p className="p-6 text-gray-500">You don’t have any clients yet.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Clients</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clients.map((client) => (
          <Card key={client._id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Image
                  src={client.image || "/Images/happy-smiling-man-is-doing-exercises-with-training-apparatus-dark-gym-club.jpg"}
                  alt={client.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-left">{client.name}</p>
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Goal:</strong> {client.goal}
              </p>
              <p>
                <strong>Weight:</strong> {client.currentWeight}kg →{" "}
                {client.goalWeight}kg
              </p>
              <p>
                <strong>Muscle:</strong> {client.currentMuscleMass} →{" "}
                {client.goalMuscleMass}
              </p>
              <p>
                <strong>Fat %:</strong> {client.currentFatPercentage}% →{" "}
                {client.goalFatPercentage}%
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                {/* Current Diet Plan */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Current Diet Plan</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Diet Plan for {client.name}</DialogTitle>
                    </DialogHeader>
                    {client.dietPlan ? (
                      <div className="mt-2 space-y-2">
                        <p>
                          <strong>Total Calories:</strong>{" "}
                          {client.dietPlan.calories} kcal
                        </p>
                        <p>Protein: {client.dietPlan.protein} g</p>
                        <p>Carbs: {client.dietPlan.carbs} g</p>
                        <p>Fats: {client.dietPlan.fats} g</p>
                      </div>
                    ) : (
                      <p className="text-gray-500">No plan suggested yet.</p>
                    )}
                  </DialogContent>
                </Dialog>

                {/* Current Exercise Plan */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">Current Exercise Plan</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Exercise Plan for {client.name}</DialogTitle>
                    </DialogHeader>
                    {client.exercisePlan ? (
                      <div className="mt-2 space-y-2">
                        <p>
                          <strong>Day:</strong> {client.exercisePlan.day}
                        </p>
                        <p>
                          <strong>Cardio:</strong>{" "}
                          {client.exercisePlan.cardio.join(", ")}
                        </p>
                        <p>
                          <strong>Strength:</strong>{" "}
                          {client.exercisePlan.strength.join(", ")}
                        </p>
                        <p>
                          <strong>Flexibility:</strong>{" "}
                          {client.exercisePlan.flexibility.join(", ")}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500">No plan suggested yet.</p>
                    )}
                  </DialogContent>
                </Dialog>

                {/* Suggest Diet Plan */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Suggest Diet Plan</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Suggest Diet Plan for {client.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <Label>Total Calories (kcal)</Label>
                      <Input
                        value={totalCalories}
                        onChange={(e) => setTotalCalories(e.target.value)}
                        placeholder="e.g. 2200"
                      />
                      <Label>Protein (%)</Label>
                      <Input
                        value={proteinPct}
                        onChange={(e) => setProteinPct(e.target.value)}
                        placeholder="e.g. 30"
                      />
                      <Label>Carbs (%)</Label>
                      <Input
                        value={carbPct}
                        onChange={(e) => setCarbPct(e.target.value)}
                        placeholder="e.g. 50"
                      />
                      <Label>Fats (%)</Label>
                      <Input
                        value={fatPct}
                        onChange={(e) => setFatPct(e.target.value)}
                        placeholder="e.g. 20"
                      />
                      <Button
                        onClick={() => handleSuggestPlan(client._id, "diet")}
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Suggest Exercise Plan */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Suggest Exercise Plan</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        Suggest Exercise Plan for {client.name}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <Label>Day of the Week</Label>
                      <Input
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        placeholder="e.g. Monday"
                      />
                      <Label>Cardio Exercises (comma separated)</Label>
                      <Input
                        value={cardio}
                        onChange={(e) => setCardio(e.target.value)}
                        placeholder="e.g. Running 3 sets, Cycling 2 sets"
                      />
                      <Label>Strength Exercises (comma separated)</Label>
                      <Input
                        value={strength}
                        onChange={(e) => setStrength(e.target.value)}
                        placeholder="e.g. Bench Press 4 sets"
                      />
                      <Label>Flexibility Exercises (comma separated)</Label>
                      <Input
                        value={flexibility}
                        onChange={(e) => setFlexibility(e.target.value)}
                        placeholder="e.g. Yoga 2 sets"
                      />
                      <Button
                        onClick={() =>
                          handleSuggestPlan(client._id, "exercise")
                        }
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
