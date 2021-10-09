import { IPost } from "./schema";

export async function login(
  identifier: string,
  password: string
): Promise<string> {
  try {
    let res = await fetch(`http://localhost:1337/auth/local`, {
      method: "POST",
      body: JSON.stringify({
        identifier,
        password,
      }),
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let response = await res.json();

    if (response.error) {
      return response.message[0].messages[0].message;
    } else {
      await localStorage.setItem("authUser", JSON.stringify(response));
    }
    return "";
  } catch (e) {
    console.error(e);
    return "";
  }
}

export async function logout(): Promise<void> {
  await localStorage.removeItem("authUser");
}

export async function createPost(post: IPost): Promise<string> {
  let token = JSON.parse(localStorage.getItem("authUser")).jwt;
  try {
    let res = await fetch(`http://localhost:1337/posts`, {
      method: "POST",
      body: JSON.stringify(post),
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let response = await res.json();
    if (response.error) {
      return response.message[0].messages[0].message;
    } else {
      return "";
    }
  } catch (e) {
    console.error(e);
    return "";
  }
}
