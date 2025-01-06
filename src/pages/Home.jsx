import { useCollection } from "../hooks/useCollection";

function Home() {
  const { documents } = useCollection("projects");
  return (
    <div>
      <h1 className="text-3xl mb-10">Dashboard</h1>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {documents &&
          documents.map((doc) => {
            console.log(doc);
            return (
              <div key={doc.id} className="card bg-base-100 w-full shadow-xl ">
                <div className="card-body">
                  <h2 className="card-title">{doc.name}</h2>
                  <p>
                    Date due ty by: {new Date(doc.dueTo.toDate()).toISOString()}
                  </p>
                  <hr />
                  <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                    {doc.assignedUsers.map((u) => {
                      return (
                        <div key={u.photoURL} className="avatar">
                          <div className="w-12">
                            <img src={u.photoURL} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
