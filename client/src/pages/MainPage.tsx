import { Header } from "../components/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CurrentUserContext from "../context/CurrentUserContext";
import { Card } from "../components/Card";
import { Book } from "../data/Book";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();
  const currentUserContext = useContext(CurrentUserContext);

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/auth/current-user");
      const user = response.data.currentUser;
      console.log("user", user);

      if (!user) {
        navigate("/login");
      }
      currentUserContext.setCurrentUser(user);

      await getBooks();

      setInterval(async () => {
        await getBooks();
      }, 3000);
    })();
  }, []);

  const getBooks = async () => {
    const books = await axios.get("/api/books");
    setBooks(books.data);
  };

  const cards = books.map((book) => (
    <Card
      key={book.id}
      id={book.id}
      isbn={book.isbn}
      title={book.title}
      author={book.author}
    />
  ));

  return (
    <>
      <Header />
      <div className="grid w-75 h-100">{cards}</div>
    </>
  );
};
