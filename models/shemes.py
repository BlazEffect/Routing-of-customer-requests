from pydantic import BaseModel


class UserBase(BaseModel):
	name: str
	email: str
	is_active: bool = True
	is_admin: bool = False
	specialization_id: int = None


class UserCreate(UserBase):
	hashed_password: str


class User(UserBase):
	id: int

	class Config:
		orm_mode = True


class SpecializationBase(BaseModel):
	name: str


class SpecializationCreate(SpecializationBase):
	pass


class Specialization(SpecializationBase):
	id: int

	class Config:
		orm_mode = True


class TicketBase(BaseModel):
	name: str
	user_id: int = None
	owner_id: int = None
	prior: int


class TicketCreate(TicketBase):
	pass


class Ticket(TicketBase):
	id: int

	class Config:
		orm_mode = True


class TicketMessageBase(BaseModel):
	message: str
	createdAt: str
	sendTo: str


class TicketMessageCreate(TicketMessageBase):
	ticket: int


class TicketMessage(TicketMessageBase):
	id: int

	class Config:
		orm_mode = True
