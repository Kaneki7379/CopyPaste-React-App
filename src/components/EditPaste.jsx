import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateToPastes } from "../redux/pasteSlice";

const EditPaste = () => {
  const { id } = useParams(); 
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(paste?.title || "");
  const [content, setContent] = useState(paste?.content || "");

  if (!paste) return <p>Paste not found</p>;

  function handleUpdate() {
    dispatch(updateToPastes({ _id: id, title, content }));
    navigate("/pastes"); // go back after update
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Edit Paste</h1>
      <input
        className="border p-2 w-full my-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border p-2 w-full my-2"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleUpdate}
      >
        Save
      </button>
    </div>
  );
};

export default EditPaste;
