const Header = () => {
  return (
    <div className=" bg-purple-600/20 px-4 py-5">
      <div
        className={`w-[95%] md:w-[90%] mx-auto flex justify-between items-center`}
      >
        <div>
          <p className=" text-xl font-bold">
            Z_ <span className=" text-[#ff5900]">Breed</span>
          </p>
        </div>

        <w3m-button />
      </div>
    </div>
  );
};

export default Header;
