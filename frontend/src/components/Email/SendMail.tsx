'use client';
import React, { useState } from 'react';

interface SendEmailProps {
  defaultMessage: string;
  defaultEmail?: string;
}

const SendEmail: React.FC<SendEmailProps> = ({
  defaultMessage,
  defaultEmail = 'username@gmail.com',
}) => {
  const [receiverEmail, setReceiverEmail] = useState(defaultEmail);
  const [message, setMessage] = useState(defaultMessage);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');

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
        setStatus('✅ Email sent successfully!');
      } else {
        setStatus(`❌ Failed: ${data.error}`);
      }
    } catch (error) {
      setStatus('⚠️ Error sending email.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-black/60 p-6 rounded-lg shadow-lg border border-gray-700 backdrop-blur-md">
      <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Send Email Notification</h2>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Recipient Email</label>
          <input
            type="email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={10}
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-md font-semibold transition duration-200"
        >
          Send Email
        </button>

        {status && (
          <p
            className={`mt-3 text-sm font-medium ${
              status.includes('successfully') ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default SendEmail;
