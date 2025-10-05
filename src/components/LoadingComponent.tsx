import { ReactNode } from "react";

type LoadingProps = {
  loading: boolean;
  children: ReactNode;
};

export function LoadingComponent({ children, loading }: LoadingProps) {
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white opacity-75 z-50 flex items-center justify-center">
          <div>Loading...</div>
        </div>
      )}
      {children}
    </>
  );
}
