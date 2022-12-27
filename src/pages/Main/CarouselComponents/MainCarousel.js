import React, { useState } from 'react';
import CarouselButton from '../CarouselButton/CarouselButton';
import useInterval from 'use-interval';
import styled, { css } from 'styled-components';
import styleValue from '../StyleValue/MainCarouselStyleValue';

const CAROUSEL_IMAGE = [
  {
    id: 1,
    name: 'react',
    imgUrl: '/images/Main/hyobin.png',
    bookCoverUrl: '/images/Main/bookCover/React.jpg',
    author: '배효빈',
    description: 'Hook의 달인/REACT 최강자 배효빈님의 PURE REACT',
  },
  {
    id: 2,
    name: 'mysql',
    imgUrl: '/images/Main/jinjoo.png',
    bookCoverUrl: '/images/Main/bookCover/mysql.jpg',
    author: '감진주',
    description: 'DATABASE/쉬운 DB 구축을 원한다면 감진주님의 MYSQL',
  },
  {
    id: 3,
    name: 'javascript',
    imgUrl: '/images/Main/sunyoung.png',
    bookCoverUrl: '/images/Main/bookCover/javascript.jpg',
    author: '윤선영',
    description: '탄탄한 기초/겁쟁이들을 위한 완전 정복, 윤선영님의 JAVASCRIPT',
  },
  {
    id: 4,
    name: 'css',
    imgUrl: '/images/Main/woojin.png',
    bookCoverUrl: '/images/Main/bookCover/css.jpg',
    author: '임우진',
    description:
      '디자인이 제일 어려워/CSS를 알면 디자인이 쉽다. 임우진님의 CSS',
  },
  {
    id: 5,
    name: 'java',
    imgUrl: '/images/Main/jungsoo.png',
    bookCoverUrl: '/images/Main/bookCover/java.jpg',
    author: '황정수',
    description:
      'JAVA란 이런 것이다/JA린이들을 위한 황정수님의 JAVA FOR BEGINNING',
  },
];

const MainCarousel = () => {
  const [transformValue, setTransformValue] = useState(1);
  const [isAnimationDirection, setIsAnimationDirection] = useState(false);
  const [isTransitable, setIsTransitable] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  const dataLength = CAROUSEL_IMAGE.length;

  const carouselImages = [
    CAROUSEL_IMAGE[dataLength - 1],
    ...CAROUSEL_IMAGE,
    CAROUSEL_IMAGE[0],
    CAROUSEL_IMAGE[1],
    CAROUSEL_IMAGE[2],
  ];

  const clickPrevButton = () => {
    setIsTransitable(true);
    setTransformValue(transformValue - 1);
    setIsAnimationDirection(true);
  };

  const clickNextButton = () => {
    setIsTransitable(true);
    setTransformValue(transformValue + 1);
    setIsAnimationDirection(false);
  };

  const onMouseEnterHandler = () => {
    setIsRunning(false);
  };

  const onMouseLeaveHandler = () => {
    setIsRunning(true);
  };

  useInterval(() => {
    setIsTransitable(true);
    setIsAnimationDirection(false);
    setTransformValue(transformValue => transformValue + 1);
  }, isRunning && `${styleValue.intervalDuration}`);

  const goToEnd = () => {
    if (transformValue <= 0) {
      setIsTransitable(false);
      setTransformValue(CAROUSEL_IMAGE.length);
    }
  };

  const goToStart = () => {
    if (transformValue >= CAROUSEL_IMAGE.length + 1) {
      setIsTransitable(false);
      setTransformValue(1);
    }
  };

  setTimeout(() => {
    goToStart();
    goToEnd();
  }, `${styleValue.animationDuration}`);

  return (
    <IncludeButtons
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <FirstCarouselSection>
        <CarouselImageList
          transformvalue={transformValue}
          transitable={isTransitable}
        >
          {carouselImages.map(
            ({ description, imgUrl, name, bookCoverUrl, author }, idx) => {
              const divideDescription = description.split('/');
              return (
                <CarouselImageView
                  key={idx}
                  transformvalue={transformValue}
                  animationdirection={isAnimationDirection}
                  transitable={isTransitable}
                >
                  <CarouselImage backgroundURL={imgUrl}>
                    <BookImage alt={name} src={bookCoverUrl} />
                    <TextSection>
                      {divideDescription.map((text, idx) => (
                        <Description key={idx}>{text}</Description>
                      ))}
                      <AuthorName>저자: {author}</AuthorName>
                    </TextSection>
                  </CarouselImage>
                </CarouselImageView>
              );
            }
          )}
        </CarouselImageList>
      </FirstCarouselSection>
      <CarouselButton direction="prev" onClick={clickPrevButton} />
      <CarouselButton direction="next" onClick={clickNextButton} />
    </IncludeButtons>
  );
};

export default MainCarousel;

const IncludeButtons = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const FirstCarouselSection = styled.section`
  width: 80vw;
  overflow: hidden;
`;

const calcValue = value =>
  `(${styleValue.totalWidth} - (${styleValue.viewMargin} * ${styleValue.numberOfTotalMargin})) * (${value} / ${styleValue.totalViewRate})`;

const CarouselImageList = styled.div`
  ${({ transformvalue, transitable }) => css`
    display: inline-flex;
    height: 400px;
    flex-flow: nowrap;
    transform: translateX(
      calc(
        ${calcValue(-transformvalue)} - ${transformvalue} *
          ${styleValue.viewMargin} * ${styleValue.numberOfViewMargin}
      )
    );
    transition: ${transitable && `transform ${styleValue.animationDuration}ms`};
  `}
`;

const CarouselImageView = styled.div`
  ${({ transformvalue, animationdirection, transitable }) => css`
    width: calc(${calcValue(`${styleValue.smallViewRate}`)});
    height: 100%;
    margin: 0 ${styleValue.viewMargin};
    border-radius: 6px;
    overflow: hidden;

    &:nth-child(${transformvalue}) {
      animation: ${{ transitable } &&
      !animationdirection &&
      `longToShort
        ${styleValue.animationDuration}ms`};
    }

    &:nth-child(${transformvalue + 1}) {
      width: calc(${calcValue(`${styleValue.largeViewRate}`)});
      animation: ${{ transitable } &&
      `shortToLong
        ${styleValue.animationDuration}ms`};
    }

    &:nth-child(${transformvalue + 2}) {
      animation: ${{ transitable } &&
      animationdirection &&
      `longToShort
        ${styleValue.animationDuration}ms`};
    }

    @keyframes shortToLong {
      0% {
        width: calc(${calcValue(`${styleValue.smallViewRate}`)});
      }
      100% {
        width: calc(${calcValue(`${styleValue.largeViewRate}`)});
      }
    }

    @keyframes longToShort {
      0% {
        width: calc(${calcValue(`${styleValue.largeViewRate}`)});
      }
      100% {
        width: calc(${calcValue(`${styleValue.smallViewRate}`)});
      }
    }
  `}
`;

const CarouselImage = styled.div`
  ${({ theme }) => theme.variables.flex('column', 'center', 'flex-start')};
  width: ${styleValue.totalWidth};
  height: 100%;
  padding: 30px 10% 20px;
  background-image: url(${({ backgroundURL }) => backgroundURL});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
`;

const TextSection = styled.div`
  ${({ theme }) => theme.variables.flex('column', 'flex-end', 'flex-start')};
  width: 100%;
  height: 100%;
`;

const Description = styled.span`
  color: white;
  font-size: 25px;
  font-weight: 700;
  line-height: 35px;
`;

const AuthorName = styled(Description)`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
`;

const BookImage = styled.img`
  height: 70%;
`;
