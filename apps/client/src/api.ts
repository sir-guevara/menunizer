import { toast } from "react-toastify";
import {  DataToken, IdDataToken, IdToken, Login, Token } from "./types";

async function request(path: string, { data, token, method = "GET" }: { data?: unknown, token?: string | null, method?: string }): Promise<unknown> {
  const url = '/api' + path;
  const headers: Record<string, string> = {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const body = (method !== "GET" && method !== "DELETE") ? JSON.stringify(data) : null;

  try {
    const response = await fetch(url, { method, headers, body });

    if (response.ok) {
      return method === "DELETE" ? true : response.json();
    }
    // if(response.status == 400){
    //   toast.error(await response.text(), {type: "error"});
    // }
    const json = await response.json();
    if(Array.isArray(json.message)){
      toast.error(json.message[0], {type: "error"});
    }
    throw new Error(JSON.stringify(json));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error instanceof SyntaxError) {
        toast("Server Error", { type: "error" });
      throw new Error(JSON.stringify({"message":"Server Error"}));
    }

    // Handle all other errors
    const errorMessage = JSON.parse(error.message).message || 'An unexpected error occurred.';
    toast(errorMessage, { type: "error" });

  }
}


export function signIn(login:Login) {
  return request("/auth/login/", {
    data: login,
    method: "POST",
  });
}

export function register(signup:Login) {
  return request("/users/", {
    data:signup,
    method: "POST",
  });
}

export function fetchPlaces(token:Token) {
  return request("/places/", { token});
}

export function addPlace(place:DataToken) {
  return request("/places/", { ...place, method: "POST" });
}

export function uploadImage(image:Blob|string) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "menunizer");

  return fetch("https://api.cloudinary.com/v1_1/awsomegroove/image/upload", {
    method: "POST",
    body: formData,
  }).then((response) => {
    return response.json();
  });
}

export function fetchPlace(place:IdToken) {
  return request(`/places/${place.id}`, { token:place.token });
}

export function addCategory(cat:DataToken) {
  return request(`/places/${cat.id}/categories/`, { data:cat.data, method: "POST", token: cat.token });
}

export function addMenuItem(item:DataToken) {
  return request(`/places/${item.placeId}/categories/menu-items`, {data:item.data, method: "POST" , token: item.token});
}

export function updateMenuItem(item:IdDataToken, placeId:string) {

  return request(`/places/${placeId}/categories/menu-items/${item.id}`, { data:item.data, token:item.token, method: "PATCH" });
}

export function removePlace(place:IdToken) {
  return request(`/places/${place.id}`, { token:place.token, method: "DELETE" });
}

export function removeCategory(cat:IdToken,placeId:string) {
  return request(`/places/${placeId}/categories/${cat.id}`, { token:cat.token, method: "DELETE" });
}

export function removeMenuItem(item:IdToken, placeId:string) {
  return request(`/places/${placeId}/categories/menu-items/${item.id}`, { token:item.token, method: "DELETE" });
}

export function updatePlace(place:IdDataToken) {
  return request(`/places/${place.id}`, { data:place.data, token:place.token, method: "PATCH" });
}

export function createPaymentIntent(payment:DataToken) {
  return request("/create_payment_intent/", {
    data:payment.data,
    token:payment.token,
    method: "POST",
  });
}

export function fetchOrders(place:IdToken) {
  return request(`/api/orders/?place=${place.id}`, { token:place.token });
}

export function completeOrder(order:IdDataToken) {
  return request(`/api/orders/${order.id}`, {data: order.data, token:order.token, method: "PATCH" });
}