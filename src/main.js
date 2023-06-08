#!/usr/bin/env node

import ChatGPT from "@jerrywn/chatgpt-api"
import express from "express"

const args = process.argv

if (args.some(value => value === "--help")) {
  showHelp()
  process.exit(0)
}

const key =
  process.env["OPENAI_API_KEY"] ||
  args.find(value => value.startsWith("--api-key=")).split("=")[1]

if (!key) {
  console.log("please provide openai api key")
  showHelp()
  process.exit(1)
}

const server = new express()
const client = new ChatGPT({
  openaiApiKey: key,
})

server.use(express.json())

server.post("/", async (req, res) => {
  let conversationId

  if (req.body.id) {
    conversationId = req.body.id
    client.useConversation(conversationId)
  } else {
    if (req.body.prompt) {
      conversationId = client.newConversationWithCustomPrompt(req.body.prompt)
    } else {
      conversationId = client.newConversation()
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

function showHelp() {
  console.log(`
  usage: chatgpt-server [options]

  options:
    --api-key=<OPENAI_API_KEY>  set openai api key
    --cache                     enable cache
    --help                      show help
  `)
}

server.listen(3000, () => {
  console.log("server started listen at 3000")
})
