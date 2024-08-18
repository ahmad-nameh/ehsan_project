import { React, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BasicArea from "./Chart";
import StudentDetails from "./StudentDetails";
import RemoveIcon from "@mui/icons-material/Remove";
import StudentGrade from "./StudentGrade";
import axios from "axios";
import { PopUp } from "../../../App";
const StudentInfo = () => {
  const location = useLocation();

  const { reload, setclick } = useContext(PopUp);
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  localStorage.setItem("student", location.state.studentId);

  useEffect(() => {
    const getData = async () => {
      setclick([0, 0, 0, 0, 0, 1]);
      try {
        const response = await axios.post(
          `${apiUrl}showStudentInfo`,
          { id: location.state.studentId },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status) {
          setclick([0]);
          setData(response.data);
          console.log(response);
        }
      } catch (e) {
        setclick([0]);
        setError(e.message);
        console.log(e);
      }
    };
    getData();
  }, []);

  return (
    <div>
      {data && data.absence && data.delay && data.violation && (
        <div className="container flex justify-around flex-wrap mt-12 px-10 mb-10 text-[15px]">
          <div className=" basis-8/12 mr-9">
            <div className="flex justify-center" style={{ gap: 100 }}>
              <div className="flex items-center gap-10 relative w-64 border border-gray-300 rounded-[20px] bg-white shadow p-5">
                <div className="flex items-center gap-5">
                  <p className="text-x as">
                    المخالفات
                    <br />
                    {data.violation && data.violation?.length}
                  </p>
                  <RemoveIcon className="icon text-5xl rounded-full" />
                </div>
                <button
                  onClick={() =>
                    setclick([
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    ])
                  }
                >
                  تفاصيل
                </button>
                {/* <button style={{color:"#00000078"}}> */}
                <AddCircleOutlineIcon
                  className="absolute text-x cursor-pointer"
                  style={{ bottom: -10, left: -10 }}
                  onClick={() =>
                    setclick([
                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                    ])
                  }
                />
                {/* </button> */}
              </div>
              <div className="flex items-center gap-10 relative w-64 border border-gray-300 rounded-[20px] bg-white shadow p-5">
                <div className="flex items-center gap-5">
                  <p className="text-x as">
                    الغيابات
                    <br />
                    {data.absence && data.absence.length + data.delay.length}
                  </p>
                  <PersonOffIcon className="icon text-5xl  rounded-full" />
                </div>
                <button
                  onClick={() =>
                    setclick([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
                  }
                >
                  تفاصيل
                </button>
                <AddCircleOutlineIcon
                  className="absolute text-x cursor-pointer"
                  style={{ bottom: -10, left: -10 }}
                  onClick={() =>
                    setclick([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1])
                  }
                />
              </div>
            </div>
            {/* //charts */}
            <div className="basis-1/2">
              {/* <BarsDataset className="basis-1/2"/> */}
              <BasicArea data={data} />
            </div>
            <StudentGrade data={data.exam} />
          </div>
          {/* <div className="basis-1/4"> */}

          <StudentDetails data={data.student} />
          {/* </div> */}
        </div>
      )}
    </div>
  );
};

export default StudentInfo;
