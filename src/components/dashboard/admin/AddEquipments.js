"use client";

import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import Swal from "sweetalert2";

const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_KEY;

export default function AddEquipments() {
  const [addingEquipment, setAddingEquipment] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [muscleTargeted, setMuscleTargeted] = useState([]);
  const { register, handleSubmit, setValue, reset } = useForm();

  const handleMuscleSelect = (value) => {
    if (!muscleTargeted.includes(value)) {
      setMuscleTargeted([...muscleTargeted, value]);
    }
  };

  const removeMuscle = (muscle) => {
    setMuscleTargeted(muscleTargeted.filter((m) => m !== muscle));
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.success ? data.data.url : null;
  };

  const onSubmit = async (data) => {
    setAddingEquipment(true);
    let photoUrl = photo;

    if (data.photo?.[0]) {
      photoUrl = await uploadImage(data.photo[0]);
    }

    const equipmentData = {
      name: data.name,
      photo: photoUrl,
      quantity: Number(data.quantity),
      description: data.description,
      usageInstruction: data.usageInstruction,
      muscleTargeted,
      category: data.category,
      difficulty: data.difficulty,
    };


    await fetch("/api/equipments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(equipmentData),
    });

    Swal.fire({
      icon: "success",
      title: "Equipment Added!",
      text: `${equipmentData.name} has been added successfully.`,
      confirmButtonColor: "#2563eb",
    });

    reset();
    setPhoto(null);
    setMuscleTargeted([]);
    setAddingEquipment(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Add New Equipment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div className="">
              <Label>Name</Label>
              <Input
                type="text"
                placeholder="Enter equipment name"
                {...register("name", { required: true })}
              />
            </div>

            {/* Upload Photo */}
            <div className="">
              <Label>Upload Photo</Label>
              <Input type="file" {...register("photo")} />
            </div>

            {/* Quantity */}
            <div>
              <Label>Quantity</Label>
              <Input
              className={"w-full"}
                type="number"
                placeholder="Enter quantity"
                {...register("quantity", { required: true })}
              />
            </div>

            {/* Difficulty */}
            <div>
              <Label>Difficulty</Label>
              <Select onValueChange={(value) => setValue("difficulty", value)}>
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Select onValueChange={(value) => setValue("category", value)}>
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardio">Cardio</SelectItem>
                  <SelectItem value="Strength">Strength</SelectItem>
                  <SelectItem value="Strength/Core">Strength/Core</SelectItem>
                  <SelectItem value="Flexibility">Flexibility</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Muscle Targeted */}
            <div>
              <Label>Muscle Targeted</Label>
              <Select onValueChange={handleMuscleSelect}>
                <SelectTrigger className={"w-full"}>
                  <SelectValue placeholder="Select muscle" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Chest",
                    "Back",
                    "Legs",
                    "Arms",
                    "Core",
                    "Glutes",
                    "Shoulders",
                    "Cardio",
                    "Biceps",
                    "Full Body",
                    "Quadriceps",
                    "Hamstrings",
                  ].map((muscle) => (
                    <SelectItem key={muscle} value={muscle}>
                      {muscle}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {muscleTargeted.map((muscle) => (
                  <Badge
                    key={muscle}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {muscle}
                    <X
                      className="w-3 h-3 cursor-pointer"
                      onClick={() => removeMuscle(muscle)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter equipment description"
                {...register("description", { required: true })}
              />
            </div>

            {/* Usage Instruction */}
            <div className="">
              <Label>Usage Instruction</Label>
              <Textarea
                placeholder="Enter usage instruction"
                {...register("usageInstruction", { required: true })}
              />
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 flex justify-end">
              <Button
                disabled={addingEquipment}
                type="submit"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />{" "}
                {addingEquipment ? "Adding..." : "Add Equipment"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
