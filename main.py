from fastapi import FastAPI
from pydantic import BaseModel
from characterai import PyCAI

app = FastAPI()
class Item(BaseModel):
    message: str

@app.post("/")
async def zero_two(item: Item):
    client = PyCAI('a223eb3dca256d3b14dd6df5b2b4ece49f281b61')
    char = 'ql8RTLD8EmJNH4cDJr2n91RohXLo5_Aw0GMMCaZQeNg'
    chat = client.chat.get_chat(char)
    participants = chat['participants']
    if not participants[0]['is_human']:
        tgt = participants[0]['user']['username']
    else:
        tgt = participants[1]['user']['username']
        
    data = client.chat.send_message(
        chat['external_id'], tgt, item.message
    )
    text = data['replies'][0]['text']
    return text

@app.post("/gojo")
async def gojo(item: Item):
    client = PyCAI('a223eb3dca256d3b14dd6df5b2b4ece49f281b61')
    char = '4WOVrCApi4JYwfYwU2e5eDeFalLOkGBw6IfUZPX1XVQ'
    chat = client.chat.get_chat(char)
    participants = chat['participants']
    if not participants[0]['is_human']:
        tgt = participants[0]['user']['username']
    else:
        tgt = participants[1]['user']['username']
        
    data = client.chat.send_message(
        chat['external_id'], tgt, item.message
    )
    text = data['replies'][0]['text']
    return text