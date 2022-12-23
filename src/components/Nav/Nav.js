import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  faBell,
  faAddressBook,
  faUser,
} from '@fortawesome/free-regular-svg-icons';

const BUTTON_LIST = [
  { id: 1, icon: faBell },
  { id: 2, icon: faAddressBook },
  { id: 3, icon: faUser },
];

const Nav = () => {
  return (
    <NavSection>
      <UserMenuSection>
        <UserMenuButton>로그인</UserMenuButton>
        <UserMenuButton>캐시충전</UserMenuButton>
      </UserMenuSection>
      <Navigator>
        <Title>
          <LinkTag>
            <DevUBlueTitle>DEVU</DevUBlueTitle>
            <DevUBlackTitle>BOOKS</DevUBlackTitle>
          </LinkTag>
        </Title>
        <SearchLabel>
          <MagnifyIcon icon={faMagnifyingGlass} />
          <SearchInput />
          <DeleteButton>
            <DeleteIcon icon={faCircleXmark} />
          </DeleteButton>
        </SearchLabel>
        <ButtonsSection>
          {BUTTON_LIST.map(button => (
            <ButtonsWrap key={button.id}>
              <ButtonsIcon icon={button.icon} />
            </ButtonsWrap>
          ))}
        </ButtonsSection>
      </Navigator>
    </NavSection>
  );
};

export default Nav;

const NavSection = styled.div`
  max-width: 1170px;
  margin: auto;
  padding: 0 18px;
`;

const UserMenuSection = styled.div`
  ${({ theme }) => theme.variables.flex(null, 'flex-end')}
  border-bottom: 1px solid #f0f0f0;
  background: ${({ theme }) => theme.style.white};
`;

const UserMenuButton = styled(Link)`
  padding: 11px 12px 10px;
  border: none;
  background-color: transparent;
  color: #787878;
  font-weight: 700;
  font-size: 14px;

  &:hover {
    opacity: 0.6;
  }
`;

const Navigator = styled.nav`
  ${({ theme }) => theme.variables.flex(null, 'space-between')}
  padding: 16px 0 16px 22px;
`;

const Title = styled.h1`
  margin: 0;
  margin-right: auto;
`;

const LinkTag = styled(Link)`
  ${({ theme }) => theme.variables.flex(null, 'flex-start')}
`;

const DevUBlueTitle = styled.div`
  width: auto;
  height: 40px;
  padding: 8px 0 9px 0;
  color: ${({ theme }) => theme.style.mainDevUBlue};
  font-size: 30px;
  font-weight: 900;
`;

const DevUBlackTitle = styled(DevUBlueTitle)`
  padding-left: 2px;
  color: black;
`;
const SearchLabel = styled.label`
  ${({ theme }) => theme.variables.flex(null, 'flex-start')}
  width: auto;
  height: 40px;
  padding: 0 11px;
  border: 1px solid rgba(0, 0, 0, 0.5%);
  border-radius: 8px;
  background-color: #f0f0f0;
`;

const MagnifyIcon = styled(FontAwesomeIcon)`
  margin-right: 12px;
  color: #787878;
  font-size: 16px;
`;

const SearchInput = styled.input`
  width: 180px;
  border: none;
  background-color: transparent;
  color: #141414;
  font-size: 15px;

  &:focus {
    outline: none;
  }
`;

const DeleteButton = styled.button`
  margin: 0 -5px 0 7px;
  padding: 0;
  border: none;
  cursor: pointer;
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  margin: 5px;
  color: rgb(120, 120, 120);
  font-size: 16px;
`;

const ButtonsSection = styled.div`
  ${({ theme }) => theme.variables.flex(null, 'flex-start')}
`;

const ButtonsWrap = styled(Link)`
  margin: 0 6px;
  padding: 7px 6px 5px;
  color: #141414;
  font-size: 25px;
`;

const ButtonsIcon = styled(FontAwesomeIcon)`
  color: rgb(70, 70, 70);
`;
