import React from 'react';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import SlideCarousel from './CarouselComponents/SlideCarousel';
import ListCarousel from './CarouselComponents/ListCarousel';
import MainCarousel from './CarouselComponents/MainCarousel';
import styled from 'styled-components';

const Main = () => {
  return (
    <MainPage>
      <MainHeadSection>
        <MainHead>도서</MainHead>
      </MainHeadSection>
      <MainSection>
        <MainCarousel />
        <CategoryMenu />
        <CarouselSection>
          <CarouselTitle>베스트 작품</CarouselTitle>
          <SlideCarousel />
        </CarouselSection>
        <CarouselSection>
          <CarouselTitle>새로 나온 작품</CarouselTitle>
          <ListCarousel />
        </CarouselSection>
      </MainSection>
    </MainPage>
  );
};

export default Main;

const MainPage = styled.div`
  width: 80vw;
  margin: auto;
`;

const MainHeadSection = styled.div`
  width: 80vw;
  border-bottom: 1px solid #f5f5f5;
`;

const MainHead = styled.h2`
  padding: 14px 0 17px;
  color: ${({ theme }) => theme.style.mainDevUBlue};
  font-size: 24px;
  font-weight: 700;
  line-height: 29px;
`;

const MainSection = styled.main`
  padding-top: 60px;
`;

const CarouselSection = styled.section`
  margin-top: 15px;
  margin-bottom: 70px;
`;

const CarouselTitle = styled.div`
  padding: 6px 0 16px;
  font-size: 22px;
  font-weight: 700;
  line-height: 26px;
  color: #141414;
`;
