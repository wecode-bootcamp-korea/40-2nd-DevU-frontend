import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const Review = ({ bookData, setBookData }) => {
  const stars = Array(5).fill(0);
  const [review, setReview] = useState([]);

  const { bookId } = useParams();

  const [hoverRatingValue, setHoverRatingValue] = useState(undefined);
  const [newReview, setNewReview] = useState({
    review: '',
    rating: 0,
    user_Id: '',
  });

  const isValid = newReview.review.length >= 5 && newReview.rating >= 1;

  const clickStarRate = value => {
    setNewReview(prev => ({
      ...prev,
      rating: value,
    }));
  };

  const reviewInputHandler = e => {
    setNewReview(prev => ({
      ...prev,
      review: e.target.value,
    }));
  };

  const reqGetReviews = () => {
    fetch(`http://10.58.52.196:3000/review/get/${bookId}`, { method: 'GET' })
      .then(response => response.json())
      .then(result => setReview(result));
  };

  useEffect(() => {
    reqGetReviews();
  }, []);

  const addReview = e => {
    fetch(`http://10.58.52.196:3000/review/add/${bookId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        review: newReview.review,
        rating: newReview.rating,
        userId: newReview.user_Id,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error');
        }
      })
      .then(result => {
        reqGetReviews();
      })
      .catch(error => console.log(error));
  };

  console.log('newReview', newReview);

  const handleMouseOver = value => {
    setHoverRatingValue(value);
  };

  const handleMouseLeave = () => {
    setHoverRatingValue(undefined);
  };

  return (
    <SectionWrap>
      <SectionTitleWrap>
        <SectionTitle>리뷰</SectionTitle>
      </SectionTitleWrap>
      <ReviewTitle>이 책을 평가해주세요!</ReviewTitle>
      <StarRating>
        {stars.map((star, index) => {
          return (
            <FaStar
              key={index}
              size={35}
              style={{
                marginRight: 5,
                cursor: 'pointer',
              }}
              color={
                (hoverRatingValue || newReview.rating) > index
                  ? 'orange'
                  : 'gray'
              }
              onClick={() => clickStarRate(index + 1)}
              onMouseOver={() => handleMouseOver(index + 1)}
              onMouseLeave={handleMouseLeave}
            />
          );
        })}
      </StarRating>
      <ReviewInput
        value={newReview.review}
        onChange={reviewInputHandler}
        placeholder="리뷰 작성 시 욕설, 비속어나 타인을 비방하는 문구를 사용하면 비공개될 수 있습니다."
      />
      <ReviewButtonWrap>
        <TextButton onClick={addReview} fontSize="12px" invalid={!isValid}>
          리뷰 남기기
        </TextButton>
      </ReviewButtonWrap>

      <>
        <TabList>
          <Option>구매자 리뷰</Option>
          <Option>최신순</Option>
        </TabList>
        {review.map((review, index) => {
          return (
            <ReviewBox key={index}>
              <ReviewerInfo>
                <FiveStars>
                  {stars.map((star, index) => {
                    return (
                      <FaStar
                        key={index}
                        size={12}
                        color={review.rating > index ? 'orange' : 'gray'}
                      />
                    );
                  })}
                </FiveStars>

                <UserId>{review.user_id}</UserId>
                <ReviewDate>{review.created_at}</ReviewDate>
              </ReviewerInfo>
              <ReviewContentWrap>
                <Content>{review.review}</Content>
                <DeleteButton>
                  <FaTrashAlt color="gray" cursor="pointer" />
                </DeleteButton>
              </ReviewContentWrap>
            </ReviewBox>
          );
        })}
      </>
    </SectionWrap>
  );
};

export default Review;

const SectionWrap = styled.div`
  padding: 0 30px 70px 30px;
`;

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

const Content = styled.p`
  width: 100%;
  height: 130px;
  overflow: hidden;
  line-height: 1.8em;
  font-size: 13px;
  color: #333;
`;

const ReviewInput = styled.textarea`
  margin: 30px 0 10px 0;
  padding: 20px;
  width: 100%;
  height: 113px;
  border: 2px solid #d1d5d9;
  border-radius: 5px;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: -0.03em;
  padding: 12px 15px;
`;

const ReviewTitle = styled.p`
  text-align: center;
  color: #999;
  font-size: 18px;
  font-weight: 500;
  padding-top: 10px;
`;

const ReviewButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ReviewerInfo = styled.div`
  ${({ theme }) => theme.variables.flex('column', 'center', 'center')}
  width: 15%;
  border-right: 1px solid #d1d5d9; ;
`;

const UserId = styled.p`
  font-size: 12px;
  font-weight: 700;
  margin: 10px 0;
`;

const ReviewDate = styled.p`
  color: #808991;
  font-size: 12px;
`;

const ReviewContentWrap = styled.div`
  margin-left: 10px;
  width: 80%;
`;

const TabList = styled.div`
  padding: 10px 0;
  margin-top: 25px;
  border-bottom: 2px solid #d1d5d9;
  display: flex;
  justify-content: space-between;
`;

const Option = styled.span`
  color: #808991;
`;

const ReviewBox = styled.li`
  padding: 14px;
  display: flex;
  border-bottom: 1px solid #d1d5d9;
  position: relative;
`;

const TextButton = styled.button`
  background: #1f8ce6;
  color: white;
  font-size: ${props => props.fontSize};
  border: 1px solid #0077d9;
  padding: 7px 16px;
  border-radius: 3px;
  cursor: pointer;
  opacity: ${props => (props.invalid ? '0.5' : '1')};
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const FiveStars = styled.div`
  display: flex;
`;

const DeleteButton = styled.span`
  position: absolute;
  bottom: 70px;
  right: 17px;
`;
