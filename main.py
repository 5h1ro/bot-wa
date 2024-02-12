from fastapi import FastAPI
from pydantic import BaseModel
from characterai import PyAsyncCAI

app = FastAPI()
class Item(BaseModel):
    message: str

@app.post("/")
async def freya(item: Item):
    client = PyAsyncCAI('a223eb3dca256d3b14dd6df5b2b4ece49f281b61')
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
    client = PyAsyncCAI('a223eb3dca256d3b14dd6df5b2b4ece49f281b61')
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