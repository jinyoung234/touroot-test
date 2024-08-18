import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const RouterErrorBoundary = () => {
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    throw new Error("zz");
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-center">오류가 발생했습니다</h2>
      <p>경로 오류가 발생했습니다.</p>
      <p>{error.message}</p>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={() => window.location.reload()}
      >
        새로고침하기
      </button>
    </main>
  );
};

export default RouterErrorBoundary;
