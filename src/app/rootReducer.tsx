import { combineReducers } from "redux";
import sdkReducer from "src/features/sdksSlice";

const rootReducer = combineReducers({
    sdk: sdkReducer
})

export default rootReducer