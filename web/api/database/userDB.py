# (c) HeimanPictures

import datetime
import motor.motor_asyncio

from workers.model import SignupSchmema, College, SigninSchmema

class UserDB:
    """
    @description: This will handle the user collection in the database asyncronously.
    @param {string} uri
    @param {string} database_name
    @return: UserDB
    """
    def __init__(self, uri, database_name):
        self._client = motor.motor_asyncio.AsyncIOMotorClient(uri)
        self.db = self._client[database_name]
        self.col = self.db.users

    async def Signup(self, data: SignupSchmema):
        if (self.col.find_one({"email": data.email})):
            return { 'success': False, 'message': 'You already have an account try to signin.' }
        elif (self.col.find_one({"phone": data.phone})):
            return { 'success': False, 'message': 'Your number is already in use' }
        elif (data.password != data.confirmPassword):
            return { 'success': False, 'message': 'Your both password and confirm password are different.' }
        else:
            try:
                if (College[data.college]):
                    await self.col.insert_one(data)
                    return { 'success': True }
            except Exception as e:
                return { 'success': False, 'message': f'Error: {e}' }
            
    async def Signin(self, data: SigninSchmema):
        if (not self.col.find_one({"email": data.email})):
            return { 'success': False, 'message': 'You already have an account try to signin.' }
        elif (self.col.find_one({"email": data.email, "password": data.password})):
            return { 'success': True }
        elif (not self.col.find_one({"email": data.email, "password": data.password})):
            return { 'success': False, 'message': 'Incorrect Email or Password' }

    async def total_users_count(self):
        count = await self.col.count_documents({})
        return count

    async def delete_user(self, email):
        await self.col.delete_many({'email': email})
        
    """
    async def set_<name representing the value>(self, id, <value>):
        await self.col.update_one({'id': id}, {'$set': {'<field name>': <value>}})

    async def get_<name representing the value>(self, id):
        user = await self.col.find_one({'id': int(id)})
        return user.get('<field name>', <defaults>)
    """

