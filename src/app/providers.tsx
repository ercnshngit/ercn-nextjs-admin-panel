import { ReactQueryWrapper } from "@/lib/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryWrapper>
      {children} <ReactQueryDevtools initialIsOpen={true} />
    </ReactQueryWrapper>
  );
}
