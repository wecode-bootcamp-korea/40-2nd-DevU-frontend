import {
  faFacebookF,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import { faHeadset, faVolumeLow } from '@fortawesome/free-solid-svg-icons';

export const FIRST_MAIN_CATEGORIES = [
  { id: 1, icon: faHeadset, category: '고객센터' },
  { id: 2, icon: faVolumeLow, category: '공지사항' },
];

export const REST_CATEGORIES = [
  {
    id: 1,
    category: '서비스',
    subCateogories: [
      { id: 1, text: '리디페이퍼' },
      { id: 2, text: '제휴카드' },
      { id: 3, text: '뷰어 다운로드' },
      { id: 4, text: 'CP사이트' },
      { id: 5, text: '리디셀렉트 B2B' },
    ],
  },
  {
    id: 2,
    category: '기타 문의',
    subCateogories: [
      { id: 1, text: '콘텐츠 제공 문의' },
      { id: 2, text: '사업 제휴 문의' },
    ],
  },
  {
    id: 3,
    category: '회사',
    subCateogories: [
      { id: 1, text: '회사 소개' },
      { id: 2, text: `인재채용` },
    ],
  },
];

export const SOCIAL_LINK_BUTTONS = [
  { id: 1, icon: faFacebookF, href: 'https://www.facebook.com/' },
  { id: 2, icon: faInstagram, href: 'https://www.instagram.com/' },
  { id: 3, icon: faYoutube, href: 'https://www.youtube.com/' },
];

export const LICENSE_LIST = [
  { id: 1, text: '이용약관' },
  { id: 2, text: '개인정보 처리방침' },
  { id: 3, text: '청소년보호정책' },
  { id: 4, text: '사업자정보확인' },
];
