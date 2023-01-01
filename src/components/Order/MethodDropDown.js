import React from 'react';
import styled from 'styled-components';

const MethodDropDown = ({ userBalance, orderBalance }) => {
  return (
    <>
      <MethodTitle>보유 포인트</MethodTitle>
      <OrderMethodBalanceBox>
        <UserBalance>{userBalance.toLocaleString('ko-KR')}원</UserBalance>
      </OrderMethodBalanceBox>
      <MethodTitle>결제 후 잔액</MethodTitle>
      <OrderMethodBalanceBox>
        <AfterOrderBalance>{orderBalance}원</AfterOrderBalance>
      </OrderMethodBalanceBox>
    </>
  );
};

const OrderMethodBalanceBox = styled.div`
  ${props => props.theme.variables.flex('row', 'center', 'center')}
  width: 270px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  padding: 20px 0;
  margin-bottom: 40px;
`;

const MethodTitle = styled.h1`
  margin-bottom: 20px;
  font-weight: 700;
`;

const UserBalance = styled.div`
  font-size: 30px;
  color: #1e9eff;
`;

const AfterOrderBalance = styled.div`
  font-size: 30px;
  color: #1e9eff;
`;

export default MethodDropDown;
