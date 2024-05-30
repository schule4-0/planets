import { useEffect, useState } from "react";

export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  return children;
}

function PAGE() {
  return (
    <ClientOnly>
      <div>Client only component</div>
    </ClientOnly>
  );
}