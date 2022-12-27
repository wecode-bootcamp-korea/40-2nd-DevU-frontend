import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Viewer = () => {
  const [bookInfo, setBookInfo] = useState([{ id: 0, title: '', index: [] }]);

  useEffect(() => {
    fetch('/data/bookPDF.json', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(setBookInfo);
  }, []);

  return (
    <ViewerBG>
      <ViewerMainContainer>
        <ViewerNav>
          <PrevLink to="/myLibrary">
            {' '}
            <PrevIcon>
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />{' '}
            </PrevIcon>
            {bookInfo[0].title}
          </PrevLink>
          <ResizerWrapper>
            <ZoomOutButton>가 -</ZoomOutButton>
            <ZoomInButton>가 +</ZoomInButton>
          </ResizerWrapper>
        </ViewerNav>
        <ViewerContentWrapper>
          <ButtonWrapper>
            <PrevPageButton>
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </PrevPageButton>
            <NextPageButton>
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </NextPageButton>
          </ButtonWrapper>
          <ViewerContent>{bookInfo[0].contents}</ViewerContent>
        </ViewerContentWrapper>
      </ViewerMainContainer>
      <ViewerSideContainer>
        <IndexTitle>목차</IndexTitle>
        {bookInfo[0].index.map(info => {
          return <IndexList key={info.title}>{info.title}</IndexList>;
        })}
      </ViewerSideContainer>
    </ViewerBG>
  );
};

const ViewerBG = styled.div`
  ${props => props.theme.variables.flex('row', 'center', 'center')}
  background-color: grey;
  height: 100vh;
`;

const ViewerMainContainer = styled.main`
  background-color: white;
  width: 750px;
  height: 720px;
`;

const ViewerNav = styled.nav`
  ${props => props.theme.variables.flex('row', 'space-between', 'center')}
  padding: 8px 15px;
  border-bottom: 1px solid #d8d8d8;
`;

const PrevLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const PrevIcon = styled.span`
  color: #999999;
  margin: auto 5px;
`;

const ResizerWrapper = styled.div`
  ${props => props.theme.variables.flex('row', 'center', 'center')}
`;

const ZoomOutButton = styled.button`
  border-radius: 5px 0 0 5px;
  border: 1px solid #d8d8d8;
  width: 40px;
  height: 30px;
  font-size: 12px;
  color: grey;
  background-color: white;
  cursor: pointer;
`;

const ZoomInButton = styled.button`
  border-radius: 0 5px 5px 0;
  border: 1px solid #d8d8d8;
  border-left: 0px;
  width: 40px;
  height: 30px;
  font-size: 15px;
  color: grey;
  background-color: white;
  cursor: pointer;
`;

const ViewerContentWrapper = styled.div`
  height: 100%;
`;

const ButtonWrapper = styled.div`
  ${props => props.theme.variables.flex('row', 'space-between', 'center')}
`;

const PrevPageButton = styled.div`
  ${props => props.theme.variables.flex(null, 'flex-start', 'center')}
  padding-left: 20px;
  width: 250px;
  height: 673px;
  color: #999999;
  cursor: pointer;
`;

const NextPageButton = styled.div`
  ${props => props.theme.variables.flex(null, 'flex-end', 'center')}
  padding-right: 20px;
  width: 250px;
  height: 673px;
  color: #999999;
  cursor: pointer;
`;

const ViewerContent = styled.div`
  width: 750px;
  height: 673px;
  padding: 40px 70px;
  transform: translate(0, -100%);
  line-height: 2;
  font-size: 20px;
  overflow: hidden;
`;

const ViewerSideContainer = styled.aside`
  ${props => props.theme.variables.flex('column', 'flex-start', 'flex-start')}
  list-style: none;
  width: 280px;
  height: 720px;
  background-color: #eeeeee;
  overflow: scroll;
`;

const IndexTitle = styled.ul`
  width: 280px;
  font-size: 15px;
  color: #bbbbbb;
  padding: 15.5px 15px;
  border-bottom: 1px solid #d8d8d8;
`;

const IndexList = styled.li`
  width: 100%;
  list-style: none;
  font-size: 14px;
  color: #737373;
  padding: 15px 20px;
  border-bottom: 1px solid #e7e7e7;
`;

export default Viewer;
