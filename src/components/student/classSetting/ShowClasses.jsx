import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { PopUp } from "../../../App";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const ShowClasses = ({ state, setState }) => {
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
    if (state[1]) getData();
  }, [delSetting, reload, state]);

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
      <div className="tableEmp bg-white border shadow rounded-[7px] p-10 m-9">
        {!state[1] && (
          <div
            className="flex justify-between items-center my-4 cursor-pointer "
            onClick={() => setState([false, !state[1]])}
          >
            <h1
              className=" font-bold text-xl cursor-pointer"
              onClick={() => setState([false, !state[1]])}
            >
              الصفوف
            </h1>
            <ArrowDropDownIcon />
          </div>
        )}
        {state[1] && (
          <div>
            <div
              className="flex justify-between items-center my-4 cursor-pointer"
              onClick={() => setState([false, !state[1]])}
            >
              <h1 className=" font-bold text-xl ">الصفوف</h1>
              <button
                onClick={() => setclick([0, 0, 0, 0, 0, 0, 0, 0, 0, 1])}
                className="adding ml-8"
              >
                إضافة
              </button>
            </div>
            {data[0] && (
              <div className="border-t-2">
                <div className="header grid grid-cols-2  py-4 font-bold">
                  <h2>الصف</h2>
                  <h2>الشعبة</h2>

                  <h2></h2>
                </div>
                <div className="max-h-72 overflow-auto ">
                  {data.map((item, index) => (
                    <div
                      className="header grid grid-cols-2 border-b py-4 mt-2 emp_content  "
                      key={index}
                    >
                      <h2 className=" text-sm">{item.name}</h2>
                      <div className="flex justify-between w-1/2">
                        <h2 className=" text-sm">{item.section}</h2>
                        <button
                          className="text-red-500"
                          onClick={() => handleDel(item._id)}
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowClasses;
