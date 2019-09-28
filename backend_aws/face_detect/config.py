from utils_response import alias_access

class BaseConfig:
    DEBUG = False
    SECRET_KEY = 'imkmkfmvirtj8568948594firf3j094FREFERFg856gu86jgiyjb334jvnbtimopfew'
    ACCESS = alias_access
    TOKEN_VALIDATION = ''


class TestConfig(BaseConfig):
    DEBUG = True
    TESTING = True
    WTF_CSRF_ENABLED = False
    BCRYPT_LOG_ROUNDS = 4


class LocalConfig(BaseConfig):
    DEBUG = True


class DevelopmentConfig(BaseConfig):
    DEBUG = True


class ProductionConfig(BaseConfig):
    DEBUG = False
