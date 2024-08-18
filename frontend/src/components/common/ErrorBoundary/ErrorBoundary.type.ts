import {
  Component,
  ComponentType,
  ErrorInfo,
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";

declare function FallbackRender(props: FallbackProps): ReactNode;

export type FallbackProps = {
  error: unknown;
  resetErrorBoundary: (...args: unknown[]) => void;
};

type ErrorBoundarySharedProps = PropsWithChildren<{
  onError?: (error: Error, info: ErrorInfo) => void;
  onReset?: (
    details:
      | { reason: "imperative-api"; args: unknown[] }
      | { reason: "keys"; prev: unknown[] | undefined; next: unknown[] | undefined },
  ) => void;
  resetKeys?: unknown[];
}>;

export type ErrorBoundaryPropsWithComponent = ErrorBoundarySharedProps & {
  fallback?: never;
  FallbackComponent: ComponentType<FallbackProps>;
  fallbackRender?: never;
};

export type ErrorBoundaryPropsWithRender = ErrorBoundarySharedProps & {
  fallback?: never;
  FallbackComponent?: never;
  fallbackRender: typeof FallbackRender;
};

export type ErrorBoundaryPropsWithFallback = ErrorBoundarySharedProps & {
  fallback: ReactElement<unknown, string | FunctionComponent | typeof Component> | null;
  FallbackComponent?: never;
  fallbackRender?: never;
};

export type ErrorBoundaryProps =
  | ErrorBoundaryPropsWithFallback
  | ErrorBoundaryPropsWithComponent
  | ErrorBoundaryPropsWithRender;
