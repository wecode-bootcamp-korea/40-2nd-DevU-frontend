import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';

const ListCell = data => {
  const [review, setReview] = useState({
    COUNT: 0,
    AVG: 0,
  });

  const { id, image_url, title, author, online_price } = data;

  useEffect(() => {
    fetch(`${API.review}/${id}`, { method: 'GET' })
      .then(response => response.json())
      .then(result => {
        setReview(result[0]);
      });
  }, []);

  const roundAVG = Math.round(review.AVG * 100) / 100;

  return (
    <MoveToDetail key={id} to={`/books/details/${id}`}>
      <BookContainer>
        <BookImage src={image_url} />
        <BookTitle>{title}</BookTitle>
        <AuthorName>{author}</AuthorName>
        <ReviewsSection>
          <img src="/images/star.png" alt="star" />
          <StarRank>{roundAVG} </StarRank>
          <NumOfReviews>({review.COUNT})</NumOfReviews>
        </ReviewsSection>
        <Price>소장 {Number(online_price).toLocaleString('ko-kR')}원</Price>
      </BookContainer>
    </MoveToDetail>
  );
};

export default ListCell;

const MoveToDetail = styled(Link)`
  text-decoration: none;
`;

const BookContainer = styled.li`
  ${props => props.theme.variables.flex('column', 'center', 'flex-start')}
  margin: 30px 5px;
  height: 410p;
  list-style-type: none;
`;

const BookImage = styled.img`
  border: 1px solid rgba(20, 20, 20, 0.06);
  border-radius: 5px;
  width: 170px;
  height: 247px;
`;

const AuthorName = styled.span`
  color: gray;
  font-size: 13px;
`;

const BookTitle = styled.span`
  margin: 10px 0;
  width: 170px;
  font-size: 15px;
  letter-spacing: -0.01em;
  color: #141414;
`;

const ReviewsSection = styled.div`
  margin: 6px 0;
`;

const StarRank = styled.span`
  color: #dc3232;
  font-size: 13px;
  padding-left: 3px;
`;
const NumOfReviews = styled.span`
  color: gray;
  font-size: 13px;
`;

const Price = styled.span`
  font-size: 14px;
  color: #1e9eff;
`;
