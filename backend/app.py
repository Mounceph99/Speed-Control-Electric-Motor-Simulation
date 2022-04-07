from flask import Flask, jsonify, request
from oct2py import octave
from marshmallow import Schema, fields
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Enabling custom octave functions
# https://oct2py.readthedocs.io/en/latest/
octave.addpath('./Octave')

# Using marshamallow for serialization
# https://marshmallow.readthedocs.io/en/stable/quickstart.html#implicit-field-creation
class ControlSystemSchema(Schema):
    data = fields.List(fields.List(fields.Float()))

@app.route('/get', methods = ['GET'])
def getPlotPoints():
    
    # Get parameters to use in control system
    #https://stackabuse.com/get-request-query-parameters-with-flask/
    args = request.args
    kt = args.get("kt", default=2.0, type=float)
    ke = args.get("ke", default=2.0, type=float)
    J = args.get("J", default=1.0, type=float)
    b = args.get("b", default=2, type=float)
    kp = args.get("kp", default=1, type=float)
    ki = args.get("ki", default=1, type=float)
    kd = args.get("kd", default=1, type=float)
    maxTime = args.get("maxTime", default=0.5, type=float)

    # Get plot points from octave using the passed parameters
    x = octave.app(kt, ke,J,b,kp,ki,kd, maxTime)

    # Serialize the data plot to send as a JSON over HTTP
    # numpy to list: https://numpy.org/doc/stable/reference/generated/numpy.ndarray.tolist.html
    response = dict(data=x.tolist())
    schema = ControlSystemSchema()
    result = schema.dump(response)
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)