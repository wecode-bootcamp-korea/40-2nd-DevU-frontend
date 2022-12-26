import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import kakaoLogin from '../../assets/images/kakaoLogin.png';

const Login = () => {
  return (
    <LoginPage>
      <LoginHeader>
        <Title>
          <TitleLink to="/">DEVU</TitleLink>
        </Title>
      </LoginHeader>
      <LoginSection>
        <LoginForm>
          <KakaoLoginButton type="button" />
        </LoginForm>
      </LoginSection>
    </LoginPage>
  );
};

export default Login;

const LoginPage = styled.div`
  min-height: 100vh;
  background-color: #ebf6ff;
`;

const LoginHeader = styled.header`
  border-bottom: 1px solid #d6dee8;
`;

const Title = styled.h1`
  ${({ theme }) => theme.variables.flex()}
  height: 40px;
  font-size: 12px;
`;

const TitleLink = styled(Link)`
  padding: 0 14px;
  color: ${({ theme }) => theme.style.mainDevUBlue};
  font-size: 18px;
  font-weight: 900;
`;

const LoginSection = styled.section`
  max-width: 360px;
  margin: auto;
  padding: 60px 0 70px;
`;

const LoginForm = styled.div`
  ${({ theme }) => theme.variables.flex('column')}
  padding: 24px 10px;
`;

const KakaoLoginButton = styled.button`
  width: 300px;
  height: 45px;
  border: none;
  background-image: url(${kakaoLogin});
  cursor: pointer;
`;
