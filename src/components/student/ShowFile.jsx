import axios from "axios";
import { useContext, useEffect, useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { PopUp } from "../../App";
const ShowFile = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [re, setre] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");
  const { setclick } = useContext(PopUp);

  useEffect(() => {
    const getData = async () => {
      //setclick([0, 0, 0, 0, 0, 1]);
      try {
        const response = await axios.get(`${apiUrl}showFiles`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          //setclick([0]);
          //   setclick([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);

          response;
          setData(response.data.data);
        }
      } catch (e) {
        setError(e.message);
        e;
      }
    };
    getData();
  }, [re]);
  const handleDelete = async (id) => {
    id;

    try {
      //   setclick([0, 0, 0, 0, 0, 1]);
      const response = await axios.post(
        `${apiUrl}deleteFile`,
        {
          id: id,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      response;
      if (response.data.status) {
        // setclick([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]);
        setre((i) => i + 1);
        // setMessage(response.data.message)
      }
    } catch (e) {
      // setclick([0])
      e;
    }
  };
  return (
    <div>
      {data[0] && (
        <div className="flex flex-wrap text-right justify-start border-r-2 p-10 overflow-auto w-fit max-h-96 max-w-96">
          {data.map((item, index) => (
            <div className="flex items-center gap-10 justify-center  p-4 border-b">
              <div>
                <h2>المادة:{item.subject_id.name}</h2>
                <h2>
                  الشعب:
                  {item.classes_id.map((item1, index1) => (
                    <h2>
                      {item1.name} {item1.section}
                    </h2>
                  ))}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                <a href={item.url} className="cursor-pointer">
                  تنزيل
                </a>
                <button
                  className="text-red-700 "
                  onClick={() => handleDelete(item._id)}
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowFile;
