![waving](https://capsule-render.vercel.app/api?type=waving&height=200&fontAlignY=40&text=DevU&color=gradient)

<h1> 개발 서적 판매 사이트(DEVU) 구축 </h1>

## 프로젝트 선정이유 
* 4차 산업혁명으로 IT 산업의 발전 가능성이 높아지는 중
* 늘어나는 개발자의 수요 → 코딩 교육 자료에 대한 수요도 증가
* 스마트 학습 환경, e-러닝 트렌드에 맞춘 인터페이스 제공
* 코딩이 정규 교육 과정에 도입되고 있는 추세로 앞으로 학교에서도 교육 자료에 대한 수요가 많아질 것으로 예상 → 기관 및 기업에 대량 납품이 가능할 것으로 기대됨

</br>

# 개발 기간

- 22.12.19 ~ 22.12.30 (2주)
</br>

# 개발 인원 및 파트


| 개발자 | 담당 파트 | 비고 |
| --- | --- | --- |
| 윤선영 | 카테고리, 제품리스트, 상세페이지, 키워드검색 | F.E. |
| 배효빈 | 나의 서재, 뷰어 기능, 구매/결제하기 | P.M. |
| 임우진 | 메인페이지, 회원가입/로그인 페이지 | F.E. |

</br>

| 개발자 | 담당 파트 | 비고 |
| --- | --- | --- |
| 박진주 | API : 나의 서재, 뷰어 데이터 불러오기, 구매/결제하기 | P.M. |
| 황정수 | API : 메인페이지, 카테고리, 제품리스트, 키워드 검색, 회원가입/로그인  | B.E. |

</br>



# TOOLS

<div>
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"/>
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>
</div>

</br>

# LINK TO 👉🏻

<div>
<a href='https://trello.com/b/6IDlFka9/devuhttps://trello.com/b/6IDlFka9/devu'><img src="https://img.shields.io/badge/Trello-0052CC?style=flat&logo=Trello&logoColor=white" /></a>
<a href='https://big-tango-420.notion.site/4-273e017e41d1409898fdcaf1104eae72'><img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/></a>
</div>

</br>

# STACK

### F.E.

|JavaScript|React|styled-components|esLint|
| :--: | :--: | :--: | :--: |
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://raw.githubusercontent.com/styled-components/brand/master/styled-components.png" alt="icon" width="65" height="65" /></div> | <img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="65" height="65" /> | 



### B.E.

|JavaScript|Nodejs|MySql|AWS|
| :--: | :--: | :--: | :--: |
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/aws-icon.svg" alt="icon" width="65" height="65" /> |

</br>


</br>

## 로그인/회원가입 
- 소셜로그인(카카오톡) api 이용한 로그인 기능 구현. 별도의 회원가입 없이 간단하게 카카오톡 계정을 이용해 로그인을 가능하도록 하여 user의 서비스 접근성 향상 

## 메인페이지
- Carousel 자동, 수동
- Footer까지 훑어보기
- 카테고리 Click -> 리스트 페이지 이동
- 검색 기능
- 검색 모달창 등장
- Click -> 해당 Book 디테일 페이지 이동

## 리스트페이지 
- 서브카테고리 Click -> 리스트 변경
- 아래까지 본 뒤 (scroll back to top button)Click하여 최상단
- 특정 Book Click -> 디테일 페이지이동

## 디테일페이지
- 더보기(접기) X n
- 리뷰, 평점 작성, 삭제
- 주문하기 Click -> 오더 페이지 이동

## 서재 
- 구매한 Book 조회
- Book Click -> 뷰어 이동

## 뷰어
- AWS S3 Bucket PDF 불러오기
- 페이지 이동 + 슬라이드
- 목차(index)별 페이지 이동
- 확대, 축소
- 뒤로가기 버튼 Click -> 서재 이동

## 구매하기 
- 유저 정보 -> 잔여 보유 포인트 표시 
- 구매하기 Click -> 잔여 보유 포인트 반환, 서재에 제품 등록

</br>

------

## 데모영상 
[링크](https://youtu.be/CccD3q0OHPM)

</br>

# 구현 기능 

| 로그인 | <img width="1343" alt="image" src="https://user-images.githubusercontent.com/117656236/218250760-c4a50ea6-8daf-4989-8a80-74b4913a5d16.png"> |
| :--: | :--: |
| 메인페이지 | <img width="1273" alt="image" src="https://user-images.githubusercontent.com/117656236/218250799-8d93f1d0-c6dd-4a51-9b81-786f806c74ca.png"> |
| 리스트페이지 | <img width="1269" alt="image" src="https://user-images.githubusercontent.com/117656236/218250830-ebb477eb-894d-4965-83a2-9bee5c8c84f0.png"> |
| 디테일페이지 | ![image](https://user-images.githubusercontent.com/117656236/218250893-4a2b3160-53b8-4b01-88ec-7c638afa8d8c.png) |
| 서재 | <img width="1150" alt="image" src="https://user-images.githubusercontent.com/117656236/218250908-51b059be-3fa1-48d4-b8f0-de45c04718e0.png"> |
| 뷰어 | <img width="1265" alt="image" src="https://user-images.githubusercontent.com/117656236/218250928-b212d5be-cfa0-4507-8acd-196064d59fc4.png"> |
| 검색 | <img width="1264" alt="image" src="https://user-images.githubusercontent.com/117656236/218250959-c578f159-b625-458d-8283-fa8b045e151b.png"> |

## References 
* 이 프로젝트는 [리디 공식 홈페이지](https://ridibooks.com/ebook/recommendation)를 참조하여 학습목적으로 만들었습니다. 
* 실무 수준의 프로젝트이지만 학습용으로 만들었기때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제가 될 수 있습니다. 
* 이 프로젝트에서 사용하고 있는 사진 대부분은 위코드에서 구매한 것이므로 해당 프로젝트 외부인이 사용할 수 없습니다. 
