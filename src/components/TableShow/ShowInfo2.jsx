import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import axios from "axios";
import { green, red } from "@mui/material/colors";
import { IoIosCloseCircleOutline } from "react-icons/io";
export default function ShowInfo() {
  const [allData, setAlldata] = useState();
  const [photo, setPhoto] = useState();
  const [photo2, setPhoto2] = useState();
  const [approve, setApprove] = useState(false);
  const [note, setNote] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (location.state && location.state.id !== null) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `${apiUrl}showReqData`,
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
          const photoUrl = `${fileExtension}`;
          setPhoto(photoUrl);
          const fileExtension2 = response.data.data.identity_photo;
          const photoUrl2 = `${fileExtension2}`;
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
  const handelApprove = async () => {
    console.log(allData.data?.data?.request_id);

    try {
      const response = await axios.post(
        `${apiUrl}approveEmbRequest`,
        { note, id: allData.data?.data?.request_id },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApprove(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="registeration text-sm">
      {approve && (
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="fixed top-0 left-0 w-full h-screen bg-black/50 z-10"
        >
          <div
            className=" relative container bg-white p-2 w-fit shadow-md 
            rounded-md mx-auto top-1/2 -translate-y-1/2 "
          >
            <h2 className="text-center text-xl mt-6">إضافة ملاحظة</h2>
            <div
              className="absolute top-2 right-2 text-black/70 cursor-pointer rounded-full"
              onClick={() => {
                setApprove(false);
              }}
            >
              <IoIosCloseCircleOutline size={35} />
            </div>
            <textarea
              name="note"
              id=""
              className="w-72"
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <button onClick={handelApprove} className="adding mx-auto mt-7">
              إضافة
            </button>
          </div>
        </div>
      )}
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
            <div className="infoShow1">
              <h3>حالة الطلب:</h3>
              <h3>
                {allData.data.data.approve ? (
                  <span className="text-green-700">مقبول</span>
                ) : (
                  <span className="text-red-700">غير مقبول بعد</span>
                )}
              </h3>
              <button
                onClick={() => setApprove(true)}
                className="text-green-700"
              >
                قبول الطلب
              </button>
            </div>
            <div className="infoShow1">
              <h3>ملاحظة المدير :</h3>
              <h3>{allData.data.data.adminNote}</h3>
            </div>
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
