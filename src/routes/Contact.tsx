import React from 'react'
import { ContactLoader, UserContact } from '../models'
import Favorite from './Favorite'
import { getContact, updateContact } from '../contacts'
import { 
  LoaderFunctionArgs,
  ParamParseKey,
  Params,
  useLoaderData,
  Form,
  ActionFunction,
  LoaderFunction
} from 'react-router-dom'
import { Link } from 'react-router-dom'

/**
 * Loader function
 * 
 * Loader Function for the contact details
 * @param param0 
 * @returns contact object or null
 */
export const loader: LoaderFunction = async ({ params }) => {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}

/**
 * Update favorite
 * 
 * @param param0 request, params
 * @returns updated
 */
export const action: ActionFunction = async ({ request, params }) => {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });

}

const Contact: React.FC = () => {

  const { contact }: ContactLoader = useLoaderData() as ContactLoader;
  
  return (
    <div id="contact">
      <div>
        <img
          key={contact? contact.avatar: 1}
          src={contact? contact.avatar: ""}
        />
      </div>

      <div>
        <h1>
          {contact && (contact.first || contact.last) ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact && contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {(contact) && contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">
              Edit
            </button>
          </Form>
          <Form
            method='post'
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Contact