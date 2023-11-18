import joblib
import os

current_directory = os.path.dirname(os.path.abspath(__file__))
model_req_path = os.path.join(current_directory, 'random_forest_model_request.pkl')
model_imp_path = os.path.join(current_directory, 'random_forest_model_importance.pkl')
vectorizer_path = os.path.join(current_directory, 'vector.pkl')


model_req = joblib.load(model_req_path)
model_imp = joblib.load(model_imp_path)
vectorizer = joblib.load(vectorizer_path)


def classify(text):
	text_features = vectorizer.transform([text])
	prediction_req = model_req.predict(text_features)
	prediction_imp = model_imp.predict(text_features)

	results = {
		"request": prediction_req[0],
		"importance": prediction_imp[0]
	}

	return results

