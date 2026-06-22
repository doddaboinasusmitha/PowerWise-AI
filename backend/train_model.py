import pandas as pd
from sklearn.linear_model import LinearRegression
import pickle

# Load dataset
data = pd.read_csv("data.csv")

# Input and output
X = data[["units"]]
y = data["bill"]

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Save trained model
with open("model.pkl", "wb") as file:
    pickle.dump(model, file)

print("PowerWise AI model trained successfully!")