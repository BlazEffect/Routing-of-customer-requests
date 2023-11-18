from fastapi import FastAPI
from routers.VectorRouter import model_router

app = FastAPI()

app.include_router(
	router= model_router,
	prefix= '/api/model',
	tags=['Распознование текста']
)