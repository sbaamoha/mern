import { addWorkout, deleteWorkout } from "../redux/reducers/dataReducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { URL } from "../lib/server";

interface WorkoutType {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  load: number;
  reps: number;
}
interface Props {
  key: string;
  workout: WorkoutType;
}

const WorkoutDetails: React.FC<Props> = ({ workout }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      const request = await fetch(URL + "api/" + workout._id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      const response = await request.json();
      dispatch(deleteWorkout(response));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative p-3 lg:p-6 shadow-md capitalize rounded-md text-lg">
      <h2 className="text-3xl text-green-300">{workout.title}</h2>
      <p className="py-2">reps: {workout.reps}</p>
      <p>load: {workout.load}</p>
      <p
        onClick={handleDelete}
        className="text-sm text-white absolute top-[70%] lg:top-1  right-1 px-2 py-1 rounded-2xl bg-red-500 cursor-pointer"
      >
        delete
      </p>
    </div>
  );
};

export default WorkoutDetails;
