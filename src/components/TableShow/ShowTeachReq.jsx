import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
export default function ShowTeachReq() {
  const [data, setdata] = useState();
  const [ser, setSer] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const Url = process.env.REACT_APP_API_URL + "showTreqs";
    const token = localStorage.getItem("token");
    axios
      .get(Url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => response.data)
      .then((res) => setdata(res.subjects))
      .catch((error) => console.log(error));
  }, []);
  {data&&console.log(data[0])}

  useEffect(() => {
    const UrlSer = process.env.REACT_APP_API_URL + "showStatuses";
    axios
      .get(UrlSer)
      .then((response) => response.data)
      .then((res) => setSer(res.result))
      .catch((error) => console.log(error));
  }, []);
  const showInfo = (id) => {
    navigate("/showInfo", { state: { id: id } });
  };
  const date = (date2) => {
    let date = new Date(date2).toJSON().slice(0, 10);
    return date;
  };

  return (
    <div className="tableEmp bg-white border shadow rounded-[7px] p-10 mx-9">
      <div className="header grid grid-cols-8  py-4 font-bold">
        <h2>الاسم</h2>
        <h2>المؤهل العلمي</h2>
        <h2>الجهة المانحة</h2>
        <h2>الحالة الاجتماعية</h2>
        <h2>مكان الولادة</h2>
        <h2>تاريخ الولادة</h2>
        <h2>عنوان السكن</h2>
        <h2>الهاتف</h2>
      </div>
      {data&&<div>
        {data.map((i, ii) => (
          <div
            key={i._id}
            className="header grid grid-cols-8 border-b  py-6  cursor-pointer  hover:bg-gray-100"
            onClick={() => showInfo(i._id)}
          >
            <h2>{i.name}</h2>
            <h2>{i.academic_qualification}</h2>
            <h2>{i.issuing_authority}</h2>
            <h2>{i.social_status_id.name}</h2>
            <h2>{i.birth_city}</h2>
            <h2>{date(i.birth_date)}</h2>
            <h2>{i.address}</h2>
            <h2>{i.mobile_num}</h2>
          </div>
        ))}
      </div>}
    </div>
  );
}
