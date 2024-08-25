from pydantic import BaseModel
from typing import Optional


class SigninModel(BaseModel):
    email: str
    password: str

class SignupModel(BaseModel):
    name: str
    email: str
    usn: Optional[str]
    college: Optional[int]
    password: str
    confirmPassword: str
    year: Optional[int]
    sem: Optional[int]
    password: str
    phone: str
    waphone: str

class SignupSchmema(BaseModel):
    name: str
    email: str
    usn: Optional[str]
    college: Optional[int]
    year: Optional[int]
    sem: Optional[int]
    password: str
    phone: str
    waphone: str


College = [
    "Sahyadri College of Engineering & Management",
    "St. Joseph College of Engineering",
    "Canara Engineering College",
    "AJ Engineering College"
]