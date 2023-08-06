export interface UserContact {
  id: string,
  createdAt: number,
  first?: string,
  last?: string,
  avatar?: string,
  twitter?: string,
  notes?: string,
  favorite?: boolean,
}

export interface ContactsLoader {
  contacts: UserContact[],
  q: string
}

export interface ContactLoader {
  contact: UserContact | null
}