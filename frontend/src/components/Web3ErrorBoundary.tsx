'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class Web3ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Web3 Provider Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '20px',
            textAlign: 'center',
            backgroundColor: '#FDF8F0',
          }}
        >
          <div
            style={{
              maxWidth: '500px',
              padding: '40px',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ color: '#FF9100', marginBottom: '16px' }}>
              ⚠️ 錢包連接出錯
            </h2>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              抱歉，Web3 錢包連接遇到問題。請嘗試重新加載頁面。
            </p>
            {this.state.error && (
              <details style={{ marginBottom: '24px', textAlign: 'left' }}>
                <summary style={{ cursor: 'pointer', color: '#999', fontSize: '14px' }}>
                  查看錯誤詳情
                </summary>
                <pre
                  style={{
                    marginTop: '12px',
                    padding: '12px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '4px',
                    fontSize: '12px',
                    overflow: 'auto',
                    maxHeight: '200px',
                  }}
                >
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: '#FF9100',
                color: 'white',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#FFA833')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#FF9100')}
            >
              重新加載頁面
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
