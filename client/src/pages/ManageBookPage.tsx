import { Header } from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useRequest } from "../hooks/useRequest";
import { useEffect, useState } from "react";
import axios from "axios";
import { Book } from "../data/Book";

interface ManageBookPageProps {
  type: "add" | "edit";
}

export const ManageBookPage = ({ type }: ManageBookPageProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const bookId = type === "edit" ? location.pathname.split("/").pop() : null;

  useEffect(() => {
    (async () => {
      if (type === "edit") {
        const response = await axios.get("/api/books/" + bookId);
        const book: Book = response.data;

        setIsbn(book.isbn);
        setTitle(book.title);
        setAuthor(book.author);
      }
    })();
  }, []);

  const [doRequest, errors] = useRequest({
    url: `/api/books/` + (type === "edit" ? bookId : ""),
    method: type === "edit" ? "put" : "post",
    body: { isbn, title, author },
    onSuccess: () => navigate("/"),
  });

  const handleIsbn = (e: any) => {
    setIsbn(e.target.value);
  };

  const handleTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const handleAuthor = (e: any) => {
    setAuthor(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await doRequest();
  };

  return (
    <>
      <Header />
      <div className="w-50 m-auto">
        <form className="w-50 m-auto d-flex flex-column justify-content-center align-items-center">
          <h3 className="mb-3">{type === "edit" ? "Edit Book" : "Add Book"}</h3>
          <div className="form-floating w-100">
            <input
              id={"isbn-input"}
              className="form-control mb-2"
              placeholder={"ISBN"}
              value={isbn}
              onChange={handleIsbn}
            />
            <label htmlFor={"isbn-input"} className="text-black">
              ISBN
            </label>
          </div>
          <div className="form-floating w-100">
            <input
              id={"title-input"}
              className="form-control"
              placeholder={"Title"}
              value={title}
              onChange={handleTitle}
            />
            <label htmlFor={"title-input"} className="text-black">
              Title
            </label>
          </div>
          <div className="form-floating w-100">
            <input
              id={"author-input"}
              className="form-control"
              placeholder={"Author"}
              value={author}
              onChange={handleAuthor}
            />
            <label htmlFor={"author-input"} className="text-black">
              Author
            </label>
          </div>
          <button
            onClick={handleSubmit}
            type={"submit"}
            className="w-100 btn-primary btn-lg mt-4"
          >
            {type === "edit" ? "Edit Book" : "Add Book"}
          </button>
        </form>
        {errors}
      </div>
    </>
  );
};
