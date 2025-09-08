"use client";

import { useEffect } from 'react';

export default function AdminDashboardLayout({ children }) {
  // Hide navbar and footer for admin dashboard
  useEffect(() => {
    const navbar = document.querySelector('nav');
    const footer = document.querySelector('footer');
    
    if (navbar) navbar.style.display = 'none';
    if (footer) footer.style.display = 'none';
    
    // Cleanup function to restore navbar and footer when leaving dashboard
    return () => {
      if (navbar) navbar.style.display = '';
      if (footer) footer.style.display = '';
    };
  }, []);

  return <>{children}</>;
}
