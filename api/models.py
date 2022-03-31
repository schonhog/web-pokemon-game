from sqlalchemy import Integer, String, Column

from .database import Base


class PokeAPICache(Base):
    __tablename__ = "PokeAPICache"

    PokeAPICacheID = Column(Integer, primary_key=True, index=True, autoincrement=True) #hopefully becomes cluster
    api_url = Column(String, unique=True)
    api_response = Column(String, unique=False, index=False)


