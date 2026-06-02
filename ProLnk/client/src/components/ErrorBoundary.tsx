import { cn } from "@/lib/utils";
import { captureError } from "@/lib/analytics";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

const isDev = import.meta.env.DEV;

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[ErrorBoundary] Caught error:", {
      message: error.message,
      stack: error.stack,
      componentStack: info.componentStack,
    });
    captureError(error, { componentStack: info.componentStack, source: "react_error_boundary" });
    this.setState({ errorInfo: info.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex items-center justify-center min-h-screen p-6"
          style={{ background: "#0A1628" }}
        >
          <div className="flex flex-col items-center w-full max-w-lg text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
            >
              <AlertTriangle size={32} className="text-red-400" />
            </div>

            <div
              className="text-2xl font-black mb-1"
              style={{ color: "#F5E642", fontFamily: "Bricolage Grotesque, sans-serif" }}
            >
              ProLnk
            </div>

            <h2 className="text-xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-gray-400 text-sm mb-6">
              We hit an unexpected error. Reloading the page usually fixes it — if the problem persists, contact support.
            </p>

            {isDev && this.state.error && (
              <div
                className="w-full p-4 rounded-xl overflow-auto mb-6 text-left"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <p className="text-xs font-bold text-red-400 mb-2">{this.state.error.message}</p>
                <pre className="text-xs text-gray-500 whitespace-pre-wrap break-words">
                  {this.state.errorInfo || this.state.error.stack}
                </pre>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold",
                  "text-white cursor-pointer hover:opacity-90 transition-opacity"
                )}
                style={{ background: "#F5E642", color: "#0A1628" }}
              >
                <RotateCcw size={15} />
                Reload Page
              </button>
              <button
                onClick={() => { window.location.href = "/"; }}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold",
                  "text-gray-300 cursor-pointer hover:opacity-90 transition-opacity"
                )}
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <Home size={15} />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
