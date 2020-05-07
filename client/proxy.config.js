const PROXY_CONFIG = [
    {
        context: [
            "/api/v1",
			"/users",
			"/lists"
        ],
        target: "http://localhost:9999",
        secure: false
    }
]

module.exports = PROXY_CONFIG;