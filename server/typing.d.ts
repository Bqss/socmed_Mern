
 interface User{
  _id: string,
  userName : string ,
  password : string,
  firstName: string ,
  lastName: string ,
  isAdmin: boolean ,
  profilePicture? : string,
  coverPicture? : string,
  about?: string,
  livesIn? : string,
  workAt?: string,
  relationship?: "married" | "single" | undefined
  following : Array<string>,
  followers : Array<string>,
  createdAt : string,
  updatedAt : string
 }



//  type Followers = Array<User>
//  type Following = Array<User