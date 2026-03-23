import uvicorn
from app.core.config import settings
from app.utils.logger import setup_logging

setup_logging()

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True,
        log_config=None
    )