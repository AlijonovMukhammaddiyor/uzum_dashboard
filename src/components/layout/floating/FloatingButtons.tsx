import { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';

import ButtonsList from './ButtonList';
import Toggler from './Toggler';

interface ButtonItem {
  onClick: () => void;
  src: StaticImageData;
  label: string;
  bgColor?: string;
  href?: string;
}

interface FloatingButtonsProps {
  buttonType?: string;
  dimension?: number;
  top?: number;
  left?: number;
  backgroundColor?: string;
  itemBackgroundColor?: string;
  buttonColor?: string;
  direction?: string;
  distance?: number;
  degree?: number;
  buttonsList: ButtonItem[];
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({
  buttonType = 'hamburger',
  dimension = 40,
  top = 0,
  left = 0,
  backgroundColor = '#f8f9fa',
  itemBackgroundColor = '#f8f9fa',
  buttonColor = '#fff',
  direction = 'circular',
  distance = 100,
  degree = 180,
  buttonsList,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    () => {
      try {
        const closedFloating = window.localStorage.getItem('closedFloating');
        if (closedFloating === 'true') {
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      } catch (e) {
        console.log(e);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [typeof window]
  );

  const toggleOpen = () => {
    if (isOpen) {
      try {
        window.localStorage.setItem('closedFloating', 'true');
      } catch (e) {
        console.log(e);
      }
    }

    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <div
      className='floating-buttons'
      style={{
        position: 'absolute',
        bottom: '70px',
        right: '30px',
        zIndex: 9999,
      }}
    >
      <Toggler
        buttonType={buttonType}
        backgroundColor='#333'
        dimension={dimension}
        buttonColor={buttonColor}
        toggleOpen={toggleOpen}
        isOpen={isOpen}
      />
      <ButtonsList
        buttonsList={buttonsList}
        dimension={dimension}
        itemBackgroundColor={itemBackgroundColor}
        isOpen={isOpen}
        direction={direction}
        degree={degree}
        distance={distance}
      />
    </div>
  );
};

export default FloatingButtons;
