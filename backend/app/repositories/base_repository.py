from typing import Any

class BaseRepository:
    def __init__(self, db, table_name: str):
        self.db = db
        self.table = table_name
        
    def get_all(self) -> list:
        res = self.db.table(self.table).select("*").execute()
        return res.data

    def get_by_id(self, id: int) -> dict | None:
        res = self.db.table(self.table).select("*").eq("id", id).execute()
        return res.data[0] if res.data else None

    def create(self, data: dict) -> dict:
        res = self.db.table(self.table).insert(data).execute()
        return res.data[0]

    def update(self, id: int, data: dict) -> dict | None:
        res = self.db.table(self.table).update(data).eq("id", id).execute()
        return res.data[0] if res.data else None

    def delete(self, id: int) -> bool:
        res = self.db.table(self.table).delete().eq("id", id).execute()
        return bool(res.data)