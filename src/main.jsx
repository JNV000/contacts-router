import capitalize from "lodash.capitalize";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Contact from "./routes/Contact";
import Error from "./routes/Error";
import Root from "./routes/Root";
import apiService from "./services/api.service";

const createContact = async ({ request }) => {
  const fd = await request.formData();

  // Separate the first and last name from 'q' query parameter
  const [firstName, lastName] = fd.get("q").split(" ");

  const { id } = await apiService.createContact({
    firstName: capitalize(firstName),
    lastName: capitalize(lastName),
  });

  return redirect(`contacts/${id}`);
};

// const loadContacts = async ({ request }) => {
const loadContacts = async () => {
  const contacts = await apiService.getContacts();
  return { contacts };
};
// so we get all the contacts

// Keep this outside of component scope so it's not recreated on every render
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: loadContacts,
    shouldRevalidate: ({ currentParams, nextUrl }) =>
      !currentParams.id && !nextUrl.searchParams.get("q"),
    // minimize number of fetch requests
    // otherwise typing in the search bar would keep rerendering and fetching
    // if the next url involves a query do not revalidate
    // Don't revalidate if the next url is just an update to the search
    // Don't revalidate if  this is just clicking on a contact (:id)
    action: createContact,
    children: [
      {
        path: "contacts/:id",
        element: <Contact />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
