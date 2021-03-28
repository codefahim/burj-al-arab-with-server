import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:5000/bookings?email=` + loggedInUser.email, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBookings(data);
      });
  }, []);

  return (
    <div>
      {bookings.map((result) => (
        <div>
          <li>{result.name}</li>
          <li>{result.email}</li>
          <li>
            From:
            <code>{new Date(result.checkIn).toDateString("dd/mm/yyyy")}</code>
          </li>
          <li>
            To:
            <code>{new Date(result.checkOut).toDateString("dd/mm/yyyy")}</code>
          </li>
        </div>
      ))}
    </div>
  );
};

export default Bookings;
