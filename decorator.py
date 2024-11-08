import json

from opentelemetry import trace

tracer = trace.get_tracer("diceroller.tracer")


def trace_wrapper(function):
    def log(*args, **kwargs):
        with tracer.start_as_current_span(function.__name__) as function_tracer:
            function_tracer.set_attribute("args", args)
            function_tracer.set_attribute("kwargs", json.dumps(kwargs))
            return_value = function(*args, **kwargs)
            function_tracer.set_attribute("return_value", json.dumps(return_value))
            return return_value
    return log