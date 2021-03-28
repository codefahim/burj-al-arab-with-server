import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { UserContext } from "../../App";
import Bookings from "../Bookings/Bookings";

const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
    checkOut: new Date(),
  });

  //connecting to server
  const handleBooking = () => {
    const bookings = { ...loggedInUser, ...selectedDate };
    console.log(bookings);

    fetch(`http://localhost:5000/addBooking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookings),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const handleCheckIn = (date) => {
    const newDate = { ...selectedDate };
    newDate.checkIn = date;
    setSelectedDate(newDate);
  };
  const handleCheckOut = (date) => {
    const newDate = { ...selectedDate };
    newDate.checkOut = date;
    setSelectedDate(newDate);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Let's book a {bedType} Room.</h1>
      <p>
        Want a <Link to="/home">different room?</Link>{" "}
      </p>

      {/* material ui */}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="CheckIn date"
            value={selectedDate.checkIn}
            onChange={handleCheckIn}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Check Out Date"
            format="dd/MM/yyyy"
            value={selectedDate.checkOut}
            onChange={handleCheckOut}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Button variant="contained" color="primary" onClick={handleBooking}>
          Book Now
        </Button>
      </MuiPickersUtilsProvider>

      <Bookings></Bookings>
    </div>
  );
};

export default Book;
