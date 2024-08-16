import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { PopUp } from "../../../App";
import CloseIcon from "@mui/icons-material/Close";

const ShowClasses = () => {
  const { reload, setclick } = useContext(PopUp);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [delSetting, setDelSetting] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      setclick([0, 0, 0, 0, 0, 1]);
      try {
        const response = await axios.get(`${apiUrl}/showClasses`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status) {
          setclick([0]);
          console.log(response);
          setData(response.data.data);
        }
      } catch (e) {
        setError(e.message);
        console.log(e);
      }
    };
    getData();
  }, [delSetting, reload]);

  const handleDel = async (id) => {
    try {
      const response = await axios.post(
        `${apiUrl}/deleteClass`,
        {
          id,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setDelSetting(!delSetting);
      if (response.data.status === 200) {
        setMessage(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div className="p=10 mt-7 lg:mr-32 ml-10">
        <div className="flex justify-between  items-center mt-20">
          <h1 className=" font-bold text-xl ">الصفوف</h1>
          <button
            onClick={() => setclick([0, 0, 0, 0, 0, 0, 0, 0, 0, 1])}
            className="adding ml-8"
          >
            إضافة
          </button>
        </div>
        {data[0] && (
          <div
            className="container  p-10 mx-9"
            style={{
              width: "calc(100% - 100px)",
              marginTop: "20px",
              padding: "0 20px",
            }}
          >
            <div className="header grid grid-cols-3 items-center text-center py-4 text-sm font-bold border-b-2">
              <h2>الصف</h2>
              <h2>الشعبة</h2>
              <h2>حذف</h2>

              <h2></h2>
            </div>
            <div className="overflow-auto  border-b-2">
              {data.map((item, index) => (
                <div
                  className="header grid grid-cols-3 text-center items-center py-2 border-b-2"
                  key={index}
                >
                  <h2 className=" text-sm">{item.name}</h2>
                  <h2 className=" text-sm">{item.section}</h2>
                  <button
                    className="text-red-500"
                    onClick={() => handleDel(item._id)}
                  >
                    <CloseIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowClasses;
