// POSTS
export interface PostDto {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface PostExtended extends PostDto {
  user?: UserDto;
  comments?: CommentDto[];
}

interface Geolocation {
  lat: string;
  lng: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geolocation;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

// USERS
export interface UserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
}

// COMMENTS
export interface CommentDto {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
