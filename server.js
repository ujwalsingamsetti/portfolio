const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "singamsettiujwal10@gmail.com", // Replace with your email
        pass: "ilao cpij oxif ywqf"   // Replace with your email password or app password
    }
});

app.post("/send-message", async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const mailOptions = {
        from: email,
        to: "singamsettiujwal10@gmail.com",
        subject: `New Job Offer from ${name}: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        res.json({ message: "Message sent successfully!" });
    } catch (error) {
        console.error("Email sending error: ", error);
        res.status(500).json({ message: "Failed to send message.", error: error.message });
    }
});


app.listen(4000, () => console.log("Server running on port 4000"));
