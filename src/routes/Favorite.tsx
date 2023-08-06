import React from 'react'
import { UserContact } from '../models'
import { Form } from 'react-bootstrap'
import { useFetcher } from 'react-router-dom'

interface Props {
  contact: UserContact | null
}

const Favorite: React.FC<Props> = ({ contact }) => {

  let favorite: boolean | undefined | null = contact? contact.favorite : null
  const fetcher = useFetcher()

  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  )
}

export default Favorite