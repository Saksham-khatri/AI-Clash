import express from 'express'
import runGraph from './services/graph.ai.service.js'
import { success } from 'zod'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST'],
    credentials: true
}))

app.get("/",async (req,res)=>{
    const result = await runGraph("write factorial function in javascript")

    res.json(result)
})

app.post("/invoke",async (req,res)=>{
    try {
        const {input} = req.body
        if (typeof input !== "string" || !input.trim()) {
            return res.status(400).json({ message: "Please provide a non-empty input.", success: false })
        }

        const result = await runGraph(input.trim())
        return res.status(200).json({
            message:"Graph executed successfully",
            success: true,
            data:result
        })
    } catch (error) {
        console.error("Graph execution failed", error)
        return res.status(500).json({
            message: "The AI models could not complete this comparison. Please try again.",
            success: false
        })
    }
})

 export default app