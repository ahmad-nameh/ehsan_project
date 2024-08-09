import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import ResponsiveDateTimePickers from "../Date/DateTimePic";

export const Prog =(props) => {
    return(
        <div>
            <h2 className="text-l text-center mt-6">برنامج الاسبوع</h2>
            <div className="flex max-h-[90vh] overflow-auto flex bg-white p-12 text-[13px] justify-between addClassmate gap-4">
            <div className="basis-1/3 " style={{direction:"rtl"}}>
                <label>المادة</label><br/>
                <input type="text" placeholder="math" className="w-full"/><br/>
                <label>الحصة</label><br/>
                <ul className="flex gap-2">
                    <li className="text-white bg-sky-400 p-2 rounded-xl">1</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl">2</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl">3</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl">4</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl">5</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl">6</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl">7</li>
                    <li className="text-white bg-sky-400 p-2 rounded-xl">8</li>
                </ul>
                <label>الاستاذ</label><br/>
                <input type="text" className="w-full"/><br/>
                {/* <label>الوقت والتاريخ</label>
                <ResponsiveDateTimePickers/> */}

                <button style={{padding: "10px 20px",color:"white",backgroundColor:"tomato",borderRadius:"12px",display:"block",margin: "15px  auto 10px"}}>إضافة</button>
            </div>
            <div className="flex basis-2/3 justify-around flex-wrap">
                <div className="bg-white p-3 rounded-xl basis-60 border-2 border-slate-100 h-28 relative classmate" >
                    <h3 className="font-bold">Computer scince</h3>
                    <p className="mt-2.5 mb-3.5">lk 8 hgb 6</p>
                    <hr/>
                    <p className="mt-2"><span className="font-bold">Mr : </span>ahmad</p>
                    <div className="absolute top-1 right-1">
                        <ClearIcon/><br/>
                        <EditIcon/>

                    </div>
                </div>
                <div className="bg-white p-3 rounded-xl basis-60 border-2 border-slate-100 h-28 relative classmate">
                    <h3 className="font-bold">Computer scince</h3>
                    <p className="mt-2.5 mb-3.5">lk 8 hgb 6</p>
                    <hr/>
                    <p className="mt-2"><span className="font-bold">Mr : </span>ahmad</p>
                    <div className="absolute top-1 right-1">
                        <ClearIcon/><br/>
                        <EditIcon/>

                    </div>
                </div>
                <div className="bg-white p-3 rounded-xl basis-60 border-2 border-slate-100 h-28 relative classmate">
                    <h3 className="font-bold">Computer scince</h3>
                    <p className="mt-2.5 mb-3.5">lk 8 hgb 6</p>
                    <hr/>
                    <p className="mt-2"><span className="font-bold">Mr : </span>ahmad</p>
                    <div className="absolute top-1 right-1">
                        <ClearIcon/><br/>
                        <EditIcon/>

                    </div>
                    
                </div>

                <div className="bg-white p-3 rounded-xl basis-60 border-2 border-slate-100 h-28 relative classmate">
                    <h3 className="font-bold">Computer scince</h3>
                    <p className="mt-2.5 mb-3.5">lk 8 hgb 6</p>
                    <hr/>
                    <p className="mt-2"><span className="font-bold">Mr : </span>ahmad</p>
                    <div className="absolute top-1 right-1">
                        <ClearIcon/><br/>
                        <EditIcon/>

                    </div>
                    
                </div>
                <div className="bg-white p-3 rounded-xl basis-60 border-2 border-slate-100 h-28 relative classmate">
                    <h3 className="font-bold">Computer scince</h3>
                    <p className="mt-2.5 mb-3.5">lk 8 hgb 6</p>
                    <hr/>
                    <p className="mt-2"><span className="font-bold">Mr : </span>ahmad</p>
                    <div className="absolute top-1 right-1">
                        <ClearIcon/><br/>
                        <EditIcon/>

                    </div>
                    
                </div>
                <div className="bg-white p-3 rounded-xl basis-60 border-2 border-slate-100 h-28 relative classmate">
                    <h3 className="font-bold">Computer scince</h3>
                    <p className="mt-2.5 mb-3.5">lk 8 hgb 6</p>
                    <hr/>
                    <p className="mt-2"><span className="font-bold">Mr : </span>ahmad</p>
                    <div className="absolute top-1 right-1">
                        <ClearIcon/><br/>
                        <EditIcon/>

                    </div>
                </div>

                
            </div>
        </div>
        <button style={{padding: "10px 20px",color:"white",backgroundColor:"green",borderRadius:"12px",display:"block",margin: "-15px  auto 10px"}}>حفظ</button>
        </div>
    )
}