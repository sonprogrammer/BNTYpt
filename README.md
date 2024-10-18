# BNTY (Be Next To You)
 communication between member and trainer

## Persona
![스크린샷 2024-10-18 14 42 44](https://github.com/user-attachments/assets/5b5a981d-00c5-4290-928f-92ae454d2bdc)



i've heard some news in koera about that kakao sold personal information to Ali. so even if that is really small things, it's matter for someone. that's why i developped it.<br>
Actually i'm trainer right now, and i or members was inconvenience about something. that's why i developped it.<br> 
that thing is...
1. member can check how many classes are left. 
2. what exercise did I do today
3. what are going to do next class
<br>etc...


STACK
1. typescript
2. react
3. node
4. mongoDB
5. styled-component
6. tailwind
7. javascript

## major functions

| pages |  function  |
|----------------|-------------|
| login & signup  |  choose role      |
| main     | 1.trainer and member will be connected as soon as member scan trainer's QRcode <br> 2. Trainers can register the number of classes for their members  <br> 3. members can check the number of their remaining classes     |
| bodyCheck     | anyone can post photo of their body(only one who are logged in can see their photos )  |
| calendar     |    users can check and record their workouts and diet.   |
| chatting | users can contact with their members or trainer |
| note | only trainers can post the details of the classes for their members. and Members can only see about what they had workout in class |


## Major color 
1. gray
2. dark red
3. dark blue


## Pages




## troubleshooting  🔫
1. The Outlet was not applied in the LayoutPage, so the child components are not rendered.
2. A conflict occurred during npm's dependency resolution process -> use the --legacy-peer-deps flag.
3. when navigating from landing page to main page after logging in, the state is empty. i used `window.location.href='/browse` , but this caused the browser to refresh. so recoil state is reset. to fix it i used `useNavigate` from react router dom. 
4.images were stored in local when i post some photos. so i used Cloudinary



## Impressions
as i worked on everything by myself, like function, design planning. actually, i planned roughly, so i keep changing my plans because of the ambitous which led to changes function and design, this cause me to miss deadline. so i realized again that initial plan is important. 