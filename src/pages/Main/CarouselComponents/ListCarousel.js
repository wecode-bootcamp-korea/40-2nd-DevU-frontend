import React from 'react';
import CarouselButton from '../CarouselButton/CarouselButton';
import useFetch from '../../../hooks/useFetch';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { API } from '../../../config';

const ListCarousel = () => {
  const info = useFetch(`${API.subCategory}/7`);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CarouselButton direction="prev" />,
    nextArrow: <CarouselButton direction="next" />,
    rows: 3,
  };

  return (
    <StyledSlider {...settings}>
      {info.map((book, idx) => {
        return (
          <ColumnSection key={book.id}>
            <ListViewSection>
              <ListImage src={book.image_url} />
              <NumberOfList>{idx + 1}</NumberOfList>
              <BookInfoSection>
                <BookTitle>{book.title}</BookTitle>
                <AuthorName>{book.author}</AuthorName>
                {/* <RatingScore>
                  <StarIcon icon={faStar} />
                  <ScoreText>{book.reviewSection.rating}</ScoreText> (
                  {book.reviewSection.numberOfReview})
                </RatingScore> */}
              </BookInfoSection>
            </ListViewSection>
          </ColumnSection>
        );
      })}
    </StyledSlider>
  );
};

export default ListCarousel;

const StyledSlider = styled(Slider)`
  .slick-disabled {
    display: none;
  }
`;

const ColumnSection = styled.div``;

const ListViewSection = styled.div`
  ${({ theme }) => theme.variables.flex('row', 'flex-start')}
  height: 116px;
  margin-bottom: 6px;
`;

const ListImage = styled.img`
  width: 80px;
  height: 100%;
  margin: 0 3px;
  border-radius: 4px;
`;

const NumberOfList = styled.div`
  ${({ theme }) => theme.variables.flex()}
  width: 80px;
  height: 100%;
  color: rgb(20, 20, 20);
  font-size: 18px;
`;

const BookInfoSection = styled.div`
  ${({ theme }) => theme.variables.flex('column', 'center', 'flex-start')}
`;

const BookTitle = styled.div`
  width: calc(80vw / 3 - 166px);
  word-break: break-word;
`;

const AuthorName = styled.span`
  margin-top: 6px;
  font-size: 14px;
  color: rgb(120, 120, 120);
  white-space: nowrap;
`;

const RatingScore = styled.span`
  margin-top: 6px;
  font-size: 12px;
`;

const StarIcon = styled(FontAwesomeIcon)`
  color: rgb(220, 50, 50);
  font-size: 12px;
`;

const ScoreText = styled.span`
  color: rgb(220, 50, 50);
`;
