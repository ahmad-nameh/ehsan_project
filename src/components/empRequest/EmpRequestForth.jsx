import { useContext } from "react";
import { PopUp } from "../../Home";

export default function EmpRequestForth() {
  const { setTClick } = useContext(PopUp);

  const SubmitHandel = (e) => {
    e.preventDefault();
    setTClick([0, 0, 0, 0, 1]);
  };
  return (
    <div className="container teachingReq p-10 text-center">
      <h1 className="text-[20px]">
        المواد التي يستطيع تدريسها خارج الاختصاص وقام بتدريسها
      </h1>
      <form
        onSubmit={SubmitHandel}
        action=""
        className="flex bg-white p-10 flex-col text-[13px] justify-center"
      >
        <div className="">
          <label htmlFor="toManege">اضافة مادة</label>
          <input className="w/1/2" type="text" name="" id="toManege" />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="px-3 py-2 rounded-md bg-green-400 w-[100px] text-white"
          >
            التالي
          </button>
        </div>
      </form>
    </div>
  );
}
