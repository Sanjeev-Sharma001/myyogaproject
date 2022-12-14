import "./styles.css";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import axios from "axios";
export default function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [isPaid, setPaid] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    age: "",
    joiningDate: "",
    batch: ""
  });

  const completePayment = async () => {
    try {
      if (vadilateData(formData)) {
        if (!isPaid) {
          enqueueSnackbar("Please complete the payment", { variant: "error" });
          return;
        }
        const data = formData;
        console.log(data);
        const res = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          data
        );
        enqueueSnackbar("Registered successfully", { variant: "success" });
        setFormData({
          username: "",
          age: "",
          joiningDate: "",
          batch: ""
        });
        return res;
      }
    } catch (e) {
      enqueueSnackbar("Oops!! Something wrong", { variant: "error" });
    }
  };

  const handlePayment = () => {
    setPaid(true);
    enqueueSnackbar("Payment Completed", { variant: "success" });
  };

  const handleForm = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const vadilateData = (data) => {
    if (!data.username) {
      enqueueSnackbar("Please enter your name", { variant: "error" });
      return false;
    } else if (!data.age) {
      enqueueSnackbar("Please enter your age", { variant: "error" });
      return false;
    } else if (data.age < 18 || data.age > 65) {
      enqueueSnackbar("Candidate must be in between 18-65", {
        variant: "error"
      });
      return false;
    } else if (!data.joiningDate) {
      enqueueSnackbar("Please enter joining Date", { variant: "error" });
      return false;
    } else if (!data.batch) {
      enqueueSnackbar("Please select your batch", { variant: "error" });
      return false;
    }

    return true;
  };
  return (
    <div className="App form">
      <h1>Register for Yoga Class</h1>
      <label>Name:</label>
      <input
        name="username"
        onChange={(e) => handleForm(e)}
        value={formData.username}
      />
      <br />
      <label>Age: </label>
      <input
        name="age"
        type="number"
        onChange={(e) => handleForm(e)}
        value={formData.age}
      />
      <br />
      <label>Joining Date: </label>
      <input
        name="joiningDate"
        type="date"
        onChange={(e) => handleForm(e)}
        value={formData.joiningDate}
      />
      <br />
      <label>Select Batch: </label>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        name="batch"
        label="batch"
        value={formData.batch}
        onChange={(e) => handleForm(e)}
        autoWidth
      >
        <MenuItem value={"6-7am"}>6 AM - 7 AM</MenuItem>
        <MenuItem value={"7-8am"}>7 AM - 8 AM</MenuItem>
        <MenuItem value={"8-9am"}>8 AM - 9 AM</MenuItem>
        <MenuItem value={"5-6pm"}>5 PM - 6 PM</MenuItem>
      </Select>
      <br />
      <label>Fee 500/-. Proceed to payment: </label>
      <button onClick={handlePayment}>Pay amount</button>
      <br />
      <Button variant="contained" onClick={completePayment}>
        Join Class
      </Button>
    </div>
  );
}
