import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { URL } from "../lib/server";
import { addSingleWorkout } from "../redux/reducers/dataReducer";
import { RootState } from "../redux/store";
const CreateWorkout = () => {
  const userLogged = useSelector((state: RootState) => state.data.userLogged);
  const dispatch = useDispatch();
  const [title, setTitle] = useState<String>("");
  const [load, setLoad] = useState<string | number>("");
  const [reps, setreps] = useState<string | number>("");
  const [error, setError] = useState<String>("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    if (!userLogged) {
      setError("please login before add new workout");
      return;
    }
    if (title === "" || load === "" || reps === "") {
      setError("please fill all data");
      return;
    }
    const workout = { title, load, reps };
    const request = await fetch(URL + "api", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request.json();
    if (!request.ok) {
      setError(response.error);
    }
    if (request.ok) {
      dispatch(addSingleWorkout(response));
      setTitle("");
      setreps("");
      setLoad("");
      setError("");
    }
  };
  return (
    <div className="w-full lg:h-[100vh] p-6 text-2xl capitalize shadow-md bg-slate-200 rounded-sm">
      <form onSubmit={handleSubmit}>
        <label>Tiltle:</label>
        <input
          className="w-[90%] px-2 my-3"
          type="text"
          value={String(title)}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>load:</label>
        <input
          className="w-[90%] px-2 my-3"
          type="number"
          value={load}
          onChange={(e) => setLoad(e.target.value)}
        />
        <label>reps:</label>
        <input
          className="w-[90%] px-2 my-3"
          type="number"
          value={reps}
          onChange={(e) => setreps(e.target.value)}
        />
        <button className="btn">add new workout</button>
        {error.length > 0 ? (
          <div className="border rounded-md shadow-md p-2 text-red-500 capitalize my-6">
            {error}
          </div>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default CreateWorkout;
