import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { API } from '../../../config';

const INITIAL_REVIEW = {
  review: '',
  rating: 0,
};

const Review = () => {
  const { id: bookId } = useParams();
  const stars = Array(5).fill(0);
  const [review, setReview] = useState([]);
  const [hoverRatingValue, setHoverRatingValue] = useState(undefined);
  const [newReview, setNewReview] = useState(INITIAL_REVIEW);

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
    fetch(`${API.review}/${bookId}`, { method: 'GET' })
      .then(response => response.json())
      .then(result => setReview(result[0].Reviews));
  };

  useEffect(() => {
    reqGetReviews();
  }, [bookId]);

  const addReview = () => {
    fetch(`${API.review}/`, {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        review: newReview.review,
        rating: newReview.rating,
        bookId: bookId,
        created_at: newReview.created_at,
      }),
    }).then(response => {
      if (response.ok) {
        reqGetReviews();
        setNewReview(INITIAL_REVIEW);
      } else {
        alert('예상치 못한 오류가 발생했습니다. 다시 시도해주세요!');
      }
    });
  };

  const deleteReview = reviewId => {
    fetch(`${API.review}/${bookId}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: reviewId,
      }),
    }).then(response => {
      if (response.ok) {
        reqGetReviews();
      } else {
        alert('예상치 못한 오류가 발생했습니다. 다시 시도해주세요!');
      }
    });
  };

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
        {stars.map((_, index) => {
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
        <TextButton onClick={addReview} fontSize="12px" disabled={!isValid}>
          리뷰 남기기
        </TextButton>
      </ReviewButtonWrap>
      <TabList>
        <Option>구매자 리뷰</Option>
        <Option>최신순</Option>
      </TabList>
      <ReviewWrap>
        {review.map(review => {
          return (
            <ReviewBox key={review.id}>
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

                <UserId>{review.id}</UserId>
                <ReviewDate>{review.created_at}</ReviewDate>
              </ReviewerInfo>
              <ReviewContentWrap>
                <Content>{review.review}</Content>
                <DeleteButton
                  onClick={() => {
                    if (window.confirm('리뷰를 삭제하시겠습니까?')) {
                      deleteReview(review.id);
                    }
                  }}
                >
                  <FaTrashAlt color="gray" cursor="pointer" />
                </DeleteButton>
              </ReviewContentWrap>
            </ReviewBox>
          );
        })}
      </ReviewWrap>
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

const ReviewWrap = styled.div`
  display: flex;
  flex-direction: column-reverse;
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

  &:disabled {
    opacity: 0.5;
  }
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
