import { React, useState, useEffect, useContext } from "react";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import "../st.css";
import { PopUp } from "../../../App";
import axios from "axios";

const StudentDetails = (props) => {
  const [data, setData] = useState(props.data);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({});

  const token = localStorage.getItem("token");

  const { setReload, setclick } = useContext(PopUp);

  // useEffect(()=>{
  //     const getData = async () => {
  //     setclick([0,0,0,0,0,1])
  //     try {
  //     const response = await axios.post(
  //         `${apiUrl}/showStudentInfo`, {id:location.state.studentId},
  //         {
  //         headers: {
  //             Accept: "application/json",
  //             Authorization: `Bearer ${token}`,
  //         },
  //         }
  //     );
  //     if(response.data.status) {
  //         setclick([0])
  //          (response)
  //         setData(response.data.student)
  //     }

  //     }
  //     catch(e){
  //         setclick([0])
  //         // setError(e.message)
  //          (e)
  //     }
  // }
  // getData();
  // },[])

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    formData;
  };
  data;
  const apiUrl = process.env.REACT_APP_API_URL;

  function edit() {
    let inputs = document.querySelectorAll(".Deta input");
    for (let i = 1; i < inputs.length; i++) {
      if (!inputs[i].classList.contains("editable")) {
        setEditing(false);
      } else {
        handleEditing();
      }
      inputs[i].classList.toggle("editable");
      // inputs[i].classList.toggle('outline')
      // inputs[i].classList.toggle('outline-1')
      // inputs[i].classList.toggle('px-1')
    }
  }
  editing;
  // useEffect(()=>{

  const handleEditing = async () => {
    setclick([0, 0, 0, 0, 0, 1]);
    setFormData({
      ...formData,
      id: localStorage.getItem("student"),
    });
    try {
      ("a");
      const response = await axios.post(`${apiUrl}/editStudent`, formData, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.status) {
        setclick([0])(response);
        setData(response.data.data);
      }
    } catch (e) {
      // setError(e.message)
      setclick([0])(e);
    }
  };
  // },[editing])
  return (
    <div
      className="px-7 py-4 bg-white border shadow rounded-[7px] p-10 text-gray-700"
      style={{ direction: "ltr" }}
    >
      <h3 className="mb-7 text-lg font-bold">Student Details</h3>
      {data && (
        <form className="Deta">
          <label>Ref ID</label>
          <br />
          <input
            type="text"
            name="refid"
            value={data._id}
            readOnly
            className="mb-3 bg-transparent disabled text-gray-500"
            style={{ pointerEvents: "none" }}
          />
          <br />
          <label>الاسم الكامل</label>
          <br />
          <input
            type="text"
            name="full_name"
            value={data.full_name}
            className="mb-3"
            onChange={handleInputChange}
          />
          <br />
          <div className="flex justify-between">
            <div className="w-28">
              <label>اسم الأب</label>
              <br />
              <input
                type="text"
                name="father_name"
                value={data.father_name}
                className="mb-3 bg-transparent w-full"
                onChange={handleInputChange}
              />
              <br />
            </div>
            <div className="w-28">
              <label>اسم الام</label>
              <br />
              <input
                type="text"
                name="mother_name"
                value={data.mother_name}
                className="mb-3 bg-transparent w-full"
                onChange={handleInputChange}
              />
              <br />
            </div>
          </div>
          <label>phone</label>
          <br />
          <input
            type="tel"
            name="mobile_num"
            value={data.mobile_num}
            className="mb-3 bg-transparent text-sky-400"
            onChange={handleInputChange}
          />
          <br />
          <label>رقم الهاتف</label>
          <br />
          <input
            type="text"
            name="tele_num"
            value={data.tele_num}
            className="mb-3 bg-transparent"
            onChange={handleInputChange}
          />
          <br />
          <label>address</label>
          <br />
          <input
            type="text"
            name="address"
            value={data.address}
            className="mb-3 bg-transparent text-sky-400"
            onChange={handleInputChange}
          />
          <br />
          <div className="flex justify-between">
            <div className="w-28">
              <label>الصف</label>
              <br />
              <input
                type="text"
                name="class_id"
                value={data.class_id.name}
                className="mb-3 bg-transparent"
                onChange={handleInputChange}
              />
              <br />
              {/* <select className="text-green-500">
                            <option>السابع</option>
                            <option>التامن</option>
                        </select> */}
            </div>
            {/* <div className="w-28">
                        <label>الشعبة</label><br/>
                        <input type="text" name="name"  value="3"className="mb-3 bg-transparent w-16" pattern="[1-9]+"/><br/>
                    </div> */}
          </div>

          <div className="flex justify-between">
            <div className="w-28">
              <label>تاريخ الانضمام</label>
              <input
                type="date"
                name="join_date"
                className="w-full"
                value={data.join_date}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-28">
              <label>تاريخ المغادرة</label>
              <input
                type="date"
                name="leave_date"
                className="w-full"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </form>
      )}
      <div className="my-10 ">
        <button
          type="button"
          className="mr-5 py-1 px-5 border-2 border-gray-700 text-gray-700"
          onClick={edit}
        >
          تعديل <EditIcon />
        </button>
        <button
          type="delete"
          className="ml-5 py-1 px-5 border-2 border-red-500 text-red-500"
        >
          حذف <ClearIcon />
        </button>
      </div>
    </div>
  );
};
export default StudentDetails;
