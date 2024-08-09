import { useContext } from "react";
import { PopUp } from "../../Home";
import TeachingReMain from "./TeachingReMain";
import TeachingReSec from "./TeachingReSec";
import TeachingReThe from "./TeachingReThe";
import TeachingReForth from "./TeachingReForth";
import TeachingReExp from "./TeachingReExp";

function TeachingRequest() {
  const { tClick } = useContext(PopUp);

  return (
    <>
      {tClick[0] ? (
        <TeachingReMain />
      ) : tClick[1] ? (
        <TeachingReSec />
      ) : tClick[2] ? (
        <TeachingReThe />
      ) : tClick[3] ? (
        <TeachingReForth />
      ) : tClick[4] ? (
        <TeachingReExp />
      ) : null}
    </>
  );
}

export default TeachingRequest;
