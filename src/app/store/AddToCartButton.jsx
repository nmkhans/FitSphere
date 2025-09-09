'use client'
import { Button } from '@/components/ui/button';
import React from 'react'

export default function AddToCartButton({ product}) {
  return (
    
    <Button
      className={'cursor-pointer'}
      onClick={() => addToCart(product)} // client function (local storage or API call)
      variant="secondary"
    >
      Add to Cart
    </Button>
  );
}
