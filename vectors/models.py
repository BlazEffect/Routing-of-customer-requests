import joblib

model_req = joblib.load('random_forest_model_request.pkl')
model_imp = joblib.load('random_forest_model_importance.pkl')
vectorizer = joblib.load('vector.pkl')


def classify(text):
	text_features = vectorizer.transform([text])
	prediction_req = model_req.predict(text_features)
	prediction2_imp = model_imp.predict(text_features)

	results = {
		"request": prediction_req[0],
		"importance": prediction2_imp[0]
	}

	return results
