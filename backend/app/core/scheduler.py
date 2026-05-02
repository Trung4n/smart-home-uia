from apscheduler.schedulers.asyncio import AsyncIOScheduler

class Scheduler:
    def __init__(self):
        self.scheduler = AsyncIOScheduler(timezone="Asia/Ho_Chi_Minh")

    def start(self):
        self.scheduler.start()

    def add_job(self, job_id: str, func, run_time, args=None):
        self.scheduler.add_job(
            func=func,
            trigger="date",
            run_date=run_time,
            args=args or [],
            id=job_id,
            replace_existing=True
        )

    def remove_job(self, job_id: str):
        try:
            self.scheduler.remove_job(job_id)
        except:
            pass
    
    def stop(self):
        self.scheduler.shutdown()