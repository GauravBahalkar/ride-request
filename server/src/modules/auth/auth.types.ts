export type SignupInput = {
  name: string;
  email: string;
  password: string;
  role: "customer" | "vendor";
};

export type LoginInput = {
  email: string;
  password: string;
};
