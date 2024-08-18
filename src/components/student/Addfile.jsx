import { React, useState, useEffect, useContext } from "react";
import { PopUp } from "../../App";
import axios from "axios";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export const Addfile = () => {
  const { click, tclick, setclick } = useContext(PopUp);

  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState();
  const [classes, setClasses] = useState({});
  const [classes2, setClasses2] = useState([]);
  const [class_id, setClass_id] = useState("");
  const [subject, setSubject] = useState({});
  const [subject2, setSubject2] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/showClasses`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setClasses(response.data?.data);
      } catch (e) {
        setError(e.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}showStudentsAndSubjectForClass`,
          { class_id: class_id },
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        response;
        //  (response1)
        setSubject(response.data.subject);
      } catch (e) {
        e;
        setError(e.message);
      }
    };
    getData();
  }, [class_id]);

  const handelClass = (e) => {
    setClasses2((i) => [...i, e.target.value]);
    const classesId = classes.filter((s) => s.name === e.target.value)[0];
    setClass_id(classesId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const classesId = classes2.map(
      (i) => classes.filter((s) => s.name === i)[0]
    );
    classesId.map((i) => i._id);

    const formDataToSend = new FormData();
    Promise.all(
      formDataToSend.append("file", file),
      formDataToSend.append("name", name),
      formDataToSend.append("subject_id", subject2)
    );
    classesId.map((i, ii) => {
      formDataToSend.append(`classes_id[${ii}]`, i._id);
    });

    formDataToSend;

    try {
      setclick([0, 0, 0, 0, 0, 1]);
      const response = await axios.post(`${apiUrl}addFile`, formDataToSend, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setclick([0, 0, 0, 0, 1]);
        setMessage(response.data.message);
      }
    } catch (e) {
      e;
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-center text-l mt-6">إضافة ملف</h2>
        <div className="max-h-[90vh] overflow-auto bg-white pt-12 px-12 pb-6 text-[13px] addstu  ">
          <div className="flex justify-center">
            <form onSubmit={handleSubmit} className="w-2/3 flex flex-col gap-5">
              <div>
                <label>اسم الملف</label>
                <input
                  type="text"
                  placeholder="اسم الملف"
                  className="w-full"
                  name="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>الصف</label>
                <select className="w-full" onChange={handelClass}>
                  <option value="">اختر</option>
                  {classes[0] &&
                    [...new Set(classes.map((i) => i.name))].map(
                      (item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      )
                    )}
                </select>
              </div>
              <div>
                {classes2[0] &&
                  classes2.map((i) => <span className="p-2">{i}</span>)}
              </div>
              <div>
                <label>المادة</label>
                <select
                  className="w-full"
                  name="subject_id"
                  onChange={(e) => setSubject2(e.target.value)}
                >
                  <option value="">اختر</option>
                  {subject[0] &&
                    subject.map((item, index) => (
                      <option key={index} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label>اختر ملف</label>
                <input
                  type="file"
                  className="w-full"
                  name="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />

                <button className="adding mx-auto mt-7" type="submit">
                  إضافة
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
