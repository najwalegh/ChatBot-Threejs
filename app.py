from numpy import array
from flask import Flask,render_template,request,jsonify

from chat import get_response

app = Flask(__name__)

@app.get("/")
def index_get():
    return render_template("base.html")


@app.post("/predict")
def predict():
    text = request.get_json().get("message")
    # TODO: check if text is valid
    response = array(get_response(text))
    message = {"answer": response[0],"emote":response[1]}
    return jsonify(message)

if __name__ == "__main__":
    app.run(debug=True)      