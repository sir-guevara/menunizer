import { toast } from "react-toastify";
import {  DataToken, IdDataToken, IdToken, Login, Token } from "./types";

async function request(path: string, { data, token, method = "GET" }: { data?: unknown, token?: string | null, method?: string }): Promise<unknown> {
    return fetch(path, {
      method,
      headers: {
        Authorization: token ? `Token ${token}` : "",
        "Content-Type": "application/json",
      },
      body: method !== "GET" && method !== "DELETE" ? JSON.stringify(data) : null,
    })
      .then((response) => {
        // If it is success
        if (response.ok) {
          if (method === "DELETE") {
            // If delete, nothing return
            return true;
          }
          return response.json();
        }
  
        // Otherwise, if there are errors
        return response
          .json()
          .then((json) => {
            // Handle JSON error, response by the server
  
            if (response.status === 400) {
              const errors = Object.keys(json).map((k) => `${json[k].join(" ")}`);
              throw new Error(errors.join(" "));
            }
            throw new Error(JSON.stringify(json));
          })
          .catch((e) => {
            if (e.name === "SyntaxError") {
              throw new Error(response.statusText);
            }
            throw new Error(e);
          });
      })
      .catch((e) => {
        // Handle all errors
        toast(e.message, { type: "error" });
      });
  }
  


export function signIn(login:Login) {
  return request("/auth/login/", {
    data: login,
    method: "POST",
  });
}

export function register(signup:Login) {
  return request("/auth/users/", {
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