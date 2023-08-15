# Pathfinder
휠체어로 이동 가능한 경로를 찾아주는 웹 어플리케이션

---

## Design:

<img width="742" alt="Screenshot 2023-08-14 at 8 58 23 PM" src="https://github.com/ryankwondev/pathfinder/assets/93381265/7e8bab25-593e-4561-9a9a-879682b52052">

<br>
<br>

- 상단바: 로고, 시작위치 입력, 도착위치 입력, 검색버튼
- 좌측 영역: 휠체어로 이동 가능한 두 경로와 이동시간이 리스트업됨. 맨 아래에는 추가 머튼이 있음. 추가 버튼 누르면 위치1, 위치2, 이동시간 입력하는 모달이 뜸.
- 우측(중앙) 영역: Google Map API를 사용해서 이동 가능한 경로가 모두 뜸. (Direction API 등 사용) | 경로 검색하면, 그거 이동하는 경로만 보여줌.

## Frontend

<img width="1728" alt="Screenshot 2023-08-15 at 9 15 53 AM" src="https://github.com/ryankwondev/pathfinder/assets/93381265/2028bab8-1701-4a9e-9ca4-2b40ae23fce5">

## Backend

[https://api.path-finder.kro.kr/docs](https://api.path-finder.kro.kr/docs)
