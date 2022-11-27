import reducer from "./application";

describe("Reducer", () => {
  it("throws an error with an unsupported type", () => {
    const state = { day: "Monday", days: [], appointments: {}, interviewers: {} };
    const action = { type: null };
    expect(() => reducer(state, action)).toThrowError(
      /Tried to reduce with unsupported action type/i
    );
  });
});
