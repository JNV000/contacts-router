// import { Link, useOutletContext, useParams } from "react-router-dom";
import { Form, Link, useRouteLoaderData, useParams } from "react-router-dom";
import useContact from "@hooks/useContact";

export default function Contact() {
  /*
  const { contacts } = useOutletContext();
  // we get the list of contacts from the parent. Is Nav the parent in this case?
  */
  const clickedContact = useContact();
  // we find the contact with the matching id to display them

  return (
    <section className="flex gap-x-6 pt-8">
      <img
        src={clickedContact.avatar}
        alt={clickedContact.name}
        className="h-48 w-48 rounded-xl"
      />

      <div className="flex h-min flex-col gap-y-2">
        <header>
          <h2 className="text-3xl font-black">
            {clickedContact.firstName} {clickedContact.lastName}{" "}
            {clickedContact.isFav ? "★" : "☆"}
          </h2>
          <h3 className="text-2xl text-sky-500">{clickedContact.twitter}</h3>
        </header>

        <p>{clickedContact.notes}</p>

        <div className="mt-4 flex gap-x-4">
          <Link
            to={`/contacts/${clickedContact.id}/edit`}
            className="button text-blue-500"
          >
            Edit
          </Link>
          <Form method="post" action={`/contacts/${clickedContact.id}/delete`}>
            <button type="submit" className="button text-red-500">
              Delete
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
}
