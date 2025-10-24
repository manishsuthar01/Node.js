Cluster in Node.js is a technique to create multiple instances (workers) of a Node.js process that can share the same server port and handle requests concurrently.

Node.js first starts a master process, which acts as a controller: it creates worker processes and manages them (restarts if a worker crashes, distributes load, etc.).

Worker processes handle the actual incoming requests, making full use of multi-core CPUs.
