"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useParams, useRouter} from "next/navigation";
import Swal from "sweetalert2";

export default function EditBlogForm() {
  const { data: session } = useSession();
  const router = useRouter();
 
  const params = useParams();
  const blogId = params.id;
  // console.log(blogId);
  

  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    // Fetch blog data by ID
    async function fetchBlog() {
      if (!blogId) return;
      const res = await fetch(`/api/blogs/${blogId}`);
      const result = await res.json();
      // console.log(result);
      
      if (result.success && result.data) {
        const blog = result.data;
          console.log(blog);
        setValue("title", blog.title);
        setValue("content", blog.content);
        setValue("name", blog.name);
        setValue("email", blog.email);
        setImageUrls(blog.imageUrls || []);
      }
    }
    fetchBlog();
  }, [blogId, setValue]);

  const onSubmit = async (data) => {
    const blogData = { ...data, imageUrls, id: blogId };
    try {
      const res = await fetch(`/api/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });
      const result = await res.json();
      if (result.success) {
         Swal.fire("Updated!", "Blog has been updated.", "success");
        router.push("/dashboard/blog"); // redirect after update
      } else {
        Swal.fire("Error!", "Failed to update blog.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Something went wrong.", "error");
    }
  };

  const handleImageUpload = (e) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setUploading(true);
    setTimeout(() => {
      const urls = files.map((f) => URL.createObjectURL(f));
      setImageUrls((prev) => [...prev, ...urls]);
      setUploading(false);
    }, 1000);
  };

  const handleRemoveImage = (url) => {
    setImageUrls((prev) => prev.filter((u) => u !== url));
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Edit Blog</CardTitle>
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
            Update Blog
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
