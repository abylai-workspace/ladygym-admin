import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
// import { useTranslation } from "react-i18next";
// import { images } from "../../constants";
import { links } from "../../config/sidebarNav";
import SidebarContext from "../../store/sidebarContext";
import { Icon } from "@iconify/react";
import classes from "./Sidebar.module.scss";
import { useSelector } from "react-redux";

function Sidebar() {
  const [activeLink, setActiveLink] = useState("");
  // const userRole = useSelector((state: any) => state.role.role);
  // const user =  localStorage.getItem("user");
  // const userRole = JSON.parse(user || "")["role"];
  const userRole = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "")?.role
    : null;
  const { width } = useWindowSize();
  const location = useLocation();
  const sidebarCtx = useContext(SidebarContext);

  function openSidebarHandler() {
    if (width <= 768) document.body.classList.toggle("sidebar__open");
  }

  useEffect(() => {
    const curPath = window.location.pathname;
    // const activeItem = sidebarNav.filter((item) => item.link === curPath);
    setActiveLink(curPath);
  }, [location]);

  return (
    <div
      className={`${classes.sidebar} ${
        !sidebarCtx.isOpen && classes.sidebar_close
      }`}
    >
      <div className={classes.sidebar__logo}>
        <img
          alt="Lady Gym"
          src={require("../../assets/images/logo.svg").default}
        />
      </div>
      <div className={classes.sidebar__menu}>
        {links[userRole]?.map((item) => (
          <Link
            to={item.link}
            key={item.link}
            className={`${classes.sidebar__menu__item} ${
              activeLink === item.link && classes.active
            }`}
            onClick={openSidebarHandler}
          >
            <div className={classes.sidebar__menu__item__icon}>
              <Icon icon={item.icon} />
            </div>
            <div className={classes.sidebar__menu__item__txt}>{item.text}</div>
          </Link>
        ))}
      </div>

      {/* <div className={classes.sidebar__menu}>
        <Link
          to={"/"}
          className={`${classes.sidebar__menu__item} ${
            activeLink && classes.active
          }`}
          onClick={openSidebarHandler}
        >
          <div className={classes.sidebar__menu__item__icon}>
            <Icon icon={"solar:document-text-outline"} />
          </div>
          <div className={classes.sidebar__menu__item__txt}>Клиенты</div>
        </Link>

        {userRole === "TOP" && (
          <>
            <Link
              to={"/customers"}
              className={`${classes.sidebar__menu__item} ${
                activeLink && classes.active
              }`}
              onClick={openSidebarHandler}
            >
              <div className={classes.sidebar__menu__item__icon}>
                <Icon icon={"ph:users-bold"} />
              </div>
              <div className={classes.sidebar__menu__item__txt}>Персонал</div>
            </Link>
            <Link
              to={"/CountVisit"}
              className={`${classes.sidebar__menu__item} ${
                activeLink && classes.active
              }`}
              onClick={openSidebarHandler}
            >
              <div className={classes.sidebar__menu__item__icon}>
                <Icon icon={"icon-park-outline:ad-product"} />
              </div>
              <div className={classes.sidebar__menu__item__txt}>
                Учет посещаемости
              </div>
            </Link>
            <Link
              to={"/task"}
              className={`${classes.sidebar__menu__item} ${
                activeLink && classes.active
              }`}
              onClick={openSidebarHandler}
            >
              <div className={classes.sidebar__menu__item__icon}>
                <Icon icon={"tdesign:task"} />
              </div>
              <div className={classes.sidebar__menu__item__txt}>Задания</div>
            </Link>
          </>
        )}

        {userRole !== "TOP" && (
          <>
            <Link
              to={"/notifications"}
              className={`${classes.sidebar__menu__item} ${
                activeLink && classes.active
              }`}
              onClick={openSidebarHandler}
            >
              <div className={classes.sidebar__menu__item__icon}>
                <Icon icon={"tdesign:notification-filled"} />
              </div>
              <div className={classes.sidebar__menu__item__txt}>
                Уведомления
              </div>
            </Link>

            <Link
              to={"/analytics"}
              className={`${classes.sidebar__menu__item} ${
                activeLink && classes.active
              }`}
              onClick={openSidebarHandler}
            >
              <div className={classes.sidebar__menu__item__icon}>
                <Icon icon={"carbon:analytics"} />
              </div>
              <div className={classes.sidebar__menu__item__txt}>Аналитика</div>
            </Link>
          </>
        )}
        {userRole == "ADMIN" && (
          <Link
            to={"/finance-plan"}
            className={`${classes.sidebar__menu__item} ${
              activeLink && classes.active
            }`}
            onClick={openSidebarHandler}
          >
            <div className={classes.sidebar__menu__item__icon}>
              <Icon icon={"carbon:analytics"} />
            </div>
            <div className={classes.sidebar__menu__item__txt}>
              Финансовый план
            </div>
          </Link>
        )}

        {userRole !== "MANAGER" && (
          <>
            <Link
              to={"/WorkAnalizy"}
              className={`${classes.sidebar__menu__item} ${
                activeLink && classes.active
              }`}
              onClick={openSidebarHandler}
            >
              <div className={classes.sidebar__menu__item__icon}>
                <Icon icon={"carbon:analytics"} />
              </div>
              <div className={classes.sidebar__menu__item__txt}>
                Анализ работы
              </div>
            </Link>
            <Link
              to={"/NotificationFreeze"}
              className={`${classes.sidebar__menu__item} ${
                activeLink && classes.active
              }`}
              onClick={openSidebarHandler}
            >
              <div className={classes.sidebar__menu__item__icon}>
                <Icon icon={"carbon:analytics"} />
              </div>
              <div className={classes.sidebar__menu__item__txt}>
                Уведомления о заморозке
              </div>
            </Link>
            <Link
              to={"/analytics"}
              className={`${classes.sidebar__menu__item} ${
                activeLink && classes.active
              }`}
              onClick={openSidebarHandler}
            >
              <div className={classes.sidebar__menu__item__icon}>
                <Icon icon={"carbon:analytics"} />
              </div>
              <div className={classes.sidebar__menu__item__txt}>
                Анализ работы
              </div>
            </Link>
          </>
        )}
      </div> */}
    </div>
  );
}

export default Sidebar;
