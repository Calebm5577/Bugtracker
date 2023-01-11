import React from "react";
// import  HiPlus  from "react-icons/fa";

export function SideBar() {
  return (
    <div
      style={{
        display: "flex",
        height: "80vh",
        width: "10vw",
        maxWidth: "200px",
        flexDirection: "column",
        border: "1px solid red",
        justifyContent: "space-between",
      }}
    >
      <button
        style={{
          border: "1px solid blue",
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
        }}
      >
        <div style={{ color: "green", fontSize: "48px" }}>+</div>
      </button>
      <div
        style={{
          border: "1px solid blue",
          height: "80%",
        }}
      >
        WORKSPACES
      </div>

      <div
        style={{
          border: "1px solid blue",
          height: "10%",
        }}
      >
        USER
      </div>
    </div>
  );
}
