#!/usr/bin/env node

import ChatGPT from "@jerrywn/chatgpt-api"
import express from "express"

const keyParam = process.argv.find(value => value.startsWith("--key="))
const { 1: key } = keyParam.split("=")

const server = new express()
const client = new ChatGPT({
  openaiApiKey: key,
})

server.use(express.json())

server.post("/", async (req, res) => {
  let conversationId

  if (req.body.id) {
    client.useConversation(req.body.id)
    conversationId = req.body.id
  } else {
    conversationId = client.newConversation()
  }

  const responseMessage = await client.sendMessage(req.body.message)
  const responseBody = {
    id: conversationId,
    message: responseMessage,
  }

  res.set({
    "Content-Type": "text/plain",
  })
  res.send(responseBody)
})

server.listen(3000, () => {
  console.log("server started listen at 3000")
})
