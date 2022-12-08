import useQ from "@/hooks/useQ";
import { Form, useSubmit } from "react-router-dom";

export default function SearchCreateForm() {
  const submit = useSubmit();

  const q = useQ();

  return (
    <Form
      className="flex px-4"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.target, { method: "post" }); // submit must be done before submit to tranfer input
        e.target.reset();
      }}
    >
      <input
        id="q"
        aria-label="Search contacts"
        placeholder="🔍 Search"
        type="search"
        // Upon submission, 'name' will be a query parameter in the URL
        name="q"
        className="mr-4 border-none font-extralight shadow"
        defaultValue={q}
        onChange={(e) => {
          submit(e.currentTarget.form, { method: "get" });
        }}
      />
      <button type="submit" className="bg-sky-500 px-4 py-2 text-white">
        New
      </button>
    </Form>
  );
}
// so this is where the 'q' comes from?
