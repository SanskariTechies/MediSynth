# (c) HeimanPictures

import datetime
import motor.motor_asyncio

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

    def new_user(self, id):
        return dict(
            id=id,
            join_date=datetime.date.today().isoformat(),
        )

    async def add_user(self, id):
        user = self.new_user(id)
        await self.col.insert_one(user)

    async def is_user_exist(self, id):
        user = await self.col.find_one({'id': int(id)})
        return True if user else False

    async def total_users_count(self):
        count = await self.col.count_documents({})
        return count

    async def get_all_users(self):
        all_users = self.col.find({})
        return all_users

    async def delete_user(self, user_id):
        await self.col.delete_many({'id': int(user_id)})

    """
    async def set_<name representing the value>(self, id, <value>):
        await self.col.update_one({'id': id}, {'$set': {'<field name>': <value>}})

    async def get_<name representing the value(self, id):
        user = await self.col.find_one({'id': int(id)})
        return user.get('<field name>', <defaults>)
    """