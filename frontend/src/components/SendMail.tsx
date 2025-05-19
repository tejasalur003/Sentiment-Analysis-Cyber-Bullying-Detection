// components/SendEmail.tsx
import React, { useState } from 'react';

const SendEmail: React.FC = () => {
  const [receiverEmail, setReceiverEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          receiver_email: receiverEmail,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('Email sent successfully!');
      } else {
        setStatus(`Failed: ${data.error}`);
      }
    } catch (err) {
      setStatus('Error sending email');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={receiverEmail}
          onChange={(e) => setReceiverEmail(e.target.value)}
          placeholder="Receiver's Email"
          className="border p-2 w-full"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message"
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send Email
        </button>
        {status && <p>{status}</p>}
      </form>
    </div>
  );
};

export default SendEmail;
