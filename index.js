const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000; // Ensure B.com runs on this port

app.use(cookieParser());

// CORS setup to allow A.com to make requests
app.use(
  cors({
    origin: true, // Allow A.com to send requests
    credentials: true, // Allow cookies to be sent
  })
);

// API to set a cookie
app.get("/set-cookie", (req, res) => {
  res.cookie("test_cookie", "HelloFromB", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.json({ message: "Cookie set from B.com!" });
});

app.get("/check-cookie", (req, res) => {
  const cookieValue = req.cookies.test_cookie; // Read the cookie from request
  if (cookieValue) {
    res.json({ message: "Cookie exists!", value: cookieValue });
  } else {
    res.json({ message: "No cookie found!" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on https://B.com:${PORT}`);
});
