import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWindowSize } from "usehooks-ts";
import { useTranslation } from "react-i18next";
import { images } from "../../constants";
import sidebarNav from "../../config/sidebarNav";
import SidebarContext from "../../store/sidebarContext";
import LoginContext from "../../store/loginContext";
import { Icon } from "@iconify/react";
import classes from "./Sidebar.module.scss";
import { useSelector } from "react-redux";

function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const userRole = useSelector((state:any) => state.role.role);
    console.log(userRole,'role')
    const { width } = useWindowSize();
    const location = useLocation();
    const sidebarCtx = useContext(SidebarContext);
    const loginCtx = useContext(LoginContext);
    const { t } = useTranslation();

    function openSidebarHandler() {
        //for width>768(tablet size) if sidebar was open in width<768 was opened too.
        //just in case of tablet size and smaller then, sidebar__open can added.
        if (width <= 768) document.body.classList.toggle("sidebar__open");
    }

    useEffect(() => {
        const curPath = window.location.pathname.split("/")[1];
        const activeItem = sidebarNav.findIndex(
            (item) => item.section === curPath
        );

        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return (
        <div
            className={`${classes.sidebar} ${
                !sidebarCtx.isOpen && classes.sidebar_close
            }`}
        >
            <div className={classes.sidebar__logo}>
                <img alt='Lady Gym' src={images.logo} />
            </div>
            <div className={classes.sidebar__menu}>
                <Link
                    to={"/"}
                    // key={`nav-${index}`}
                    className={`${classes.sidebar__menu__item} ${
                        activeIndex === 1 && classes.active
                    }`}
                    onClick={openSidebarHandler}
                >
                    <div className={classes.sidebar__menu__item__icon}>
                        <Icon icon={"solar:document-text-outline"} />
                    </div>
                    <div className={classes.sidebar__menu__item__txt}>
                    Клиенты
                    </div>
                </Link>
                {userRole != "TOP"  &&(
                  <>
                  <Link
                    to={"/customers"}
                    // key={`nav-${index}`}
                    className={`${classes.sidebar__menu__item} ${
                        activeIndex === 2 && classes.active
                    }`}
                    onClick={openSidebarHandler}
                >
                    <div className={classes.sidebar__menu__item__icon}>
                        <Icon icon={"ph:users-bold"} />
                    </div>
                    <div className={classes.sidebar__menu__item__txt}>
                    Персонал
                    </div>
                </Link>
                <Link
                    to={"/CountVisit"}
                    // key={`nav-${index}`}
                    className={`${classes.sidebar__menu__item} ${
                        activeIndex === 3 && classes.active
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
                  </>
                )}
                
                <Link
                    to={"/task"}
                    
                    // key={`nav-${index}`}
                    className={`${classes.sidebar__menu__item} ${
                        activeIndex === 4 && classes.active
                    }`}
                    onClick={openSidebarHandler}
                >
                    <div className={classes.sidebar__menu__item__icon}>
                        <Icon icon={"tdesign:task"} />
                    </div>
                    <div className={classes.sidebar__menu__item__txt}>
                    Задания
                    </div>
                </Link>
                {userRole == "TOP" && (
                  <>
                   <Link
                    to={"/"}
                    // key={`nav-${index}`}
                    className={`${classes.sidebar__menu__item} ${
                        activeIndex === 5 && classes.active
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
                    // key={`nav-${index}`}
                    className={`${classes.sidebar__menu__item} ${
                        activeIndex === 6 && classes.active
                    }`}
                    onClick={openSidebarHandler}
                >
                    <div className={classes.sidebar__menu__item__icon}>
                        <Icon icon={"carbon:analytics"} />
                    </div>
                    <div className={classes.sidebar__menu__item__txt}>
                    Аналитика
                    </div>
                </Link>
                  </>
                )}
               {userRole == "ADMIN" && (
                  <Link
                  to={"/finance-plan"}
                  // key={`nav-${index}`}
                  className={`${classes.sidebar__menu__item} ${
                      activeIndex === 4 && classes.active
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
                    // key={`nav-${index}`}
                    className={`${classes.sidebar__menu__item} ${
                        activeIndex === 8 && classes.active
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
                    to={"/"}
                    // key={`nav-${index}`}
                    className={`${classes.sidebar__menu__item} ${
                        activeIndex === 9 && classes.active
                    }`}
                    onClick={openSidebarHandler}
                >
                    <div className={classes.sidebar__menu__item__icon}>
                        <Icon icon={"carbon:analytics"} />
                    </div>
                    <div className={classes.sidebar__menu__item__txt}>
                    Уведомления 
о заморозке
                    </div>
                </Link>
                  </>
                )}
               

              
            </div>

            {/* <div className={[classes.sidebar__menu, classes.logout].join("")}>
        <Link
          to="/login"
          className={classes.sidebar__menu__item}
          onClick={logoutHandler}
        >
          <div className={classes.sidebar__menu__item__icon}>
            <Icon icon="tabler:logout" />
          </div>
          <div className={classes.sidebar__menu__item__txt}>{t("logout")}</div>
        </Link>
      </div> */}
        </div>
    );
}

export default Sidebar;
