import React from "react";
import PersonOffIcon from '@mui/icons-material/PersonOff';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BasicArea from "./Chart";
import StudentDetails from "./StudentDetails";
import RemoveIcon from '@mui/icons-material/Remove';
import BarsDataset from "./Chart2";
import StudentGrade from "./StudentGrade";


const StudentInfo = () => {

    return(
        <div>
            <div className="container flex justify-between flex-wrap mt-12 px-10 mb-10">
                <div className=" basis-8/12">
                    <div className="flex justify-center" style={{gap:100}}>
                        <div className="flex items-center gap-10 relative border border-gray-300 rounded-[20px] bg-white shadow p-5">
                            <div className="flex items-center gap-5">
                                <p className="text-x as">المخالفات<br/>20</p>
                                <RemoveIcon className="icon text-5xl rounded-full"/>
                            </div>
                            <button>تفاصيل</button>
                            {/* <button style={{color:"#00000078"}}> */}
                                <AddCircleOutlineIcon className="absolute text-x" style={{bottom: -10,left:-10}}/>
                            {/* </button> */}
                        </div>
                        <div className="flex items-center gap-10 relative border border-gray-300 rounded-[20px] bg-white shadow p-5">
                            <div className="flex items-center gap-5">
                                <p className="text-x ">أيام الغياب<br/>20 يوم</p>
                                <PersonOffIcon className="icon text-5xl  rounded-full"/>
                            </div>
                            <button>تفاصيل</button>
                            <AddCircleOutlineIcon className="absolute text-x" style={{bottom: -10,left:-10}}/>
                        </div>
                    </div>
                    {/* //charts */}
                    <div className="flex">
                        <BarsDataset className="basis-1/2"/>
                        <BasicArea className="basis-1/2"/>
                    </div>
                    <StudentGrade/>
                </div>
                {/* <div className="basis-1/4"> */}

                <StudentDetails />
                {/* </div> */}
            </div>
        </div>
    )
}

export default StudentInfo;