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

const SlideCarousel = () => {
  const info = useFetch(`${API.subCategory}/8`);

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    prevArrow: <CarouselButton direction="prev" />,
    nextArrow: <CarouselButton direction="next" />,
    useCSS: false,
  };

  return (
    <StyledSlider {...settings}>
      {info.map(book => (
        <div key={book.id}>
          <ColumnSection>
            <ListImage src={book.image_url} />
            <BookInfo>
              <BookTitle>{book.title}</BookTitle>
              <AuthorName>{book.author}</AuthorName>
              {/* <RatingScore>
                <StarIcon icon={faStar} />
                <ScoreText>{book.reviewSection.rating}</ScoreText>(
                {book.reviewSection.numberOfReview})
              </RatingScore> */}
            </BookInfo>
          </ColumnSection>
        </div>
      ))}
    </StyledSlider>
  );
};

export default SlideCarousel;

const StyledSlider = styled(Slider)`
  .slick-disabled {
    display: none;
  }
`;

const ColumnSection = styled.div`
  ${({ theme }) => theme.variables.flex('column', 'center', 'flex-start')}
`;

const ListImage = styled.img`
  width: calc(80vw / 6 - 6px);
  height: auto;
  margin: 0 3px;
  border-radius: 10px;
`;

const BookInfo = styled(ColumnSection)`
  margin-top: 10px;
  padding-right: 10px;
`;

const BookTitle = styled.div``;

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
