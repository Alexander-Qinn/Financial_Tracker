from fastapi import FastAPI

from app.api.routes import accounts, analytics, auth, cards, recurring, transactions

app = FastAPI(title="Financial OS API")

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(accounts.router, prefix="/api/accounts", tags=["accounts"])
app.include_router(transactions.router, prefix="/api/transactions", tags=["transactions"])
app.include_router(recurring.router, prefix="/api/recurring", tags=["recurring"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(cards.router, prefix="/api/cards", tags=["cards"])


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
