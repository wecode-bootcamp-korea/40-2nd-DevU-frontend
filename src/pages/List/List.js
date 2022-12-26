import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TopButton from './TopButton';

const List = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    fetch('/data/ListData.json', {
      method: 'GET',
    })
      .then(response => response.json())
      .then(result => setListData(result));
  }, []);

  return (
    <>
      <BookListContainer>
        {/* <SubCategory>Javascript</SubCategory> */}

        {listData.map(list => (
          <MoveToDetail key={list.id} to={`/detail/${list.id}`}>
            <BookContainer>
              <BookImage src={list.image} />
              <BookTitle>{list.bookTitle}</BookTitle>
              <AuthorName>{list.authorName}</AuthorName>
              <ReviewsSection>
                <img src="/images/star.png" alt="star" />
                <StarRank>{list.reviewSection.starRank}</StarRank>
                <NumOfReviews>({list.reviewSection.numOfReviews})</NumOfReviews>
              </ReviewsSection>
              <Price>소장 {list.sellingPrice}원</Price>
            </BookContainer>
          </MoveToDetail>
        ))}
      </BookListContainer>
      <TopButton />
    </>
  );
};

export default List;

const BookListContainer = styled.ul`
  ${props => props.theme.variables.flex('row', 'flex-start')}
  flex-wrap: wrap;
  margin: 0 370px;
  padding: 0 132px;
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
  font-size: 13px;
  font-size: large;
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
  color: ${theme => theme.mainDevUBlue};
  font-size: 14px;
`;

const MoveToDetail = styled(Link)`
  text-decoration: none;
`;
