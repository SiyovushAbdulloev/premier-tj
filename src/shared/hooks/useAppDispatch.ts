import {useDispatch} from "react-redux";
import {AppDispatch} from "src/app/providers/Store";

export const useAppDispatch = () => useDispatch<AppDispatch>()