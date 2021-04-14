from flask import Flask, send_from_directory
import random

app = Flask(__name__)

# #########################################################
# # Define routes for all requests to the server for data.
# #########################################################


# Sample JSON route for random array of data.
@app.route('/test')
def test():
    # Create a list of 10 random integers.
    randvals = [random.randint(1, 500) for x in range(8)]

    # Return as a dictionary, which flask auto-converts to json
    return {'data': randvals}


# #########################################################
# # Define routes for Svelte app
# #########################################################

# The default path, leads to our for our main Svelte page
@app.route("/")
def base():
    return send_from_directory('webapp/public', 'index.html')


# Paths for all the static files (compiled JS/CSS, images, etc.)
@app.route("/<path:path>")
def home(path):
    return send_from_directory('webapp/public', path)


if __name__ == "__main__":
    app.run(debug=True)
