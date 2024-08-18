import { React, useState, useEffect, useContext } from "react";
import DatePiker from "../Date/DatePiker";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

export const AddGrade = () => {
  const [formData, setFormData] = useState({
    subject_id: "",
    type: "امتحان",
    date: "2024",
    full_mark: "100",
  });
  const [studentMarks, setStudentMarks] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [studetns, setStudents] = useState({});
  const [classes, setClasses] = useState({});
  const [class_id, setClass_id] = useState("");
  const [subject, setSubject] = useState({});
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

  const handleSelctionChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })(formData);
  };

  const handleMarksChange = (id) => {
    const newMark = event.target.value;

    setStudentMarks((prevMarks) => {
      const studentExists = prevMarks.some((student) => student.id === id);

      if (studentExists) {
        return prevMarks.map((student) =>
          student.id === id ? { ...student, mark: newMark } : student
        );
      } else {
        return [...prevMarks, { id: id, mark: newMark }];
      }
    });
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/showStudentsAndSubjectForClass`,
          { class_id: class_id },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        response;
        //  (response1)
        setSubject(response.data.subject);
        setStudents(response.data.students);
      } catch (e) {
        e;
        setError(e.message);
      }
    };
    getData();
  }, [class_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setclick([1,0,0,0,0])
    //  (studentMarks)
    //  (e)
    setFormData({
      ...formData,
      ["students"]: studentMarks,
    });

    try {
      const response = await axios.post(
        `${apiUrl}/addStudentsMarks`,
        formData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response;
      if (response.data.status) {
        setMessage(response.data.message);
      }
    } catch (e) {
      e;
    }
  };

  return (
    <div>
      <h2 className="text-center text-l mt-6">إضافة نتائج</h2>
      <form>
        <div className=" bg-white p-12 text-[13px] ">
          <div
            className="flex items-center flex-wrap addGradeSelectData gap-4"
            style={{ direction: "rtl" }}
          >
            <select
              className="w-40"
              name="class_id"
              onChange={(e) => setClass_id(e.target.value)}
            >
              <option value="">اختر</option>
              {classes[0] &&
                classes.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name} {item.section}
                  </option>
                ))}
            </select>
            <select name="type" onChange={handleSelctionChange}>
              <option value={"امتحان"}>امتحان</option>
              <option value={"مذاكرة"}>مذاكرة</option>
              <option value={"شفهي"}>شفهي</option>
            </select>
            {subject[0] && (
              <select name="subject_id" onChange={handleSelctionChange}>
                {subject.map((item, index) => (
                  <option key={index} d="dd" value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            <input
              type="number"
              placeholder="العلامة الكاملة"
              className="w-40"
              name="full_mark"
              onChange={handleSelctionChange}
            />
            <input type="date" name="date" onChange={handleSelctionChange} />
          </div>
          {studetns[0] && (
            <div style={{ marginBottom: "20px" }}>
              <div className="flex p-3 border-b-2">
                <p className="w-1/2">اسم الطالب</p>
                <p>الدرجة</p>
              </div>
              <div className="max-h-60 overflow-auto ">
                {studetns.map((item, index) => (
                  <div className="flex addGrade" key={index}>
                    <label className="w-1/2 py-2 px-3" key={index}>
                      {item.full_name}
                    </label>
                    <input
                      type="number"
                      className="w-24"
                      onChange={() => handleMarksChange(item._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="text-center">{message}</div>
        </div>
        <button
          onClick={handleSubmit}
          style={{
            padding: "10px 20px",
            color: "white",
            backgroundColor: "green",
            borderRadius: "12px",
            display: "block",
            margin: "-15px  auto 10px",
          }}
        >
          حفظ
        </button>
      </form>
    </div>
  );
};
