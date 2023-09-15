import { Link, useLocation } from "react-router-dom";
import { images } from "../../../../constants";
import classes from "./Profile.module.scss";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { useWindowSize } from "usehooks-ts";
import { useCallback, useContext, useEffect, useState } from "react";
import LoginContext from "../../../../store/loginContext";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/slices/authSlice";
import { storageReadItem } from "../../../../utils/asyncStorage";
import axios from "axios";
import { TOKEN_KEY } from "../../../../constants/constants";
import { instance } from "../../../../config/api";

function Profile() {
  const tokenStorage = useSelector((state: any) => state?.token);
  const user=useSelector((state: any) => state?.auth);
  const userRole = useSelector((state:any) => state.role.role);
  const [userName, setUserName] = useState('');
  const [lastName, setLastName] = useState('');

const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIwNzA2ODgyMjcxIiwicm9sZXMiOlsiQURNSU4iXSwiZXhwIjoxNjk0NzUzNDkwLCJpYXQiOjE2OTQ1ODA2OTB9.V8E5rGIjoD5kkzCYaoV5qJhs_K5yZNB0qc0ehmhf3fFNoc4SfIIDnay0F9h1GIILJYqS6ITas0WMnXOpA2kdbA"


    console.log(user,'role')
    const dispatch = useDispatch()
    // const navigation = useNavigation()
    const handleLogout = useCallback(async () => {
        dispatch(logout())
    openSidebarHandler();
    }, []);

  useEffect(() => {
    if(!tokenStorage){
      try {
        const response=instance.get('/gym/user/info',{
          headers:{
            Authorization:`Bearer ${tokenStorage}`
          }

        })
        console.log(response)
      } catch (error) {
        
      }
    }
  })

      
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
        <span className={classes.profile__role}>{userRole}</span>
      </div>
      <div className={[classes.profile, classes.logout].join("")}>
        <Link
          to="/login"
          className={classes.sidebar__menu__item}
          onClick={handleLogout}
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
