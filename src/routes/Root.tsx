import React, { useEffect } from 'react'
import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  ActionFunction,
  NavLink,
  useNavigation,
  LoaderFunction,
  useSubmit,
} from 'react-router-dom'
import { createContact, getContacts } from '../contacts'
import { ContactsLoader, UserContact } from '../models'

/**
 * Get contacts loader function
 * @returns array of contacts object
 */
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q }
}

/**
 * Create contact action
 * 
 * @returns a redirect to the edit page
 */
export const action: ActionFunction = async () => {
  const contact: UserContact = await createContact()
  return redirect(`/contacts/${contact.id}/edit`);
}

const Root: React.FC = () => {

  const temp: ContactsLoader = { contacts: [], q: "" }

  const loaderData = useLoaderData();
  const contactsLoader = loaderData as ContactsLoader | undefined; // Type assertion with optional chaining

  if (contactsLoader) {
    temp.contacts = contactsLoader.contacts
    temp.q = contactsLoader.q
  }

  const { contacts, q }: ContactsLoader = temp
  const navigation = useNavigation()
  const submit = useSubmit()
  const searching = navigation.location &&
    new URLSearchParams(navigation.location.search).has(
      "q"
    );


  // To change the input text when the user goes back to a previous page
  useEffect(() => {
    const searchBar = document.getElementById("q") as HTMLInputElement

    if(searchBar) {
      searchBar.value = q
    }
  }, [q])
  

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                })
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </Form>

          {/* 
          The Form element uses the old school web system, which means 
          when it is submitted it sends a 'hint' to the Router which updates the pages 
          as soon as the action function is executed. That updates the whole page.
          */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                          ? "pending"
                          : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div 
      id="detail"
      className={
        navigation.state === "loading"?"loading":""
      }
      >
        <Outlet />
      </div>
    </>
  )
}

export default Root