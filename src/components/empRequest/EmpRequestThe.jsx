import { useContext, useState } from "react";
import { PopUp } from "../../Home";
import { motion } from "framer-motion";
import axios from "axios";

export default function EmpRequestThe() {
  const { setTClick, idRq, setclick } = useContext(PopUp);

  const apiUrl = process.env.REACT_APP_API_URL + "addEexp";
  const [err, seterr] = useState("");
  const [arrdata, setarrdata] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;

    try {
      const response = await axios.post(apiUrl, {
        name: name,
        request_id: idRq,
      });
      setarrdata((i) => [...i, name]);
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
      <h1 className="text-[20px]">الخبرات</h1>
      <form
        onSubmit={handleSubmit}
        action=""
        className="flex bg-white p-10 flex-col text-[13px] justify-center"
      >
        <div className="flex items-center justify-center gap-5">
          <input
            className="w/1/2"
            type="text"
            name="name"
            id="name"
            placeholder="اضافة خبرة"
            value={value}
            onChange={(e) => setValue(e.value)}
          />
          <button
            type="submit"
            className="cursor-pointer border-2 rounded-full p-2 "
          >
            اضافة
          </button>
        </div>
        <div className="flex gap-4 justify-center text-[20px] mt-5">
          <h2> الخبرات الحالية:</h2>
          {arrdata.map((i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
        <div className="text-center p-4 mt-10">
          {err !== "" ? <div className="text-red-400">{err}</div> : null}
          <button
            onClick={endhandel}
            className="px-3 py-2 rounded-md bg-green-400 w-[100px] text-white"
          >
            التالي
          </button>
        </div>
      </form>
    </motion.div>
  );
}
