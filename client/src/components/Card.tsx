import { Book } from "../data/Book";
import { useRequest } from "../hooks/useRequest";
import { useContext } from "react";
import CurrentUserContext from "../context/CurrentUserContext";

export const Card = ({ id, isbn, title, author }: Book) => {
  const currentUserContext = useContext(CurrentUserContext);

  const [doRequest] = useRequest({
    url: "/api/books/" + id,
    method: "delete",
    onSuccess: () => window.location.reload(),
  });

  const handleDelete = async () => {
    await doRequest();
  };

  return (
    <div className="mycard card shadow-sm">
      <div className="mycard-top bg-dark text-white card-img-top">{title}</div>
      <div className="card-body">ISBN: {isbn}</div>
      <div className="card-footer">
        <div>Author: {author}</div>
        {currentUserContext.currentUser?.role === "admin" && (
          <div className="mycard-actions">
            <a href={"/editBook/" + id} className="edit-button btn btn-dark">
              Edit
            </a>
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
