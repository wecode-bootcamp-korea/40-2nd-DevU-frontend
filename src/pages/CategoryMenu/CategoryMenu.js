import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CategoryMenu = () => {
  return (
    <Wrapper>
      {CATEGORY_MENU.map(menu => {
        return (
          <ButtonWrapper key={menu.id}>
            <CategoryButton to="">
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
`;

const CategoryIcon = styled.img`
  width: 50%;
`;

const CategoryTitle = styled.div`
  font-size: 11px;
  color: black;
`;

export default CategoryMenu;

const CATEGORY_MENU = [
  { id: 1, title: '컴퓨터 공학', imageSrc: '/images/computer.png' },
  { id: 2, title: '프로그래밍 언어', imageSrc: '/images/programming.png' },
  { id: 3, title: '데이터베이스', imageSrc: '/images/database.png' },
  { id: 4, title: '네트워크', imageSrc: '/images/network.png' },
  { id: 5, title: '교육', imageSrc: '/images/education.png' },
];
