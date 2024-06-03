
import { Sidebar } from "./Sidebar/sidebar";
import { LineGraph } from "./Charts/line";
import { BarGraph } from "./Charts/bar";
import { PieGraph } from "./Charts/pie"
import { useState, useEffect } from "react";
import { get } from "mongoose";
import { AiFillFire } from "react-icons/ai";
import { FaFlagCheckered } from "react-icons/fa6";
import { MdOutlineCallMissedOutgoing } from "react-icons/md";

const adminAnalytics = () => {
  const [totalActivities, setTotalActivities] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);

  const [onProgress, setOnProgress] = useState(0);
  const [done, setDone] = useState(0);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/activities/total"
        ); // Assuming this is your API endpoint
        const data = await response.json();
        setTotalActivities(data.totalActivities);
        setTotalProjects(data.totalProjects); // Update totalProjects state
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  useEffect(() => {
    const fetchTaskStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/admin/task/TotalTasks"
        );
        const data = await response.json();
        setOnProgress(data.totalOnProgress);
        setDone(data.totalDone);
      } catch (error) {
        console.error("Error fetching task stats:", error);
      }
    };

    fetchTaskStats();
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="w-full h-full flex items-center justify-center p-7">
        <section className="w-full">
          <div className="flex items-center jsutify-center flex-col lg:grid lg:grid-col-4 lg:gap-4 lg:place-content-center lg:w-full lg:h-full">
            <div className="w-full flex-col mb-4 flex lg:flex-row items-center justify-between gap-4">
              <div className="stat shadow-md rounded-md bg-dark ">
                <div className="stat-figure text-primary text-2xl">
                  <AiFillFire />
                </div>
                <div className="stat-title text-white">Total Projects</div>
                <div className="stat-value text-primary">
                  {totalActivities}
                </div>{" "}
                {/* Display totalActivities */}
                <div className="stat-desc text-secondary">
                  Platoon's Total Projects.
                </div>
              </div>
              <div className="stat shadow-md rounded-md bg-dark">
                <div className="stat-figure text-success text-2xl">
                  <FaFlagCheckered />
                </div>
                <div className="stat-title text-white">Accomplished</div>
                <div className="stat-value text-success">{done}</div>
                <div className="stat-desc text-secondary">
                  Platoon's done projects.
                </div>
              </div>
              <div className="stat shadow-md rounded-md bg-dark">
                <div className="stat-figure text-red-400 text-2xl">
                  <MdOutlineCallMissedOutgoing />
                </div>
                <div className="stat-title text-white">On-Progress</div>
                <div className="stat-value text-red-400">{onProgress}</div>
                <div className="stat-desc text-secondary">
                  Platoon's On-going Projects.
                </div>
              </div>
            </div>
            <div className="w-full mb-4 row-span-2 shadow-md rounded-md lg:w-96 h-full p-3 flex flex-col items-center bg-dark">
              <h1 className="text-white text-xl font-bold mb-3">

                Progress Task

                Progress Activities

              </h1>
              <PieGraph />
            </div>
            <div className=" mb-4 col-row-2 shadow-md rounded-md w-full h-96 p-3 bg-dark">
              <h1 className="text-white text-xl font-bold">

                Top 10 Progress Activities

                Progress Activities

              </h1>
              <BarGraph />
            </div>
            <div className="col-span-2 shadow-md rounded-md w-full h-96 p-3 bg-dark">
              <h1 className="text-white text-xl font-bold">Every Year</h1>
              <LineGraph />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default adminAnalytics;
