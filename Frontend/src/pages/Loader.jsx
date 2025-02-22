import React from 'react'

const Loader = () => {

    const styles = {
        loader: {
          width: '48px',
          height: '48px',
          border: '5px solid #555',
          borderBottomColor: 'transparent',
          borderRadius: '50%',
          display: 'inline-block',
          boxSizing: 'border-box',
        },
        rotationKeyframes: `
            @keyframes rotation {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
        `,
      };

  return (
    <>
      <span className='loader' style={{
        ...styles.loader,
        animationName:
          typeof document !== "undefined" && new Function(`return \`${styles.rotationKeyframes}\`;`)(),
        animationDuration:'1s', 
        animationTimingFunction:'linear', 
        animationIterationCount:'infinite'
      }}>
      </span>
    </>
  )
}

export default Loader;