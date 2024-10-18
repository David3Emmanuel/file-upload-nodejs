/**
 *
 * @param {Buffer} data
 * @param {string} boundary
 * @returns {{[key: string]: string | {fileName: string, contentType: string, contents: Buffer}}}
 */
export default function parseFormData(data, boundary) {
  const boundaryBuffer = Buffer.from(`--${boundary}`);
  const formData = {};

  let start = 0;
  let end = data.indexOf(boundaryBuffer, start);

  while (end !== -1) {
    if (end > start) {
      const parsed = processPart(data.subarray(start, end));
      formData[parsed.name] = { ...parsed, name: undefined };
    }
    start = end + boundaryBuffer.length;
    end = data.indexOf(boundaryBuffer, start);
  }

  return formData;
}

/**
 *
 * @param {Buffer} part
 * @returns {{[key: string]: string | {name: string, fileName: string, contentType: string, contents: Buffer}}}
 */
function processPart(part) {
  const headerEnd = part.indexOf("\r\n\r\n");
  const headers = part.subarray(0, headerEnd).toString();

  const name = headers.match(/name="([^"]+)"/)[1];
  const fileName = headers.match(/filename="([^"]+)"/)[1];
  const contentType = headers.match(/Content-Type: (.+)/)[1];

  const contents = part.subarray(headerEnd + 4, part.length - 2);

  return { name, fileName, contentType, contents };
}
