from app.schemas.automation_rule import AutomationRuleCreate, AutomationRuleUpdate
from app.repositories import AutomationRuleRepository
from app.services.notification_service import NotificationService
from app.schemas.notification import NotificationCreate
from app.core.exceptions import *
from app.core.enums import *
from app.services.automation_engine import AutomationEngine
class AutomationRuleService:
    def __init__(self, repo: AutomationRuleRepository, notification: NotificationService, engine: AutomationEngine):
        self.repo = repo
        self.notification = notification
        self.engine = engine

    def get_by_id(self, automation_rule_id: int) -> dict:
        automation_rule = self.repo.get_by_id(automation_rule_id)
        if not automation_rule:
            raise AutomationRuleNotFoundException(automation_rule_id)
        return automation_rule

    def get_all(self) -> list:
        return self.repo.get_all()

    def create(self, payload: AutomationRuleCreate) -> dict:
        rule =  self.repo.create(payload.model_dump())

        # notification logic
        self.notification.create(NotificationCreate(
            title = f"Automation Ready: {rule['automation_rule_name']}",
            description=(
                f"Your smart rule is set! "
                f"It will automatically {rule['action'].lower()} "
                f"based on your configured conditions."
            ),
            notification_type=NotificationTypeEnum.SYSTEM,
            severity=SeverityEnum.LOW
        ))
        self.engine.register_rule(rule)
        
        return rule

    def update(self, automation_rule_id: int, payload: AutomationRuleUpdate) -> dict:
        rule = self.get_by_id(automation_rule_id)

        data = payload.model_dump(exclude_unset=True)

        updated = self.repo.update(automation_rule_id, data)

        # detect changes
        changes = []
        for key, new_val in data.items():
            old_val = rule.get(key)
            if old_val != new_val:
                changes.append(f"{key.replace('_', ' ').title()} -> {new_val}")

        # notification
        if changes:
            self.notification.create(NotificationCreate(
                title=f"Automation Updated: {rule['automation_rule_name']}",
                description="Changes: " + ", ".join(changes),
                notification_type=NotificationTypeEnum.SYSTEM,
                severity=SeverityEnum.LOW
            ))


        # scheduler update logic
        # only for MVP
        if rule["trigger_type"] == TriggerTypeEnum.SCHEDULE and rule.get("schedule_time"):
            self.engine.unregister_rule(automation_rule_id)
            self.engine.register_rule(updated)

        return updated

    def delete(self, automation_rule_id: int) -> None:
        rule = self.get_by_id(automation_rule_id)

        self.repo.delete(automation_rule_id)

        self.notification.create(NotificationCreate(
            title=f"Automation Removed: {rule['automation_rule_name']}",
            description=(
                f"The automation rule '{rule['automation_rule_name']}' "
                f"has been deleted and will no longer run."
            ),
            notification_type=NotificationTypeEnum.SYSTEM,
            severity=SeverityEnum.MEDIUM
        ))

        if rule["trigger_type"] == TriggerTypeEnum.SCHEDULE:
            self.engine.unregister_rule(automation_rule_id)