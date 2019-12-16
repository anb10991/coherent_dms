
def jwt_response_payload_handler(token, user=None, request=None):
    role = ['staff', 'manager']
    return {
        'token': token,
        'role': role[user.is_staff]
    }
    