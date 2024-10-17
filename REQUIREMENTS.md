# File Upload & Management System with HTTP APIs

## Objective:

Create a file upload and management system using Node.js built-in modules. The project should allow users to upload files, retrieve them, and view their metadata through HTTP endpoints. The focus is on using core Node.js modules like `http`, `fs`, `url`, `path`, and `crypto` to handle HTTP requests and manage the file system.

## Features:

1. **File Upload:**

   - Implement an HTTP endpoint (e.g., `/upload`) that allows users to upload files using `multipart/form-data`.
   - Use the `fs` module to store the uploaded files on the server’s file system.
   - Generate unique filenames for uploads (using `crypto` or custom logic).
   - Save file metadata (original name, size, MIME type, upload time) in a JSON file for reference.

2. **File Retrieval:**

   - Implement an HTTP endpoint (e.g., `/files/:filename`) to retrieve the uploaded file.
   - Use the `fs` module to read the file from the disk and send it as a response.
   - Handle file-not-found errors appropriately.

3. **File Metadata Retrieval:**

   - Implement an HTTP endpoint (e.g., `/files/:filename/metadata`) that returns the stored metadata of a file.
   - Return details like the original file name, size, and upload timestamp.

4. **File Deletion:**

   - Implement an HTTP endpoint (e.g., `/files/:filename/delete`) to delete a file from the system.
   - Ensure the file and its metadata are deleted properly.

5. **List Files:**
   - Implement an HTTP endpoint (e.g., `/files`) to return a list of all uploaded files with their metadata.
   - Use the `fs.readdir` method to get the list of files in the directory.

## Requirements:

- **No External Libraries:** Use only Node.js core modules.
- **Asynchronous I/O:** Ensure all file and HTTP operations are non-blocking.
- **Error Handling:** Properly handle file system errors (e.g., file not found, read/write errors).
- **Routing:** Build a simple routing system using the `url` module to handle different HTTP methods (GET, POST, DELETE).
- **Security Considerations:** Handle large file uploads safely, limit file sizes, and prevent directory traversal attacks.

## Optional Features:

- **File Renaming:** Allow users to rename uploaded files through an API.
- **Search:** Implement a search endpoint to find files by their original name or metadata.
