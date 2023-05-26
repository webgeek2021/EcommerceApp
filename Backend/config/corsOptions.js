const whitelist = [
    "https:www.yoururl.com",
   "http://localhost:5173",
   "http://localhost:3500"
]

const corsOptions = {
    origin: (origin, callbacks) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callbacks(null, true)
        } else {
            callbacks(new Error("Not Allowed"))
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions