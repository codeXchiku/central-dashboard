import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";

// Register all Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

const Dashboard = () => {
  const [isOn, setIsOn] = useState(false);
  const [blink, setBlink] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Set the current time as the default start time
  useEffect(() => {
    const currentTime = new Date().toISOString().substring(11, 16);
    setStartTime(currentTime);
  }, []);

  // Effect for blinking the light when toggle is ON
  useEffect(() => {
    let interval;
    if (isOn) {
      interval = setInterval(() => {
        setBlink((prev) => !prev);
      }, 500);
    } else {
      setBlink(false);
    }
    return () => clearInterval(interval);
  }, [isOn]);

  // Chart data and options
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Data",
        data: [3, 5, 2, 8, 6, 7], // Y-axis data
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "category",
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div
      className="container-fluid my-5 p-3"
      style={{ backgroundColor: "#EAFBFF", borderRadius: "10px" }}
    >
      {/* Upper Section - Buttons and Time Inputs */}
      <div
        className="mb-4 p-4 rounded"
        style={{
          backgroundColor: "white",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Toggle Button */}
        <div className="d-flex justify-content-center mb-3">
          <div className="d-flex align-items-center">
            <label
              htmlFor="toggle-switch"
              className="me-2"
              style={{ fontSize: "20px" }}
            >
              {isOn ? "ON" : "OFF"}
            </label>
            <input
              type="checkbox"
              id="toggle-switch"
              className="d-none"
              checked={isOn}
              onChange={() => setIsOn(!isOn)}
            />
            <label
              htmlFor="toggle-switch"
              className={`d-inline-block rounded-pill bg-${
                isOn ? "success" : "danger"
              } position-relative`}
              style={{
                width: "80px",
                height: "40px",
                transition: "background-color 0.4s",
                cursor: "pointer",
              }}
            >
              <span
                className={`bg-white rounded-circle position-absolute`}
                style={{
                  height: "32px",
                  width: "32px",
                  top: "4px",
                  left: isOn ? "44px" : "4px",
                  transition: "left 0.4s",
                }}
              ></span>
            </label>
          </div>
        </div>

        {/* Time Pickers */}
        <div className="d-flex justify-content-center mb-4">
          <div className="d-flex flex-column align-items-center">
            <label
              htmlFor="start-time"
              className="mb-2"
              style={{ fontSize: "20px", fontWeight: "500" }}
            >
              Start Time
            </label>
            <input
              type="time"
              id="start-time"
              className="form-control me-2"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{
                width: "145px",
                fontSize: "20px",
                padding: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "lightblue",
              }}
            />
          </div>

          <div className="d-flex flex-column align-items-center">
            <label
              htmlFor="end-time"
              className="mb-2"
              style={{ fontSize: "20px", fontWeight: "500" }}
            >
              End Time
            </label>
            <input
              type="time"
              id="end-time"
              className="form-control me-2"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{
                width: "145px",
                fontSize: "20px",
                padding: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                backgroundColor: "lightblue",
              }}
            />
          </div>

          <button
            className="btn btn-success"
            style={{
              height: "50px",
              width: "80px",
              fontSize: "20px",
              padding: "10px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#4ee44e",
              color : "black",
              border: "none",
              borderRadius: "5px",
              marginTop : "38px"
            }}
          >
            Start
          </button>
        </div>
      </div>

      {/* Lower Section - Charts */}
      <div className="row align-items-center mt-5">
        {/* Chart for R */}
        <div className="col">
          <div className="mb-3 mt-5" style={{ height: "200px" }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          <div
            className="light"
            style={{
              backgroundColor: isOn ? "red" : "#FFCCCC",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              margin: "0 auto",
            }}
          ></div>
          <p>R</p>
        </div>

        {/* Chart for Y */}
        <div className="col">
          <div className="mb-3 mt-5" style={{ height: "200px" }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          <div
            className="light"
            style={{
              backgroundColor: isOn ? "red" : "#FFCCCC",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              margin: "0 auto",
            }}
          ></div>
          <p>Y</p>
        </div>

        {/* Chart for B */}
        <div className="col">
          <div className="mb-3 mt-5" style={{ height: "200px" }}>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
          <div
            className="light"
            style={{
              backgroundColor: isOn ? "red" : "#FFCCCC",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              margin: "0 auto",
            }}
          ></div>
          <p>B</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
