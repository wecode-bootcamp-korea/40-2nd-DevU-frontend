import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CATEGORY_MENU } from './CATEGORY_MENU';

const CategoryMenu = () => {
  return (
    <Wrapper>
      {CATEGORY_MENU.map(menu => {
        return (
          <ButtonWrapper key={menu.id}>
            <CategoryButton to={`/list/${menu.id}`}>
              <CategoryIcon src={menu.imageSrc} />
            </CategoryButton>
            <CategoryTitle>{menu.title}</CategoryTitle>
          </ButtonWrapper>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin: 5px;
  ${props => props.theme.variables.flex('row', 'center', 'center')}
`;

const ButtonWrapper = styled.div`
  margin-bottom: 10px;
  ${props => props.theme.variables.flex('column', 'center', 'center')}
  cursor: pointer;
`;

const CategoryButton = styled(Link)`
  ${props => props.theme.variables.flex('row', 'center', 'center')}
  margin: 0px 15px 10px;
  text-decoration: none;
  background-color: #f5f5f5;
  width: 65px;
  height: 65px;
  border-radius: 70%;
  :hover {
    transform: scale(1.1);
    transition: transform 0.2s;
    border: 3px solid #1e9eff;
  }
`;

const CategoryIcon = styled.img`
  width: 50%;
`;

const CategoryTitle = styled.div`
  font-size: 11px;
  color: black;
`;

export default CategoryMenu;
