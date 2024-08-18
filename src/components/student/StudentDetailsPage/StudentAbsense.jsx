import { React, useState, useEffect, useContext } from "react";
import { PopUp } from "../../../App";
import axios from "axios";
import ResponsiveDatePickers from "../../Date/DatePikerOpened";
import CloseIcon from "@mui/icons-material/Close";

export const StudentAbsense = (props) => {
  const { click, tclick, setclick } = useContext(PopUp);

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState();
  const [data, setData] = useState({});
  const [absence, setAbsence] = useState({});
  const [delay, setDelay] = useState({});
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [delEvent, setDelEvent] = useState(false);

  if (props.name != "adding") {
    useEffect(() => {
      const getData = async () => {
        try {
          const response = await axios.post(
            `${apiUrl}/showStudentsAbsence`,
            { student_id: localStorage.getItem("student") },
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.status) {
            setData(response.data);
            setAbsence(response.data.absence || []);
            setDelay(response.data.delay || []);
          }
        } catch (e) {
          setError(e.message);
          e;
        }
      };
      getData();
    }, [delEvent]);
  }
  const handleDelEvent = async (id) => {
    try {
      const response = await axios.post(
        `${apiUrl}/deleteStudentsAbsence`,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // setclick([0,0,0,0,0,1])
      const response = await axios.post(
        `${apiUrl}/addStudentAbsence`,
        {
          student_id: localStorage.getItem("student"),
          date: date,
          delay_time: formData,
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
    } catch (e) {
      setclick([0])(e);
    }
  };

  return (
    <div>
      <div className="max-h-[90vh] overflow-auto bg-white pt-12 px-12 pb-6 text-[13px] addstu">
        {props.name === "adding" ? (
          <form onSubmit={handleSubmit}>
            <ResponsiveDatePickers datee={date} setDate={setDate} />
            <input
              type="text"
              placeholder="مدة التأخير ازا كان متأخراً"
              className="w-full"
              name="delay-time"
              onChange={(e) => setFormData(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit} className="adding mx-auto mt-4">
              إضافة
            </button>
          </form>
        ) : (
          <div>
            {absence.length > 0 && (
              <div>
                <div className="flex text-xl mb-5 gap-4">
                  <h2 className="">الغيابات : </h2>
                  <p>{absence.length}</p>
                </div>
                {absence.map((item, index) => (
                  <div key={index} className="infoShow1 gap-11 items-center">
                    <p>{item.date}</p>
                    <button
                      className="text-red-500"
                      onClick={() => handleDelEvent(item._id)}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {delay.length > 0 && (
              <div>
                <div className="flex text-xl my-5 gap-4">
                  <h2 className="">التأخيرات : </h2>
                  <p>{delay.length}</p>
                </div>
                {delay.map((item, index) => (
                  <div key={index} className="infoShow1 gap-11 items-center">
                    <div>
                      <p>{item.date}</p>
                      <p>مدة التأخير : {item.delay_time}</p>
                    </div>

                    <button
                      className="text-red-500"
                      onClick={() => handleDelEvent(item._id)}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
