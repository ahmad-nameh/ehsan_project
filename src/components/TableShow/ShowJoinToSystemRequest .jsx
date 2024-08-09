import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CancelIcon from "@mui/icons-material/Cancel";
import { PopUp } from "../../App";

const ShowJoinToSystemRequest = () => {

  const { click ,tclick , setclick} = useContext(PopUp);
  const token = localStorage.getItem("token");

  const [data, setdata] = useState([]);
  const[aprrove,setAprrove] = useState(false)

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      setclick([0,0,0,0,0,1])
      try {
        
        const response = await axios.get(
          `${apiUrl}/showPendingAccounts`,
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer  ${token}`,
            },
          }
        );
        if(response.data.status) {
          setdata(response.data.users);
          setclick([0])
        }
        
        console.log(response)
      } catch (error) {
        setclick([0])
        if (error.response.data.status === 0) {
          setdata([]);
        }
        console.log(error);
      }
    };
    fetchData();
  }, [aprrove]);

  const handleApproveAccount = async (id) => {
    let response;
    try {
      response = await axios.get(
        `${apiUrl}/approveAccounts/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer  ${token}`,
          },
        }
      );
      setAprrove(true)
    } catch (error) {
      console.error(error);
    }
    console.log(response);
  };

  const handleRejectAccount = async (id) => {
    let response;
    try {
      response = await axios.get(
        `${apiUrl}/deletePendingAccount/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer  ${token}`,
          },
        }
      );
      setAprrove(false)
    } catch (error) {
      console.error(error);
    }
    console.log(response);
  };

  return (
    <div className="container">
    <div className=" bg-white border shadow rounded-[7px] p-10 my-6 pdo" style={{
      padding: "0 20px",
      }}>
      <div className="header grid grid-cols-custom-5 py-4 font-bold overflow-hidden">
        <h2 >اسم الموظف</h2>
        <h2>البريد الالكتروني</h2>
        <h2>الوطيغة</h2>
        <h2></h2>
        <h2></h2>
      </div>
      <div className="max-h-72 overflow-auto">
        {data.map((content) => (
          <div
            key={content._id}
            className="header grid grid-cols-custom-5 border-b py-4 mt-2 emp_content hover:bg-gray-100 "
          >
            <h2>{content.name}</h2>
            <h2>{content.email}</h2>
            <h2>{content.role_id.name}</h2>
            <button
              className="flex items-center px-1 py-0.5 rounded-md bg-lime-600 text-white w-1/2"
              onClick={() => handleApproveAccount(content._id)}
            >
              <HowToRegIcon />
              قبول
            </button>
            <button
              className="flex items-center px-1 py-0.5 rounded-md bg-red-500 text-white w-1/2"
              onClick={() => handleRejectAccount(content._id)}
            >
              <CancelIcon />
              رفض
            </button>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ShowJoinToSystemRequest;
