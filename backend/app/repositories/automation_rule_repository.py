from app.repositories import BaseRepository


class AutomationRuleRepository(BaseRepository):
    def __init__(self, db):
        super().__init__(db, "automation_rules")