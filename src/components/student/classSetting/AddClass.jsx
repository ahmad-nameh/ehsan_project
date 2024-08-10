import { React, useState, useEffect, useContext } from "react";
import { PopUp } from "../../../App";
import axios from "axios";

export const AddClass = () => {
  const { setReload, setclick } = useContext(PopUp);

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setclick([0, 0, 0, 0, 0, 1]);
      const response = await axios.post(
        `${apiUrl}/addClass`,
        {
          name: e.target.name.value,
          section: e.target.section.value,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      if (response.data.status) {
        setReload((i) => i + 1);
        setMessage(response.data.message);
      }
      console.log(formDataToSend);
    } catch (e) {
      setclick([0]);
      console.log(e);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-center text-l mt-6"> اضافة صف</h2>
        <div className="max-h-[90vh] overflow-auto bg-white pt-12 px-12 pb-6 text-[13px] addstu">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label>الصف </label>
            <input type="text" name="name" />
            <label> الشعبة</label>
            <input type="text" name="section" />

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
