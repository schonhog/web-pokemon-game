from sqlalchemy.orm import Session

from . import models, schemas


#def create_PokeAPICache(db: Session, PokeAPICache : schemas.PokeAPICacheCreate):
def create_PokeAPICache(db: Session, api_url: str, api_response: str):
        # validate
        PokeAPICache = schemas.PokeAPICacheCreate(api_url=api_url, api_response=api_response)

        # take validated data to database
        db_PokeAPICache = models.PokeAPICache(api_url=PokeAPICache.api_url, api_response=PokeAPICache.api_response)
        db.add(db_PokeAPICache)
        db.commit()
        db.refresh(db_PokeAPICache)
        return db_PokeAPICache

def get_PokeAPICache(db: Session, api_url: str):
    return db.query(models.PokeAPICache).filter(models.PokeAPICache.api_url == api_url).first()
    