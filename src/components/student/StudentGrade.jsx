import React from "react";
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const StudentGrade =() => {
    return(
        <div>
             <div className="bg-white border shadow rounded-[7px] pt-8 px-10 pb-2 mx-9 relative" style={{direction:"ltr"}}>
              <button className="absolute top-2 left-2"><ZoomInIcon/></button>
            <div className="header grid grid-cols-5  p-3 bg-white border shadow justify-between rounded-[1px] ">
            <h2 className="w-40">اسم المادة</h2>
          <h2>التاريخ</h2>
          <h2 className="w-12">الدرجة</h2>
          <h2 className="w-12">من</h2>
          <h2></h2>
            </div>
            <div className="max-h-32 overflow-y-auto">
            <div className="grid grid-cols-5  py-1 justify-between ">
            <p className="m-1  p-1 bg-white border shadow rounded-[1px] w-40">الاسم</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px]">7/12/2023</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px] w-12">90</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px] w-12">100</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px] text-center">تعديل</p>
            </div>
            <div className="grid grid-cols-5  py-1 justify-between ">
            <p className="m-1  p-1 bg-white border shadow rounded-[1px] w-40">الاسم</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px]">7/12/2023</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px] w-12">90</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px] w-12">100</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px] text-center">تعديل</p>
            </div>
            <div className="grid grid-cols-5  py-1 justify-between ">
            <p className="m-1  p-1 bg-white border shadow rounded-[1px] w-40">الاسم</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px]">7/12/2023</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px] w-12">90</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px] w-12">100</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px] text-center">تعديل</p>
            </div>
            </div>
            </div>
        </div>
    )
}

export default StudentGrade;