export default function Loading() {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}>
        <div style={{ ...styles.bar, ...styles.bar1 }}></div>
        <div style={{ ...styles.bar, ...styles.bar2 }}></div>
        <div style={{ ...styles.bar, ...styles.bar3 }}></div>
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    backgroundColor: 'transparent',
  },

  spinner: {
    display: 'flex',
    gap: '6px',
    alignItems: 'center',
  },

  bar: {
    width: '8px',
    height: '35px',
    backgroundColor: '#ffffff',

    animation: 'loadingScale 1.2s infinite ease-in-out',
    animationFillMode: 'both',
  },

  // Staggered delays create the bouncing-bars effect
  bar1: {
    animationDelay: '0s',
  },

  bar2: {
    animationDelay: '0.2s',
    opacity: 0.7,
  },

  bar3: {
    animationDelay: '0.4s',
    opacity: 0.4,
  },
};

// Keyframes
if (typeof document !== 'undefined') {
  const style = document.createElement('style');

  style.innerHTML = `
    @keyframes loadingScale {
      0%, 40%, 100% {
        transform: scaleY(0.4);
      }

      20% {
        transform: scaleY(1);
      }
    }
  `;

  document.head.appendChild(style);
}