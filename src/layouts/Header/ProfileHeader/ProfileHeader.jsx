import React, { useEffect } from "react";
import "./ProfileHeader.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../redux/features/profile/profileSlice";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";
import Logo from "@/components/Logo";
import { IoNotificationsOutline } from "react-icons/io5";
import BurgerButton from "../../../components/BurgerButton/BurgerButton";

const ProfileHeader = ({ onBurgerClick }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const tokens = useSelector((state) => state.auth.tokens);

  useEffect(() => {
    if (tokens?.access) {
      dispatch(fetchUserProfile());
    }
  }, [tokens, dispatch]);

  return (
    <div className="profile">
      <header className="profile-header">
        <div className="container">
          {/* Переместим правую часть в начало для мобильной версии */}
          <div className="profile-header__right profile-header__right--mobile">
            <BurgerButton
              onClick={onBurgerClick}
              className="profile-header__button"
            />
          </div>

          <div className="profile-header__left">
            <Logo className="header__logo" />
          </div>

          <div className="profile-header__right profile-header__right--desktop">
            <div className="profile-header__notif">
              <IoNotificationsOutline />
            </div>
            {profile ? (
              <div className="profile-header__user">
                <img src={profile.avatar || defaultAvatar} alt="avatar" />
              </div>
            ) : (
              <span>Загрузка...</span>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default ProfileHeader;
