declare type CreateUserParams = {
  clerkId: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  photo: string;
};

declare type UpdateUserParams = {
  email: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  photo?: string;
};

declare type CreateCardParams = {
  title: string;
  status: string;
  priority: string;
  description: string;
  deadline: string;
  createdAt: string;
};
// declare type UpdateCardParams = {
//   title: string;
//   status: string;
//   priority: string;
//   description: string;
//   deadline: string;
//   createdAt: string;
// };
