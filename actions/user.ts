"use server";

import { signIn, signOut } from "@/auth";

type Login = {
  email: string;
  password: string;
};

type SignUp = {
  username: string;
  email: string;
  password: string;
};

export const signUp = async (values: SignUp) => {
  try {
    const res = await fetch(process.env.URL + "/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      throw await res.json();
    }
  } catch (e) {
    throw e;
  }
};

export const login = async (values: Login) => {
  try {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return res;
  } catch (e) {
    throw e;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/signin" });
};
