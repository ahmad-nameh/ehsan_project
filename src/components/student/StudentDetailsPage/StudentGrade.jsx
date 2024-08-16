import { React, useState, useEffect, useContext } from "react";
import ZoomInIcon from '@mui/icons-material/ZoomIn';

const StudentGrade =(props) => {
  console.log(props.data)
    return(
        <div>
            <div className="bg-white border shadow rounded-[7px] pt-8 px-10 pb-2 mx-9 relative" style={{direction:"ltr"}}>
              <button className="absolute top-2 left-2"><ZoomInIcon/></button>
            <div className="header grid p-3 bg-white border shadow justify-between rounded-[1px]"
            style={{gridTemplateColumns:"200px 100px 75px 75px 100px"}}>
            <h2 className="mx-1">اسم المادة</h2>
          <h2 className="mx-1">التاريخ</h2>
          <h2 className="mx-1">الدرجة</h2>
          <h2 className="mx-1">من</h2>
          <h2></h2>
            </div>
            <div className="max-h-32 overflow-y-auto">
              {props.data.map((item,index) => (
                <div className="grid py-1 justify-between " style={{gridTemplateColumns:"200px 100px 75px 75px 100px"}}>
            <p className="m-1  p-1 bg-white border shadow rounded-[1px]">{item.subject_id.name} {item.type}</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px]">{new Date(item.createdAt).getFullYear()}-{new Date(item.createdAt).getMonth()}-{new Date(item.createdAt).getDate()}</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px]">{item.mark}</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px]">{item.full_mark}</p>
          <p className="m-1  p-1 bg-white border shadow rounded-[1px] text-center">تعديل</p>
            </div>
              ))}
            </div>
            </div>
        </div>
    )
}

export default StudentGrade;