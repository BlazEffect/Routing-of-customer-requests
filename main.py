from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from routers.VectorRouter import model_router
from routers.token import token_router
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()

origins = [
    os.getenv("CURRENT_HOST"),
    os.getenv("VITE_HOST")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
	router= model_router,
	prefix= '/api/model',
	tags=['Распознование текста']
)

app.include_router(
	router= token_router,
	prefix= '/api',
	tags=['Получение JWT токена']
)
