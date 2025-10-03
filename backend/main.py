from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from .routers import tests, users, analysis
from .websockets import manager # Import the manager instance

app = FastAPI()
origins = ['http://localhost:5173']
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=['*'], allow_headers=['*'])

app.include_router(tests.router, prefix='/tests')
app.include_router(users.router, prefix='/users')
app.include_router(analysis.router, prefix='/analysis')

@app.websocket("/ws/dashboard")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Keep the connection alive, or handle incoming messages if needed
            # For now, we just expect the frontend to listen for broadcasts
            await websocket.receive_text() # This will block until a message is received or connection closed
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("WebSocket disconnected")