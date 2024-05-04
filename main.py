#!/usr/bin/python3

"""
    create_account.py

    MediaWiki API Demos
    Demo of `createaccount` module: Create an account on a wiki without the
    special authentication extensions

    MIT license
"""

import requests

response = requests.get('https://en.wikipedia.org/w/api.php?action=query&titles=Lobster_trap&prop=links&format=json&pllimit=max')
data = response.json()
