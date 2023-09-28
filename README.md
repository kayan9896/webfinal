Arghavan Ayoughi - branch iteration1  client part <br />
Meixuan Chen  - branch MC    user part <br />
Loris - branch kayan9896&test2    server part <br />
We merge all into the main branch.<br />
  <br/>
  https://kayan9896client.onrender.com/  <br/>
 Demo Video <br/>
 https://www.youtube.com/watch?v=C6MF630zVac&ab_channel=MeixuanChen
  <br/>
After iteration3, we have finished the web application. 
We added a payment functions in the webset. Arghavan Ayoughi contributed on this function.<br />
<img width="694" alt="comments" src="https://user-images.githubusercontent.com/97938339/206839387-4bd8b6c2-9c01-4200-9a83-41df197f953a.PNG">
<img width="694" alt="comments" src="https://user-images.githubusercontent.com/97938339/206839400-54b04742-a9b4-4dda-b542-fe63bb060186.PNG">
<img width="694" alt="comments" src="https://user-images.githubusercontent.com/97938339/206839476-98cb5cc8-15bd-4f0a-9518-bfcdaaebda4e.PNG">
 <br/>
We also reviewed all web pages and fixed the size to display games so that it can adapt to different devices or different sizes of the browser.<br/>
Loris tested and made some changes.<br/>
<img width="488" alt="sm" src="https://user-images.githubusercontent.com/90473306/206873695-3ee7f80e-f0f8-401f-9f62-87d0f45aad95.png">
<img width="938" alt="wide" src="https://user-images.githubusercontent.com/90473306/206873698-ce8678cd-80f6-47b1-8d90-5b4e3a41ba85.png">
![4D1B0E9B-EB70-4131-8D9B-AB048D9B20E1](https://user-images.githubusercontent.com/90473306/206873822-94e23d96-a297-4f47-8200-65f4b61cf1ef.jpeg)
<br/>

After the iteration2, we have finished most functions of the website.
Arghavan Ayoughi made most contribution to the client part, including home page, game detail page, comments section inside the detail page and so on.
Here is the home page of the client. <br />
<img width="911" alt="home" src="https://user-images.githubusercontent.com/90473306/205109991-c6055b6c-e15b-4e34-b706-98b38c1b1b3f.png">
<br />
It has a header and and can display games we fetch from the steam api.

When we click the game, we can see the game information page. <br />
<img width="901" alt="details" src="https://user-images.githubusercontent.com/90473306/205110783-26889808-3e38-4a2a-aab5-c26baa950a12.png">
<br />
At the end of the game information, we allow log-in users to add, edit and delete their comments. <br />
<img width="694" alt="comments" src="https://user-images.githubusercontent.com/90473306/205112007-7e9fb3e8-4ff7-499b-9920-2a177a19b0e0.png">

And we also have a search bar, a mini game page with the detail page fetching data from our database in the client.<be />
Loris contributed to these functions. <br />
<img width="859" alt="serchbar" src="https://user-images.githubusercontent.com/90473306/205113950-5c08f765-8bff-4858-b421-28e52ade2a1b.png">
<img width="960" alt="mini" src="https://user-images.githubusercontent.com/90473306/205113995-a07eb9c1-0aab-4d90-b82f-df5f461ada6a.png">
<img width="556" alt="minidetail" src="https://user-images.githubusercontent.com/90473306/205114042-f46fc6a7-77b2-410b-ae02-7482d55d7dcf.png">
<br />

Meixuan Chen completed the log in and user profile, including the comments user made for the games and link direct them to the game. <br />
New users will be registered to user database. And all users are allowed to change their username. After users change their username, their name in comments will also be updated. <br />
<img width="546" alt="login" src="https://user-images.githubusercontent.com/90473306/205114260-e781c412-f021-4c71-8975-9c9e3771c472.png">
<img width="468" alt="profile" src="https://user-images.githubusercontent.com/97938339/206953030-a737f8ff-4377-4a06-bbce-3fcfd7019d95.PNG">
<br />

And we also have a server part.<br />
Loris set up the server, implemented the CRUD functions for mongodb and connected the server with React. <br />
<img width="307" alt="server" src="https://user-images.githubusercontent.com/90473306/205114805-7aac6b2a-5f7e-4a22-9684-73c67eceeb48.png">
<img width="500" alt="listall" src="https://user-images.githubusercontent.com/90473306/205114880-342a09ce-39fa-469f-9669-1b4772ccbb77.png">
<br />

Arghavan Ayoughi handled the data from steam api and user comments for the server. <br />
<img width="514" alt="getapp" src="https://user-images.githubusercontent.com/90473306/205115516-2e8fbd78-d123-4798-993d-2a4e1a4936c3.png">
<br />

Finally, we deployed the server and the client separately on render. <br />
Loris is responsible for the deployment. <br />
<img width="932" alt="deploy" src="https://user-images.githubusercontent.com/90473306/205115966-baeab604-afdb-41d1-b83d-a435d634f7a6.png">
