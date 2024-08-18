import { React, useState, useEffect, useContext } from "react";
import { PopUp } from "../../../App";
import axios from "axios";

export const AddAdminForClass = () => {
  const { click, tclick, setclick } = useContext(PopUp);

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const [data, setData] = useState({});
  const [dataClass, setDataClass] = useState({});

  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setclick([0, 0, 0, 0, 0, 1]);
      const response = await axios.post(
        `${apiUrl}/addAdminForClass`,
        {
          admin_id: e.target.admin_id.value,
          class_id: e.target.class_id.value,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      response;
      if (response.data.status) {
        setclick([0, 0, 0, 0, 1]);
        setMessage(response.data.message);
      }
      formDataToSend;
    } catch (e) {
      setclick([0]);
      e;
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/showAdminForClasses`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status) {
          setData(response.data.data);
        }
      } catch (e) {
        setError(e.message);
        e;
      }
    };
    getData();
  }, []);
  useEffect(() => {
    const getDataClass = async () => {
      try {
        const response = await axios.get(`${apiUrl}/showClassesWithOutAdmin`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status) {
          setDataClass(response.data.data);
        }
      } catch (e) {
        setError(e.message);
        e;
      }
    };
    getDataClass();
  }, []);

  return (
    <div>
      <div>
        <h2 className="text-center text-l mt-6">إسناد موجه لصف</h2>
        <div className="max-h-[90vh] overflow-auto bg-white pt-12 px-12 pb-6 text-[13px] addstu">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label>اختر الموجه</label>
            <select name="admin_id" id="admin_id">
              {data[0] &&
                data?.map((i) => (
                  <option value={i?.admin?._id} key={i?.admin?._id}>
                    {i?.admin?.name}
                  </option>
                ))}
            </select>
            <label>اختر الصف</label>
            <select name="class_id" id="class_id">
              {dataClass[0] &&
                dataClass?.map((i) => (
                  <option value={i?._id} key={i?._id}>
                    <p>{`الصف ${i.name} الشعبة ${i.section}`}</p>
                  </option>
                ))}
            </select>
            <button
              onClick={(e) => handleSubmit}
              className="adding mx-auto mt-7"
            >
              إضافة
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
