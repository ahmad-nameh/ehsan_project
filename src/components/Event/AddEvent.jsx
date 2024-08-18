import { React, useState, useEffect, useContext } from "react";
import { PopUp } from "../../App";
import axios from "axios";

export const AddEvent = () => {
  const { setReload, setclick } = useContext(PopUp);
  // const { setReload, setclick } = useContext(PopUp);

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [img, setImg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("photo", img);

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      setclick([0, 0, 0, 0, 0, 1]);
      const response = await axios.post(`${apiUrl}/addEvent`, formDataToSend, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      response;
      if (response.data.status) {
        setclick([0, 0, 0, 0, 1]);
        setReload((i) => i + 1);
        setMessage(response.data.message);
      }
      formDataToSend;
    } catch (e) {
      setclick([0])(e);
    }
  };
  const handleInputChange = (event) => {
    if (event.target.name == "photo") {
      ("imgs");
      setImg(event.target.files[0])(img);
    } else {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-center text-l mt-6">إضافة فعالية</h2>
        <div className="max-h-[90vh] overflow-auto bg-white pt-12 px-12 pb-6 text-[13px] addstu">
          <form onSubmit={handleSubmit}>
            <label>اسم الفعالية</label>
            <br />
            <input
              type="text"
              placeholder="فعالية"
              className="w-full"
              name="name"
              required
              onChange={handleInputChange}
            />
            <br />
            <label>مكان وتاريخ الفعالية</label>
            <div className="flex justify-between w-full flex-wrap gap-10">
              <input
                type="date"
                className="basis-2/5"
                name="date"
                required
                onChange={handleInputChange}
              />
              <input
                type="text"
                className="basis-2/5"
                name="place"
                placeholder="مكانها"
                required
                onChange={handleInputChange}
              />
            </div>
            <label>وصف</label>
            <br />
            <textarea
              name="description"
              className="w-full"
              placeholder="وصف...."
              onChange={handleInputChange}
            ></textarea>
            <label>صورة</label>
            <br />
            <input
              type="file"
              placeholder="first name"
              className="w-full"
              name="photo"
              onChange={handleInputChange}
            />
            <br />
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
