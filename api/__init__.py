from fastapi import Depends, FastAPI

from sqlalchemy.orm import Session

import requests

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message":"Hello World"}


@app.get("/cache", response_model=schemas.PokeAPICache)
async def cache_url(api_url: str, db: Session = Depends(get_db)):
    
    # TODO error on null api_url
    # TODO validate api_url?

    # check if in db
    db_PokeAPICache = crud.get_PokeAPICache(db, api_url)
    
    # if not in database make api call and store response
    if db_PokeAPICache is None:
        response = requests.get(api_url)
        response.raise_for_status()
        db_PokeAPICache = crud.create_PokeAPICache(db, api_url, response.text)
        
    # return
    return db_PokeAPICache

