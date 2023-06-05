#!/usr/bin/env node

import ChatGPT from "../../chatgpt-api/src/main.js"
import express from "express"

args = process.argv.slice(2)

const keyParam = args.find(value => value.startsWith("--key="))
const { 1: key } = keyParam.split("=")

const enableCache = args.some(value => value === "--cache")

const server = new express()
const client = new ChatGPT({
  openaiApiKey: key,
  enableCache,
})

server.use(express.json())

server.post("/", async (req, res) => {
  let conversationId

  if (req.body.id) {
    client.useConversation(req.body.id)
    conversationId = req.body.id
  } else {
    if (req.body.prompt) {
      client.newConversationWithCustomPrompt(req.body.prompt)
    } else {
      client.newConversation()
    }
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
