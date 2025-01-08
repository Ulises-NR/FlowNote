"use server";

import { signIn, signOut } from "@/auth";

export const signUp = async (values) => {
  try {
    const res = await fetch("/api/auth/signup", {
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

export const login = async (values) => {
  try {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: "/",
    });

    return res;
  } catch (e) {
    throw e;
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/auth/signin" });
};
