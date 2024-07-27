import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-auth-gradient flex justify-center items-center min-h-screen w-full">
      {children}
    </div>
  );
}

export default Layout;
