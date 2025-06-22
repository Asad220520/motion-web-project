import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./CourseCreateForm.scss";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CourseCreateForm = () => {
  const tokens = useSelector((state) => state.auth.tokens);
  const profile = useSelector((state) => state.profile.profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const [form, setForm] = useState({
    title: "",
    brief_description: "",
    description: "",
    price: 0,
    status_course: "Бесплатно",
    category: 1,
    progress: "Прогресс",
    image: null,
    time_image: null,
    lesson_image: null,
    progress_image: null,
  });

  const handleFileChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (profile.role !== "Владелец") {
      alert("Только владелец может создавать курсы!");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("brief_description", form.brief_description);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("status_course", form.status_course);
    formData.append("category", Number(form.category));
    formData.append("owner", profile.id);
    formData.append("progress", form.progress);

    // Добавляем файлы только если они есть
    if (form.image) formData.append("image", form.image);
    if (form.time_image) formData.append("time_image", form.time_image);
    if (form.lesson_image) formData.append("lesson_image", form.lesson_image);
    if (form.progress_image)
      formData.append("progress_image", form.progress_image);

    try {
      const response = await axios.post(
        "http://13.60.235.183/courses/create/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokens.access}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
        toast.success("Курс добавлен!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
      console.log("Создан курс:", response.data);
    } catch (error) {
      console.error(
        "Ошибка при создании курса:",
        error.response?.data || error.message
      );
      alert("Ошибка при создании курса");
    }
  };

  return (
    <div id="course-form">
      <div className="container">
        <h2>Создание курса</h2>
        <form onSubmit={handleSubmit} className="course-form">
          <label>
            Название курса:
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Краткое описание:
            <input
              type="text"
              name="brief_description"
              value={form.brief_description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Полное описание:
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Цена:
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
            />
          </label>

          <label>
            Статус курса:
            <select
              name="status_course"
              value={form.status_course}
              onChange={handleChange}
            >
              <option value="Бесплатно">Бесплатно</option>
              <option value="Платно">Платно</option>
            </select>
          </label>

          <label>
            Категория (ID):
            <input
              type="number"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </label>

          <label>
            Прогресс:
            <input
              type="text"
              name="progress"
              value={form.progress}
              onChange={handleChange}
            />
          </label>

          <label className="file-upload">
            Изображение курса:
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
            />
          </label>

          <label className="file-upload">
            Иконка времени:
            <input
              type="file"
              name="time_image"
              onChange={handleFileChange}
              required
            />
          </label>

          <label className="file-upload">
            Иконка уроков:
            <input
              type="file"
              name="lesson_image"
              onChange={handleFileChange}
              required
            />
          </label>

          <label className="file-upload">
            Иконка прогресса:
            <input
              type="file"
              name="progress_image"
              onChange={handleFileChange}
              required
            />
          </label>

          <button type="submit">Создать курс</button>
        </form>
      </div>
      <ToastContainer/>
      <NavLink to="/профиль/добавить-урок">Создать урок</NavLink>
    </div>
  );
};

export default CourseCreateForm;
