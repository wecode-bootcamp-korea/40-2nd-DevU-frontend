import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    <div>
      <BookListContainer>
        {listData.map((list, index) => {
          return (
            <MoveToDetail to={`/detail/${list.id}`}>
              <BookContainer key={index}>
                <BookImage src={list.image}></BookImage>
                <BookTitle>{list.bookTitle}</BookTitle>
                <AuthorName>{list.authorName}</AuthorName>
                <ReviewsSection>
                  <img src="/images/star.png" />
                  <StarRank>{list.reviewSection.starRank}</StarRank>
                  <NumOfReviews>
                    ({list.reviewSection.numOfReviews})
                  </NumOfReviews>
                </ReviewsSection>
                <Price>소장 {list.sellingPrice}원</Price>
              </BookContainer>
            </MoveToDetail>
          );
        })}
      </BookListContainer>
      <ArrowUpButton>
        <img src="/images/arrow-up.png" />
      </ArrowUpButton>
    </div>
  );
};

export default List;

const BookListContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-left: 23%;
  padding-right: 23%;
`;

const BookContainer = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 30px 5px;
  height: 410p;
`;

const BookImage = styled.img`
  border: 1px solid rgba(20, 20, 20, 0.06);
  border-radius: 4px;
  width: 170px;
  height: 247px;
`;

const ListItemFont = styled.span`
  font-size: 13px;
  text-decoration: none;
`;

const AuthorName = styled(ListItemFont)`
  color: gray;
`;

const BookTitle = styled(ListItemFont)`
  margin: 10px 0;
  width: 170px;
  font-size: large;
  letter-spacing: -0.01em;
  color: #141414;
`;

const ReviewsSection = styled.div`
  margin: 6px 0;
`;

const StarRank = styled(ListItemFont)`
  color: #dc3232;
  padding-left: 3px;
`;
const NumOfReviews = styled(ListItemFont)`
  color: gray;
`;

const Price = styled(ListItemFont)`
  color: #1e9eff;
`;

const ArrowUpButton = styled.button`
  position: fixed;
  background-color: white;
  align-items: center;
  border: 1px solid #e6e6e6;
  cursor: pointer;
  border-radius: 29px;
  right: 20px;
  width: 58px;
  height: 58px;
  bottom: 30px;
`;

const MoveToDetail = styled(Link)`
  text-decoration: none;
`;
