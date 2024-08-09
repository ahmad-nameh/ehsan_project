import { useContext, useState } from "react";
import { PopUp } from "../../Home";
import { motion } from "framer-motion";
import axios from "axios";

export default function TeachingReExp() {
  const { setTClick, idRq, setclick } = useContext(PopUp);

  const apiUrl = process.env.REACT_APP_API_URL + "addTexp";
  const [err, seterr] = useState("");
  const [arrdata, setarrdata] = useState(0);
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const arr = [...e.target];
    const data = [{}];
    arr.map((i) => {
      const name = i.name;
      const value = i.value;
      data[name] = value;
    });

    try {
      const response = await axios.post(apiUrl, {
        ...data,
        request_id: idRq,
      });
      setarrdata((i) => i + 1);
      setValue("");
    } catch (error) {
      console.log(error);
      if (error.response.data.details)
        seterr(error.response.data.details[0].message);
      else seterr(error.response.data.message);
    }
  };
  const endhandel = () => {
    setTClick([1, 0, 0, 0, 0]);
    setclick([0, 0, 0, 0]);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="container teachingReq p-10 text-center"
    >
      <h1 className="text-[20px]">
        المواد التي يستطيع تدريسها خارج الاختصاص وقام بتدريسها
      </h1>{" "}
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex bg-white p-10 flex-col text-[13px] justify-center"
      >
        <div className="border p-10  rounded-md  text-right ">
          <div className="flex flex-col lg:flex-row gap-8 mx-auto">
            <div className="grid grid-cols-2 m-6 lg:w-1/2">
              <div className="inputDivPop">
                <label htmlFor="work">مكان العمل</label>
                <input className="inputPop" type="text" name="work" id="work" />
              </div>
              <div className="inputDivPop">
                <label htmlFor="work_place">المادة او العمل</label>
                <input
                  className="inputPop"
                  type="text"
                  name="work_place"
                  id="work_place"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 m-6 lg:w-1/2">
              <div className="inputDivPop">
                <label htmlFor="to_date">من عام</label>
                <input
                  className="inputPop"
                  type="date"
                  name="to_date"
                  id="to_date"
                />
              </div>
              <div className="inputDivPop">
                <label htmlFor="from_date">الى عام</label>
                <input
                  className="inputPop"
                  type="date"
                  name="from_date"
                  id="from_date"
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="cursor-pointer border-2 rounded-full p-2 "
            >
              اضافة
            </button>
          </div>
        </div>
        <div className="flex gap-4 justify-center text-[20px] mt-5">
          <h2> الخبرات المضافة:</h2>
          {arrdata}
        </div>
        <div className="text-center p-4 mt-10">
          {err !== "" ? <div className="text-red-400">{err}</div> : null}
          <button
            onClick={endhandel}
            className="px-3 py-2 rounded-md bg-green-400 w-[100px] text-white"
          >
            حفظ{" "}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
