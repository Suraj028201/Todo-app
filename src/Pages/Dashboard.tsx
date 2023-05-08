import TodoList from "./Todo-list";
import ProfileDetails from "./Profile-details";
import '../Style/Dashboard.css'

export default function Dashboard(){
    return(
    <>
        <div className="profile-todo-list">
            <ProfileDetails/>
            <TodoList/>
        </div>
    </>
    )
}