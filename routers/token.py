from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from sqlalchemy.orm import Session

from models.database import authenticate_user, get_db
from routers.auth import create_jwt_token

token_router = APIRouter()


@token_router.post('/token/')
def login_for_access_token(username: str, password: str, db: Session = Depends(get_db)):
    user = authenticate_user(db, username, password)
    if user:
        token = create_jwt_token({"sub": username})
        return {"access_token": token, "token_type": "bearer"}
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
