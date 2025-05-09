const http = require("http")
const { extractData } = require("./openai")
const PORT = 3000

const server = http.createServer(async (req, res) => {
    if (req.method === "POST" && req.url === "/extract") {
        let body = ""

        req.on("data", (chunk) => {
            body += chunk.toString()
        })

        req.on("end", async () => {
            try {
                const { message } = JSON.parse(body)
                const data = await extractData(message)

                res.writeHead(200, { "Content-Type": "application/json" })
                res.end(JSON.stringify(data))
            } catch (err) {
                res.writeHead(500, { "Content-Type": "application/json" })
                res.end(JSON.stringify({ erro: err.message }))
            }
        })
    }
})

server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})