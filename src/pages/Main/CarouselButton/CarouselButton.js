import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const CarouselButton = props => {
  const { className, onClick, direction } = props;

  return (
    <ButtonArrow
      direction={direction}
      className={className}
      onClick={onClick}
      icon={direction === 'next' ? faAngleRight : faAngleLeft}
    />
  );
};

export default CarouselButton;

const ButtonArrow = styled(FontAwesomeIcon)`
  position: absolute;
  ${props => props.theme.variables.flex()}
  top: 50%;
  left: ${({ direction }) => (direction === 'next' ? '100%' : '0%')};
  width: 18px;
  height: 18px;
  padding: 11px;
  border: none;
  border-radius: 50%;
  background-color: #ffffff;
  color: black;
  box-shadow: 2px 4px 8px rgb(0 0 0 / 20%);
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 100;

  &:hover {
    color: inherit;
    background-color: #ffffff;
  }
`;
