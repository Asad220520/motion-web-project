import React, { useEffect, useState } from "react";
import WhyCurs from "./WhyCurs";
import { apiRequest } from "../../../api/apiRequest";

const WhyCursApi = () => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    apiRequest("/whycourse/")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCourseData(data[0]); 
        }
      })
      .catch((error) => console.error("Error fetching course data:", error));
  }, []);

  if (!courseData) return <div>Loading...</div>;

  return (
    <div>
      <WhyCurs data={courseData} />
    </div>
  );
};

export default WhyCursApi;
