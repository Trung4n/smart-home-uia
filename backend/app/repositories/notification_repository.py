from app.repositories import BaseRepository


class NotificationRepository(BaseRepository):
    def __init__(self, db):
        super().__init__(db, "notifications")