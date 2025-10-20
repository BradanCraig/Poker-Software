import pymongo
from typing import List
from dataclasses import dataclass
from datetime import datetime


@dataclass
class Game:
    total: float
    group: str
    date: datetime

@dataclass
class User:
    username: str
    password: str
    friends: List["User"]
    games: List[Game]
    



