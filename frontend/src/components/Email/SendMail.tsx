// components/SendEmail.tsx
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
    } catch (err) {
      setStatus('⚠️ Error sending email');
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-orange-400 mb-4">Send Email Notification</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Email</label>
          <input
            type="email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={8}
            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-200"
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
