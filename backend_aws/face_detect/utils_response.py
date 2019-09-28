import json

from flask import Response

alias_access = {
    'guest': 0,
    'user': 1,
    'admin': 2
}


def get_text_status(num):
    if num // 100 == 2:
        return 'success'
    if num // 100 == 5:
        return 'error'
    if num // 100 == 4:
        return 'bad request'


def analysis_object(func):
    def decorator(obj):
        if isinstance(obj, dict):
            return func(*obj['data'], **obj['extra'])

        return func(*obj)

    return decorator


@analysis_object
def response_quick(status, message, **kwargs):

    context = {
        'status': get_text_status(status),
        'message': message
    }
    if kwargs:
        context = kwargs

    return Response(
        json.dumps(context),
        mimetype=u'application/json', 
        status=status
    )


def test_ok(version=None, objects=None, messagex=''):
    return {
        'version': version.replace('v', ''),
        'objects_type': str(type(objects)),
        'objects_path': str(objects).split('service')[-1].split('objects')[0]
    }

