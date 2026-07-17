const db = require('./database');

// Helper function to stream and parse incoming JSON data blocks
const getRequestBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => body += chunk.toString());
    req.on("end", () => {
      try { resolve(body ? JSON.parse(body) : {}); } 
      catch (error) { reject(error); }
    });
  });
};

// Helper function to attach standard headers and send JSON
const sendJSON = (res, statusCode, data) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

const handleRoutes = async (req, res) => {
  const { method, url } = req;

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // GET /students
  if (url === "/students" && method === "GET") {
    return sendJSON(res, 200, db.getAll());
  }

  // GET /students/:id
  if (url.startsWith("/students/") && method === "GET") {
    const id = parseInt(url.split("/")[2]);
    const student = db.getById(id);
    return student ? sendJSON(res, 200, student) : sendJSON(res, 404, { message: "Student not found" });
  }

  // POST /students
  if (url === "/students" && method === "POST") {
    try {
      const body = await getRequestBody(req);
      if (!body.name || !body.email) {
        return sendJSON(res, 400, { message: "Name and Email are required fields" });
      }
      const newStudent = db.create(body);
      return sendJSON(res, 201, newStudent);
    } catch {
      return sendJSON(res, 400, { message: "Invalid JSON body structure" });
    }
  }

  // PUT /students/:id
  if (url.startsWith("/students/") && method === "PUT") {
    try {
      const id = parseInt(url.split("/")[2]);
      const body = await getRequestBody(req);
      const updatedStudent = db.update(id, body);
      return updatedStudent ? sendJSON(res, 200, updatedStudent) : sendJSON(res, 404, { message: "Student not found" });
    } catch {
      return sendJSON(res, 400, { message: "Invalid JSON body structure" });
    }
  }

  // DELETE /students/:id
  if (url.startsWith("/students/") && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);
    const deletedStudent = db.delete(id);
    return deletedStudent ? sendJSON(res, 200, { message: "Deleted successfully", student: deletedStudent }) : sendJSON(res, 404, { message: "Student not found" });
  }

  // Fallback Route
  sendJSON(res, 404, { message: "Route not found" });
};

module.exports = handleRoutes;