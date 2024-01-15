import { toast } from "react-toastify";
import {  DataToken, IdDataToken, IdToken, Login, Token } from "./types";

async function request(path: string, { data, token, method = "GET" }: { data?: unknown, token?: string | null, method?: string }): Promise<unknown> {
  const url = '/api' + path;
  const headers: Record<string, string> = {
    Authorization: token ? `Token ${token}` : "",
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
  } catch (error) {
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
  return request("/api/places/", { token});
}

export function addPlace(place:DataToken) {
  return request("/api/places/", { ...place, method: "POST" });
}

export function uploadImage(image:Blob|string) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "qr_menu");

  return fetch("https://api.cloudinary.com/v1_1/dtde3o5xe/image/upload", {
    method: "POST",
    body: formData,
  }).then((response) => {
    return response.json();
  });
}

export function fetchPlace(place:IdToken) {
  return request(`/api/places/${place.id}`, { token:place.token });
}

export function addCategory(cat:DataToken) {
  return request("/api/categories/", { ...cat, method: "POST" });
}

export function addMenuItems(item:DataToken) {
  return request("/api/menu_items/", {...item, method: "POST" });
}

export function updateMenuItem(item:IdDataToken) {

  return request(`/api/menu_items/${item.id}`, { data:item.data, token:item.token, method: "PATCH" });
}

export function removePlace(place:IdToken) {
  return request(`/api/places/${place.id}`, { token:place.token, method: "DELETE" });
}

export function removeCategory(cat:IdToken) {
  return request(`/api/categories/${cat.id}`, { token:cat.token, method: "DELETE" });
}

export function removeMenuItem(item:IdToken) {
  return request(`/api/menu_items/${item.id}`, { token:item.token, method: "DELETE" });
}

export function updatePlace(place:IdDataToken) {
  return request(`/api/places/${place.id}`, { data:place.data, token:place.token, method: "PATCH" });
}

export function createPaymentIntent(payment:DataToken) {
  return request("/api/create_payment_intent/", {
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