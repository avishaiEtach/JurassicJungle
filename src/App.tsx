import { AppFooter } from "./components/AppFooter/AppFooter";
import { AppHeader } from "./components/AppHeader/AppHeader";
import { Route, Routes, useLocation } from "react-router-dom";
import { adminRoutes, routes } from "./routes";
import _ from "lodash";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { userServices } from "./services/user.services";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAvatarLoader, setUser } from "./store/users.actions";
import Cookies from "js-cookie";
import { RootState } from "./store/store";
import { Page404 } from "./pages/404/Page404";
import { ResizeObserverFix } from "./components/ResizeObserver/ResizeObserver";
import { AdminHeader } from "./components/AdminHeader/AdminHeader";

export function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { user } = useSelector((state: RootState) => state.usersModel);
  const checkLoginStatus = async () => {
    try {
      const cookie = Cookies.get(
        process.env.REACT_APP_SESSION_COOKIE_NAME as string
      );
      if (cookie) {
        const res: User = await userServices.getLoggedInUser();
        if (res) {
          dispatch(setUser(res));
          dispatch(setUserAvatarLoader(false));
        }
      } else {
        dispatch(setUserAvatarLoader(false));
      }
    } catch (err) {
      dispatch(setUserAvatarLoader(false));
      return;
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <>
      <ScrollToTop />
      <ResizeObserverFix />
      {!pathname.includes("admin") && (
        <div className="main-container app">
          <AppHeader />
          <main>
            <Routes>
              {(!user
                ? routes.filter((route) => route.permissions === 0)
                : routes
              ).map((route) => (
                <Route
                  key={route.path}
                  Component={route.component}
                  path={route.path}
                />
              ))}
              <Route path="*" Component={Page404} />
            </Routes>
          </main>
          <AppFooter />
        </div>
      )}
      {pathname.includes("admin") && (
        <>
          <AdminHeader>
            <Routes>
              {user?.permissions === 4 &&
                adminRoutes.map((route) => (
                  <Route path={route.path} Component={route.component} />
                ))}
              <Route path="*" Component={Page404} />
            </Routes>
          </AdminHeader>
        </>
      )}
    </>
  );
}
