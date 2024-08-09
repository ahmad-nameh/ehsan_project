import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import axios from "axios";
export default function ShowInfo() {
  const [allData, setAlldata] = useState();
  const [photo, setPhoto] = useState();
  const [photo2, setPhoto2] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (location.state && location.state.id !== null) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `http://127.0.0.1:8000/api/showReqData`,
            { type: 2, id: location.state.id },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setAlldata(response);
          const fileExtension = response.data.data.certificate_photo;
          const photoUrl = `http://127.0.0.1:8000/uploads/${fileExtension}`;
          setPhoto(photoUrl);
          const fileExtension2 = response.data.data.identity_photo;
          const photoUrl2 = `http://127.0.0.1:8000/uploads/${fileExtension2}`;
          setPhoto2(photoUrl2);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [location.state]);

  const date = (date2) => {
    let date = new Date(date2).toJSON().slice(0, 10);
    return date;
  };
  return (
    <div className="registeration text-sm">
      <div className="container">
        <span className="arrowBack" onClick={() => navigate(-1)}>
          <ArrowForwardIcon fontSize="small" />
          رجوع
        </span>
        {allData ? (
          <div className="w-1/2 my-4 mx-auto">
            <div className="infoShow1">
              <h3>الاسم:</h3>
              <h3>{allData.data.data.name}</h3>
            </div>
            <div className="infoShow1">
              <h3>الرقم الارضي:</h3>
              <h3>{allData.data.data.tele_num}</h3>
            </div>
            <div className="infoShow1">
              <h3>الرقم الجوال:</h3>
              <h3>{allData.data.data.mobile_num}</h3>
            </div>
            {/* <div className="infoShow1">
              <h3>الجنسية:</h3>
              <h3>{allData.data.data.nationality}</h3>
            </div> */}
            <div className="infoShow1">
              <h3>الحالة الاجتماعية:</h3>
              <h3>{allData.data.data.social_status}</h3>
            </div>
            <div className="infoShow1">
              <h3>الخدمة الالزامية:</h3>
              <h3>{allData.data.data.military_service}</h3>
            </div>
            <div className="infoShow1">
              <h3>العنوان:</h3>
              <h3>{allData.data.data.address}</h3>
            </div>
            <div className="infoShow1">
              <h3>المؤهل العلمي:</h3>
              <h3>{allData.data.data.academic_qualification}</h3>
            </div>
            <div className="infoShow1">
              <h3>تاريخ الولادة:</h3>
              <h3>{date(allData.data.data.birth_date)}</h3>
            </div>
            <div className="infoShow1">
              <h3>صورة الشهادة</h3>

              <img src={photo} alt="" className="max-w-56" />
            </div>
            <div className="infoShow1">
              <h3>صورة الهوية</h3>

              <img src={photo2} alt="" className="max-w-56" />
            </div>
            {/* <h1>المواد التي يرغب بتدريسها:</h1>
            <div className="infoShow1 justify-start gap-3">
              {allData.data.desired_subject.map((i) => (
                <h3>{i.name}</h3>
              ))}
            </div> */}
            <h1 className="py-5">مؤهلات إضافية ودورات:</h1>{" "}
            <div className="infoShow1 justify-start gap-3">
              {allData.data.skills_and_courses.map((i) => (
                <h3>{i.name}</h3>
              ))}
            </div>
            <h1 className="py-5">الخبرات </h1>
            <div className="infoShow1 justify-start gap-3">
              {allData.data.experiences.map((i) => (
                <h3>{i.name}</h3>
              ))}
            </div>
            {/* {allData.data.experiences.map((i) => (
              <h1>المواد التي يستطيع تدريسها خارج الاختصاص وقام بتدريسها</h1>
              <div>
                <div className="infoShow1">
                  <h3>العمل</h3>
                  <h3>{i.work}</h3>
                </div>
                <div className="infoShow1">
                  <h3>مكان العمل</h3>
                  <h3>{i.work_place}</h3>
                </div>
                <div className="infoShow1">
                  <h3>من</h3>
                  <h3>{i.from_date}</h3>
                </div>
                <div className="infoShow1">
                  <h3>الى</h3>
                  <h3>{i.to_date}</h3>
                </div>
              </div>
            ))} */}
          </div>
        ) : null}
      </div>
    </div>
  );
}
