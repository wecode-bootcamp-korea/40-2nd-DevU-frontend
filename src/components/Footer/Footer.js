import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  SOCIAL_LINK_BUTTONS,
  FIRST_MAIN_CATEGORIES,
  REST_CATEGORIES,
  LICENSE_LIST,
} from './FOOTER_DATA_LIST';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';

const Footer = () => {
  return (
    <FooterSection>
      <FooterMain>
        <FooterContents>
          <FooterCategory>
            <MainCategory>
              {FIRST_MAIN_CATEGORIES.map(category => (
                <Link key={category.id}>
                  <FirstCategoryList>
                    <FirstCategoryImage icon={category.icon} />
                    <span>{category.category}</span>
                  </FirstCategoryList>
                </Link>
              ))}
            </MainCategory>
            {REST_CATEGORIES.map(category => (
              <MainCategory key={category.id}>
                <CategoryList>{category.category}</CategoryList>
                {category.subCateogories.map(subCategory => (
                  <RestCategoryList key={subCategory.id}>
                    <Link>{subCategory.text}</Link>
                  </RestCategoryList>
                ))}
              </MainCategory>
            ))}
          </FooterCategory>
          <LicenseInfo>
            <LicenseButton>
              데뷰(주) 사업자 정보 <FontAwesomeIcon icon={faAngleDown} />
            </LicenseButton>
            <LicenseListSection>
              {LICENSE_LIST.map(license => (
                <LicenseList key={license.id}>
                  <Link>{license.text}</Link>
                </LicenseList>
              ))}
            </LicenseListSection>
            <CopyRightInfo>
              <CopyRightImage icon={faCopyright} />
              DEVU Corp.
            </CopyRightInfo>
          </LicenseInfo>
        </FooterContents>
        <SocialButtonSection>
          {SOCIAL_LINK_BUTTONS.map(button => (
            <SocialButtonList key={button.id}>
              <SocialButtonAnchor
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialButtonImage icon={button.icon} />
              </SocialButtonAnchor>
            </SocialButtonList>
          ))}
        </SocialButtonSection>
      </FooterMain>
    </FooterSection>
  );
};

export default Footer;

const FooterSection = styled.div`
  margin-top: 100px;
  border-top: 1px solid ${({ theme }) => theme.style.gray};
  background-color: ${({ theme }) => theme.style.white};
`;

const FooterMain = styled.footer`
  ${({ theme }) => theme.variables.flex(null, 'space-between', 'flex-start')};
  flex-wrap: wrap;
  width: 80vw;
  margin: 0 auto;
  padding: 41px 10px 20px;
`;

const FooterContents = styled.div`
  ${({ theme }) => theme.variables.flex('column', 'flex-start', 'flex-start')};
  padding: 0 4px;
`;

const FooterCategory = styled.div`
  ${({ theme }) => theme.variables.flex('row', 'flex-start', 'flex-start')}
`;

const MainCategory = styled.ul`
  ${({ theme }) => theme.variables.flex('column', 'center', 'flex-start')}
  width: 185px;
`;

const FirstCategoryImage = styled(FontAwesomeIcon)`
  width: 20px;
  height: 20px;
  margin-right: 6px;
`;

const CategoryList = styled.li`
  ${({ theme }) => theme.variables.flex()};
  margin: 10px 0;
  color: #787878;
  font-size: 13px;
  font-weight: 700;
  line-height: 16px;
`;

const FirstCategoryList = styled(CategoryList)`
  &:hover {
    opacity: 0.6;
  }
`;

const RestCategoryList = styled(CategoryList)`
  margin: 6px 0;
  font-weight: 400;

  &:hover {
    opacity: 0.6;
  }

  &:nth-child(2) {
    margin-top: 0px;
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;

const LicenseInfo = styled.div`
  ${({ theme }) => theme.variables.flex('column', 'center', 'flex-stert')}
  margin-top: 60px;
  margin-bottom: 20px;
  color: #787878;
`;

const LicenseButton = styled.span`
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 700;
  line-height: 14px;
  cursor: pointer;
`;

const LicenseListSection = styled.ul`
  ${({ theme }) => theme.variables.flex('row', 'flex-start')}
`;

const LicenseList = styled.li`
  height: 13px;
  margin-left: 8px;
  font-size: 11px;

  &:first-child {
    margin-left: 0px;
  }

  &:nth-child(2) {
    font-weight: 700;
  }

  &:hover {
    opacity: 0.6;
  }
`;

const CopyRightInfo = styled.div`
  ${({ theme }) => theme.variables.flex('row', 'flex-start')};
  margin-top: 16px;
  color: #787878;
  font-size: 11px;
  font-weight: 100;
  line-height: 13px;
`;

const CopyRightImage = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;

const SocialButtonSection = styled.ul`
  ${({ theme }) => theme.variables.flex()};
  padding: 0 4px;
`;

const SocialButtonList = styled.li`
  width: 44px;
  height: 44px;
  margin-left: 10px;
  color: #787878;
  cursor: pointer;

  &:first-child {
    margin-left: 0px;
  }
`;

const SocialButtonAnchor = styled.a`
  ${({ theme }) => theme.variables.flex()}
  height: 100%;
  border: 1px solid #e6e6e6;
  border-radius: 22px;
  background-color: transparent;
`;

const SocialButtonImage = styled(FontAwesomeIcon)`
  height: 15px;
`;
