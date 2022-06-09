import ErrorMessage from "../Components/errorMessage/ErrorMessage";
import { Link } from "react-router-dom";

import "./page404.css";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p className="page">Страница не найдена</p>
            <Link className="link" to="/">Вернуться на главную</Link>
        </div>
    );
};

export default Page404;
