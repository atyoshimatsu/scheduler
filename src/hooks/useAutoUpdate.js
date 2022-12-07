import { SET_INTERVIEW, SET_DAYS } from "../constants/constants";

/**
 * webSokcet listenes on message
 * @param {dispatch} disoatch
 * @returns {undefined}
 */
const useAutoUpdate = dispatch => {
  const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
  ws.onmessage = e => {
    const data = JSON.parse(e.data);
    if (data.type === SET_INTERVIEW) {
      dispatch({
        type: SET_INTERVIEW,
        id: data.id,
        interview: data.interview ?? null,
      });
      dispatch({
        type: SET_DAYS,
        id: data.id,
      });
    }
  };
};

export default useAutoUpdate;
