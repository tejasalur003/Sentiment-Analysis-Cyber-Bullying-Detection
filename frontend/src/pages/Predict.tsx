import React, { useState } from "react";

const Predict = () => {
    const [inputValue, setInputValue] = useState<number | "">("");
    const [prediction, setPrediction] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePredict = async () => {
        if (inputValue === "") {
            setError("Please enter a number");
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ input_value: Number(inputValue) })
            });

            const data = await res.json();

            if (res.ok) {
                setPrediction(data.prediction);
                setError(null);
            } else {
                setError(data.error || "Something went wrong");
            }
        } catch (err) {
            setError("Failed to connect to the server");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">ML Model Prediction</h2>

            <div className="flex flex-col space-y-2">
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value ? Number(e.target.value) : "")}
                    placeholder="Enter a number"
                    className="p-2 border rounded"
                />
                <button onClick={handlePredict} className="bg-orange-500 text-white py-2 rounded">
                    Predict
                </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {prediction !== null && <p className="text-green-500 mt-2">Prediction: {prediction}</p>}
        </div>
    );
};

export default Predict;
