import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Search = ({ modalOpen, setModalOpen, list }) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handler = event => {
      if (modalRef.current) {
        if (!modalRef.current.contains(event.target)) {
          setModalOpen(false);
        }
      }
    };

    return () => {
      document.addEventListener('mousedown', handler);
    };
  });

  return (
    <SearchBox ref={modalRef} onClick={closeModal}>
      <Title>작품</Title>
      {list.map(searchData => {
        return (
          <SearchList
            key={searchData.id}
            to={`/books/details/${searchData.id}`}
          >
            <BookTitle>{searchData.title}</BookTitle>
            <BookInfo>{searchData.author}</BookInfo>
            <>·</>
            <BookInfo>{searchData.publisher}</BookInfo>
          </SearchList>
        );
      })}
    </SearchBox>
  );
};

export default Search;

const SearchBox = styled.ul`
  width: 400px;
  height: 480px;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 10px;
  border: 1px solid rgb(240, 240, 240);
  border-radius: 8px;
  background: rgb(255, 255, 255);
  opacity: 1;
  transition: opacity 0.2s ease-in-out 0s;
  box-shadow: rgb(0 0 0 / 8%) 5px 5px 10px;
  z-index: 1;
  overflow-y: scroll;
`;

const Title = styled.p`
  padding: 14px 16px 6px;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: -0.01em;
  color: rgb(120, 120, 120);
`;

const SearchList = styled(Link)`
  min-height: 40px;
  font-weight: 600;
  cursor: pointer;
  padding: 9px 16px;
  text-align: left;
  display: block;
  text-overflow: ellipsis;
  color: #787878;
  -webkit-box-align: center;
`;

const BookTitle = styled.span`
  color: #141414;
  font-weight: 400;
  text-align: center;
  margin-right: 10px;
`;

const BookInfo = styled.span`
  font-size: 13px;
  padding: 0 6px;
  font-weight: normal;
  text-align: center;
`;
