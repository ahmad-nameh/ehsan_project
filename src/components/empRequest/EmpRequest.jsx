import { useContext } from "react";
import { PopUp } from "../../Home";
import EmpRequestMain from "./EmpRequestMain";
import EmpRequestSec from "./EmpRequestSec";
import EmpRequestThe from "./EmpRequestThe";
import EmpRequestForth from "./EmpRequestForth";
import EmpRequestExp from "./EmpRequestExp";

function EmpRequest() {
  const { tClick } = useContext(PopUp);
  return (
    <>
      {tClick[0] ? (
        <EmpRequestMain />
      ) : tClick[1] ? (
        <EmpRequestSec />
      ) : tClick[2] ? (
        <EmpRequestThe />
      ) : tClick[3] ? (
        <EmpRequestForth />
      ) : tClick[4] ? (
        <EmpRequestExp />
      ) : null}
    </>
  );
}

export default EmpRequest;
