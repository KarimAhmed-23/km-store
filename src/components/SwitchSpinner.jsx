import React from 'react'

const SwitchSpinner = () => (
  <div
    style={{
      display: 'block',
      position: 'fixed',
      right: 15,
      top: 15,
      zIndex: 1031,
    }}
  >
    <div
      style={{
        animation: '400ms linear infinite spinner',
        borderBottom: '3px solid transparent',
        borderLeft: '3px solid var(--main-color)',
        borderRadius: '50%',
        borderRight: '3px solid transparent',
        borderTop: '3px solid var(--main-color)',
        boxSizing: 'border-box',
        height: 25,
        width: 25,
      }}
    />
  </div>
)

export default SwitchSpinner
