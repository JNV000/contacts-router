import useQ from "@hooks/useQ";
import { Link, useLoaderData } from "react-router-dom";

export default function Nav() {
  const { contacts } = useLoaderData();
  const q = useQ(); // get the query

  // Only filter if there is a query string
  const filteredContacts = q
    ? contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(q.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(q.toLowerCase())
      )
    : contacts;
  /*
   * if we have the query string we filter it.
   * For each contact we take either the first or lastname... ???
   *
   */

  //
  return (
    <nav className="grow border-y-2 border-gray-300 py-2">
      <ul>
        {filteredContacts.map((contact) => {
          return (
            <li key={contact.id} className="pointer my-4 hover:text-blue-500">
              <Link to={`/contacts/${contact.id}`}>
                {contact.firstName} {contact.lastName}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
