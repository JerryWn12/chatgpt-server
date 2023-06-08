# chatgpt-server

## Example

```javascript
const response01 = await fetch("http://localhost:3000", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: "How are you?",
  }),
})
const data = await response01.json()
const id = data.id
console.log(data)

const response02 = await fetch("http://localhost:3000", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: "Where are you from?",
  }),
})

console.log(await response02.json())

const response03 = await fetch("http://localhost:3000", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id,
    message: "What's my previous question",
  }),
})
console.log(await response03.json())
```

Output

```text
{
  id: '4effed08-5cbf-403a-ac2f-ac10968205b9',
  message: "As an AI language model, I don't have feelings, but I'm operational and ready to help you! How can I assist you today?"
}
{
  id: '8930eeaa-4570-46ed-a919-1e8535c4f229',
  message: "I don't have a physical origin as I am a virtual assistant powered by AI technology. I was created by OpenAI and am available to assist and interact with users online."
}
{
  id: '4effed08-5cbf-403a-ac2f-ac10968205b9',
  message: 'Your previous question was "How are you?"'
}
```

## Usage

`npm install @jerrywn/chatgpt-server -g`

`chatgpt-server --api-key=<OPENAI_API_KEY>`

## Request

```text
{
    "id": "" // Optional, the converastion id to use
    "message": "" // Message send to ChatGPT
    "prompt": "" // Optional, set custom prompt for ChatGPT
}
```

## Response

```text
{
    "id": "" // Convesation id in this message
    "message": "" // ChatGPT's reply message
}
```
