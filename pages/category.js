
import { getDataAction } from '../src/redux/action/authAction'
import { useDispatch, useSelector } from "react-redux";

export default function category() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.data);
  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={()=>dispatch(getDataAction(1))}
        >
          +
        </button>
      </div>
    </div>
  )
}
