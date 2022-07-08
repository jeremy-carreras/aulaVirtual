import { Spinner } from "react-bootstrap";
import styles from "./spinnerLoading.module.css";

const SpinnerLoading = (props) => {
  return (
    <div>
      <Spinner
        animation="border"
        variant="dark"
        style={{ width: props.width, height: props.height, fontSize: props.fontSize }}
      />
    </div>
  );
};

export default SpinnerLoading;
