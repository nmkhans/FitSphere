"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

export default function AddBlogForm() {
  const { data: session } = useSession();
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageUpload = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setUploading(true);
    // mock upload
    setTimeout(() => {
      const urls = files.map((f) => URL.createObjectURL(f));
      setImageUrls((prev) => [...prev, ...urls]);
      setUploading(false);
    }, 1000);
  };

  const handleRemoveImage = (url) => {
    setImageUrls((prev) => prev.filter((u) => u !== url));
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Add a Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label>name</Label>
            <Input
              {...register("email", { required: true })}
              type="text"
              value={session?.user?.name || ""}
              readOnly
              className="bg-muted"
            />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              {...register("email", { required: true })}
              type="text"
              value={session?.user?.email || ""}
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
