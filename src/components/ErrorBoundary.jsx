import React from 'react';
import styles from './ErrorBoundary.module.css';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Mohalla Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrap}>
          <div className={styles.code}>!</div>
          <h2 className={styles.title}>Something went wrong</h2>
          <p className={styles.sub}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            className={styles.btn}
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
