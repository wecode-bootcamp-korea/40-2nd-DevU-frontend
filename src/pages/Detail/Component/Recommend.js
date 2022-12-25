import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Recommend = ({ bookData, setBookData }) => {
  // * TODO :  `books/${bookData.sub_category}?count=10` --> 동일한 sub category에서 book data 10개
  useEffect(() => {
    fetch('/data/DetailData.json', { method: 'GET' })
      .then(response => response.json())
      .then(result => {
        setBookData(result);
      });
  }, []);

  return (
    <>
      <SectionTitleWrap>
        <SectionTitle>추천 도서</SectionTitle>
      </SectionTitleWrap>
      <BookListWrap>
        <RecommendBookList>
          {bookData.recommendBooks.map((data, index) => {
            return (
              <BookInfoWrap key={index}>
                <ImageWrap>
                  <Image src={data.image} alt={data.title} />
                </ImageWrap>
                <BookInfo fontWeight="700">{data.title}</BookInfo>
                <BookInfo> {data.author}</BookInfo>
              </BookInfoWrap>
            );
          })}
        </RecommendBookList>
      </BookListWrap>
    </>
  );
};

export default Recommend;

const SectionTitleWrap = styled.div`
  margin-bottom: 15px;
  padding: 10px 0 8px 0;
  border-bottom: 2px solid #7d8e9e;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  display: inline-block;
  color: #59667a;
  font-weight: 500;
`;

const BookListWrap = styled.div`
  width: 100%;
  ${({ theme }) => theme.variables.flex('row', 'center')}
  margin: 0 auto;
  padding-bottom: 120px;
`;

const RecommendBookList = styled.ul`
  ${({ theme }) => theme.variables.flex('row', 'flex-start', 'center')}
  flex-wrap: wrap;
  margin: 0 auto;
  width: calc(90px * 8.4);
`;

const ImageWrap = styled.div`
  width: 90px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.2) 0px,
      rgba(0, 0, 0, 0) 5%,
      rgba(0, 0, 0, 0) 95%,
      rgba(0, 0, 0, 0.2) 100%
    );
    border: 0.3px solid rgba(0, 0, 0, 0.1);
  }
`;

const Image = styled.img`
  width: 90px;
`;

const BookInfoWrap = styled.div`
  width: 90px;
  height: 180px;
  margin: 25px 20px 15px 40px;
`;

const BookInfo = styled.p`
  color: #666;
  margin-top: 10px;
  font-weight: ${props => props.fontWeight};
  font-size: 13px;
  margin-bottom: 10px;
`;
