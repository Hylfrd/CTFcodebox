import { Component, type ErrorInfo, type ReactNode } from 'react';

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('页面加载失败', error, info.componentStack);
  }
  render() {
    if (this.state.failed)
      return (
        <main className="fatal-error">
          <h1>页面加载失败</h1>
          <p>请刷新页面后重试。</p>
          <button type="button" className="button" onClick={() => window.location.reload()}>
            刷新页面
          </button>
        </main>
      );
    return this.props.children;
  }
}
