import HomeChat from "../pages/HomeChat/HomeChat";
import HomeGroup from "../pages/HomeGroup/HomeGroup";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Chat from "../pages/chat/Chat";
import DetailPost from "../pages/detailPost/DetailPost";
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
    requiresAuth: true,
  },
  {
    path: "/post/:id",
    component: PostPage,
    layout: true,
    requiresAuth: true,
  },
  {
    path: "/chat",
    component: HomeChat,
    layout: true,
    requiresAuth: true,
  },
  {
    path: "/chat/:conversation",
    component: Chat,
    layout: true,
    requiresAuth: true,
  },
  {
    path: "/groups",
    component: HomeGroup,
    layout: true,
    requiresAuth: true,
  },
  {
    path: "/group/:conversation",
    component: Group,
    layout: true,
    requiresAuth: true,
  },
  {
    path: "/file-view",
    component: FileViewer,
    layout: true,
    requiresAuth: true,
    requiresAuth: true,
  },
  {
    path: "/login",
    component: Login,
    layout: false,
    requiresAuth: false,
  },
  {
    path: "/register",
    component: Register,
    layout: false,
    requiresAuth: false,
  },
  {
    path: "/friend",
    component: Friend,
    layout: true,
    requiresAuth: true,
  },
  {
    path: "/detail-post/:postId",
    component: DetailPost,
    layout: true,
    requiresAuth: true,
  }
];

export default RouteConfig;
