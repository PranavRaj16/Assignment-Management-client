const Loading = ({ size = "large", message = "Loading..." }) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div
        className={`animate-spin rounded-full border-2 border-primary-200 border-t-primary-600 ${sizeClasses[size]}`}
      ></div>
      <p className="mt-4 text-gray-600 text-sm">{message}</p>
    </div>
  );
};

export default Loading;
