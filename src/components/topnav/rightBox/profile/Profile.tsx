import { Link, useLocation } from "react-router-dom";
import { images } from "../../../../constants";
import classes from "./Profile.module.scss";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { useWindowSize } from "usehooks-ts";
import { useContext } from "react";
import LoginContext from "../../../../store/loginContext";

function Profile() {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const location = useLocation();

  const loginCtx = useContext(LoginContext);
  function openSidebarHandler() {
    //for width>768(tablet size) if sidebar was open in width<768 was opened too.
    //just in case of tablet size and smaller then, sidebar__open can added.
    if (width <= 768) document.body.classList.toggle("sidebar__open");
  }
  function logoutHandler() {
    openSidebarHandler();
    loginCtx.toggleLogin();
  }
  return (
    <div className={classes.profile}>
      <div className={classes.profile__avatar}>
        <img src={images.avt} alt="avatar" />
      </div>
      <div className={classes.profile__info}>
        <p className={classes.profile__userName}>{t("Omurbek Mamytbekov")}</p>
        <span className={classes.profile__role}>{t("admin")}</span>
      </div>
      <div className={[classes.profile, classes.logout].join("")}>
        <Link
          to="/login"
          className={classes.sidebar__menu__item}
          onClick={logoutHandler}
        >
          <div className={classes.sidebar__menu__item__icon}>
            <Icon icon="tabler:logout" width="24" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
