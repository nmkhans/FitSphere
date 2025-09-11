"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import Link from "next/link";

export default function AddBlogForm() {
  const { data: session } = useSession();

  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  // console.log(session);
  if (!session) {
    return <div>Loading...</div>;
  }

  const onSubmit = async (data) => {
    const blogData = { ...data, imageUrls };

    console.log(blogData);

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      const result = await res.json();
      console.log(result);

      if (result.success) {
        Swal.fire("Created!", "Blog has been created.", "success");
        reset(); // clear form
        setImageUrls([]); // clear images
      } else {
        Swal.fire("Error!", "error in blog creation!", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  const handleImageUpload = async (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    setUploading(true);

    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_KEY}`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();
        if (data.success) {
          uploadedUrls.push(data.data.url);
        }
      } catch (err) {
        console.error("Upload failed", err);
      }
    }

    setImageUrls((prev) => [...prev, ...uploadedUrls]);
    setUploading(false);
  };

  const handleRemoveImage = (url) => {
    setImageUrls((prev) => prev.filter((u) => u !== url));
  };

  return (
    <Card className="max-w-3xl mx-auto my-4 border-none shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">Add a Blog</CardTitle>
          <Button>
            <Link href="/dashboard/blog">All Blogs</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              {...register("name", { required: true })}
              type="text"
              defaultValue={session?.user?.name || ""}
              readOnly
              className="bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              {...register("email", { required: true })}
              type="text"
              defaultValue={session?.user?.email || ""}
              readOnly
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label>Blog Title</Label>
            <Input
              {...register("title", { required: true })}
              type="text"
              placeholder="Enter Blog title"
            />
          </div>

          <div className="space-y-2">
            <Label>Blog Content</Label>
            <Textarea
              {...register("content", { required: true })}
              placeholder="Write your Blog..."
              className="h-40"
            />
          </div>

          {imageUrls.length > 0 && (
            <div>
              <p className="font-medium mb-2">Current Images:</p>
              <div className="grid grid-cols-3 gap-3">
                {imageUrls.map((url, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={url}
                      alt={`uploaded-${idx}`}
                      className="rounded-md shadow"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full"
                      onClick={() => handleRemoveImage(url)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label>Upload Images</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
            />
            {uploading && (
              <p className="text-sm text-blue-500">Uploading images...</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={uploading}>
            Submit Blog
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
