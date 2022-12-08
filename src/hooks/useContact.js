import { useRouteLoaderData, useParams } from "react-router-dom";

export default function useContact() {
  const { contacts } = useRouteLoaderData("root");

  // we get the id from the dynamic param of the current page/route's url.
  const { id } = useParams();

  // return correct contact
  return contacts.find((contact) => contact.id === id);
}
