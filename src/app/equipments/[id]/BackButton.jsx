'use client';
import { Button } from "@/components/ui/button";
import React from "react";

export default function BackButton() {
  return (
    <Button className={'cursor-pointer'} variant="outline" onClick={() => history.back()}>
      &larr; Back
    </Button>
  );
}
