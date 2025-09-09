'use client'
import { Button } from '@/components/ui/button';
import React from 'react'

export default function ContinueBtn() {
  return (
    <Button variant="secondary" className={'cursor-pointer'} onClick={() => history.back()}>
      Continue Shopping
    </Button>
  );
}
