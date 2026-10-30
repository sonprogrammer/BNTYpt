# BNTY (Be Next To You) 
 communication between member and trainer. <br /><br />
 

 ### [Go to BNTY](https://bnty.netlify.app/)
 ⚠️ 2026년 10월 기준, Render 무료 사용량 소진으로 백엔드 서버가 일시 중단(Suspended)되어 일부 기능이 정상적으로 동작하지 않을 수 있습니다. ⚠️

<br /><br />

<details>
<summary>🎬 주요 기능 시연 보기</summary>

### 1. QR로 트레이너 연결

https://github.com/user-attachments/assets/bd6d1660-c649-4f09-861b-f2c78b5eb899

### 2. 트레이너가 PT 횟수 추가

https://github.com/user-attachments/assets/9b0ea4e2-1c03-42c9-8b45-4052fb8e76e5

### 3. 회원 QR 체크인 및 PT 1회 차감

https://github.com/user-attachments/assets/3d7ff0af-ae7e-49b0-bd48-8fffc5614b0b

</details>

-----

 

## Persona
![스크린샷 2024-10-18 14 42 44](https://github.com/user-attachments/assets/5b5a981d-00c5-4290-928f-92ae454d2bdc)


i've heard news a few times about companies selling their member information to other companies. so even if that is really small things, it's matter for someone. that's why i developped it.<br>
Actually i study and work part time as a trainer now, and i or members was inconvenience about something. so i want to solve these things. that's why i developped it.<br> 


## 🏗️ System Architecture & Flow
<img width="1616" height="1104" alt="Bntyflow" src="https://github.com/user-attachments/assets/b8c97a15-0567-442f-8a75-a0d765a963b9" />



## STACK
1. typescript
2. react
3. node
4. mongoDB
5. styled-component
6. tailwind
7. javascript
8. recoil

## major functions
| pages |  function  |
|----------------|-------------|
| login & signup  |  kakao Login or regular Login, select a role      |
| main     | 1.trainer and member will be connected as soon as member scan trainer's QRcode <br> 2. Trainers can register the number of classes for their members  <br> 3. members can check the number of their remaining classes     |
| bodyCheck     | anyone can post photo of their body(only one who are logged in can see their photos )  |
| calendar     |    users can check and record their workouts and diet.   |
| chatting | users can contact with their members or trainer |
| note | only trainers can post the details of the classes for their members. and Members can only see about what they had workout in class |


## Update
### ✨ Page
- MainPage(QR Code)
   - improved QR code performance and stability for faster scanning and connection between trainers and members.
- BodyCheckPage
  - posts are now sorted by latest.
  - add delete functionality.
- ChatPage
  - Messages are now sorted by latest.
  - add read/unread indicators for better comunication.
  - image sending feature added.
  - fixed several bugs for a smoother chatting experience.
- NotePage
  - trainers can now manage notes per member(view, edit, delete).
  - members can expand and view detailed workout records.
### 💥 etc
- Overall UI/UX enhancements
  - add skeleton components with React.lazy() and Suspense.
  - add loading bars so each component now has a proper loading fallback.
- PWA integration
  - usable like a native mobile app with a splash screen for an app like.
  - improved responsive design across various screen sizes.
- Notification
  - rebuilt alert and notification popups 



## troubleshooting  🔫
1. The Outlet was not applied in the LayoutPage, so the child components are not rendered.
2. when navigating from landing page to main page after logging in, the state is empty. i used `window.location.href='/browse` , but this caused the browser to refresh. so recoil state is reset. to fix it i used `useNavigate` from react router dom. 
4.images were stored in local when i post some photos. so i used Cloudinary



## Reflection
as i worked on everything by myself, like function, design planning. actually, i planned roughly, so i keep changing my plans because of the ambitous which led to changes function and design, this cause me to miss deadline. so i realized again that initial plan is important. 
