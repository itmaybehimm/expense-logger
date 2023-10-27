import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//You aren't required to do this, but it's a nice convenience factor, and can prevent some errors later.

// Normally, you'd have to do this in every component file:

// import { RootState, AppDispatch } from "app/store";
// import { useSelector, useDispatch } from "react-redux";

// function MyComponent() {
//   # Specifically mark the `state` arg as being of type RootState
//   const todos = useSelector( (state: RootState) => state.todos);

//   # Specifically mark `dispatch` as being a type that understands thunks
//   const dispatch : AppDispatch = useDispatch();
// }

// ### ask chatgpt for detailed explanation
//export const useAppDispatch: () => AppDispatch = useDispatch;
//In this line, useAppDispatch is defined as a function that returns an AppDispatch type. This is typically used when you want to create a custom hook that returns a function for dispatching actions, making it more explicit and type-safe.

//export const useAppDispatch: AppDispatch = useDispatch;
// In this line, useAppDispatch is directly assigned the value of useDispatch, without specifying that it's a function. This is not the typical way to create a custom hook for dispatching actions, as it loses the type information about the function that dispatches actions.

// export const useAppDispatch: () => AppDispatch = useDispatch; suggests useAppDispatch is a function and  () => AppDispatch, indicating that useAppDispatch is a function that returns an AppDispatch
// export const useAppDispatch: AppDispatch = useDispatch; suggests it is a variable
