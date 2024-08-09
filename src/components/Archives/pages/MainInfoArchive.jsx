import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../archives.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import profileimg from "../../../assets/profilephoto.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import BasicDatePicker from "../../Date/DatePiker";
import axios from "axios";

import Successimg from "../../../assets/pngwing.com.png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { motion } from "framer-motion";

import { PopUp } from "../../../App";

const MainInfoArchive = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const [profilePhoto, setProfilePhoto] = useState(profileimg);

  const [allData, setAlldata] = useState();
  const [formData, setFormData] = useState();
  const [autographPhoto, setAutographPhoto] = useState(null);

  const [numOfChild, setNumofChild] = useState(0);
  const [emp_id, setEmpId] = useState();

  const { click ,tclick , setclick} = useContext(PopUp);

  const [nat, setNat] = useState([]);
  const [ser, setSer] = useState([]);
  const [ma, setMa] = useState([]);
  const [se, setSe] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL

  useEffect(() => {
    if (location.state && location.state.empid !== null) {
      setEmpId(location.state.empid);
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${apiUrl}showEmpData/${location.state.empid}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer  ${token}`,
              },
            }
          );
          console.log(response);
          setAlldata(response.data);
          setFormData(response.data.data[0]);
          setNumofChild(response.data.data[0].childs_num);
          if (response.data.data[0].autograph_photo) {
            const photoFilename = response.data.data[0].autograph_photo;
            const photoUrl = `http://127.0.0.1:8000/${photoFilename}`;

            setProfilePhoto(photoUrl);

            const fileExtension = response.data.data[0].autograph_photo
              .split(".")
              .pop();
            const mimeType = `image/${fileExtension}`;
            const blob = new Blob(["Placeholder content"], { type: mimeType });
            const file = new File(
              [blob],
              response.data.data[0].autograph_photo,
              { type: mimeType }
            );

            setFormData((prevFormData) => ({
              ...prevFormData,
              autograph_photo: file,
            }));
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    } else {
      setFormData({
        name: "",
        father_name: "",
        mother_name: "",
        autograph_photo: "",
        nationality_id: "66ad42c954ed758ed6e24226",
        birth_city: "",
        birth_date: "",
        work: "",
        from: "",
        start_date: "",
        leave_date: "",
        address: "",
        childs_num: numOfChild,
        rest_place: "",
        comp_num: "",
        contracted: "true",
        active: "true",
        nat_num: "",
        AppBook_num: "",
        AppBook_date: "",
        military: true,
        social_status_id: "66ad42c854ed758ed6e2421b",
        military_service_id: "66ad42ca54ed758ed6e2422c",
        mobile_num: "",
        tele_num: "",
        military_rank: "",
        subject: "",
        school: "",
        sector_id: "66ad42c954ed758ed6e24220",
      });
    }
  }, [location.state]);

  const photoUpload = (e) => {
    e.preventDefault();
    try {
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        setFormData({
          ...formData,
          autograph_photo: file,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangeNumOfChildren = (action) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      childs_num:
        action === "add"
          ? prevFormData.childs_num + 1
          : Math.max(0, prevFormData.childs_num - 1),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      setclick([0,0,0,0,0,1])
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      response = await axios.post(
        `${apiUrl}addEmp`,
        formDataToSend,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(formDataToSend)
      console.log(response);


      if (response.status == 200) {
        setEmpId(response.data.added_employee_id);
        setclick([0,0,0,0,1]);
      }
    } catch (error) {
      setclick([0])
      console.error(error);
    }
  };

  const handleDateChange = (date, selectedDate) => {
    const newData = { ...formData };
    newData[selectedDate] = date;
    setFormData(newData);
  };
  useEffect(() => {
    const UrlNat = process.env.REACT_APP_API_URL + "showNats";
    const UrlSer = process.env.REACT_APP_API_URL + "showStatuses";
    const UrlMa = process.env.REACT_APP_API_URL + "showMServices";
    const UrlSe = process.env.REACT_APP_API_URL + "showSectors";
    axios
      .get(UrlNat)
      .then((response) => response.data)
      .then((res) => setNat(res.Nationalities))
      .catch((error) => console.log(error));
    axios
      .get(UrlSer)
      .then((response) => response.data)
      .then((res) => setSer(res.result))
      .catch((error) => console.log(error));
    axios
      .get(UrlMa)
      .then((response) => response.data)
      .then((res) => setMa(res.result))
      .catch((error) => console.log(error));
    axios
      .get(UrlSe)
      .then((response) => response.data)
      .then((res) => setSe(res.sectors))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="registeration">
      <form onSubmit={handleSubmit}>
        {formData&& (
          <div className="container">
            <span className="arrowBack" onClick={() => navigate(-1)}>
              <ArrowForwardIcon fontSize="small" />
              رجوع
            </span>
            <div className="first">
              <p>المعلومات الرئيسية</p>
              <div>
                <label htmlFor="photo-upload" className="custom-img-upload">
                  <div className="img-upload">
                    <img src={profilePhoto} alt="img" />
                  </div>
                  <input id="photo-upload" type="file" onChange={photoUpload} />
                </label>
              </div>

              <div>
                <label>اسم العامل</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <label>اسم الوالد</label>
                <input
                  type="text"
                  name="father_name"
                  value={formData.father_name}
                  onChange={handleChange}
                  required
                />

                <label>اسم الوالدة</label>
                <input
                  type="text"
                  name="mother_name"
                  value={formData.mother_name}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="nationality_id">الجنسية</label>
                {nat[0] && (
                  <select
                    className="inputPop border ml-2 rounded-md p-1 "
                    name="nationality_id"
                    id="nationality_id"
                    value={
                      nat.find((e) => e._id === formData.nationality_id)._id
                    }
                    onChange={handleChange}
                  >
                    {nat.map((i) => (
                      <option key={i._id} value={i._id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="second">
              <p>المعلومات الشخصية</p>

              <div>
                <label>مكان الولادة</label>
                <input
                  type="text"
                  name="birth_city"
                  value={formData.birth_city}
                  onChange={handleChange}
                  required
                />

                <label>تاريخ الولادة</label>
                <BasicDatePicker
                  datee={formData.birth_date}
                  setDate={(date) => handleDateChange(date, "birth_date")}
                />

                <label>مكان قيد النفوس</label>
                <input
                  type="text"
                  name="rest_place"
                  value={formData.rest_place}
                  onChange={handleChange}
                  required
                />

                <label>الرقم الوطني</label>
                <input
                  type="text"
                  name="nat_num"
                  value={formData.nat_num}
                  onChange={handleChange}
                  required
                />

                <label>العنوان</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>رقم الجوال </label>
                <input
                  type="tel"
                  name="mobile_num"
                  value={formData.mobile_num}
                  onChange={handleChange}
                  required
                />

                <label>رقم الهاتف</label>
                <input
                  type="tel"
                  name="tele_num"
                  value={formData.tele_num}
                  onChange={handleChange}
                />

                <label htmlFor="social_status_id">الوضع العائلي</label>
                {ser[0] && (
                  <select
                    className="inputPop border ml-2 rounded-md p-1"
                    name="social_status_id"
                    id="social_status_id"
                    onChange={handleChange}
                    value={
                      ser.find((e) => e._id === formData.social_status_id)._id
                    }
                  >
                    <option value={""}>اختر الحالة</option>
                    {ser.map((i) => (
                      <option key={i._id} value={i._id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                )}

                <label>عدد الأولاد</label>
                <div className="flex items-center gap-10">
                  <button
                    style={{
                      background: "var(--color6)",
                      color: "white",
                      borderRadius: "10px",
                    }}
                    onClick={() => handleChangeNumOfChildren("add")}
                  >
                    <AddIcon fontSize="small" />
                  </button>
                  {formData.childs_num}
                  <button
                    style={{
                      background: "var(--color6)",
                      color: "white",
                      borderRadius: "10px",
                    }}
                    disabled={!(formData && formData.childs_num > 0)}
                    onClick={() => handleChangeNumOfChildren("subtract")}
                  >
                    <RemoveIcon fontSize="small" />
                  </button>
                </div>

                <label>عدد من يتقاضى عنهم تعويضا عائليا</label>
                <input
                  type="number"
                  name="comp_num"
                  value={formData.comp_num}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="military_service_id">هل أدى خدمة العلم</label>
                {ma[0] && (
                  <select
                    className="inputPop border ml-2 rounded-md p-1"
                    name="military_service_id"
                    id="military_service_id"
                    onChange={handleChange}
                    value={
                      ma.find((e) => e._id === formData.military_service_id)._id
                    }
                  >
                    <option value={""}>اختر </option>
                    {ma.map((i) => (
                      <option key={i._id} value={i._id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                )}

                <label>رتبته العسكرية</label>
                <input
                  type="text"
                  name="military_rank"
                  value={formData.military_rank}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="second">
              <p>حول</p>
              <div>
                <label htmlFor="sector_id">الفرع</label>
                {se[0] && (
                  <select
                    className="inputPop border ml-2 rounded-md p-1"
                    name="sector_id"
                    id="sector_id"
                    onChange={handleChange}
                    value={se.find((e) => e._id === formData.sector_id)._id}
                  >
                    <option value={""}>اختر </option>
                    {se.map((i) => (
                      <option key={i._id} value={i._id}>
                        {i.name}
                      </option>
                    ))}
                  </select>
                )}

                <label>مستقيل</label>
                <span className="flex ml-10 justify-around">
                  <input
                    type="radio"
                    id="activeYes"
                    name="active"
                    value={false}
                    checked={formData.active == "false"}
                    onChange={handleChange}
                  />
                  <label htmlFor="activeYes">نعم</label>
                  <input
                    type="radio"
                    name="active"
                    id="activeNo"
                    value={true}
                    checked={formData.active == "true"}
                    onChange={handleChange}
                  />
                  <label htmlFor="activeNo">لا</label>
                </span>

                <label>متعاقد</label>
                <span className="flex ml-10 justify-around">
                  <input
                    type="radio"
                    id="contractedYes"
                    name="contracted"
                    value={true}
                    checked={formData.contracted == "true"}
                    onChange={handleChange}
                  />
                  <label htmlFor="contractedYes">نعم</label>
                  <input
                    type="radio"
                    id="contractedNo"
                    name="contracted"
                    value={false}
                    checked={formData.contracted == "false"}
                    onChange={handleChange}
                  />

                  <label htmlFor="contractedNo">لا</label>
                </span>

                <label>الوظيفة التي يشغلها</label>
                <input
                  type="text"
                  name="work"
                  value={formData.work}
                  onChange={handleChange}
                  required
                />

                <label>قدمه في الوظيفة</label>
                <BasicDatePicker
                  datee={formData.from}
                  setDate={(date) => handleDateChange(date, "from")}
                />

                <label>تاريخ المباشرة في الثانوية</label>
                <BasicDatePicker
                  datee={formData.start_date}
                  setDate={(date) => handleDateChange(date, "start_date")}
                />
              </div>

              <div>
                <label>رقم كتاب التعيين</label>
                <input
                  type="number"
                  name="AppBook_num"
                  value={formData.AppBook_num}
                  onChange={handleChange}
                  required
                />

                <label>تاريخ التعيين</label>
                <BasicDatePicker
                  datee={formData.AppBook_date}
                  setDate={(date) => handleDateChange(date, "AppBook_date")}
                />

                <label>تاريخ الانفكاك</label>
                <BasicDatePicker
                  datee={formData.leave_date}
                  setDate={(date) => handleDateChange(date, "leave_date")}
                />

                <label>المواد التي يدرسها</label>
                <textarea
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                ></textarea>

                <label> اسم المدرسة المشترك معها ان وجدت</label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                />
              </div>
            </div>
            <input
              type="submit"
              className="px-3 py-2 rounded-md bg-green-400 w-[100px] text-white mx-auto submitMainDataArchive"
              value="حفظ"
            />

            <button
              className="next-buttons"
              disabled={!emp_id}
              onClick={() =>
                navigate("/archive/part2", {
                  state: { empid: emp_id, data: allData },
                })
              }
            >
              <span>المزيد </span>
            </button>
          </div>
        )}
{/* 
        {click[0] ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="fixed top-0 left-0 w-full h-screen bg-black/50"
          >
            <div className=" relative container bg-white p-2 w-[90%] md:w-2/3 shadow-md  rounded-md mx-auto top-1/2 -translate-y-1/2">
              <div
                className="absolute top-2 right-2 text-black/70 cursor-pointer rounded-full"
                onClick={() => {
                  setclick([0, 0, 0, 0]);
                  setTClick([1, 0, 0, 0]);
                }}
              >
                <IoIosCloseCircleOutline size={35} />
              </div>
              <PopUp.Provider value={{ tClick, setTClick, setclick }}>
                <div className="max-h-[90vh] ">
                  {click[4] ? (
                    <div>
                      <img src={Successimg} className="w-48 mx-auto" />
                      <p className="font-extrabold text-2xl text-center">
                        تم الحفظ بنجاح
                      </p>
                    </div>
                  ) : null}
                </div>
              </PopUp.Provider>
            </div>
          </motion.div>
        ) : null} */}
      </form>
    </div>
  );
};

export default MainInfoArchive;
