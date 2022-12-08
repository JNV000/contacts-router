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
import EditForm from "./components/EditForm";

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

// const editContact = async ({ edittedContact }) => {
const editContact = async ({ request, params }) => {
  // await apiService.editContact(edittedContact);

  // get form data from submit
  const fd = await request.formData();

  // turn form data into object
  const updatedContact = Object.fromEntries(fd.entries());

  // send the object to be put into the db
  await apiService.updateContact({
    id: params.id,
    ...updatedContact,
  });
  // id must come from params as it is not a form input

  // return redirect(`contacts/${edittedContact.id}`);
  return redirect(`/contacts/${params.id}`);
  // best to include / and use an absolute path
};

const deleteContact = async ({ params }) => {
  await apiService.deleteContact(params.id);
  redirect("/");
};

// Keep this outside of component scope so it's not recreated on every render
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    loader: loadContacts,
    // Prevent unnecessary database calls
    shouldRevalidate: ({ currentParams, currentUrl, nextUrl }) => {
      if (currentUrl.pathname.endsWith("edit")) return true;

      // Don't revalidate if this is just an update to the 'q' query parameter
      // Don't revalidate if this is just clicking on a contact (:id)
      return !currentParams.id && !nextUrl.searchParams.get("q");
    },
    /*
    shouldRevalidate: ({ currentParams, nextUrl }) =>
      !currentParams.id && !nextUrl.searchParams.get("q"),
    // minimize number of fetch requests
    // otherwise typing in the search bar would keep rerendering and fetching
    // if the next url involves a query do not revalidate
    // Don't revalidate if the next url is just an update to the search
    // Don't revalidate if  this is just clicking on a contact (:id)
    */
    action: createContact,
    id: "root",
    // These will be rendered in teh root outlet
    // :id can be accessed
    children: [
      {
        path: "contacts/:id",
        element: <Contact />,
      },
      {
        path: "contacts/:id/edit",
        element: <EditForm />,
        action: editContact,
      },
      {
        path: "contacts/:id/delete",
        action: deleteContact,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
