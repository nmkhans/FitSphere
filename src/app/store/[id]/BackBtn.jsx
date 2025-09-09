"use client";
import { Button } from "@/components/ui/button";
import React from "react";

export default function BackBtn() {
  return (
    <Button
      variant="outline"
      className="mb-8 cursor-pointer"
      onClick={() => history.back()}
    >
      ← Back
    </Button>
  );
}
