import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import FormTextare from "../components/FormTextare";
import { Form, useActionData, useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Timestamp } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";
import { useFirestore } from "../hooks/useFirestore";
import { useCollection } from "../hooks/useCollection";

const animatedComponents = makeAnimated();

export async function action({ request }) {
  const form = await request.formData();
  const name = form.get("name");
  const description = form.get("description");
  const dueTo = Timestamp.fromDate(new Date(form.get("dueTo")));
  return { name, description, dueTo };
}

const projectTypes = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "marketing", label: "Marketing" },
  { value: "smm", label: "SMM" },
];

function Create() {
  const navigate = useNavigate();
  const { addDocument, isPending } = useFirestore("projects");
  const { documents } = useCollection("users");
  const createActionData = useActionData();
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [projectType, setProjectType] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(
      documents?.map((document) => {
        return { value: { ...document }, label: document.displayName };
      })
    );
  }, [documents]);

  const selectUser = (user) => {
    setAssignedUsers(user);
  };

  const selectProjectType = (type) => {
    setProjectType(type.value);
  };

  useEffect(() => {
    if (createActionData) {
      addDocument({
        ...createActionData,
        assignedUsers: assignedUsers.map((au) => au.value),
        projectType,
        createdAt: serverTimestamp(new Date()),
      }).then(() => {
        navigate("/");
      });
    }
  }, [createActionData]);

  return (
    <div>
      <h2 className="text-3xl font-semibold">Create a new Project</h2>
      <Form method="post" className="flex flex-col gap-7 max-w-[450px] w-full">
        <FormInput
          label="Project name"
          type="text"
          placeholder="Write project name here"
          name="name"
        />
        <FormTextare label="Project description" name="description" />
        <FormInput label="Set due to" type="date" name="dueTo" />
        <label className="form-control">
          <div className="label">
            <span className="label-text">Project type:</span>
          </div>
          <Select
            onChange={selectProjectType}
            options={projectTypes}
            components={animatedComponents}
          />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Assign users:</span>
          </div>
          <Select
            onChange={selectUser}
            options={users}
            components={animatedComponents}
            isMulti
          />
        </label>

        {isPending && (
          <div className="flex justify-end">
            <button className="btn btn-primary" disabled>
              Loading...
            </button>
          </div>
        )}
        {!isPending && (
          <div className="flex justify-end">
            <button className="btn btn-primary">Add Project</button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Create;
