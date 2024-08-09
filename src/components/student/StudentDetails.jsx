import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import "./st.css"

const StudentDetails =() => {

    function edit() {
        let inputs = document.querySelectorAll(".Deta input")
        console.log(inputs)
        for(let i=1;i<inputs.length;i++) {
            console.log(inputs[i])
            inputs[i].classList.toggle('editable')
            // inputs[i].classList.toggle('outline')
            // inputs[i].classList.toggle('outline-1')
            // inputs[i].classList.toggle('px-1')
        } 
    }
    return(
        <div className="px-7 py-4 bg-white border shadow rounded-[7px] p-10 text-gray-700" style={{direction:"ltr"}}>
            <h3 className="mb-7 text-lg font-bold">Student Details</h3>
            <form className="Deta">
                <label>Ref ID</label><br/>
                <input type="text" name="refid" value="ssssssssssssssssssss" readOnly className="mb-3 bg-transparent disabled text-gray-500" style={{pointerEvents:"none"}}/><br/>
                <label>الاسم الكامل</label><br/>
                <input type="text" name="name" value="ahmad" className="mb-3" /><br/>
                {/* <label>last name</label><br/>
                <input type="text" name="name" value="nameh"className="mb-3 bg-transparent"/><br/> */}
                <label>اسم الأب</label><br/>
                <input type="text" name="fname" value="basel" className="mb-3 bg-transparent"/><br/>
                <label>phone</label><br/>
                <input type="tel" name="tel" value="12121" className="mb-3 bg-transparent text-sky-400"/><br/>
                <label>رقم الهاتف</label><br/>
                <input type="text" name="name" value="630142" className="mb-3 bg-transparent"/><br/>
                <label>address</label><br/>
                <input type="text" name="address" value="tony-op-900lagous" className="mb-3 bg-transparent text-sky-400"/><br/>
                <div className="flex justify-between">
                    <div className="w-28">
                    <label>الصف</label><br/>
                <select className="text-green-500">
                    <option>السابع</option>
                    <option>التامن</option>
                </select>
                    </div>
                    <div className="w-28">
                    <label>الشعبة</label><br/>
                <input type="text" name="name"  value="3"className="mb-3 bg-transparent w-16" pattern="[1-9]+"/><br/>
                    </div>
                </div>
            
                
                <div className="flex justify-between">
                    <div className="w-28">
                        <label>تاريخ الانضمام</label>
                        <input type="date" className="w-full"/>
                    </div>
                    <div className="w-28">
                        <label>تاريخ المغادرة</label>
                        <input type="date" className="w-full"/>
                    </div>
                </div>
            </form>
            <div className="mt-2 ">
                <button type="button" className="mr-5 py-1 px-5 border-2 border-gray-700 text-gray-700"
                onClick={edit}>تعديل <EditIcon/></button>
                <button type="delete" className="ml-5 py-1 px-5 border-2 border-red-500 text-red-500">حذف <ClearIcon/></button>
            </div>
        </div>
        

    )
}
export default StudentDetails;

// #313131
// #777777
// #A5A5A5