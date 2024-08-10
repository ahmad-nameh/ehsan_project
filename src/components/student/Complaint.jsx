import { React, useState, useEffect, useContext } from "react";
import Logo from "../../assets/Logo.png";
import axios from "axios";
import { PopUp } from "../../App";
import CloseIcon from "@mui/icons-material/Close";

const Complaint = () => {
  const { click, tclick, setclick } = useContext(PopUp);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [delComplaint, setDelComplaint] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const token = localStorage.getItem("token");

  useEffect(() => {
    const getData = async () => {
      setclick([0, 0, 0, 0, 0, 1]);
      try {
        const response = await axios.get(`${apiUrl}/showComplaint`, {
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
  }, [delComplaint]);
  console.log(data);

  return (
    <div className="container">
      <div className="p=10 mt-7 lg:mr-32 ml-10">
        <div className="flex justify-between items-center">
          <h1 className=" font-bold text-xl my-10">المقترحات</h1>
        </div>
        {data[0] ? (
          <div
            className="container  p-10 mx-9"
            style={{
              width: "calc(100% - 100px)",
              marginRight: "100px",
              marginTop: "20px",
              padding: "0 20px",
            }}
          >
            <div className="header grid grid-cols-5 items-center py-4 text-sm font-bold border-b-2">
              <h2>نوع الاقتراح</h2>
              <h2>التاريخ</h2>
              <h2>اسم المقدم</h2>
              <h2>وصف</h2>
            </div>
            <div
              className="overflow-auto  border-b-2"
              style={{ maxHeight: "75vh" }}
            >
              {data.map((item, index) => (
                <div
                  className="header grid grid-cols-5 items-center py-4"
                  key={index}
                >
                  <h2 className="font-bold text-sm">{item.type}</h2>
                  <p className="text-sm">{item.createdAt?.slice(0, 10)}</p>

                  <p className="font-bold text-sm">
                    {item.student_id?.full_name}
                  </p>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>لا يوجد اقتراحات</p>
        )}
      </div>
    </div>
  );
};

export default Complaint;
