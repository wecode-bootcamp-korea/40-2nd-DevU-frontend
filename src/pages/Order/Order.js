import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import MethodDropDown from '../../components/Order/MethodDropDown';
import { API } from '../../config';

const clientKey = process.env.REACT_APP_CLIENT_KEY;
const redirectUrl = process.env.REACT_APP_REDIRECT_URL;

const Order = () => {
  const [orderMethod, setOrderMethod] = useState('');
  const [userPoint, setUserPoint] = useState(0);
  const [orderItems, setOrderItems] = useState({
    id: 0,
    image_url: '',
    title: '',
    author: '',
    online_price: 0,
    point: 0,
  });

  const params = useParams();
  const bookId = params.id;

  const navigate = useNavigate();

  const { id, image_url, title, author, online_price } = orderItems;

  const itemPrice = Number(online_price).toLocaleString('ko-KR');
  const orderBalance = (userPoint - online_price).toLocaleString('ko-KR');

  useEffect(() => {
    fetch(`${API.order}/${bookId}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setOrderItems(data.result[0]);
        setUserPoint(Number(data.result[1].point));
      });
  }, [bookId]);

  const orderWithPoints = () => {
    fetch(`${API.order}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        userId: '1',
        bookId: '41',
        onlinePrice: '12500',
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('통신실패');
      })
      .then(data => {
        navigate('/mylibrary');
      })

      .catch(error => console.log(error));
  };

  const orderWithToss = () => {
    loadTossPayments(clientKey).then(tossPayments => {
      tossPayments.requestPayment('카드', {
        amount: `${online_price}`,
        orderId: 'HB94EDFsK',
        orderName: `${title}`,
        successUrl: `${redirectUrl}`,
        failUrl: `${redirectUrl}`,
      });
    });
  };

  return (
    <OrderMain>
      <OrderItemContainer>
        <OrderTitle>주문 도서</OrderTitle>
        <OrderItemBox key={id}>
          <OrderItemInfoBox>
            <OrderItemImageBox>
              <OrderItemImage src={image_url} />
            </OrderItemImageBox>
            <OrderItemTextBox>
              <OrderItemTitle>{title}</OrderItemTitle>
              <OrderItemAuthor>{author}</OrderItemAuthor>
            </OrderItemTextBox>
          </OrderItemInfoBox>
          <OrderItemPrice />
        </OrderItemBox>
      </OrderItemContainer>
      <OrderInfoContainer>
        <InfoTitle>결제 정보</InfoTitle>
        <PriceBox>
          <TotalPrice>총 결제 금액</TotalPrice>
          <ItemPrice>{itemPrice}원</ItemPrice>
        </PriceBox>
        <MethodTitle>결제 수단</MethodTitle>
        <OrderMethodBox>
          {ORDER_METHOD.map(({ id, method }) => {
            return (
              <OrderMethodLabel key={id}>
                <SelectMethod
                  type="radio"
                  value={method}
                  name="method"
                  onChange={e => {
                    setOrderMethod(e.target.value);
                  }}
                />
                {method}
              </OrderMethodLabel>
            );
          })}
        </OrderMethodBox>
        {orderMethod === '보유 포인트' && (
          <MethodDropDown userBalance={userPoint} orderBalance={orderBalance} />
        )}
        <OrderButton
          onClick={
            orderMethod === '보유 포인트' ? orderWithPoints : orderWithToss
          }
        >
          결제하기
        </OrderButton>
      </OrderInfoContainer>
    </OrderMain>
  );
};

const OrderMain = styled.main`
  ${props => props.theme.variables.flex('row', 'center', 'flex-start')}
  margin: 5%;
`;

const OrderItemContainer = styled.section`
  ${props => props.theme.variables.flex('column', 'center', 'flex-start')}
  margin-right: 40px;
`;

const OrderTitle = styled.h1`
  font-weight: 700;
  margin-bottom: 20px;
`;

const OrderItemBox = styled.div`
  ${props => props.theme.variables.flex('row', 'space-between', 'center')}
  width: 750px;
  padding: 20px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
`;

const OrderItemInfoBox = styled.div`
  ${props => props.theme.variables.flex('row', 'flex-start', 'flex-start')}
`;

const OrderItemImageBox = styled.div`
  width: 150px;
  position: relative;
  margin-right: 40px;

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

const OrderItemImage = styled.img`
  width: 150px;
`;
const OrderItemTextBox = styled.div`
  ${props => props.theme.variables.flex('column', 'flex-start', 'flex-start')}
`;

const OrderItemTitle = styled.div`
  margin-bottom: 20px;
  font-weight: 400;
  font-size: 30px;
`;

const OrderItemAuthor = styled.div`
  color: gray;
  font-size: 20px;
`;

const OrderItemPrice = styled.div`
  color: ${props => props.theme.mainDevUBlue};
  font-size: 20px;
`;

const OrderInfoContainer = styled.section`
  ${props => props.theme.variables.flex('column', 'flex-start', 'flex-start')}
`;

const InfoTitle = styled.h1`
  font-weight: 700;
  margin-bottom: 20px;
`;

const PriceBox = styled.div`
  ${props => props.theme.variables.flex('row', 'space-between', 'center')}
  width: 270px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  padding: 20px 0;
  margin-bottom: 40px;
`;

const TotalPrice = styled.div`
  font-size: 15px;
`;

const ItemPrice = styled.div`
  font-size: 30px;
  color: #1e9eff;
`;

const MethodTitle = styled.h1`
  font-weight: 700;
  margin-bottom: 20px;
`;

const OrderMethodBox = styled.div`
  ${props => props.theme.variables.flex('column', 'flex-start', 'flex-start')}
  width: 270px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  padding: 20px 0;
  margin-bottom: 40px;
`;

const OrderMethodLabel = styled.label`
  ${props => props.theme.variables.flex('row', 'center', 'center')}
  margin: 10px 0;
  font-size: 15px;
`;
const SelectMethod = styled.input`
  margin-right: 10px;
`;
const OrderButton = styled.button`
  width: 270px;
  height: 45px;
  color: white;
  border: none;
  background-color: #1e9eff;
  border-radius: 5px;
  cursor: pointer;
  background-color: #0077d9;
`;

export default Order;

const ORDER_METHOD = [
  { id: 1, method: '보유 포인트' },
  { id: 2, method: '토스 페이먼츠' },
];
