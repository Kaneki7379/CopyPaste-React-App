import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams(); // get paste id from route
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!paste) return <p>Paste not found!</p>;

  function handleDelete() {
    dispatch(removeFromPastes(id));
    navigate("/pastes");
  }

  function handleShare() {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      toast.error("Sharing not supported in this browser.");
    }
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-2">{paste.title}</h1>
      <p className="whitespace-pre-wrap mb-4">{paste.content}</p>
      <p className="text-sm text-gray-500 mb-4">
        Created At: {paste.createdAt}
      </p>

      <div className="flex gap-4">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => navigate(`/edit/${paste._id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => {
            navigator.clipboard.writeText(paste.content);
            toast.success("Copied to Clipboard");
          }}
        >
          Copy
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={handleShare}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default ViewPaste;
