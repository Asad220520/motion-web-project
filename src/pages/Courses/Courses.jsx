import React from 'react'
import MainSection from './MainSection/MainSection'
import PopularSection from './PopularSection/PopularSection'
import Reviews from '../Home/Reviews/Reviews'
import Search from '../../components/Search/Search'
import axios from 'axios'
import API_BASE_URL from '../../config/api'
import { useState } from 'react'
import { useEffect } from 'react'

const Courses = () => {
 const [courses, setCourses] = useState([]);

  async function getCourses() {
    try {
      const res = await axios(`${API_BASE_URL}/titlecourse/`);
      setCourses(res.data);
    } catch (error) {
      console.error("Ошибка при загрузке курсов:", error);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  console.log(courses); // временно для проверки

  return (
    < >
     <MainSection  el={courses}/> 
     <PopularSection el={courses}/>
     <Reviews/>
     <Search/>
    </>
  )
}

export default Courses