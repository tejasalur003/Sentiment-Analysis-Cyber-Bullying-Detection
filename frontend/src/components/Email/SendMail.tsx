'use client';
import React, { useState } from 'react';
import Loader from '../Loader';

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    setIsLoading(true);

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
      setStatus('❌ Error sending email.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={isLoading} />

      <div className="max-w-4xl mx-auto mt-14 bg-black/70 p-10 rounded-2xl shadow-xl border border-gray-700 backdrop-blur-md transition-all duration-300">
        <h2 className="text-3xl font-bold text-orange-500 mb-8 text-center tracking-wide">
          Send Email Notification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Recipient Email
            </label>
            <input
              type="email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={12}
              className="w-full p-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
              required
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              Send Email
            </button>

            {status && (
              <p
                className={`text-sm font-medium ${
                  status.includes('✅') ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {status}
              </p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default SendEmail;
