"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Swal from "sweetalert2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function AddProducts() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      features: [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  // ✅ Upload image to imgbb
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    if (!data.success) throw new Error("Image upload failed");
    return data.data.url;
  };

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      let photoUrl = "";
      if (formData.photo[0]) {
        photoUrl = await uploadImage(formData.photo[0]);
      }

      const productData = {
        name: formData.name,
        photo: photoUrl,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        category: formData.category,
        brand: formData.brand,
        stock: parseInt(formData.stock, 10),
        description: formData.description,
        features: formData.features.filter((f) => f.trim() !== ""),
        usageInstruction: formData.usageInstruction,
        createdAt: new Date(),
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      if (res.ok) {
        Swal.fire("✅ Success", "Product added successfully!", "success");
        reset();
      } else {
        Swal.fire("❌ Error", "Failed to add product", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-4">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Add New Product </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div>
              <Label>Product Name</Label>
              <Input
                placeholder="Enter product name"
                {...register("name", { required: true })}
              />
            </div>

            {/* Photo */}
            <div>
              <Label>Product Photo</Label>
              <Input type="file" accept="image/*" {...register("photo")} />
            </div>

            {/* Price + Rating + Stock in grid */}
            <div className="sm:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Price ($)</Label>
                <Input
                  placeholder="Enter price"
                  min="0"
                  type="number"
                  step="0.01"
                  {...register("price", { required: true })}
                />
              </div>
              <div>
                <Label>Rating</Label>
                <Input
                  placeholder="Enter rating"
                  min="0"
                  max="5"
                  type="number"
                  step="0.1"
                  {...register("rating")}
                />
              </div>
              <div>
                <Label>Stock</Label>
                <Input
                  placeholder="Enter stock"
                  min="1"
                  type="number"
                  {...register("stock", { required: true })}
                />
              </div>
            </div>

            {/* Brand */}
            <div>
              <Label>Brand</Label>
              <Input placeholder="Enter brand name" {...register("brand")} />
            </div>

            {/* Category */}
            <div>
              <Label>Category</Label>
              <Select onValueChange={(val) => setValue("category", val)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Strength">
                    Strength Training Equipment
                  </SelectItem>
                  <SelectItem value="Cardio">Cardio Equipment</SelectItem>
                  <SelectItem value="Flexibility">
                    Flexibility Equipment
                  </SelectItem>
                  <SelectItem value="Recovery">Recovery Equipment</SelectItem>
                  <SelectItem value="Supplements">Supplements</SelectItem>
                  <SelectItem value="Accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea
                placeholder="Enter product description"
                {...register("description", { required: true })}
              />
            </div>

            {/* Usage Instruction */}
            <div>
              <Label>Usage Instruction</Label>
              <Textarea
                placeholder="Enter usage instructions"
                {...register("usageInstruction")}
              />
            </div>

            {/* Features (Dynamic Fields) */}
            <div className="sm:col-span-2">
              <Label>Features</Label>
              <div className="space-y-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      className={"w-full"}
                      placeholder={`Feature ${index + 1}`}
                      {...register(`features.${index}`)}
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => append("")}
                >
                  ➕ Add Feature
                </Button>
              </div>
            </div>

            {/* Submit */}
            <div className="sm:col-span-2 flex justify-end">
              <Button
                disabled={loading}
                type="submit"
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />{" "}
                {loading ? "Adding..." : "Add Product"}
              </Button>
            </div>
            {/* <Button
              type="submit"
              className="w-full sm:col-span-2"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </Button> */}
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
