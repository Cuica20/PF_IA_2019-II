import os
import sys
import json
import io

from flask import Flask, Response, request
from flask_cors import CORS

from version import check_version
from utils_response import test_ok

BASE_DIR = os.getcwd()
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)


app = Flask(__name__)
app.config.from_object('config.ProductionConfig')
cors = CORS(app)
app.manager = None


@app.route("/<version>/test-load", endpoint='load_test')
@check_version
def load_test(version=None, objects=None):
    return test_ok(
        version=version, objects=objects
    )

@app.route("/<version>/struct", endpoint='get_struct', methods=['POST', 'GET', 'PUT'])
@check_version
def get_struct(version=None, objects=None, app=app):

    if request.method.lower() != 'get' and request.headers['Content-Type'] != 'application/json':
        raise Exception('Invalid content type' + '|400')

    if not app.manager:
    	app.manager = objects()

    return app.manager.struct(request)


@app.route("/<version>/data", endpoint='get_data', methods=['POST', 'GET', 'PUT'])
@check_version
def get_data(version=None, objects=None, app=app):

    if request.method.lower() != 'get' and request.headers['Content-Type'] != 'application/json':
        raise Exception('Invalid content type' + '|400')

    if not app.manager:
    	app.manager = objects()

    return app.manager.data(request)
