const SuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-4 text-gray-600">Thank you for your purchase.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
