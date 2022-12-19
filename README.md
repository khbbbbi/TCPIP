# TCPIP

<b><2학년 2학기 TCPIP 프로젝트 - 불타는감자></b><br>
<br>
<b>불타는감자</b><br>
  : 열품타를 오마주한 웹사이트로 사용자끼리 방을 생성해 방 내에서 채팅이 가능하고 스톱워치를 통해 자신의 공부 시간을 측정하며 공부 상태를 같은 방 내 사용자에게
    전송하는 대학생 공부 웹사이트
    
<b><화면 구성></b><br>
![image](https://user-images.githubusercontent.com/102509150/208232871-9995076c-05fb-49c6-a3e4-068a00a0dbd4.png)
<br>
<b><시스템 구성도></b>
![image](https://user-images.githubusercontent.com/102509150/208234577-e29807eb-a63f-4d96-8fdf-d6415a63afbb.png)
<br>
<b><구현 기능></b>
1. 로그인
![image](https://user-images.githubusercontent.com/102509150/208234502-29fd6e46-398c-410b-9a2c-8445382345ed.png)
-로그인 성공 여부 확인 후 팝업<br>

2. 회원가입
![image](https://user-images.githubusercontent.com/102509150/208234505-cf03fbf2-6c29-4371-8927-64269a6df9c4.png)
-아이디 중복 여부 확인 후 팝업<br>
-비밀번호 길이 제한(6~16)<br>
-비밀번호 특수 문자 포함 여부 확인<br>
-비밀번호란과 비밀번호 확인란 비교 후 일치여부 팝업창 알림<br>

3. 메인
![image](https://user-images.githubusercontent.com/102509150/208234475-27f14be3-4908-4c44-8cee-d2a76384552c.png)
-상단 메뉴바를 통해 해당 페이지로 이동 가능<br>
-상단 메뉴바:닉네임, 로그아웃(로그아웃시 로그인화면으로 이동)<br>
-중앙에 내정보, 스터디그룹, 내가만든방에 해당하는 내용들이 보임.<br>
-내정보:아이디, 닉네임, 생년월일,이메일(회원가입 정보) + 탈퇴하기<br>
-스터디그룹:스터디그룹에 등록돼있는 방 중 6개만 화면에 표시 + 자세히보기<br>
-내가만든방:내가만든방에 등록돼있는 방 중 2개만 화면에 표시 + 자세히보기<br>

4. 방만들기
![image](https://user-images.githubusercontent.com/102509150/208234511-9d9243eb-6124-4475-8a5f-05594b99104b.png)
-그룹명,비밀방여부와 비밀번호,카테고리,한줄소개를 입력받음<br>
-비밀방(체크박스)에 체크하면 비밀번호text란이 활성화됨<br>
-모든 정보를 입력하지 않으면 생성이 안되도록 알림을 띄움.<br>
-방을 생성하면 로그인된 사용자의 아이디가 방장으로 저장됨.<br>

5. 내가만든방
![image](https://user-images.githubusercontent.com/102509150/208234518-57dab745-fb9d-4b3c-9692-15a2d9ceac38.png)
-방장 중 사용자의 아이디와 일치하는 방을 나열<br>
-들어가기와 삭제하기 가능<br>
-비밀방이어도 내가만든방 내에서는 비밀번호를 입력하지 않아도됨<br>

6. 스터디그룹
![image](https://user-images.githubusercontent.com/102509150/208234528-ae49297e-8181-4b63-8296-3a5c6c385b8f.png)
-방만들기로 생성된 방이 나열(스크롤)<br>
-비밀방여부(이미지),방제목, 인원(구현x), 방장, 카테고리, 한줄소개가 정보로 나와있음.<br>
-들어가기버튼<br>

7. 공부방(서버방)
![image](https://user-images.githubusercontent.com/102509150/208234534-f8502b22-2531-47d6-b8e8-d78533c025df.png)
-상단에 방제목이 넘어옴<br>
-중앙에 가장 첫번째 사용자에 내 아이디를 표시(빨간색)<br>
-스톱워치 기능(시작,멈춤,중지)<br>
-채팅창:채팅가능, 접속 시 접속인원 표시, 접속시 접속한 사용자의 아이디 전송(00님이 입장하셨습니다.)<br>
-시작버튼:스톱워치 시작 + 채팅창에 '00님이 공부를 시작하셨습니다.'<br>
-멈춤버튼:스톱워치 정지 + 정지한 시간 기록 + 채팅창에 '00님이 잠시 쉬는 중입니다.'<br>
-중지버튼:스톱워치 리세 + 채팅창에 '오늘의 공부시간 00:00'<br>
<br>

<b><향후 보완될 점></b><br>
1. 소켓 부분<br>
- 현재 서버를 방마다 생성한 것이 아니라, 어떤 방을 들어가든 구분이 없어 방에 들어가기만 하면 채팅이 가능하다. <br>
-> 방마다 서버를 생성하여 방별 사용자들끼리 채팅이 되도록 할 것.<br>
- 현재 방에 접속할 때 접속한 사용자의 닉네임들이 올바르게 불러와지지 않음.<br>
-> 방에 접속하자마자 가장 좌측엔 내 닉네임이, 그 옆으로 차례대로 접속자들의 닉네임이 표시되도록 하며, 인원 제한을 4명으로 둠<br>
- 현재 스톱워치 시작,정지,중지 버튼을 누를때만 채팅으로 상태를 전송하고있음.<br>
-> 닉네임이 표시된 곳 하단에 스톱워치도 실시간으로 공유가 되도록 할 것<br>
- 현재 방을 나가면 이전 기록들이 초기화됨<br>
-> 방을 나가도 내 기록같은 페이지에서 날짜별로 공부한 시간을 저장해두어 확인할 수 있도록함.<br>

2. 스터디그룹<br>
- 자유롭게 웹사이트를 이용하는 사용자들끼리 사용하는 중<br>
-> 친구맺기같은 기능으로 비밀방의 효율성을 더욱 활성화하면 좋을 것 같음<br>
<br>
<b><맡은 역할></b><br>
- 디자인<br>
- 메인, 게시판,방만들기,스터디그룹,서버방 레이아웃<br>
- 스톱워치 기능<br>
- 소켓 연동<br>
- 스터디그룹,방만들기,서버방 DB연결<br>
