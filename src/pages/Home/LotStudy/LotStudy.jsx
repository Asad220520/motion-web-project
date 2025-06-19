import React, { useEffect, useState } from "react";
import "./LotStudy.scss";
import Button from "@/components/Button";
import studyBoy from "@/assets/images/studyBoy.png";
import { apiRequest } from "@/api/apiRequest";
import { Typewriter } from "react-simple-typewriter";

const LotStudy = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiRequest("/home/"); // ← используем твой apiRequest
        setData(res);
      } catch (err) {
        console.error("Ошибка при загрузке данных:", err);
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="lotStudy__loading">Загрузка...</div>;
  if (error) return <div className="lotStudy__error">{error}</div>;

  return (
    <div className="lotStudy">
      <div className="container">
        {data.map((item, idx) => (
          <div key={idx} className="lotStudy__inner">
            <div className="lotStudy__text">
              <h1>
                <Typewriter
                  words={[item.title]}
                  loop={1}
                  typeSpeed={150}
                  deleteSpeed={100}
                  delaySpeed={2500}
                />
              </h1>
              <p>{item.description}</p>
              <Button label={item.button_label || "Начать"} />
            </div>
            <div className="lotStudy__image">
              <img src={studyBoy} alt="boy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LotStudy;
