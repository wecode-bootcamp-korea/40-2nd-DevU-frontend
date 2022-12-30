import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import CategoryMenu from '../CategoryMenu/CategoryMenu';
import { CATEGORY_MENU } from '../CategoryMenu/CATEGORY_MENU';
import TopButton from './TopButton';

const List = () => {
  const params = useParams();
  const mainCategoryId = params.id;
  const [listData, setListData] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryId, setSubCategoryId] = useState();

  useEffect(() => {
    const targetCategory = CATEGORY_MENU.filter((category, index) => {
      return category.id === Number(mainCategoryId);
    });
    setSubCategoryList(targetCategory[0].subCategory);
  }, [mainCategoryId]);

  useEffect(() => {
    if (subCategoryList.length === 0) return;

    setSubCategoryId(subCategoryList[0].subCategoryId);
  }, [subCategoryList]);

  useEffect(() => {
    if (!subCategoryId) return;

    fetch(
      `http://10.58.52.196:3000/books/subCategories/${subCategoryId}?count=20`,
      {
        method: 'GET',
      }
    )
      .then(response => {
        return response.json();
      })
      .then(result => {
        setListData(result);
      });
  }, [subCategoryId]);

  return (
    <>
      <CategoryMenuWrap>
        {/* <CategoryMenu getCategoryId={getCategoryId} /> */}
        <CategoryMenu />
      </CategoryMenuWrap>

      <SubCategoryWrap>
        <SubCategoryList>
          {subCategoryList.map(subCategory => {
            return (
              <SubCategory
                onClick={() => {
                  setSubCategoryId(subCategory.subCategoryId);
                }}
                key={subCategory.subCategoryId}
              >
                {subCategory.title}
              </SubCategory>
            );
          })}
        </SubCategoryList>
      </SubCategoryWrap>

      <Container>
        <BookListContainer>
          {listData.map(
            ({ id, image_url, title, author, online_price, reviewSection }) => (
              <MoveToDetail key={id} to={`/detail/${id}`}>
                <BookContainer>
                  <BookImage src={image_url} />
                  <BookTitle>{title}</BookTitle>
                  <AuthorName>{author}</AuthorName>
                  <ReviewsSection>
                    <img src="/images/star.png" alt="star" />
                    <StarRank>{reviewSection.rating} </StarRank>
                    <NumOfReviews>
                      ({reviewSection.numberOfReview})
                    </NumOfReviews>
                  </ReviewsSection>
                  <Price>
                    소장 {Number(online_price).toLocaleString('ko-kR')}원
                  </Price>
                </BookContainer>
              </MoveToDetail>
            )
          )}
          <TopButton />
        </BookListContainer>
      </Container>
    </>
  );
};

export default List;
const CategoryMenuWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  ${props => props.theme.variables.flex('row', 'center')}
  margin: 0 auto;
`;
const BookListContainer = styled.ul`
  ${props => props.theme.variables.flex('row', 'flex-start')}
  flex-wrap: wrap;
  width: calc(180px * 6);
  margin: 0 auto;
  min-width: 500px;
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

const MoveToDetail = styled(Link)`
  text-decoration: none;
`;

const SubCategoryWrap = styled.div`
  margin-top: 60px;
  padding-bottom: 10px;
`;

const SubCategoryList = styled.div`
  margin: 0 20%;
  border-bottom: 1px solid #d1d5d9;
  width: auto;
  height: 35px;
  display: flex;
`;

const SubCategory = styled.span`
  padding: 10px;
  list-style: none;
  font-weight: 400;
  font-size: 13px;
  color: #808991;
  text-align: center;
  :hover {
    cursor: pointer;
    font-weight: 500;
    color: white;
    background-color: #1e9eff;
    opacity: 0.8;
    border-radius: 10px;
    transition-duration: 1s, 1s;
    transition: all 0.3s ease 0s;
    font-weight: 00;
  }
`;
