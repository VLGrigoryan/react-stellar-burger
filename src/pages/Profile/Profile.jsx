import React, { useRef, useState, useEffect } from "react";
import { NavLink, useRouteMatch, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  changeUserData,
  logOutUser,
  fetchUserData
} from "../../services/reducers/user";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PStyle from "./Profile.module.css";

function ProfilePage() {
  const history = useHistory();
  const { data, isAuthCheck } = useSelector((store) => store.user);
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const password = useRef(null);
  const name = useRef(null);
  const login = useRef(null);

  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);

  useEffect(() => {
    if (!user.name && !user.email && data.name && data.email) {
      dispatch(fetchUserData());
      setUser({
        name: data.name,
        password: "",
        email: data.email,
      });
    }
  }, [data.name, data.email]);

  // useEffect(() => {
  //   if (!user.name && !user.email) {
  //     dispatch(fetchUserData());
  //   }
  // }, []);

  const handleEditIconClick = (fieldName) => {
    setIsEditing(true);
    setEditingField(fieldName);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUserData(user));
    setIsEditing(false);
    setEditingField(null);
  };

  const onReset = (e) => {
    e.preventDefault();
    setUser({
      name: data.name,
      password: "",
      email: data.email,
    });
    setIsEditing(false);
    setEditingField(null);
  };

  const onClick = async () => {
     dispatch(logOutUser());
        history.push("/");
  };

  return (
    isAuthCheck && (
      <div className={`${PStyle.container} ml-5 mt-30`}>
        <nav className={`${PStyle.actions} mr-15`}>
          <ul className={`${PStyle.list} `}>
            <li className={`${PStyle["list-item"]}`}>
              <NavLink
                exact
                to={url}
                className={`${PStyle.link} text text_type_main-medium text_color_inactive`}
                activeClassName={PStyle.link_active}
              >
                Профиль
              </NavLink>
            </li>
            <li className={`${PStyle["list-item"]}`}>
              <NavLink
                to={`${url}/orders`}
                className={`${PStyle.link} text text_type_main-medium text_color_inactive`}
                activeClassName={PStyle.link_active}
              >
                История заказов
              </NavLink>
            </li>
            <li className={`${PStyle["list-item"]}`}>
              <button
                className={`${PStyle.button} text text_type_main-medium text_color_inactive`}
                onClick={onClick}
              >
                Выход
              </button>
            </li>
          </ul>
          <p className={`${PStyle.info} mt-20`}>
            В&nbsp;этом разделе вы можете изменить&nbsp;свои персональные данные
          </p>
        </nav>

        <form className={`${PStyle.list} `} onSubmit={onSubmit} onReset={onReset}>
          <Input
            onChange={onChange}
            value={user.name}
            name="name"
            ref={name}
            placeholder="Имя"
            extraClass="mb-6"
            icon={
              isEditing && editingField === "name" ? null : "EditIcon"
            }
            onIconClick={() =>
              !isEditing && handleEditIconClick("name")
            }
            readOnly={!isEditing || editingField !== "name"}
          />

          <Input
            onChange={onChange}
            value={user.email}
            placeholder="Логин"
            name="email"
            ref={login}
            extraClass="mb-6"
            icon={
              isEditing && editingField === "email" ? null : "EditIcon"
            }
            onIconClick={() =>
              !isEditing && handleEditIconClick("email")
            }
            readOnly={!isEditing || editingField !== "email"}
          />

          <Input
            onChange={onChange}
            value={user.password}
            name="password"
            ref={password}
            placeholder="Пароль"
            extraClass="mb-6"
            icon={
              isEditing && editingField === "password" ? null : "EditIcon"
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
      </div>
    )
  );
}

export default ProfilePage;