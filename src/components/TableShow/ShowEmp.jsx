import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const ShowEmp = () => {
  const token = localStorage.getItem("token");

  const [data, setdata] = useState([]);
  const [searchWord, setSearchWord] = useState();

  const navigate = useNavigate();

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (searchWord != null) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${apiUrl}searchEmp`,
            { name: searchWord },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setdata(response.data.message);
        } catch (error) {
          if (error.response.data.status === 0) {
            setdata([]);
          }
          error;
        }
      };
      fetchData();
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${apiUrl}showEmps`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setdata(response.data.data);
        } catch (error) {
          error;
        }
      };
      fetchData();
    }
  }, [searchWord]);
  const date = (date2) => {
    let date = new Date(date2).toJSON().slice(0, 10);
    return date;
  };
  return (
    <div className="tableEmp bg-white border shadow rounded-[7px] p-10 mx-9 mb-8">
      <form>
        <input
          type="text"
          placeholder="البحث"
          className="py-1 px-1 bg-gray-200 w-64 outline-none placeholder-green-600"
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </form>
      <div className="header grid grid-cols-6  py-4 font-bold">
        <h2>الاسم</h2>
        <h2>اسم الأب</h2>
        <h2>العمل الحالي</h2>
        <h2>تاريخ الولادة</h2>
        <h2>عنوان السكن</h2>
        <h2>رقم الجوال</h2>
      </div>
      <div className="max-h-72 overflow-auto cursor-pointer">
        {data.map((content) => (
          <div
            key={content._id}
            onClick={() =>
              navigate("/archive", { state: { empid: content._id } })
            }
            className="header grid grid-cols-6 border-b py-4 mt-2 emp_content hover:bg-gray-100 "
          >
            <h2>{content.name}</h2>
            <h2>{content.father_name}</h2>
            <h2>{content.work}</h2>
            <h2>{date(content.birth_date)}</h2>
            <h2>{content.address}</h2>
            <h2>{content.mobile_num}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowEmp;
