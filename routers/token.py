from fastapi import APIRouter
from routers.auth import create_jwt_token

model_router = APIRouter()


@model_router.post('/token/')
async def login_for_access_token(form_data: dict):
    username = form_data["username"]
    password = form_data["password"]

    from passlib.context import CryptContext
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash("testpassword")

    if username == "testuser" and pwd_context.verify(password, hashed_password):
        token = create_jwt_token({"sub": username})
        return {"access_token": token, "token_type": "bearer"}

    return {"error": "Invalid credentials"}
