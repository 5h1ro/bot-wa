from fastapi import FastAPI
from pydantic import BaseModel
from characterai import PyAsyncCAI

app = FastAPI()
class Item(BaseModel):
    message: str

@app.post("/")
async def freya(item: Item):
    client = PyAsyncCAI('744de7c2f7fa65d11bee2c72be38c7a1cecb7662')
    char = 'HG08QzTxNtPelQR0w3wTOm_crRtfhgQdbJuESv0vbgs'
    chat = await client.chat2.get_chat(char)
    author = {
        'author_id': chat['chats'][0]['creator_id']
    }
    async with client.connect() as chat2:
        data = await chat2.send_message(
            char, chat['chats'][0]['chat_id'], 
            item.message, author
        )
    
    text = data['turn']['candidates'][0]['raw_content']
    return text

@app.post("/gojo")
async def gojo(item: Item):
    client = PyAsyncCAI('744de7c2f7fa65d11bee2c72be38c7a1cecb7662')
    char = '4WOVrCApi4JYwfYwU2e5eDeFalLOkGBw6IfUZPX1XVQ'
    chat = await client.chat2.get_chat(char)
    author = {
        'author_id': chat['chats'][0]['creator_id']
    }
    async with client.connect() as chat2:
        data = await chat2.send_message(
            char, chat['chats'][0]['chat_id'], 
            item.message, author
        )
    
    text = data['turn']['candidates'][0]['raw_content']
    return text

@app.post("/kobo")
async def gojo(item: Item):
    client = PyAsyncCAI('744de7c2f7fa65d11bee2c72be38c7a1cecb7662')
    char = '1UWABpuo0uP9Vn-ucD7CdrD8fNBq36KVpdVoBCzsSvM'
    chat = await client.chat2.get_chat(char)
    author = {
        'author_id': chat['chats'][0]['creator_id']
    }
    async with client.connect() as chat2:
        data = await chat2.send_message(
            char, chat['chats'][0]['chat_id'], 
            item.message, author
        )
    
    text = data['turn']['candidates'][0]['raw_content']
    return text
