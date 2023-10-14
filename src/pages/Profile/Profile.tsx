import React, { useRef, useState, useEffect, FC } from "react";
import {
  NavLink,
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "../../hooks/reduxHooks";
import {
  changeUserData,
  logOutUser,
  fetchUserData,
} from "../../services/reducers/user";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PStyle from "./Profile.module.css";
import FeedList from "../Order/OrderList";

interface User {
  name: string;
  password: string;
  email: string;
}
const ProfilePage: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { data } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const password = useRef<HTMLInputElement | null>(null);
  const name = useRef<HTMLInputElement | null>(null);
  const login = useRef<HTMLInputElement | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [user, setUser] = useState<User>({
    name: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    if (data.name && data.email) {
      dispatch(fetchUserData());
      setUser({
        name: data.name,
        password: "",
        email: data.email,
      });
    }
  }, [data.name, data.email, dispatch]);

  const handleEditIconClick = (fieldName: string) => {
    setIsEditing(true);
    setEditingField(fieldName);
  };

  const handleChangeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleChangeUserData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(changeUserData(user));
    setIsEditing(false);
    setEditingField(null);
  };

  const handleResetChanges = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.name && data.email)
      setUser({
        name: data.name,
        password: "",
        email: data.email,
      });
    setIsEditing(false);
    setEditingField(null);
  };

  const handleLogOutUser = async () => {
    dispatch(logOutUser());
    history.push("/");
  };

  let info = "В этом разделе вы можете изменить свои персональные данные";
  if (location.pathname.includes("profile/orders")) {
    info = "В этом разделе вы можете просмотреть свою историю заказов";
  }

  return (
    <div className={`${PStyle.container} `}>
      <div className={` ${PStyle.actions}  ml-5 mt-30`}>
        <nav className={`${PStyle.navigation}`}>
          <ul className={`${PStyle.list} `}>
            <li className={`${PStyle["list-item"]}`}>
              <NavLink
                exact
                to="/profile"
                className={`${PStyle.link} text text_type_main-medium text_color_inactive`}
                activeClassName={PStyle.link_active}
              >
                Профиль
              </NavLink>
            </li>
            <li className={`${PStyle["list-item"]}`}>
              <NavLink
                to="/profile/orders"
                className={`${PStyle.link} text text_type_main-medium text_color_inactive`}
                activeClassName={PStyle.link_active}
              >
                История заказов
              </NavLink>
            </li>
            <li className={`${PStyle["list-item"]}`}>
              <button
                className={`${PStyle.button} text text_type_main-medium text_color_inactive`}
                onClick={handleLogOutUser}
              >
                Выход
              </button>
            </li>
          </ul>
        </nav>
        <p className={`${PStyle.info} mt-20`}>{info}</p>
      </div>
      <div>
        <Switch>
          <Route path="/profile" exact>
            <form
              className={`${PStyle.form}  ml-5 mt-30`}
              onSubmit={handleChangeUserData}
              onReset={handleResetChanges}
            >
              <Input
                onChange={handleChangeData}
                value={user.name}
                name="name"
                ref={name}
                placeholder="Имя"
                extraClass="mb-6"
                icon={isEditing && editingField === "name" ? undefined : "EditIcon"}
                onIconClick={() => !isEditing && handleEditIconClick("name")}
                readOnly={!isEditing || editingField !== "name"}
              />

              <Input
                onChange={handleChangeData}
                value={user.email}
                placeholder="Логин"
                name="email"
                ref={login}
                extraClass="mb-6"
                icon={isEditing && editingField === "email" ? undefined : "EditIcon"}
                onIconClick={() => !isEditing && handleEditIconClick("email")}
                readOnly={!isEditing || editingField !== "email"}
              />

              <Input
                onChange={handleChangeData}
                value={user.password}
                name="password"
                ref={password}
                placeholder="Пароль"
                extraClass="mb-6"
                icon={
                  isEditing && editingField === "password" ? undefined : "EditIcon"
                }
                onIconClick={() =>
                  !isEditing && handleEditIconClick("password")
                }
                readOnly={!isEditing || editingField !== "password"}
              />
              <div className={`${PStyle["button-container"]}`}>
                {isEditing && (
                  <>
                    <Button htmlType="reset" type="secondary">
                      Отмена
                    </Button>
                    <Button htmlType="submit">Cохранить</Button>
                  </>
                )}
              </div>
            </form>
          </Route>
          <Route path="/profile/orders" exact>
            <FeedList
              huge={PStyle.huge}
              isUser={true}
              listClass={`${PStyle.orderContainer} mt-10 `}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default ProfilePage;
