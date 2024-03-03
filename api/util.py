import uuid

def get_random_code(length):
    code = str(uuid.uuid4())[:length].replace('-', '').lower()
    return code