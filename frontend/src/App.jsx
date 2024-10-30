import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainDrawer from "./components/MainDrawer";
import TableLayout from "./page/TableLayout";
import TableHome from "./page/TableHome";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainDrawer />,
      children: [
        {
          index: true,
          element: <TableHome />,
        },
        {
          path: "tables",
          element: <TableLayout />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
