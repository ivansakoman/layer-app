import { NavLink } from "react-router-dom";

interface Props {
    children: JSX.Element | JSX.Element[];
}

const MainWrapper = (props: Props) => {
    return <>
        <div className="nav">
            <NavLink className="nav__item" to="/">Home</NavLink>
            <NavLink className="nav__item" to="/liked-images">Liked</NavLink>
        </div>
        <div className="layout">
            {props.children}
        </div>
    </>
}

export default MainWrapper;