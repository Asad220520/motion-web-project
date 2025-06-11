import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../redux/features/profile/profileSlice";
import defaultAvatar from "../../../assets/images/defaultAvatar.png";

const ProfileMain = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const tokens = useSelector((state) => state.auth.tokens);

  useEffect(() => {
    if (tokens?.access) {
      dispatch(fetchUserProfile());
    }
  }, [tokens, dispatch]);

  return (
    <div>
      {profile ? (
        <>
          <img
            src={profile.avatar || defaultAvatar}
            alt="avatar"
            style={{ width: 150, height: 150, borderRadius: "50%" }}
          />
          <p>Имя: {profile.username}</p>
          <h3>{profile.role || "Студент"}</h3>
        </>
      ) : (
        <p>Загрузка...</p>
      )}
      <h2>Редактировать</h2>
    </div>
  );
};

export default ProfileMain;
