import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./LessonCreateForm.scss";
import { NavLink } from "react-router-dom";

const LessonCreateForm = () => {
  const tokens = useSelector((state) => state.auth.tokens);

  const [form, setForm] = useState({
    title: "",
    goal: "",
    video_time: "00:00:00",
    status: "Открытый",
    views: 0,
    course: 1,
    video: null, // добавим поле для видео
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("goal", form.goal);
    formData.append("video_time", form.video_time);
    formData.append("status", form.status);
    formData.append("views", form.views);
    formData.append("course", form.course);
    formData.append("video", form.video); // обязательно

    try {
      const response = await axios.post(
        "http://13.60.235.183/lesson/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Урок успешно создан!");
      console.log("Создан урок:", response.data);
    } catch (error) {
      console.error(
        "Ошибка при создании урока:",
        error.response?.data || error.message
      );
      alert(
        "Ошибка при создании урока: " + JSON.stringify(error.response?.data)
      );
    }
  };

  return (
    <div id="lesson-form">
      <div className="container">
        <h2>Создание урока</h2>
        <form onSubmit={handleSubmit} className="lesson-form">
          <label>
            Название:
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Цель урока:
            <input
              type="text"
              name="goal"
              value={form.goal}
              onChange={handleChange}
            />
          </label>

          <label>
            Длительность видео (HH:MM:SS):
            <input
              type="text"
              name="video_time"
              value={form.video_time}
              onChange={handleChange}
              pattern="^\d{2}:\d{2}:\d{2}$"
              required
            />
          </label>

          <label>
            Статус:
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="Открытый">Открытый</option>
              <option value="Закрытый">Закрытый</option>
            </select>
          </label>

          <label>
            Просмотры:
            <input
              type="number"
              name="views"
              value={form.views}
              onChange={handleChange}
              min="0"
            />
          </label>

          <label>
            Курс (ID):
            <input
              type="number"
              name="course"
              value={form.course}
              onChange={handleChange}
              min="1"
            />
          </label>

          <label className="file-upload">
            Видео урок:
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleFileChange}
              required
            />
          </label>

          <button type="submit">Создать урок</button>
        </form>
          <NavLink   to="/profiles/course-create">Создать курс</NavLink>
      </div>
    </div>
  );
};

export default LessonCreateForm;
