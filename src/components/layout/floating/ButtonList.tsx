import { StaticImageData } from 'next/image';
import React from 'react';

import Button from './Buttons';

interface ButtonItem {
  onClick: () => void;
  src: StaticImageData;
  label: string;
  bgColor?: string;
  href?: string;
}

interface ButtonsListProps {
  buttonsList?: ButtonItem[];
  distance?: number;
  dimension: number;
  itemBackgroundColor?: string;
  isOpen: boolean;
  direction: string;
  degree: number;
}

const ButtonsList: React.FC<ButtonsListProps> = ({
  buttonsList = [],
  distance,
  dimension,
  itemBackgroundColor,
  isOpen,
  direction,
  degree,
}) => {
  return (
    <>
      {buttonsList.map((item, index) => (
        <Button
          href={item.href}
          bgColor={item.bgColor || '#333'}
          label={item.label}
          key={index}
          index={index}
          dimension={dimension}
          direction={direction}
          degree={degree}
          distance={distance}
          itemBackgroundColor={itemBackgroundColor}
          onClick={item.onClick}
          src={item.src}
          isOpen={isOpen}
          nbrItems={buttonsList.length - 1}
        />
      ))}
    </>
  );
};

export default ButtonsList;
