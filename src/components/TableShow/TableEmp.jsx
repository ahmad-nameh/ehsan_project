import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function TableEmp() {
  const [data, setdata] = useState([]);
  const [ser, setSer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const Url = process.env.REACT_APP_API_URL + "showEreqs";
    const token = localStorage.getItem("token");
    axios
      .get(Url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => response.data)
      .then((res) => setdata(res.subjects))
      .catch((error) => error);
  }, []);
  useEffect(() => {
    const UrlSer = process.env.REACT_APP_API_URL + "showStatuses";
    axios
      .get(UrlSer)
      .then((response) => response.data)
      .then((res) => setSer(res.result))
      .catch((error) => error);
  }, []);
  const showInfo = (id) => {
    navigate("/showInfo2", { state: { id: id } });
  };
  const date = (date2) => {
    let date = new Date(date2).toJSON().slice(0, 10);
    return date;
  };

  return (
    <div className="tableEmp bg-white border shadow rounded-[7px] p-10 mx-9 mb-8">
      <div className="header grid grid-cols-8  py-4 font-bold">
        <h2>الاسم</h2>
        <h2>المؤهل العلمي</h2>
        <h2>العمل الحالي</h2>
        <h2>العمل المطلوب</h2>
        <h2>الحالة الاجتماعية</h2>
        <h2>تاريخ الولادة</h2>
        <h2>عنوان السكن</h2>
        <h2>الهاتف</h2>
      </div>
      {data[0] && (
        <div className="max-h-72 overflow-auto">
          {data.map((i, ii) => (
            <div
              key={i._id}
              className="header grid grid-cols-8 border-b  py-6 cursor-pointer  hover:bg-gray-100"
              onClick={() => showInfo(i._id)}
            >
              <h2>{i.name}</h2>
              <h2>{i.academic_qualification}</h2>
              <h2>{i.current_work}</h2>
              <h2>{i.wanted_work}</h2>
              <h2>{i.social_status_id.name}</h2>
              <h2>{date(i.birth_date)}</h2>
              <h2>{i.address}</h2>
              <h2>{i.mobile_num}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
