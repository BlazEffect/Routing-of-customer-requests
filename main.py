from fastapi import FastAPI
from routers.VectorRouter import model_router
from routers.token import token_router

app = FastAPI()

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
