from fastapi import APIRouter, Depends
import pandas as pd
from models.database import get_db
from vectors.models import classify
from datetime import datetime
from sqlalchemy.orm import Session
from models.core import Ticket, TicketMessage

model_router = APIRouter()




def create_ticket_with_tracking(db: Session, name: str, prior: str, message: str, send_to: str):
    try:
        db.begin()
        new_ticket = Ticket(name=name, prior=prior)
        db.add(new_ticket)
        db.flush()
        new_ticket_message = TicketMessage(ticket=new_ticket.id, message=message, createdAt=datetime.now(),
                                           sendTo=send_to)
        db.add(new_ticket_message)
        db.flush()
        db.commit()
        return new_ticket, new_ticket_message
    except Exception as e:
        db.rollback()
        raise e


@model_router.post('/recognition')
def model_req(text: str, db: Session = Depends(get_db)):
    classification_result = classify(text)

    request_result = classification_result.get("request")
    importance_result = classification_result.get("importance")
    df = pd.read_csv('vectors/employers.csv')

    available_employees = df[df[f'{request_result}'] == 1]

    if available_employees.empty:
        return {"error": "No employees"}

    employee_with_least_tasks = available_employees.loc[available_employees['task_counter'].idxmin()]
    send_to_employee = employee_with_least_tasks['employee']

    new_ticket, new_ticket_message = create_ticket_with_tracking(
        db=db,
        name="Recognition Ticket",
        prior=str(importance_result),
        message=text,
        send_to=send_to_employee
    )

    available_employees.loc[employee_with_least_tasks.name, 'task_counter'] += 1
    available_employees.to_csv('vectors/employers.csv', index=False)

    return {
        "request": request_result,
        "importance": importance_result,
        "ticket_id": new_ticket.id,
        "ticket_message_id": new_ticket_message.id,
        "sent_to_employee": send_to_employee,
    }
