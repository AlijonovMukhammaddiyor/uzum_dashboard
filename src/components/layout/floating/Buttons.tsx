import Image, { StaticImageData } from 'next/image';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

interface ButtonProps {
  dimension: any;
  itemBackgroundColor: any;
  index: any;
  isOpen: any;
  direction: any;
  degree: any;
  distance: any;
  nbrItems: any;
  onClick: any;
  src: StaticImageData;
  label: string;
  bgColor?: string;
  href?: string;
}

function Button({
  dimension,
  itemBackgroundColor,
  index = 0,
  isOpen = false,
  direction = 'up',
  degree = 0,
  distance,
  nbrItems = 0,
  onClick = () => {
    console.log('Button clicked');
  },
  src,
  label,
  bgColor,
  href,
}: ButtonProps) {
  const initButtonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: `${dimension}px`,
    width: `${dimension}px`,
    backgroundColor: bgColor ?? '#333',
    borderRadius: `${dimension * 0.5}px`,
    cursor: 'pointer',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
    opacity: 0,
    borderWidth: '1px',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, .08), 0 2px 2px rgba(0, 0, 0, .15)',
    outline: 'none',
    transition: `all ${
      index * 50 + 200
    }ms cubic-bezier(0.71, 0.71, 0, 1.18) 0ms`,
  } as React.CSSProperties;

  const [buttonStyle, setButtonStyle] = useState(initButtonStyle);

  useEffect(() => {
    if (isOpen) {
      let translateX = 0,
        translateY = 0;
      if (direction === 'up')
        translateY = -((dimension + dimension * 0.33) * (index + 1));
      else if (direction === 'down')
        translateY = (dimension + dimension * 0.33) * (index + 1);
      else if (direction === 'right')
        translateX = (dimension + dimension * 0.33) * (index + 1);
      else if (direction === 'left')
        translateX = -((dimension + dimension * 0.33) * (index + 1));
      else {
        if (!distance) distance = dimension * 2;

        let angle = degree / nbrItems;
        if (degree >= 360) angle = 360 / (nbrItems + 1);

        const radian = angle * (Math.PI / 180);
        translateX = Math.cos(radian * index) * distance;
        translateY = Math.sin(radian * index) * distance;
      }

      setButtonStyle((prevStyle) => ({
        ...prevStyle,
        opacity: 1,
        transform: `translate(${translateX}px, ${translateY}px)`,
      }));
    } else {
      setButtonStyle((prevStyle) => ({
        ...prevStyle,
        opacity: 0,
        transform: `translate(0px, 0px)`,
      }));
    }
    // Only re-run the effect if the props change
  }, [dimension, index, nbrItems, isOpen, direction, degree, distance]);

  const mouseEnter = () => {
    if (isOpen)
      setButtonStyle((prevStyle) => ({
        ...prevStyle,
        boxShadow: 'none',
      }));
  };

  const mouseLeave = () => {
    setButtonStyle((prevStyle) => ({
      ...prevStyle,
      boxShadow: '0 0 0 1px rgba(0, 0, 0, .08), 0 2px 2px rgba(0, 0, 0, .15)',
    }));
  };

  const pointerDown = () => {
    setButtonStyle((prevStyle) => ({
      ...prevStyle,
      boxShadow: 'inset 0px 1px 2px 1px rgba(0, 0, 0, .15)',
    }));
  };

  const pointerUp = () => {
    setButtonStyle((prevStyle) => ({
      ...prevStyle,
      boxShadow: 'none',
    }));
  };

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className=''
      onPointerDown={pointerDown}
      onPointerUp={pointerUp}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      style={buttonStyle}
    >
      <div
        className='absolute -left-[120px] flex w-[110px] items-center justify-center rounded-md py-1 text-white'
        style={{
          backgroundColor: bgColor ?? '#333',
        }}
      >
        {label}
      </div>
      <Image src={src} alt={label} className='h-full w-full' />
    </a>
  );
}

Button.defaultProps = {
  onClick: () => {
    // console.log('Button clicked');
  },
};

Button.propTypes = {
  //... (same as provided)
  distance: PropTypes.number,
  degree: PropTypes.number.isRequired,
  dimension: PropTypes.number.isRequired,
  itemBackgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  src: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  nbrItems: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
};

export default Button;
