"use client";

import React, { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

const ManageStory = () => {
  const { data: session } = useSession();
  const [currentPage, setCurrentPage] = useState(1);
  const cardPerPage = 6;

  const queryClient = useQueryClient();

  const email = session?.user?.email;

  // Fetch

const fetchBlogs = async ({ queryKey }) => {
  const [_key, email] = queryKey;
  try {
    const res = await fetch(`/api/blogs?email=${email}`);
    const data = await res.json();
    // console.log("Fetched Blogs Data:", data);
    
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || "Failed to fetch blogs");
    }
  } catch (err) {
    console.error("Fetch Blogs Error:", err);
    throw err;
  }
};
  const {
    data: stories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["storiesByEmail", email],
    queryFn: fetchBlogs,
    enabled: !!email, 
  });

  // Pagination calculation
  const totalPages = Math.ceil(stories.length / cardPerPage);
  const startIdx = (currentPage - 1) * cardPerPage;
  const currentData = useMemo(
    () => stories.slice(startIdx, startIdx + cardPerPage),
    [stories, startIdx, cardPerPage]
  );

  // Delete blog
const deleteBlog = async (id) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this story!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        Swal.fire("Deleted!", "Story has been deleted.", "success");
        queryClient.invalidateQueries(["storiesByEmail", email]); // Refetch stories
      } else {
        Swal.fire("Error!", data.message || "Failed to delete story.", "error");
      }
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error!", "Something went wrong!", "error");
  }
};

  if (isLoading) {
  return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
<div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold mb-6">Manage Your Blog</h2>
      <Button>
        <Link href="/dashboard/blog/add">Create New Blog</Link>
      </Button>
</div>

      {stories.length === 0 ? (
        <p className="text-gray-600">No Blogs Found.</p>
      ) : (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData.map((story) => (
              <Card key={story._id} className="shadow-sm border-none">
                {story.imageUrls?.[0] && (
                  <img
                    src={story.imageUrls[0]}
                    alt="Story Cover"
                    className="h-48 w-full object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle>{story.title}</CardTitle>
                  <CardDescription className="line-clamp-3 text-sm">
                    {story.content}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/dashboard/blog/${story._id}`}>
                      Edit
                    </Link>
                  </Button>
                  <Button
                    onClick={() => deleteBlog(story._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Pagination */}
          {stories.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-600">
                Showing {startIdx + 1} -{" "}
                {Math.min(startIdx + cardPerPage, stories.length)} of{" "}
                {stories.length}
              </span>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => p - 1)}
                      disabled={currentPage === 1}
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={currentPage === i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage((p) => p + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageStory;
