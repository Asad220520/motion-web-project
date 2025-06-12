import React, { useEffect } from "react";
import "./ProfileHeader.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../redux/features/profile/profileSlice";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";
import Logo from "@/components/Logo";

const ProfileHeader = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const tokens = useSelector((state) => state.auth.tokens);

  useEffect(() => {
    if (tokens?.access) {
      dispatch(fetchUserProfile());
    }
  }, [tokens, dispatch]);

  return (
    <header className="profile-header">
      <div className="container">
        <Logo className="header__logo" />
        <div className="profile-header__left"></div>
        <div className="profile-header__right">
          {profile ? (
            <div className="profile-header__user">
              <img src={profile.avatar || defaultAvatar} alt="avatar" />
              <span>{profile.username}</span>
            </div>
          ) : (
            <span>Загрузка...</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
