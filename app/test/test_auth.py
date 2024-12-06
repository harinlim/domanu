import pytest
from app.auth import *
from app.models import User


def test_create_user():
    user = User
    user.email = "chiarasabato07@gmail.com"
    user.password = "testPassword"
    create_user(user)


