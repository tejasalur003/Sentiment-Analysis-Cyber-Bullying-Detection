import React, { useState, useEffect } from "react";

const Test = () => {
    const [data, setData] = useState<{ members: string[] } | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://127.0.0.1:5000/members");

                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

                const jsonData = await res.json();
                setData(jsonData);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Members List</h2>
            {data ? (
                <ul className="list-disc ml-5 mt-2">
                    {data.members.map((member, index) => (
                        <li key={index} className="text-lg">{member}</li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Test;
