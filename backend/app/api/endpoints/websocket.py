from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from dependency_injector.wiring import inject, Provide

from app.core.container import Container
from app.websocket.system_manager import SystemWebSocketManager
from app.websocket.camera_manager import CameraWebSocketManager
from app.utils.logger import get_logger

logger = get_logger(__name__)

router = APIRouter(
    tags=["WebSocket"]
)

@router.websocket("/system")
@inject
async def system_websocket(
    websocket: WebSocket,
    system_manager: SystemWebSocketManager = Depends(Provide[Container.system_manager]),
):
    await system_manager.connect(websocket)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        await system_manager.disconnect(websocket)


@router.websocket("/camera")
@inject
async def camera_websocket(
    websocket: WebSocket,
    camera_manager: CameraWebSocketManager = Depends(Provide[Container.camera_manager])
):
    await camera_manager.connect(websocket)

    try:
        while True:
            await websocket.receive_bytes()
    except Exception:
        await camera_manager.disconnect(websocket)