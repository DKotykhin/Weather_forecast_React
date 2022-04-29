import ErrorMessage from "../Components/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          color: "brown",
        }}
      >
        Страница не найдена
      </p>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          marginTop: "30px",
          color: "brown",
        }}
        to="/"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default Page404;
