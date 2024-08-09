import { useContext, useEffect, useState } from "react";
import { PopUp } from "../../Home";
import axios from "axios";

function TeachingReMain() {
  const apiUrl = process.env.REACT_APP_API_URL + "addTeachingRequest";
  const [err, seterr] = useState("");
  const [nat, setNat] = useState([]);
  const [ser, setSer] = useState([]);
  const [ma, setMa] = useState([]);
  const { setTClick, setidRq } = useContext(PopUp);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arr = [...e.target];
    let data = [{}];
    arr.map((i) => {
      const name = i.name;
      const value = i.value;
      data[name] = value;
    });
    try {
      const response = await axios.post(apiUrl, { ...data });
      setidRq(response.data.added_request_id);
      setTClick([0, 1, 0, 0, 0]);
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
  console.log(nat)

  return (
    <div className="container teachingReq p-10 text-center">
      <h1 className="text-[20px]">طلب تكليف بالتدريس</h1>
      {ma&&ser&&nat&&<form
        onSubmit={handleSubmit}
        action=""
        className="flex bg-white gap-4 flex-col text-[13px] justify-center"
      >
        <div className="border  rounded-md  text-right">
          <div className="flex flex-col lg:flex-row gap-8 mx-auto">
            <div className="grid grid-cols-2 m-6 lg:w-1/2">
              <div className="inputDivPop">
                <label htmlFor="name">اسم مقدم الطلب </label>
                <input className="inputPop" type="text" name="name" id="name" />
              </div>
              <div className="inputDivPop">
                <label htmlFor="nationality_id">الجنسية</label>
                <select
                  className="inputPop border ml-2 rounded-md p-1 "
                  name="nationality_id"
                  id="nationality_id"
                >
                  <option value={""}>اختر الدولة</option>
                  {nat.map((i) => (
                    <option key={i.id + i.name} value={i._id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="inputDivPop">
                <label htmlFor="birth_date">تاريخ الولادة</label>
                <input
                  className="inputPop"
                  type="date"
                  name="birth_date"
                  id="birth_date"
                />
              </div>
              <div className="inputDivPop">
                <label htmlFor="birth_city">مكان الولادة</label>
                <input
                  className="inputPop"
                  type="text"
                  name="birth_city"
                  id="birth_city"
                />
              </div>
              <div className="inputDivPop">
                <label htmlFor="academic_qualification">الموهل العملي</label>
                <input
                  className="inputPop"
                  type="text"
                  name="academic_qualification"
                  id="academic_qualification"
                />
              </div>
              <div className="inputDivPop">
                <label htmlFor="issuing_authority">الجهة المانحة</label>
                <input
                  className="inputPop"
                  type="text"
                  name="issuing_authority"
                  id="issuing_authority"
                />
              </div>
              <div className="inputDivPop">
                <label htmlFor="acquisition_year">عام الحصول عليها</label>
                <input
                  className="inputPop"
                  type="date"
                  name="acquisition_year"
                  id="acquisition_year"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 m-6 lg:w-1/2">
              <div className="text-center col-span-2">
                <h2>السيرة الذاتية</h2>
              </div>
              <div className="inputDivPop">
                <label htmlFor="study_place">مكان الدراسة</label>
                <input
                  className="inputPop"
                  type="text"
                  name="study_place"
                  id="study_place"
                />
              </div>
              <div className="inputDivPop">
                <label htmlFor="social_status_id">الحالة الاجتماعية</label>
                <select
                  className="inputPop border ml-2 rounded-md p-1"
                  name="social_status_id"
                  id="social_status_id"
                >
                  <option value={""}>اختر الحالة</option>
                  {ser.map((i) => (
                    <option key={i.id} value={i._id}>
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
                >
                  <option value={""}>اختر </option>
                  {ma.map((i) => (
                    <option key={i.id} value={i._id}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center col-span-2 ">
                <h2 className="pt-5">العنوان بالتفصيل</h2>
              </div>
              <div className="inputDivPop">
                <label htmlFor="address">السكن</label>
                <input
                  className="inputPop"
                  type="text"
                  name="address"
                  id="address"
                />
              </div>
              <div className="inputDivPop">
                <label htmlFor="tele_num">الهاتف الارضي</label>
                <input
                  className="inputPop"
                  type="tel"
                  name="tele_num"
                  id="tele_num"
                />
              </div>
              <div className="inputDivPop">
                <label htmlFor="mobile_num">الهاتف الجوال</label>
                <input
                  className="inputPop"
                  type="tel"
                  name="mobile_num"
                  id="mobile_num"
                />
              </div>
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
      </form>}
    </div>
  );
}

export default TeachingReMain;
