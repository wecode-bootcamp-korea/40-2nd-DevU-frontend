import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Review from './Component/Review';
import { FaStar } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaCartPlus } from 'react-icons/fa';
import Recommend from './Component/Recommend';
import Introduction from './Component/Introduction';

const Detail = () => {
  const [bookData, setBookData] = useState([]);
  const { bookId } = useParams();

  useEffect(() => {
    getData();
  }, []);

  //  *TODO : `http://10.58.52.196:3000/books/${bookId}`;

  const getData = () => {
    fetch('/data/DetailData.json', { method: 'GET' })
      .then(response => {
        return response.json();
      })
      .then(result => {
        return setBookData(result);
      });
  };

  const token = localStorage.getItem('token');

  const addToCart = () => {
    fetch('http://10.58.52.204:8000/cart/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: bookData.title,
        online_price: bookData.online_price,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error');
        }
      })
      .then(data => {
        alert('선택하신 상품이 성공적으로 담겼습니다');
      })
      .catch(error => console.log(error));
  };
  if (Object.keys(bookData).length === 0) return 'loading...';

  const IntroductionList = [
    { title: '작품소개', content: bookData.description },
    { title: '출판사 서평', content: bookData.publisher_review },
    {
      title: '목차',
      content: bookData.list,
    },
  ];

  return (
    <DetailWrap>
      <Header>
        <DetailHeader>
          <ThumbNailWrap>
            <ThumbNailImage
              src={bookData.image_url}
              alt={bookData.book_title}
            />
          </ThumbNailWrap>
          <HeaderInfoWrap>
            <Category> 프로그래밍언어 &gt; JavaScript</Category>

            <BookTitle>{bookData.title}</BookTitle>

            <FaStar size={12} style={{ color: '#dc3232' }} />
            <StarRating>{bookData.reviews_section.rating}점</StarRating>
            <NumOfReviews>
              ({bookData.reviews_section.num_reviews}명)
            </NumOfReviews>

            <BookInfoWrapper>
              <BookInfo>{bookData.author}</BookInfo>
              <Text> 저</Text>
            </BookInfoWrapper>

            <BookInfoWrapper>
              <BookInfo>{bookData.publisher} </BookInfo>
              <Text> 출판</Text>
            </BookInfoWrapper>

            {/* price table */}
            <TableWrap>
              <PriceTable>
                <tr>
                  <PriceTitle rowSpan={2}> 소장 </PriceTitle>
                  <PriceType>전자책 가격</PriceType>
                  <Price>{bookData.offline_price.toLocaleString()}원</Price>
                </tr>
                <tr>
                  <PriceType>판매가</PriceType>
                  <Price color="#1f8ce6">
                    {bookData.online_price.toLocaleString()}원
                  </Price>
                </tr>
              </PriceTable>
            </TableWrap>
            <ButtonWrap>
              <ImageButton>
                <FaHeart size="16" color="#808991" />
              </ImageButton>
              <ImageButton>
                <FaCartPlus size="17" color="#808991" />
              </ImageButton>
              <TextButton onClick={addToCart}>소장하기</TextButton>
            </ButtonWrap>
          </HeaderInfoWrap>
        </DetailHeader>
      </Header>
      {/* 작품소개 / 출판사 서평 / 목차 */}
      {IntroductionList.map(({ title, content }, idx) => (
        <Introduction key={idx} title={title} content={content} />
      ))}

      {/* 리뷰 */}
      <Review bookData={bookData} setBookData={setBookData} />

      {/* 추천도서 */}
      <Recommend bookData={bookData} />
    </DetailWrap>
  );
};

export default Detail;

const DetailWrap = styled.div`
  margin: 0 25%;
`;

const Header = styled.div`
  margin-bottom: 30px;
`;
const DetailHeader = styled.section`
  display: flex;
`;

const ThumbNailWrap = styled.div`
  ${({ theme }) => theme.variables.flex('column', 'center', 'center')}
  margin: 20px;
`;

const ThumbNailImage = styled.img`
  width: 200px;
  height: 300px;
  border: 1px solid #e6e8eb;
`;

const HeaderInfoWrap = styled.div`
  width: 75%;
  padding: 30px;
`;

const Category = styled.div`
  color: gray;
  font-size: 13px;
  margin-bottom: 10px;
`;

const BookTitle = styled.h3`
  font-size: 27px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
`;

const ListItemFont = styled.span`
  font-size: 13px;
  text-decoration: none;
`;

const StarRating = styled(ListItemFont)`
  margin: 0 2px;
  color: #dc3232;
`;

const NumOfReviews = styled(ListItemFont)`
  color: gray;
`;

const BookInfoWrapper = styled.div`
  margin: 10px 0;
`;

const BookInfo = styled.span`
  color: #666;
  margin-top: 10px;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 10px;
`;

const Text = styled.span`
  color: #666;
  font-size: 13px;
`;

const TableWrap = styled.table`
  border-top: 1px solid #e6e8eb;
  border-bottom: 1px solid #e6e8eb;
  font-size: 14px;
  width: 100%;
  height: 50px;
  margin: 15px 0 15px 0;
`;
const PriceTable = styled.tbody`
  width: 100%;
  display: table-row-group;
`;

const PriceTitle = styled.th`
  width: 40%;
  height: 80px;
  color: #40474d;
  border-right: 1px solid #e6e8eb;
  background: #f7fafc;
  vertical-align: middle;
`;

const PriceInfoCommonStyle = styled.td`
  vertical-align: middle;
  font-size: 14px;
  color: #808991;
  padding: 7px 10px;
`;

const PriceType = styled(PriceInfoCommonStyle)`
  text-align: left;
  color: #808991;
  font-weight: 400;
`;

const Price = styled(PriceInfoCommonStyle)`
  text-align: right;
  vertical-align: middle;
  font-weight: 700;
  color: ${props => props.color};
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: end;
`;

const ImageButton = styled.button`
  width: 40px;
  height: 40px;
  text-align: center;
  background-color: white;
  border: 1px solid #d1d5d9;
  border-radius: 3px;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    background-color: #d1d5d9;
  }
`;

const TextButton = styled.button`
  background: #1f8ce6;
  color: white;
  font-size: 15px;
  border: 1px solid #0077d9;
  padding: 4px 25px;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #0077d9;
  }
`;
