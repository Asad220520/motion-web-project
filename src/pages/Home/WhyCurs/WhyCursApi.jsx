import React, { useEffect, useState } from "react";

import WhyCurs from "./WhyCurs";

const WhyCursApi = () => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    // Запрос к API
    fetch("/api/course-details")
      .then((response) => response.json())
      .then((data) => setCourseData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!courseData)
    return (
      <div>
        {/* <h1>loading</h1> */}
        <WhyCurs />
      </div>
    );

  return (
    <div>
      <WhyCurs data={courseData.whyCursSection} />
    </div>
  );
};

export default WhyCursApi;
