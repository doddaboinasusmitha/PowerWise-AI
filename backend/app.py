from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained ML model
with open("model.pkl", "rb") as file:
    model = pickle.load(file)


@app.route("/")
def home():
    return jsonify({
        "message": "PowerWise AI ML Backend Running",
        "status": "success"
    })


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    units = data["units"]

    prediction = model.predict(
        np.array([[units]])
    )

    return jsonify({
        "units": units,
        "predicted_bill": round(float(prediction[0]), 2)
    })


if __name__ == "__main__":
    app.run(debug=True)