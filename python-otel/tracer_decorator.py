import json

from opentelemetry import trace

from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import (
    BatchSpanProcessor,
    ConsoleSpanExporter,
)

provider = TracerProvider()
processor = BatchSpanProcessor(ConsoleSpanExporter())
provider.add_span_processor(processor)

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