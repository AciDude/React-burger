import React, { useContext, useState } from "react";
import style from "./app-header.module.css";
import {
  Logo,
  ProfileIcon,
  BurgerIcon,
  ListIcon,
  MenuIcon,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useMatch, Link } from "react-router-dom";
import { useSelector } from "../../hooks";
import { selectUserName } from "../../services/selectors";
import { ScreenContext } from "../../services/context/screen-context";

const AppHeader = React.memo(function () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const screenOptions = useContext(ScreenContext);
  const name = useSelector(selectUserName);
  const constructorMatchPath = useMatch({
    path: "/",
    end: true,
  });
  const ordersMatchPath = useMatch({
    path: "/feed",
    end: false,
  });
  const profileMatchPath = useMatch({
    path: "/profile",
    end: false,
  });

  const setType = (obj: object | null): "primary" | "secondary" =>
    obj ? "primary" : "secondary";

  const textTypeButton =
    screenOptions.width > 991
      ? "text_type_main-default"
      : "text_type_main-small";

  const paddingsArray =
    screenOptions.width > 991
      ? ["pl-5", "pr-5", "pb-4", "pt-4"]
      : ["pl-2", "pr-2", "pb-3", "pt-3"];

  const classesArray = ["text", ...paddingsArray, textTypeButton, style.button];
  const classes = classesArray.join(" ");

  const setActive = ({ isActive }: { isActive: boolean }): string | undefined =>
    isActive
      ? `${classes} ${style.active}`
      : `${classes} ${style.inactive} text_color_inactive`;

  const clickMenu = () => setIsMenuOpen(!isMenuOpen);
  const clickLink = () => setIsMenuOpen(false);

  return (
    <header className={`${style.header} pt-4 pb-4`}>
      <div className={style.container}>
        <div className={`${style.menu} ${isMenuOpen ? style.open : ""}`}>
          <p className={`${style.menu__title} text_type_main-medium ml-2`}>
            Меню
          </p>
          <nav className={style.links}>
            <ul className={style.list}>
              <li onClick={clickLink}>
                <NavLink to="/" className={setActive} end={true}>
                  <BurgerIcon type={setType(constructorMatchPath)} />
                  <span className="ml-2">Конструктор</span>
                </NavLink>
              </li>
              <li onClick={clickLink}>
                <NavLink to="/feed" className={setActive}>
                  <ListIcon type={setType(ordersMatchPath)} />
                  <span className="ml-2">Лента заказов</span>
                </NavLink>
              </li>
              <li className={style.profile}>
                {name && screenOptions.width < 991 ? (
                  <button className={setActive({
                    isActive: Boolean(profileMatchPath),
                  })}>
                    <ProfileIcon type={setType(profileMatchPath)} />
                    <span className="ml-2">{name || "Личный кабинет"}</span>
                  </button>
                ) : (
                  <Link
                    to="/profile/orders"
                    className={setActive({
                      isActive: Boolean(profileMatchPath),
                    })}
                  >
                    <ProfileIcon type={setType(profileMatchPath)} />
                    <span className="ml-2">{name || "Личный кабинет"}</span>
                  </Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <div className={style.logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <button className={style.menu__button} onClick={clickMenu}>
          {isMenuOpen ? (
            <CloseIcon type="primary" />
          ) : (
            <MenuIcon type="primary" />
          )}
        </button>
      </div>
    </header>
  );
});

export default AppHeader;
