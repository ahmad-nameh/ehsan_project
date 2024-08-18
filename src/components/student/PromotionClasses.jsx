import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { PopUp } from "../../App";

const PromotionClasses = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [delSetting, setDelSetting] = useState(false);
  const { setReload, setclick } = useContext(PopUp);

  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/showClasses`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        response;
        setClasses(response.data.data);
      } catch (e) {
        setError(e.message);
      }
    };
    getData();
  }, []);
  const [classes, setClasses] = useState({});
  const handleInputChange = (e) => {
    e.preventDefault();
    if (e.target[1]?.checked) {
      const getData = async () => {
        setclick([0, 0, 0, 0, 0, 1]);
        try {
          const response = await axios.get(
            `${apiUrl}/promotion/${e.target[0]?.value}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          response;

          if (response.status === 200) {
            setclick([0, 0, 0, 0, 1]);
          }
        } catch (e) {
          setError(e.message);
        }
      };
      getData();
    }
  };
  return (
    <div className="container">
      <div className="tableEmp bg-white border shadow rounded-[7px] p-10 m-9">
        <form
          onSubmit={handleInputChange}
          className="p=10 mt-7  flex justify-between items-center"
        >
          <div className="flex justify-between items-center my-4">
            <h1 className=" font-bold text-xl ">رفع صف </h1>
          </div>
          <select className="w-80" name="class_id">
            <option value="">اختر صف</option>
            {classes[0] &&
              classes.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name} {item.section}
                </option>
              ))}
          </select>
          <div>
            <label className="px-3">يرجى تأكيد العملية</label>
            <input type="radio" name="conferm" value={true} />
          </div>
          <button className="adding ml-8" type="submit">
            ترفيع
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromotionClasses;
