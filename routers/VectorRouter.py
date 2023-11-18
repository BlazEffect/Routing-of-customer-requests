from fastapi import APIRouter
from vectors.models import classify

model_router = APIRouter()


@model_router.post('/recognition')
def model_req(text: str):
	return classify(text)
