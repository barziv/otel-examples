import logging
from uuid import uuid4
from random import randint

from flask import Flask
from opentelemetry import baggage

from decorator import trace_wrapper

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
app = Flask(__name__)

@app.route("/rolldice")
@trace_wrapper
def roll_dice():
    max_rand = get_max_rand()
    return str(roll(max_rand["max"]))

@trace_wrapper
def roll(max_rand=10):
    # This creates a new span that's the child of the current one
    return randint(1, max_rand)

@trace_wrapper
def get_max_rand():
    return {"max": 6}
