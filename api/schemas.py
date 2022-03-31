from typing import List, Optional

from pydantic import BaseModel


class PokeAPICacheBase(BaseModel):
    api_url: str

    # I believe this makes api_response a required column, but it allows null
    # null response will allow us to retry failures
    api_response: Optional[str] = ...

class PokeAPICacheCreate(PokeAPICacheBase):
    api_url: str

class PokeAPICache(PokeAPICacheBase):
    PokeAPICacheID: int

    # These are inherited from PokeAPICacheBase
    # api_url: str
    # api_response: str

    # needed for sqlalchemy. Sqlalchemy expects obj.val. pydatnic only supports obj["val"] by default
    class Config:
        orm_mode = True
