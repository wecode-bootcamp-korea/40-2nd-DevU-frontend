import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API } from '../../config';
import styled from 'styled-components';

const API_KEY = process.env.REACT_APP_API_KEY;
const REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');

  const getToken = async () => {
    const kakaoRes = await fetch(`${API.kakaoAuth}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=authorization_code&client_id=${API_KEY}&redirect_url=${REDIRECT_URL}&code=${code}`,
    });

    const { access_token } = await kakaoRes.json();

    if (!access_token) {
      alert('카카오 로그인 실패');
      return navigate('/login');
    }

    const localRes = await fetch(`${API.signIn}`, {
      method: 'POST',
      headers: {
        Authorization: access_token,
      },
    });

    const { accessToken } = await localRes.json();

    if (!accessToken) {
      alert('카카오 로그인 실패');
      return navigate('/login');
    }

    localStorage.setItem('token', accessToken);

    navigate('/');
  };

  useEffect(() => {
    getToken();
  }, []);

  return <AuthPage>kakao 로그인 진행 중</AuthPage>;
};

export default Auth;

const AuthPage = styled.div`
  width: 400px;
  margin: 200px auto;
  padding: 30px 0;
  border-radius: 20px;
  background-color: yellow;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;
