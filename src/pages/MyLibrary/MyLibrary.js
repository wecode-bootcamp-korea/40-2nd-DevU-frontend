import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';

const MyLibrary = () => {
  const [myBookLibrary, setMyBookLibrary] = useState([]);

  useEffect(() => {
    fetch(`${API.myLibrary}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        setMyBookLibrary(data.data);
      });
  }, []);
  return (
    <>
      <UpperWrapper>
        <TitleWrapper>
          <Title>내 서재</Title>
        </TitleWrapper>
      </UpperWrapper>
      <MainWrapper>
        <MyBookWrapper>
          {myBookLibrary.map(({ id, image_url, title, book_id }) => (
            <ReadButton key={id} to={`/viewer/${book_id}`}>
              <ImageWrapper>
                <LibraryImage src={image_url} alt={title} />
              </ImageWrapper>
            </ReadButton>
          ))}
        </MyBookWrapper>
        <LibraryFooter>
          <FooterTitle>© Devu Corp.</FooterTitle>
          <FooterWrapper>
            {LIBRARY_FOOTER.map(({ id, item }) => (
              <FooterItem key={id}>{item}</FooterItem>
            ))}
          </FooterWrapper>
        </LibraryFooter>
      </MainWrapper>
    </>
  );
};
const UpperWrapper = styled.section`
  border-bottom: 1px solid #ced2d6;
`;

const TitleWrapper = styled.div`
  ${props => props.theme.variables.flex('column', 'flex-start', null)}
  margin: 5px 10% 0px 10%;
  padding: 0px 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const MainWrapper = styled.main`
  ${props => props.theme.variables.flex('column', 'flex-start', 'center')}
  height: 100%;
  background-color: #f3f4f5;
`;

const MyBookWrapper = styled.div`
  ${props => props.theme.variables.flex('row', 'left', 'flex-end')}
  margin: 10px 10% 5% 10%;
  max-width: 80vw;
  flex-wrap: wrap;
  background: url('/images/MyLibrary/underlineMyLibrary.png') bottom / 100%
    262px repeat-y;
`;

const ReadButton = styled(Link)`
  text-decoration: none;
  height: 260px;
  display: flex;
  align-items: flex-end;
  margin: 0px 10px 1px;
`;

const ImageWrapper = styled.div`
  width: 150px;
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

const LibraryImage = styled.img`
  width: 150px;
`;

const LibraryFooter = styled.footer`
  ${props => props.theme.variables.flex('column', 'center', 'center')}
  margin: 40px auto 40px;
  color: #a0a9ae;
`;

const FooterTitle = styled.h1`
  margin-bottom: 10px;
  font-size: 14px;
`;

const FooterWrapper = styled.footer`
  ${props => props.theme.variables.flex('row', 'center', 'center')}
`;

const FooterItem = styled.div`
  font-size: 11px;
  :not(:last-child)::after {
    padding: 0 5px;
    content: '|';
  }
`;

export default MyLibrary;

const LIBRARY_FOOTER = [
  { id: 1, item: '고객센터' },
  { id: 2, item: '이용약관' },
  { id: 3, item: '개인 정보 처리 방침' },
  { id: 4, item: '청소년 보호 정책' },
  { id: 5, item: '사업자 정보 확인' },
];
