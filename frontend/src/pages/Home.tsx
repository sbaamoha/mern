import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store.js";
import { addWorkout } from "../redux/reducers/dataReducer.js";
import CreateWorkout from "../components/CreateWorkout";
import WorkoutDetails from "../components/WorkoutDetails";
import { Link } from "react-router-dom";
import { URL } from "../lib/server.js";
type Workout = {
  _id: string;
  title: string;
  load: number;
  reps: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Home = () => {
  const data = useSelector((state: RootState) => state.data);
  const dispatch = useDispatch();
  const userLogged = localStorage.getItem("user");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL + "api");
      const data = await response.json();
      if (response.ok) {
        dispatch(addWorkout(data));
      }
    };
    fetchData();
  }, []);
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-10">
        <div className="order-last lg:-order-1 col-span-2 px-6 lg:px-12">
          {userLogged !== null ? (
            data.workouts &&
            data.workouts.map((workout) => (
              <WorkoutDetails key={workout._id} workout={workout} />
            ))
          ) : (
            <div className="capitalize text-2xl my-12 p-6 shadow-lg rounded-lg">
              <h2>please login so you can see and add workouts</h2>
              <Link to="/login">
                <button className="btn">login</button>
              </Link>
            </div>
          )}
        </div>
        <div className="">
          <CreateWorkout />
        </div>
      </div>
    </div>
  );
};

export default Home;
