# Node.js Learning and Projects
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/manishsuthar01/Node.js)

This repository is a collection of code examples, concepts, and mini-projects developed during my exploration of Node.js and its ecosystem. It covers a range of topics from fundamental concepts to building complete backend applications.

## Table of Contents
*   [Projects](#projects)
    *   [URL Shortener (JWT & Session-based)](#url-shortener)
*   [Concepts & Code Examples](#concepts--code-examples)
    *   [Cluster](#cluster)
    *   [Express](#express)
    *   [File System](#file-system)
    *   [HTTP Server](#http-server)
    *   [MongoDB with Mongoose](#mongodb-with-mongoose)
    *   [MVC Architecture](#mvc-architecture)
    *   [Modules](#modules)
    *   [Multer (File Uploads)](#multer-file-uploads)
    *   [REST API](#rest-api)
    *   [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
    *   [Streams](#streams)
*   [Setup and Usage](#setup-and-usage)
*   [Key Dependencies](#key-dependencies)

## Projects

### URL Shortener
Located in the `1Projects/` directory, this is a full-featured URL shortener application with two different authentication implementations.

*   **URLSHORTwithJWT**: A version using JSON Web Tokens (JWT) for stateless authentication. It includes role-based access control (`NORMAL`, `ADMIN`).
*   **URLSHORTwithSessionId**: A version using stateful, server-side sessions for authentication, where a `sessionId` is stored in a cookie.

**Features:**
*   User signup and login.
*   Generation of short URLs using `nanoid`.
*   Redirection from short URL to the original URL.
*   Tracking of visit history and click analytics for each shortened URL.
*   Server-side rendered views using EJS.

**Tech Stack:** Express, MongoDB, Mongoose, EJS, JWT (for the JWT version), Cookie-Parser.

## Concepts & Code Examples

This repository contains isolated examples demonstrating various Node.js features and patterns.

### Cluster
**Location:** `Cluster/`
Demonstrates using the native `cluster` module to create multiple worker processes. This allows a Node.js application to take advantage of multi-core systems to handle a larger load. The `server.js` file forks a new worker for each available CPU core.

### Express
**Location:** `Express/`
A minimal Express.js application showing basic routing for `GET` requests and how to access URL query parameters (`req.query`).

### File System
**Location:** `FileSystem/`
Examples of using the built-in `fs` module for file manipulation. It covers:
*   Synchronous and asynchronous file writing (`writeFileSync`, `writeFile`).
*   Appending content to files (`appendFileSync`, `appendFile`).
*   Reading file content (`readFile`).

### HTTP Server
**Location:** `HTTPS/`
An example of creating a basic web server using only the native `http` module, without any external frameworks. It includes simple routing logic based on `req.url`.

### MongoDB with Mongoose
**Location:** `MONGODB/`
An Express application demonstrating full CRUD (Create, Read, Update, Delete) operations with a MongoDB database. It uses Mongoose for schema definition, data modeling, and validation.

### MVC Architecture
**Location:** `MVC/`
A refactoring of the `MONGODB` project to implement the Model-View-Controller (MVC) design pattern. This example separates the application's concerns into:
*   **Models**: Mongoose schemas defining the data structure.
*   **Views**: (Implicitly handled by JSON responses in this REST API context).
*   **Controllers**: Logic to handle requests and interact with models.
*   **Routes**: Defines the API endpoints and maps them to controller functions.

### Modules
**Location:** `Module/`
Simple examples illustrating the CommonJS module system in Node.js, using `require()`, `module.exports`, and `exports`.

### Multer (File Uploads)
**Location:** `MulterNODEjS/`
An Express server that handles `multipart/form-data` for file uploads using the `multer` middleware. It demonstrates how to configure `diskStorage` to control the destination and filename of uploaded files and how to set file size limits.

### REST API
**Location:** `RESTAPI/`
A RESTful API built with Express that performs CRUD operations on a local `MOCK_DATA.json` file. It's a foundational example of building APIs and respecting HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`).

### Server-Side Rendering (SSR)
**Location:** `SSR/`
A simple demonstration of server-side rendering using Express and the EJS template engine. It shows how to pass dynamic data from the server to an EJS view to generate HTML.

### Streams
**Location:** `Stream/`
Illustrates the power of Node.js Streams for efficient data handling.
*   Piping a `readable` stream (from a file) to a `writable` stream to serve a file without loading it all into memory.
*   Compressing a file by piping a file stream through a `zlib` Gzip stream into a new `.gz` file.

## Setup and Usage

**Prerequisites:**
*   Node.js installed.
*   MongoDB instance running (for projects that use it).

**General Instructions:**

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/manishsuthar01/Node.js.git
    cd Node.js
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Run an application:**
    Navigate to the specific project or example directory and run its main file with Node.
    ```sh
    # Example for running the JWT URL shortener
    cd 1Projects/URLSHORTwithJWT
    node index.js

    # Example for running the MVC example
    cd ../../MVC
    node index.js
    ```

**Note:** For applications using MongoDB (`1Projects`, `MONGODB`, `MVC`), you may need to update the MongoDB connection string in the respective `conection.js`, `connection.js`, or `index.js` file to match your local database configuration.

## Key Dependencies

The `package.json` file includes the following major dependencies used across the projects:
*   `express`: Web framework for Node.js.
*   `mongoose`: Elegant MongoDB object modeling for Node.js.
*   `ejs`: Embedded JavaScript templating engine.
*   `multer`: Middleware for handling `multipart/form-data`, used for file uploads.
*   `jsonwebtoken`: For generating and verifying JSON Web Tokens.
*   `cookie-parser`: Middleware to parse `Cookie` header and populate `req.cookies`.
*   `nanoid`: A tiny, secure, URL-friendly, unique string ID generator.
