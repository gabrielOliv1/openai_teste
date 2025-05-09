require("dotenv").config();

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
const API_KEY = process.env.OPENAI_API_KEY

async function extractData(message) {
    const prompt = `Identifique e capture informações como primeiro nome, último nome (não inclua na resposta os nomes do meio), idade, profissão e renda da mensagem a seguir: "${message}". O retorno deve ser um JSON estruturado com as chaves: name, lastName, age, job, salary.`

    const response = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4.1",
            messages: [
                { role: "system", content: "Você é um leitor e extrator de dados."},
                { role: "user", content: prompt },
            ],
            temperature: 0.3
        })
    })

    const data = await response.json()
    console.log(JSON.stringify(data, null, 2))
    const result = data.choices?.[0]?.message?.content

    try {
        console.log(result)
        return JSON.parse(result)
    } catch (err) {
        console.error(err)
    }

}

module.exports = { extractData }