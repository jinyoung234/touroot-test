import { Component, ErrorInfo, createElement, isValidElement } from "react";
import { createContext } from "react";

import type {
  ErrorBoundaryProps,
  FallbackProps,
} from "@components/common/ErrorBoundary/ErrorBoundary.type";

type ErrorBoundaryState =
  | {
      didCatch: true;
      error: unknown;
    }
  | {
      didCatch: false;
      error: null;
    };

const initialState: ErrorBoundaryState = {
  didCatch: false,
  error: null,
};

export type ErrorBoundaryContextType = {
  didCatch: boolean;
  error: unknown;
  resetErrorBoundary: (...args: unknown[]) => void;
};

export const ErrorBoundaryContext = createContext<ErrorBoundaryContextType | null>(null);

const isDevelopment = process.env.NODE_ENV === "development";

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { didCatch: true, error };
  }

  resetErrorBoundary(...args: unknown[]) {
    const { error } = this.state;

    if (error !== null) {
      this.props.onReset?.({
        args,
        reason: "imperative-api",
      });

      this.setState(initialState);
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps, prevState: ErrorBoundaryState) {
    const { didCatch } = this.state;
    const { resetKeys } = this.props;

    if (didCatch && prevState.error !== null && hasArrayChanged(prevProps.resetKeys, resetKeys)) {
      this.props.onReset?.({
        next: resetKeys,
        prev: prevProps.resetKeys,
        reason: "keys",
      });

      this.setState(initialState);
    }
  }

  render() {
    const { children, fallbackRender, FallbackComponent, fallback } = this.props;
    const { didCatch, error } = this.state;

    let childToRender = children;

    if (didCatch) {
      const props: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary,
      };

      if (typeof fallbackRender === "function") {
        childToRender = fallbackRender(props);
      } else if (FallbackComponent) {
        childToRender = createElement(FallbackComponent, props);
      } else if (fallback === null || isValidElement(fallback)) {
        childToRender = fallback;
      } else {
        if (isDevelopment) {
          console.error(
            "react-error-boundary requires either a fallback, fallbackRender, or FallbackComponent prop",
          );
        }

        throw error;
      }
    }

    return createElement(
      ErrorBoundaryContext.Provider,
      {
        value: {
          didCatch,
          error,
          resetErrorBoundary: this.resetErrorBoundary,
        },
      },
      childToRender,
    );
  }
}

function hasArrayChanged(a: unknown[] = [], b: unknown[] = []) {
  return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
}
