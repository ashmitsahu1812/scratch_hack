import React from 'react';

export function GeoBox({ 
  color = '#00FFB3', 
  shadow = '#008F64', 
  size = 'w-16 h-16', 
  className = '', 
  style = {} 
}) {
  return (
    <div className={`${size} pointer-events-none z-0 ${className}`} style={style}>
      <div style={{
        width: '100%', height: '100%',
        background: color,
        border: '3px solid rgba(0,0,0,0.25)',
        boxShadow: `-8px 8px 0 ${shadow}`,
        transform: 'perspective(300px) rotateX(18deg) rotateY(-28deg)',
      }} />
    </div>
  );
}

export function GeoCylinder({ 
  color = '#FF6B6B', 
  shadow = '#9E1B1B', 
  size = 'w-12 h-16', 
  className = '', 
  style = {} 
}) {
  return (
    <div className={`${size} pointer-events-none z-0 ${className}`} style={style}>
      <div style={{
        width: '100%', height: '100%',
        background: color,
        borderRadius: '50% 50% 50% 50% / 18% 18% 82% 82%',
        border: '3px solid rgba(0,0,0,0.2)',
        boxShadow: `0 10px 0 ${shadow}`,
      }} />
    </div>
  );
}

export function GeoStar({ 
  color = '#FF5CE8', 
  shadow = '#B326A0', 
  size = 'w-14 h-14', 
  className = '', 
  style = {} 
}) {
  return (
    <div className={`${size} pointer-events-none z-0 ${className}`} style={style}>
      <div 
        style={{
          width: '100%', 
          height: '100%',
          background: color,
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          filter: `drop-shadow(-4px 4px 0 ${shadow})`,
        }} 
      />
    </div>
  );
}

export function GeoDiamond({ 
  color = '#FFE500', 
  shadow = '#998A00', 
  size = 'w-12 h-12', 
  className = '', 
  style = {} 
}) {
  return (
    <div className={`${size} pointer-events-none z-0 ${className}`} style={style}>
      <div style={{
        width: '100%', height: '100%',
        background: color,
        border: '3px solid rgba(0,0,0,0.25)',
        boxShadow: `-6px 6px 0 ${shadow}`,
        transform: 'rotate(45deg)',
      }} />
    </div>
  );
}
