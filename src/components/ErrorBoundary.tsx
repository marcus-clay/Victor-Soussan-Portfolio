import React from 'react';

interface ErrorBoundaryProps {
  systemTheme: 'light' | 'dark';
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const isDark = this.props.systemTheme === 'dark';

    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isDark ? 'bg-[#0a0a0a] text-white' : 'bg-[#FCFCFD] text-gray-900'
        }`}
      >
        <div className="text-center px-6 max-w-md">
          <p className="text-lg font-semibold tracking-[-0.02em] mb-2">
            Something went wrong
          </p>
          <p className={`text-sm leading-relaxed mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            The page failed to load. This can happen after an update.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm text-white bg-gray-900 hover:bg-gray-800 active:scale-[0.97] transition-[background-color,transform] duration-150"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
