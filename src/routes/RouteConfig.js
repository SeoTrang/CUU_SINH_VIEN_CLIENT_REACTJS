import HomeChat from "../pages/HomeChat/HomeChat";
import HomeGroup from "../pages/HomeGroup/HomeGroup";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Chat from "../pages/chat/Chat";
import FileViewer from "../pages/fileViewer/FileViewer";
import Friend from "../pages/friend/Friend";
import Group from "../pages/group/Group";
import Home from "../pages/home/Home";
import PostPage from "../pages/postPage/PostPage";

const RouteConfig = [
  {
    path: "/",
    component: Home,
    layout: true,
  },
  {
    path: "/post/:id",
    component: PostPage,
    layout: true,
  },
  {
    path: "/chat",
    component: HomeChat,
    layout: true,
  },
  {
    path: "/chat/:conversation",
    component: Chat,
    layout: true,
  },
  {
    path: "/groups",
    component: HomeGroup,
    layout: true,
  },
  {
    path: "/group/:conversation",
    component: Group,
    layout: true,
  },
  {
    path: "/file-view",
    component: FileViewer,
    layout: true,
  },
  {
    path: "/login",
    component: Login,
    layout: false,
  },
  {
    path: "/register",
    component: Register,
    layout: false,
  },
  {
    path: "/friend",
    component: Friend,
    layout: true,
  },
];

export default RouteConfig;
