// custom hooks
import { useCollection } from "../hooks/useCollection";

// rrd import
import { Form, useActionData } from "react-router-dom";

// components
import { FormInput } from "../components";
import { useEffect } from "react";

// firebase
import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { updateDoc } from "firebase/firestore/lite";

// action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  return { title };
};

function ToDos() {
  const { user } = useGlobalContext();
  const { data, error } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["createdAt"]
  );
  const dataToDo = useActionData();

  const handleDelete = (id) => {
    deleteDoc(doc(db, "todos", id))
      .then(() => {
        toast.success("Deleted");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCompleted = (id, status) => {
    const todosRef = doc(db, "todos", id);

    updateDoc(todosRef, {
      completed: !status,
      title: "This is new title",
    })
      .then(() => {
        toast.success("Updated!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
    if (dataToDo) {
      const newToDo = {
        ...dataToDo,
        completed: true,
        createdAt: serverTimestamp(),
        uid: user.uid,
      };
      addDoc(collection(db, "todos"), newToDo)
        .then(() => {
          toast.success("New ToDo Added");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [dataToDo]);

  if (error) {
    return <div className="mt-10">Error: {error.message}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">To-Do List</h1>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-emerald-500">
          {data.reverse().map((todo) => (
            <div
              key={todo.id}
              className={`bg-white rounded-lg shadow-md p-6 flex flex-col gap-4 ${
                todo.completed ? "opacity-50" : "opacity-100"
              }`}
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {todo.title}
              </h3>
              <div className="flex justify-between items-center ">
                <button
                  onClick={() => handleCompleted(todo.id, todo.completed)}
                  className="bg-green-500 hover:bg-green-700 text-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {todo.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-2xl text-emerald-500">No todos available</div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New To-Do</h2>
        <Form method="post" className="flex flex-col gap-4">
          <FormInput name="title" label="Title" type="text" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add To-Do
          </button>
        </Form>
      </div>
    </div>
  );
}

export default ToDos;
