import React, { useState } from "react";

function ErrorBoundary({ children }) {
  const [error, setError] = useState(null);

  const handleError = (error, errorInfo) => {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    setError(error);
  };

  if (error) {
    return <div>Something went wrong: {error.message}</div>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}

export default ErrorBoundary;
