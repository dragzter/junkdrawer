export interface IUser {
  name: string // String is shorthand for {type: String}
  id: string // The ID the user came with
  local_id?: string
  email: string
  picture: string
  nickname?: string
  custom_avatar_url?: string
  junkdrawer_images?: { [key: string]: JunkImages }
  custom_attributes?: { [key: string]: string }
  disabled?: boolean
  email_verified?: boolean
  rank?: string
}

interface JunkImages {
  likes: string
  id: string
  name: string
}
