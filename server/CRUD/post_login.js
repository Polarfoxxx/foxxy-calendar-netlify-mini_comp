const express = require("express");
const router = express.Router();
const User = require("../mongooseDB/mongooseDB");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

router.post("/user", async (req, res) => {
    const { username, password } = req.body;
    const reqCookie = req.cookies;
    console.log(reqCookie);
    const oneHour = 3600000; // 1 hodina v milisekundách
    const expirationDate = new Date(Date.now() + oneHour);

    try {
        // Hľadanie používateľa 
        const user = await User.findOne({ username });
        setTimeout(() => {
            // Kontrola existencie používateľa 
            if (user) {
                // Hashovanie hesla pomocou crypto
                const hash = crypto.createHash('sha256').update(password).digest('hex');
                if (hash === user.password) {
                    // Generovanie JWT s časovou expiráciou
                    const token = jwt.sign({ username }, "secret", { expiresIn: "2h" });
                    const theme = user.custom.theme

                    // Vytvoření objektu s více hodnotami
                    const cookieData = {
                        token: token,
                        colorTheme: theme
                    };

                    // Serializace dat do JSON řetězce
                    const cookieValue = JSON.stringify(cookieData);

                    res.cookie(username, cookieValue, {
                        httpOnly: true,
                        expires: expirationDate
                    });

                    res.status(200).json({ username, token, theme });
                } else {
                    res.status(401).json({ message: "Incorrect password" });
                }
            } else {
                res.status(401).json({ message: "The user does not exist" });
            }
        }, 4000);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
