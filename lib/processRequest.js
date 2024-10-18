import { IncomingMessage } from "http";
import parseFormData from "./parseFormData.js";

/**
 *
 * @param {IncomingMessage} req
 * @param {Buffer} rawBody
 */
export default function processRequest(req, rawBody) {
  const contentType = req.headers["content-type"];

  // handle JSON, form data, and binary
  if (contentType === "application/json") {
    req.body = JSON.parse(rawBody.toString());
  } else if (contentType === "application/x-www-form-urlencoded") {
    req.body = new URLSearchParams(rawBody.toString());
  } else if (contentType && contentType.startsWith("multipart/form-data")) {
    const boundary = contentType.split(";")[1].split("=")[1];
    const formData = parseFormData(rawBody, boundary);
    req.body = formData;
  } else {
    req.body = rawBody;
  }
}
