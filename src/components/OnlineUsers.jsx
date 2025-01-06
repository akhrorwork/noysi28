import { useCollection } from "../hooks/useCollection";
import Avatar from "./Avatar";

function OnlineUsers() {
  const { documents } = useCollection("users");
  return (
    <div className="w-[200px] bg-slate-300 p-10">
      <ul>
        {documents &&
          documents.map((doc) => {
            return (
              <li key={doc.id} className="flex gap-3">
                <p>{doc.displayName}</p>
                <p>{doc.online ? "online" : "offline"}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default OnlineUsers;
