import hashlib
import datetime
import math
import random


def password_valid(password):
    l, u, p, d = 0, 0, 0, 0
    s = password
    if (len(s) >= 8):
        for i in s:

            # counting lowercase alphabets
            if (i.islower()):
                l += 1

            # counting uppercase alphabets
            if (i.isupper()):
                u += 1

            # counting digits
            if (i.isdigit()):
                d += 1

            # counting the mentioned special characters
            if (i == '@' or i == '$' or i == '_'):
                p += 1
    if (l >= 1 and u >= 1 and p >= 1 and d >= 1 and l+p+u+d == len(s)):
        return True
    else:
        return False


def customSHA256(str):
    str_obj = hashlib.sha256(str.encode('UTF-8'))
    return str_obj.hexdigest()


def strtodate(str):
    date_obj = datetime.datetime.strptime(str, '%m-%d-%Y').date()
    return date_obj


# function to generate OTP
def generateOTP():

    # Declare a digits variable
    # which stores all digits
    digits = "0123456789"
    OTP = ""

   # length of password can be changed
   # by changing value in range
    for i in range(6):
        OTP += digits[math.floor(random.random() * 10)]

    return OTP
