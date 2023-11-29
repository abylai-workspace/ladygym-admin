import React from "react";
import "./styles.css";
export const NotCard = () => {
  return (
    <div className="card-container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h5 style={{ color: "white", margin: 10, marginTop: "0%" }}>imahe</h5>
        <div>
          <h6>Тренер - Артыкбай Аида</h6>
          <h6>
            Изменение: <br />
            Расписание - 10:00 - 19:00, <br />
            понедельник, среда, пятница.
          </h6>
          <h6>Внесла: Молдир Арманова</h6>
        </div>
      </div>
      <div
        style={{
          borderColor: "white",
          borderWidth: 1,
          borderRadius: 10,
          borderStyle: "solid",
        }}
      />
    </div>
  );
};
