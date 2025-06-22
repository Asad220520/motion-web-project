import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "../../../config/api";
import "./EditProfileForm.scss";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "../../../redux/features/profile/profileSlice";
const EditProfileForm = () => {
  const tokens = useSelector((state) => state.auth.tokens);
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: profile?.username || "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [bgFile, setBgFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", form.username);
    if (avatarFile) formData.append("avatar", avatarFile);
    if (bgFile) formData.append("bg_user", bgFile); // или другое поле, в зависимости от бэкенда

    try {
      const response = await axios.patch(
        `${API_BASE_URL}${
          profile.role === "Владелец" ? "/owner/" : "/user/edit/"
        }${profile.id}`, // предположим, корректный маршрут
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Профиль успешно обновлен!");
      dispatch(fetchUserProfile());

      console.log(response.data);
    } catch (error) {
      console.error(error);
      setMessage("Ошибка при обновлении профиля.");
    }
  };

  return (
    <div id="edit-profile-form">
      <div className="container">
        <h2>Редактировать профиль</h2>
        <div className="edit-profile-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Имя пользователя</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="file-upload">
                Аватар
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatarFile(e.target.files[0])}
                />
              </label>
            </div>

            <div>
              <label className="file-upload">
                Фоновое изображение
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBgFile(e.target.files[0])}
                />
              </label>
            </div>

            <button type="submit">Сохранить изменения</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
