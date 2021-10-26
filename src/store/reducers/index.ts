import  recordReducer  from './recordReducer';
import { RecordState } from './../../types/record';
import { CategoryState } from './../../types/category';
import { UserState } from './../../types/user';
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import categoryReducer from './categoryReducer';

 export interface AppState {
   user : UserState,
   categories:CategoryState,
   records:RecordState
 }
//  reducerlarımızı oluşturduk ve type kullandıgmız için app imizin typelarını belirledik
const rootReducer = combineReducers<AppState>({
  user: userReducer,
  categories : categoryReducer,
  records : recordReducer
});

export default rootReducer