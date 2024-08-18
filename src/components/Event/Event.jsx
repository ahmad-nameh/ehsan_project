import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import { PopUp } from "../../App";

const Event = () => {
  const { reload, setclick } = useContext(PopUp);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [delEvent, setDelEvent] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      setclick([0, 0, 0, 0, 0, 1]);
      try {
        const response = await axios.get(`${apiUrl}/showEvents`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status) {
          setclick([0]);
          response;
          setData(response.data.data);
        }
      } catch (e) {
        setError(e.message);
        e;
      }
    };
    getData();
  }, [delEvent, reload]);
  data;

  const handleDelEvent = async (id) => {
    try {
      const response = await axios.post(
        `${apiUrl}/deleteEvent`,
        {
          id: id,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      setDelEvent(!delEvent);
      response;
      if (response.data.status === 200) {
        setMessage(response.data.message);
      }
    } catch (e) {
      e;
    }
  };

  return (
    <div className="container">
      <div className="p=10 mt-7 lg:mr-32 ml-10">
        <div className="flex justify-between items-center">
          <h1 className=" font-bold text-xl my-10">الفعاليات</h1>
          <button
            onClick={() => setclick([0, 0, 0, 0, 0, 0, 0, 1])}
            className="adding mr-auto"
          >
            إضافة
          </button>
        </div>
        {data[0] && (
          <div className="tableEmp bg-white border shadow rounded-[7px] p-10 m-9">
            <div className="header grid grid-cols-8 items-center py-4 text-l font-bold border-b-2">
              <h2>اسم الفعالية</h2>
              <h2>التاريخ</h2>
              <h2>مكانها</h2>
              <h2>وصف</h2>
              <h2>عدد المسجلين</h2>
              <h2>أنشأها</h2>
              <h2></h2>
              <h2></h2>
            </div>
            <div className="overflow-auto  " style={{ maxHeight: "50vh" }}>
              {data.map((item, index) => (
                <div
                  className="header grid grid-cols-custom-8 items-center py-4"
                  key={index}
                >
                  <h2 className="font-bold">{item.name}</h2>
                  <p>{item.date}</p>
                  <p>{item.place}</p>
                  <p>{item.description}</p>
                  <p>{item.number_of_registrants}</p>
                  <p>{item.admin_added.name}</p>
                  <div style={{ width: "100px" }}>
                    <img src={item.photo} />
                  </div>
                  <button
                    className="text-red-500"
                    onClick={() => handleDelEvent(item._id)}
                  >
                    حذف
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

export default Event;
