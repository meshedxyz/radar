const Loading = () => {
  return (
    <div className=" animate-pulse w-full h-screen bg-gradient-to-t from-slate-900 via-slate-800 to-slate-800 shadow-xl shadow-gray-900/50 rounded-b-xl border-[0.25px] border-slate-700">
      <div className="flex justify-center items-center flex-wrap w-[377px] h-full p-5">
        <div className="pb-5 flex w-full flex-wrap justify-center items-center">
          <div className="flex mt-6 mb-2 mx-3 justify-center h-3 w-3">
            <span className="animate-ping absolute h-1.5 w-1.5 rounded-full bg-green-300 opacity-55"></span>
            <span className="relative rounded-full h-1.5 w-1.5 bg-green-300"></span>
          </div>
          <p className="cursor-default pb-3 text-center w-full font-semibold text-2xl text-slate-300 font-display">
            Loading
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
