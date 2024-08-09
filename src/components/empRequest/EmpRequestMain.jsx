import { useContext, useEffect, useState } from "react";
import { PopUp } from "../../Home";
import axios from "axios";
function EmpRequestMain() {
  const apiUrl = process.env.REACT_APP_API_URL + "addEmpRequest";
  const [err, seterr] = useState("");
  const [nat, setNat] = useState([]);
  const [ser, setSer] = useState([]);
  const [ma, setMa] = useState([]);
  const { setTClick, setidRq } = useContext(PopUp);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
 const [formData, setFormData] = useState({}); 

  const handleImage1Change = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleImage2Change = (event) => {
    setImage2(event.target.files[0]);
  };
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const arr = [...e.target];
    const formDataToSend = new FormData();
    formDataToSend.append("certificate_photo", image1);
    formDataToSend.append("identity_photo", image2);

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    console.log("je")
    try {
      console.log(formDataToSend)
      const response = await axios.post(apiUrl, formDataToSend, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        setidRq(response.data.added_request_id);
        setTClick([0, 1, 0, 0, 0]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.details)
        seterr(error.response.data.details[0].message);
      else seterr(error.response.data.message);
    }
  };
  useEffect(() => {
    const UrlNat = process.env.REACT_APP_API_URL + "showNats";
    const UrlSer = process.env.REACT_APP_API_URL + "showStatuses";
    const UrlMa = process.env.REACT_APP_API_URL + "showMServices";
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
  }, []);
  return (
    <div className="container teachingReq p-10 text-center">
      <h1>طلب تكليف بعمل إداري</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex bg-white gap-4 flex-col text-[13px] justify-center"
      >
        <div className="flex flex-col lg:flex-row gap-8 mx-auto text-right">
          <div className="grid grid-cols-2 m-6 lg:w-1/2">
            <div className="inputDivPop">
              <label htmlFor="name">الاسم</label>
              <input
                className="inputPop"
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="birth_date">تاريخ الولادة</label>
              <input
                className="inputPop"
                type="date"
                name="birth_date"
                id="birth_date"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="social_status_id">الحالة الاجتماعية</label>
              <select
                className="inputPop border ml-2 rounded-md p-1"
                name="social_status_id"
                id="social_status_id"
                onChange={handleInputChange}
              >
                <option value={""}>اختر الحالة</option>
                {ser.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputDivPop">
              <label htmlFor="military_service_id">الخدمة الالزامية</label>
              <select
                className="inputPop border ml-2 rounded-md p-1"
                name="military_service_id"
                id="military_service_id"
                onChange={handleInputChange}
              >
                <option value={""}>اختر </option>
                {ma.map((i) => (
                  <option key={i._id} value={i._id}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="inputDivPop">
              <label htmlFor="address">العنوان بالتفصيل</label>
              <input
                className="inputPop"
                type="text"
                name="address"
                id="address"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="tele_num">الهاتف الارضي</label>
              <input
                className="inputPop"
                type="tel"
                name="tele_num"
                id="tele_num"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 m-6">
            <div className="inputDivPop">
              <label htmlFor="mobile_num">الهاتف الجوال</label>
              <input
                className="inputPop"
                type="tel"
                name="mobile_num"
                id="mobile_num"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="academic_qualification">الموهل العملي</label>
              <input
                className="inputPop"
                type="text"
                name="academic_qualification"
                id="academic_qualification"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="current_work">العمل الحالي</label>
              <input
                className="inputPop"
                type="text"
                name="current_work"
                id="current_work"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="wanted_work">العمل المطلوب</label>
              <input
                className="inputPop"
                type="text"
                name="wanted_work"
                id="wanted_work"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="certificate_photo">صورة الشهادة</label>
              <input
                className="inputPop"
                type="file"
                name="certificate_photo"
                id="certificate_photo"
                onChange={handleImage1Change}
              />
            </div>
            <div className="inputDivPop">
              <label htmlFor="identity_photo">صورة الهوية</label>
              <input
                className="inputPop"
                type="file"
                name="identity_photo"
                id="identity_photo"
                onChange={handleImage2Change}
              />
            </div>
          </div>
        </div>
        {err !== "" ? <div className="text-red-400">{err}</div> : null}

        <div className="text-center">
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-green-400 w-[100px] text-white"
          >
            التالي
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmpRequestMain;
