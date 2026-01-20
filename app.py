import os
# Optional: Suppress the oneDNN notification
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from flask import Flask, render_template, request, jsonify, send_from_directory
import os
# import tensorflow as tf
# from tensorflow.keras.models import load_model
# import cv2
# import numpy as np
# from PIL import Image
# import io
# import tempfile


app = Flask(__name__)
# # model = load_model('best_model.h5')
# model = load_model('trial_model_01.keras')

# CLASS_LABELS = {
#     0: 'monday',
#     1: 'tuesday',
#     2: 'wednesday',
#     3: 'thursday',
#     4: 'friday',
# }


@app.route('/', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/service_worker.js')
def service_worker():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'service_worker.js')

@app.route('/manifest.json')
def manifest():
    return app.send_static_file('manifest.json')

# @app.route('/service_worker.js')
# def service_worker():
#     return app.send_static_file('service_worker.js')

# @app.route('/predict_video', methods=['POST'])
# def predict_video():
#     # 1. Get the file and check if it exists
#     file = request.files.get('video')
#     if not file:
#         print("ERROR: No video file provided") # Print for server log
#         return jsonify({'error': 'No video file provided'}), 400

#     temp_path = None
#     try:
#         # 2. Use tempfile to create a temporary path and save the file
#         with tempfile.NamedTemporaryFile(suffix='.mp4', delete=False) as tmp:
#             temp_path = tmp.name
#             file.save(temp_path)

#         # 3. OpenCV can now reliably open the file path
#         cap = cv2.VideoCapture(temp_path)
        
#         # Check if the video opened successfully
#         if not cap.isOpened():
#             print(f"ERROR: Failed to open video at {temp_path}")
#             return jsonify({'error': 'Could not open video file with OpenCV. It may be corrupt or an unsupported format.'}), 500

#         predictions = []
#         frame_count = 0
        
#         # 4. Processing loop remains the same
#         # ... (Frame processing logic) ...
#         while cap.isOpened() and frame_count < 30:
#             ret, frame = cap.read()
#             if not ret: break
#             frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#             frame = cv2.resize(frame, (224, 224))
#             frame = np.expand_dims(frame / 255.0, axis=0).astype(np.float32)
            
#             # --- Print prediction for debugging ---
#             pred = model.predict(frame, verbose=0)
#             class_index = np.argmax(pred)
#             predictions.append(class_index)
#             # print(f"Frame {frame_count+1}: Predicted Index {class_index}, Confidence: {pred[0][class_index]:.2f}") 
#             # (Uncomment the line above for detailed frame-by-frame output)
#             # -------------------------------------
            
#             frame_count += 1
        
#         cap.release()
        
#         if not predictions:
#             # Handle case where video was empty or had 0 readable frames
#             print("ERROR: Video contains no readable frames.")
#             return jsonify({'error': 'Video contains no readable frames.'}), 400
            
#         final_index = max(set(predictions), key=predictions.count)
#         final_label = CLASS_LABELS.get(final_index, 'Unknown Class') # Get the readable label
        
#         # --- Print the final result ---
#         print(f"\n✅ SUCCESS: Final Prediction Index: {final_index} ({final_label})")
#         print(f"Frames analyzed: {frame_count}\n")
#         # ------------------------------
        
#         # 5. Return the index AND the label in the JSON response
#         return jsonify({
#             'prediction_index': int(final_index),
#             'prediction_label': final_label,
#             'frames_analyzed': frame_count
#         })

#     finally:
#         # 6. Ensure the temporary file is deleted
#         if temp_path and os.path.exists(temp_path):
#             os.remove(temp_path)

if __name__ == '__main__':
    app.run(port=8200, debug=True)
