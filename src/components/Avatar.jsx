function Avatar({ user }) {
  return (
    <div className="flex flex-col items-center p-10">
      <img className="w-20 h-20 rounded-full" src={user.photoURL} alt="" />
      <p className="font-bold text-xl">Hello,{user.displayName}</p>
    </div>
  );
}

export default Avatar;
