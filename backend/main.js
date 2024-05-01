import 'dotenv/config' // Load environment variables from a .env file into process.env
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        credentials: true, // Allow cookies to be sent along with requests
    })
)

app.use(express.json())
app.use(cookieParser()) // Without this, req.cookies will be undefined

app.get('/api/v1/world', async (_req, res) => {
    res.cookie('token', 'cake', {
        httpOnly: false,
        sameSite: 'none',
        secure: true, // HTTPS only
        partitioned: true, // Tie to the top-level site where it's initially set and cannot be accessed from elsewhere
    })
    res.send('world')
})

app.listen(8000, () => {
    console.log(`App is running on port ${8000}`)
})
