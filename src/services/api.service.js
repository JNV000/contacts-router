import ky from "ky";

const BASE_URL = "http://localhost:3001/users";

export default {
  getContacts: async () => {
    return await ky.get(BASE_URL).json();
    // so this returns the entire 'db', since it just asks for the Base url that holds the DB
  },
  getContact: async (id) => {
    // we are not using this one in this version.
    return await ky.get(`${BASE_URL}/${id}`).json();
    // this returns an entry in the db with the matching id?
  },
  createContact: async (contact) => {
    return await ky.post(BASE_URL, { json: contact }).json();
    // this accepts the data for a new entry/contact and creates it
  },
  updateContact: async (contact) => {
    return await ky.put(`${BASE_URL}/${contact.id}`, { json: contact }).json();
    // this one looks the most complex
  },
  deleteContact: async (id) => {
    return await ky.delete(`${BASE_URL}/${id}`).json();
    // this deletes the entry with a matching id.
  },
};
// this is definitely simplifying things.
