import { Form, useParams, useRouteLoaderData } from "react-router-dom";
import Input from "./Input";

export default function EditForm() {
  const { contacts } = useRouteLoaderData("root");
  const { id } = useParams();

  const contact = contacts.find((contact) => contact.id === id);

  return (
    <Form className="flex flex-col gap-y-4 px-4 pt-8" method="post">
      <Input
        id="firstName"
        label="First Name"
        defaultValue={contact.firstName}
        labelClass="not-sr-only"
      />
      <Input
        id="lastName"
        label="Last Name"
        defaultValue={contact.lastName}
        labelClass="not-sr-only"
      />
      <Input
        id="avatar"
        label="Avatar"
        defaultValue={contact.avatar}
        labelClass="not-sr-only"
      />
      <Input
        id="twitter"
        label="Twitter"
        defaultValue={contact.twitter}
        labelClass="not-sr-only"
      />

      <button type="submit" className="bg-sky-500 px-4 py-2 text-white">
        Save
      </button>

      <button type="button" className="bg-yellow-500 px-4 py-2">
        Cancel
      </button>
    </Form>
  );
}
