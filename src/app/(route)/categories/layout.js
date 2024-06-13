import React, { Children } from "react";
import { Toaster } from "sonner";

function layout({ children }) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}

export default layout;
