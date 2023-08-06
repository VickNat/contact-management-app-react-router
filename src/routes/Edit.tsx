import React from 'react'
import { useLoaderData, Form, ActionFunction, redirect, useNavigate } from 'react-router-dom';
import { ContactLoader } from '../models';
import { updateContact } from '../contacts';

/**
 * Action function for the edit page
 * Uses the built in ActionFunction method for type declarations
 * @param param0 request, params
 * @returns a redirect to the edited contact's page
 */
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);  
  return redirect(`/contacts/${params.contactId}`);
}

const Edit: React.FC = () => {

  const { contact }: ContactLoader = useLoaderData() as ContactLoader;
  const navigate = useNavigate()

  return (
    <Form method="post" id="contact-form">
      <p>
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={(contact && contact.first) || ""}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={(contact && contact.last) || ""}
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={(contact && contact.twitter) || ""}
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={(contact && contact.avatar) || ""}
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={(contact && contact.notes) || ""}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button 
        type="button"
        onClick={() => {
          navigate(-1)
        }}
        >Cancel</button>
      </p>
    </Form>
  );
}

export default Edit