import React from "react";
import { useWindowSize } from "usehooks-ts";

// Locastorage Expiry function
export const setWithExpiry = ({ key, value, ttl }: any) => {
  const now = new Date();

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire
  const item = {
    value: value,
    expiry: ttl === "" ? "" : now.getTime() + (ttl*1000),
  };
  localStorage.setItem(key, JSON.stringify(item));
};

// Form Validation
export const validationForm = ({
  fName,
  lName,
  email,
  password,
  compare,
  register,
}: {
  fName?: string | number;
  lName?: string | number;
  email?: string | number;
  password?: string | number;
  compare?: string | number;
  register?: boolean;
}) => {
  if (fName && fName.toString().length < 3)
    return { err: true, msg: "Name too short" };
  if (fName && fName.toString().length > 20)
    return { err: true, msg: "Name too long" };
  if (fName && fName.toString().trim().length === 0)
    return { err: true, msg: "Name is not valid" };
  if (fName && typeof fName === "number")
    return { err: true, msg: "Name is not valid" };
  if (lName && lName.toString().length < 3)
    return { err: true, msg: "Name too short" };
  if (lName && lName.toString().length > 20)
    return { err: true, msg: "Name too long" };
  if (lName && lName.toString().trim().length === 0)
    return { err: true, msg: "Name is not valid" };
  if (lName && typeof lName === "number")
    return { err: true, msg: "Name is not valid" };
  if (
    email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.toString())
  )
    return { err: true, msg: "Invalid email address" };
  if (email && email.toString().length < 4)
    return { err: true, msg: "Invalid email address" };
  if (
    password &&
    register &&
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(
      password.toString()
    )
  )
    return {
      err: true,
      msg: `Password requires number, symbol, uppercase, lowercase, at least 6 characters`,
    };
  if (password && password.toString().length < 6)
    return { err: true, msg: "Password too short" };
  if (compare && password !== compare)
    return { err: true, msg: "Passwords do not match" };

  return { err: false, msg: "" };
};
// Form submit
// Email submit function
const encode = (data: { [x: string]: string | Blob }) => {
  const formData = new FormData();
  Object.keys(data).forEach((k) => {
    formData.append(k, data[k]);
  });
  return formData;
};
export const formSubmit = ({
  formData,
  formName,
}: {
  formData: any;
  formName: string;
}) => {
  return fetch("/", {
    method: "POST",
    // headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": formName, ...formData }),
  });
};

// Get container dimensions w/ width & height
export function useClientRect() {
  const [rect, setRect] = React.useState<any>(null);
  const { width = 0 } = useWindowSize();

  const ref = React.useCallback(
    (node: any) => {
      if (node !== null) {
        setRect(node.getBoundingClientRect());
      }
    },
    [width]
  );
  return { rect: { width: rect?.width }, ref };
}
export const getChartWidth = (w: number) => {
  let chartWidth = (w * 30) / 100;

  switch (true) {
    case w < 636:
      chartWidth = (w * 90) / 100;
      break;
    case w < 761:
      chartWidth = (w * 44) / 100;
      break;
    case w < 950:
      chartWidth = (w * 45) / 100;
      break;
    case w < 1180:
      chartWidth = (w * 46) / 100;
      break;
    default:
      (w * 30) / 100;
      break;
  }
  return chartWidth;
};
