const CancelPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-100">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-600">Payment Cancelled!</h1>
        <p className="mt-4 text-gray-600">Your payment was not completed.</p>
        <button
          onClick={() => (window.location.href = "/")}
          className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default CancelPage;
