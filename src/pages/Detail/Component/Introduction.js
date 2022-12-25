import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';

function Introduction({ title, content }) {
  const contentRef = useRef();
  const btnRef = useRef();
  const [isMore, setIsMore] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      if (
        contentRef.current.clientHeight <
        DEFAULT_SHOWING_LINE * LINE_HEIGHT
      ) {
        btnRef.current.style.display = 'none';
      }
    }
  }, [contentRef]);

  return (
    <SectionWrap>
      <SectionTitleWrap>
        <SectionTitle>{title}</SectionTitle>
      </SectionTitleWrap>
      <Content ref={contentRef} isMore={isMore}>
        {content}
      </Content>
      <MoreButton ref={btnRef} onClick={() => setIsMore(!isMore)}>
        {isMore ? (
          <>
            접기 <FaArrowAltCircleUp />
          </>
        ) : (
          <>
            펼쳐보기 <FaArrowAltCircleDown />
          </>
        )}
      </MoreButton>
    </SectionWrap>
  );
}

export default Introduction;

const DEFAULT_SHOWING_LINE = 3;
const LINE_HEIGHT = 24;

const SectionWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px 70px;
`;

const SectionTitleWrap = styled.div`
  margin-bottom: 15px;
  padding: 10px 0 8px;
  border-bottom: 2px solid #7d8e9e;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  display: inline-block;
  color: #59667a;
  font-weight: 500;
`;

const Content = styled.div`
  display: -webkit-box;
  width: 100%;
  line-height: ${LINE_HEIGHT}px;
  font-size: 13px;
  color: #333;
  overflow: hidden;
  white-space: pre-line;
  -webkit-box-orient: vertical;
  ${({ isMore }) => !isMore && `-webkit-line-clamp: ${DEFAULT_SHOWING_LINE}`};
`;

const MoreButton = styled.span`
  align-self: flex-end;
  font-size: 14px;
  color: #4076b5;
  cursor: pointer;
`;
