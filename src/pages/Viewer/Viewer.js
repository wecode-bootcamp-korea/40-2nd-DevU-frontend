import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Advances_in_Coumputer_Science from '../../../src/components/PDF/Advances_in_Computer_Science.pdf';
import styled from 'styled-components';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Viewer = () => {
  const [bookInfo, setBookInfo] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageScale, setPageScale] = useState(1);

  const url =
    'https://devubucket.s3.ap-northeast-2.amazonaws.com/ridi-devu.pdf';

  const { title, list, list_number, content_url } = bookInfo;

  const { bookId } = useParams();

  const index = (list || '').split(',');
  const indexPageNumber = (list_number || '').split(',');
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    // setPageNumber(1);
  };

  const zoomIn = () => {
    setPageScale(pageScale.toFixed(1) >= 2.5 ? 2.5 : pageScale + 0.1);
  };

  const zoomOut = () => {
    setPageScale(pageScale.toFixed(1) <= 1 ? 1 : pageScale - 0.2);
  };

  const changePage = offset => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  const slidePage = e => {
    setPageNumber(Number(e.target.value));
  };

  const gotoIndexPage = e => {
    for (let i = 0; i <= indexPageNumber.length; i++) {
      if (e.target.innerHTML[0] == i + 1) {
        setPageNumber(Number(indexPageNumber[i]));
      }
    }
  };

  useEffect(() => {
    fetch(`http://10.58.52.153:3000/bookshelf/viewer/${bookId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        setBookInfo(data.data[0]);
      });
  }, [bookId]);

  return (
    <ViewerBG>
      <ViewerMainContainer>
        <ViewerNav>
          <PrevLink to="/bookshelf">
            <PrevIcon>
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </PrevIcon>
            {title}
          </PrevLink>
          <ResizerWrapper>
            <ZoomOutButton onClick={zoomOut}>가 -</ZoomOutButton>
            <ZoomInButton onClick={zoomIn}>가 +</ZoomInButton>
          </ResizerWrapper>
        </ViewerNav>
        <ViewerContentWrapper>
          <SinglePageWrapper>
            <ButtonWrapper>
              <PrevPageButton
                type="button"
                disabled={pageNumber < 1}
                onClick={previousPage}
              >
                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
              </PrevPageButton>
              <NextPageButton
                type="button"
                disabled={pageNumber > numPages}
                onClick={nextPage}
              >
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
              </NextPageButton>
            </ButtonWrapper>
            <Contents
              file={{ url: content_url }}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <SinglePage
                height="550"
                pageNumber={pageNumber}
                scale={pageScale}
              />
            </Contents>
          </SinglePageWrapper>
          <SliderBox>
            <InputRange
              type="range"
              min="1"
              max={numPages}
              value={pageNumber}
              onChange={slidePage}
            />
            <PageMsg>
              {pageNumber}/{numPages}
            </PageMsg>
          </SliderBox>
        </ViewerContentWrapper>
      </ViewerMainContainer>
      <ViewerSideContainer>
        <IndexTitle>목차</IndexTitle>
        {index.map(info => {
          return (
            <IndexList key={info} onClick={gotoIndexPage}>
              {info}
            </IndexList>
          );
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
  width: 1040px;
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
  position: relative;
  height: 674px;
  width: 100%;
  ${props => props.theme.variables.flex('row', 'center', 'flex-start')};
`;

const SinglePageWrapper = styled.div`
  height: 674px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  ${props => props.theme.variables.flex('row', 'space-between', 'center')}
`;

const PrevPageButton = styled.div`
  ${props => props.theme.variables.flex(null, 'flex-start', 'center')}
  padding-left: 30px;
  width: 100px;
  height: 674px;
  color: #999999;
  cursor: pointer;
  z-index: 100;
`;

const NextPageButton = styled.div`
  ${props => props.theme.variables.flex(null, 'flex-end', 'center')}
  padding-right: 30px;
  width: 100px;
  height: 674px;
  color: #999999;
  cursor: pointer;
  z-index: 100;
`;

const Contents = styled(Document)`
  ${props => props.theme.variables.flex(null, 'center', 'center')}
  height: 100%;
  padding: 40px 70px 55px;
  transform: translate(0, -100%);
  line-height: 2;
  font-size: 20px;
`;

const SinglePage = styled(Page)`
  height: 100%;
  overflow: scroll;
  margin: 40px;
`;

const SliderBox = styled.div`
  position: absolute;
  bottom: 20px;
`;

const InputRange = styled.input`
  width: 500px;
  height: 2px;
  border-radius: 50px;
  z-index: 200;
  appearance: none;
  cursor: pointer;
  border-color: transparent;
  background-color: #d8d8d8;
  color: red;

  :focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    position: relative;
    appearance: none;
    height: 9px;
    width: 9px;
    background: grey;
    border-radius: 100%;
    border: 0;
    top: 50%;
    transition: background-color 150ms;
  }

  &:hover {
    &::-webkit-slider-thumb {
      height: 13px;
      width: 13px;
      background-color: #1e9eff;
      transition: 150ms;
    }
  }
`;

const PageMsg = styled.div`
  ${props => props.theme.variables.flex('null', 'flex-end', 'null')}
  margin-top: 6px;
  color: grey;
  font-size: 11px;
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
  cursor: pointer;
`;

export default Viewer;
