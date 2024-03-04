

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
    confirmPassword: str
    year: Optional[int]
    sem: Optional[int]
    password: str
    phone: str



class SigninSchmema(BaseModel):
    email: str
    password: str

class SignupSchmema(BaseModel):
    name: str
    email: str
    usn: Optional[str]
    college: Optional[int]
    year: Optional[int]
    sem: Optional[int]
    password: str
    phone: str


College = [
    "Sahyadri College of Engineering & Management",
    "St. Joseph College of Engineering",
    "Canara Engineering College",
    "AJ Engineering College"
]