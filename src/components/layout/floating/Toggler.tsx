import React, { useEffect, useState } from 'react';

interface TogglerProps {
  buttonType: string;
  toggleOpen: () => void;
  isOpen: boolean;
  dimension?: number;
  backgroundColor?: string;
  buttonColor?: string;
}

const Toggler: React.FC<TogglerProps> = ({
  buttonType,
  toggleOpen,
  isOpen,
  dimension = 80,
  backgroundColor = '#333333',
  buttonColor = '#333',
}) => {
  const initButtonStyle = {
    display: 'flex',
    flexFlow: 'column wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: `${dimension}px`,
    width: `${dimension}px`,
    backgroundColor: '#2048EF',
    borderRadius: `${dimension * 0.5}px`,
    padding: `${dimension * 0.2 - 1}px`,
    cursor: 'pointer',
    zIndex: 2,
    position: 'relative',
    opacity: '0.9',
    borderWidth: '1px',
    borderColor: '#2048EF',
    boxShadow: '0 0 0 1px rgba(0, 0, 0, .08), 0 12px 12px rgba(0, 0, 0, .15)',
    transition: 'all 350ms cubic-bezier(0.25, 0, 0, 1)',
    outline: 'none',
  } as React.CSSProperties;

  const initSpanStyle = {
    display: 'block',
    backgroundColor: buttonColor,
    width: `${dimension * 0.6}px`,
    height: `${dimension * 0.075}px`,
    borderRadius: `${(dimension * 0.075) / 2}px`,
    transformOrigin: 'center left',
    transition: 'all 350ms cubic-bezier(0.25, 0, 0, 1)',
    position: 'relative',
  } as React.CSSProperties;

  const [buttonStyle, setButtonStyle] = useState(initButtonStyle);
  const [spanStyle, setSpanStyle] = useState(initSpanStyle);
  const [spanOneStyle, setSpanOneStyle] = useState({});
  const [spanTwoStyle, setSpanTwoStyle] = useState({});
  const [spanThreeStyle, setSpanThreeStyle] = useState({});

  useEffect(() => {
    // The content of the `componentDidMount` method

    if (buttonType === 'plus') {
      setSpanStyle((state) => ({
        ...state,
        width: dimension * 0.5,
        height: dimension * 0.075,
        position: 'absolute',
        transformOrigin: 'center center',
      }));
      setSpanTwoStyle({ display: 'none' });
      setSpanThreeStyle({ transform: 'rotate(90deg)' });
    } else {
      if (buttonType === 'hori-dots' || buttonType === 'vert-dots') {
        setSpanStyle((state) => ({
          ...state,
          width: dimension * 0.1,
          height: dimension * 0.1,
          borderRadius: dimension * 0.1,
        }));

        if (buttonType === 'hori-dots') {
          setSpanStyle((state) => ({
            ...state,
            position: 'absolute',
          }));
          setSpanOneStyle({
            left: '25%',
          });
          setSpanThreeStyle({
            right: '25%',
          });
        }
      }
    }
  }, [dimension, buttonType]);

  const animatePlusButton = () => {
    if (!isOpen) {
      setButtonStyle((state) => ({
        ...state,
        transform: 'rotate(135deg)',
      }));
    } else {
      setButtonStyle((state) => ({
        ...state,
        transform: 'rotate(0deg)',
      }));
    }
  };

  const animateHamburgerButton = () => {
    if (!isOpen) {
      setSpanOneStyle({
        transform: 'rotate(45deg)',
        left: '12.5%',
        top: '-2.5%',
      });
      setSpanTwoStyle({
        transform: 'rotateY(90deg)',
        opacity: 0,
      });
      setSpanThreeStyle({
        transform: 'rotate(-45deg)',
        left: '12.5%',
        top: '2.5%',
      });
    } else {
      setSpanOneStyle({
        transform: 'rotate(0deg)',
        left: '0%',
        top: '0%',
      });
      setSpanTwoStyle({
        transform: 'rotateY(0deg)',
        opacity: 1,
      });
      setSpanThreeStyle({
        transform: 'rotate(0deg)',
        left: '0%',
        top: '0%',
      });
    }
  };

  const onToggleOpen = () => {
    toggleOpen();

    if (buttonType === 'plus') {
      animatePlusButton();
    } else if (buttonType === 'hamburger') {
      animateHamburgerButton();
    }
  };

  const onMouseEnter = () => {
    setButtonStyle((state) => ({
      ...state,
      opacity: '1',
      boxShadow: 'none',
    }));
  };

  const onMouseLeave = () => {
    if (isOpen) {
      setButtonStyle((state) => ({
        ...state,
        opacity: '1',
        boxShadow: 'none',
      }));
    } else {
      setButtonStyle(initButtonStyle);
    }
  };

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onToggleOpen}
      style={buttonStyle}
    >
      <span style={{ ...spanStyle, ...spanOneStyle }}></span>
      <span style={{ ...spanStyle, ...spanTwoStyle }}></span>
      <span style={{ ...spanStyle, ...spanThreeStyle }}></span>
    </button>
  );
};

export default Toggler;
