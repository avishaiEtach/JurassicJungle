import { HomePage } from "./pages/HomePage/HomePage";
import { FaHome } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { Dinosaurs } from "./pages/Dinosaurs/Dinosaurs";
import { Articles } from "./pages/Articles/Articles";
import { ArticlePage } from "./pages/ArticlePage/ArticlePage";
import { ContactUs } from "./pages/ContactUs/ContactUs";
import { UserPage } from "./pages/UserPage/UserPage";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Users } from "./pages/Users/Users";
import { Inbox } from "./pages/Inbox/Inbox";
import { MailPage } from "./pages/MailPage/MailPage";
import { MdMail } from "react-icons/md";

export const routesPath = {
  home: "/",
  aboutUs: "/about-us",
  dinosaurs: "/dinosaurs",
  blog: "/articles",
  contact: "/contact-us",
  articlePage: "/articles/article-page/:id",
  account: "/account/:id",
  dashboard: "/admin/dashboard",
  inbox: "/admin/inbox",
  mailPage: "/admin/inbox/mail-page/:id",
  users: "/admin/users",
  adminEditDinosaurs: "/admin/edit-dinosaurs",
  adminEditArticles: "/admin/edit-articles",
};

export const adminRoutes: Routes[] = [
  {
    path: routesPath.dashboard,
    component: Dashboard,
    label: "Dashboard",
    showInNavBar: true,
    icon: <FaHome />,
    permissions: 4,
  },
  {
    path: routesPath.inbox,
    component: Inbox,
    label: "Inbox",
    showInNavBar: true,
    icon: <MdMail />,
    permissions: 4,
  },
  {
    path: routesPath.mailPage,
    component: MailPage,
    label: "Mail Page",
    showInNavBar: false,
    icon: <HiUserGroup />,
    permissions: 4,
  },
  {
    path: routesPath.users,
    component: Users,
    label: "Users",
    showInNavBar: true,
    icon: <HiUserGroup />,
    permissions: 4,
  },
];

export const routes: Routes[] = [
  {
    path: routesPath.home,
    component: HomePage,
    label: "Home",
    showInNavBar: true,
    icon: <FaHome />,
    permissions: 0,
  },
  {
    path: routesPath.aboutUs,
    component: AboutUs,
    label: "About Us",
    showInNavBar: true,
    icon: <HiUserGroup />,
    permissions: 0,
  },
  {
    path: routesPath.dinosaurs,
    component: Dinosaurs,
    label: "Dinosaurs",
    showInNavBar: true,
    icon: <></>,
    permissions: 0,
  },
  {
    path: routesPath.blog,
    component: Articles,
    label: "Articles",
    showInNavBar: true,
    icon: <></>,
    permissions: 0,
  },
  {
    path: routesPath.contact,
    component: ContactUs,
    label: "Contact Us",
    showInNavBar: true,
    icon: <></>,
    permissions: 0,
  },
  {
    path: routesPath.articlePage,
    component: ArticlePage,
    label: "",
    showInNavBar: false,
    icon: <></>,
    permissions: 0,
  },
  {
    path: routesPath.account,
    component: UserPage,
    label: "",
    showInNavBar: false,
    icon: <></>,
    permissions: 1,
  },
];

export function replaceRouteParam(
  routePattern: string,
  replacement: string
): string {
  // Use a regular expression to replace the :id placeholder with the provided string
  const replacedRoute = routePattern.replace(/:id/g, replacement);
  return replacedRoute;
}
