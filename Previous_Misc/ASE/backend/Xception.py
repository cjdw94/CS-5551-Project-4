import sys
import os
import numpy as np

# Keras
from keras.preprocessing import image

# Flask utils
from flask import Flask, request
from werkzeug.utils import secure_filename
from gevent.pywsgi import WSGIServer
from flask_cors import CORS

# Define a flask app
app = Flask(__name__)
CORS(app, support_credentials=True)

from keras.applications.xception import Xception, preprocess_input, decode_predictions
model = Xception(weights='imagenet')
print('The model Xception loaded')
print('Check http://127.0.0.1:64006/')


def model_predict(img_path, model):
    img = image.load_img(img_path, target_size=(299, 299))
    x = image.img_to_array(img) # Preprocessing the image
    x = np.expand_dims(x, axis=0) # x = np.true_divide(x, 255)
	
    preds = model.predict(preprocess_input(x))
    return preds


@app.route('/predict', methods=['POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        preds = model_predict(file_path, model)

        pred_class = decode_predictions(preds, top=5)   # ImageNet Decode
        result = str(pred_class[0][0][1])               # Convert to string
        return 'The model Xception predicts this image as : ' + result
    return None


if __name__ == '__main__':

    # Serve the app with gevent
    http_server = WSGIServer(('', 64006), app)
    http_server.serve_forever()
