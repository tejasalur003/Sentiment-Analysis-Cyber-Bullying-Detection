import React, { useState } from "react";

const Multiply = () => {
    const [num1, setNum1] = useState<number | "">("");
    const [num2, setNum2] = useState<number | "">("");
    const [result, setResult] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleMultiply = async () => {
        if (num1 === "" || num2 === "") {
            setError("Please enter both numbers");
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:5000/multiply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ num1: Number(num1), num2: Number(num2) })
            });

            const data = await res.json();

            if (res.ok) {
                setResult(data.product);
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
            <h2 className="text-2xl font-bold mb-4">Multiply Two Numbers</h2>

            <div className="flex flex-col space-y-2">
                <input
                    type="number"
                    value={num1}
                    onChange={(e) => setNum1(e.target.value ? Number(e.target.value) : "")}
                    placeholder="Enter first number"
                    className="p-2 border rounded"
                />
                <input
                    type="number"
                    value={num2}
                    onChange={(e) => setNum2(e.target.value ? Number(e.target.value) : "")}
                    placeholder="Enter second number"
                    className="p-2 border rounded"
                />
                <button onClick={handleMultiply} className="bg-orange-500 text-white py-2 rounded">
                    Multiply
                </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {result !== null && <p className="text-green-500 mt-2">Product: {result}</p>}
        </div>
    );
};

export default Multiply;
