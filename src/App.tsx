import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import IndexPage from "./pages/IndexPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/:id",
    element: <DetailPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
