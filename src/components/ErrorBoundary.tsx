"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div className="fixed inset-0 -z-10 flex items-center justify-center bg-void">
          <div className="text-center px-6">
            <p className="font-mono text-mono tracking-widest text-copper uppercase mb-3">
              System offline
            </p>
            <p className="font-body text-fog text-sm leading-relaxed max-w-xs">
              The 3D scene failed to load. The rest of the site is still
              functional.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
