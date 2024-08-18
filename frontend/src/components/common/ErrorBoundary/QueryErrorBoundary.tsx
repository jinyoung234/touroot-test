import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import { ErrorBoundary } from "@components/common/ErrorBoundary/ErrorBoundary";
import ErrorModal from "@components/common/ErrorBoundary/ErrorModal/ErrorModal";

const QueryErrorBoundary = ({ children }: React.PropsWithChildren) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => {
        console.log("myerror", error);
        return <ErrorModal resetErrorBoundary={resetErrorBoundary} />;
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default QueryErrorBoundary;
