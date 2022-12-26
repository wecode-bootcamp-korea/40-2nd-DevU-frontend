import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Order = () => {
  const [orderItems, setOrderItems] = useState([]);
  const itemPrice = orderItems[0]?.price.toLocaleString('ko-KR');
  const userBalance = 1000000;
  const orderBalance = (userBalance - orderItems[0]?.price).toLocaleString(
    'ko-KR'
  );

  useEffect(() => {
    fetch('/data/OrderItem.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(setOrderItems);
  }, []);

  return (
    <OrderMain>
      <OrderItemContainer>
        <OrderTitle>주문 도서</OrderTitle>
        <OrderItemBox key={orderItems[0]?.id}>
          <OrderItemInfoBox>
            <OrderItemImageBox>
              <OrderItemImage src={orderItems[0]?.imageUrl} />
            </OrderItemImageBox>
            <OrderItemTextBox>
              <OrderItemTitle>{orderItems[0]?.title}</OrderItemTitle>
              <OrderItemAuthor>{orderItems[0]?.author}</OrderItemAuthor>
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
          <OrderMethod>보유 캐시</OrderMethod>
          <OrderMethodBalance>
            {userBalance.toLocaleString('ko-KR')}원
          </OrderMethodBalance>
        </OrderMethodBox>
        <BalanceTitle>결제 후 잔액</BalanceTitle>
        <OrderBalanceBox>
          <AfterOrderBalance>{orderBalance}원</AfterOrderBalance>
        </OrderBalanceBox>
        <OrderButton>결제하기</OrderButton>
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
  ${props => props.theme.variables.flex('row', 'space-between', 'center')}
  width: 270px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  padding: 20px 0;
  margin-bottom: 40px;
`;

const OrderMethod = styled.div`
  font-size: 15px;
`;

const OrderMethodBalance = styled.div`
  font-size: 30px;
`;

const BalanceTitle = styled.h1`
  margin-bottom: 20px;
  font-weight: 700;
`;

const OrderBalanceBox = styled.div`
  ${props => props.theme.variables.flex('row', 'center', 'center')}
  width: 270px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  padding: 20px 0;
  margin-bottom: 40px;
`;

const AfterOrderBalance = styled.div`
  font-size: 30px;
  color: #1e9eff;
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
