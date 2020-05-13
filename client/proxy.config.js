const PROXY_CONFIG = [
    {
        context: [
            "/todos",
			"/users",
			"/lists"
        ],
        target: "http://localhost:9999",
        secure: false
    }
]

module.exports = PROXY_CONFIG;