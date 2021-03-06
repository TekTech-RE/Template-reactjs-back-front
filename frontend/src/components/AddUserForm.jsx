import { useState } from "react";
import axios from "axios";

const AddUserForm = ({ addUserToState }) => {
	const addUser = (user) => {
		axios
			.post(`http://localhost:5005/users/new`, user)
			.then((res) => addUserToState(res.data))
			.catch((err) => {
				console.warn(err.res.data);
			});
	};

	const initialFormState = {
		firstname: "",
		lastname: "",
		password: "",
		email: "",
		phone: "",
	};

	const [user, setUser] = useState(initialFormState);

	const handleInputChange = (event) => {
		const { name, value } = event.target;

		setUser({ ...user, [name]: value });
	};

	if (!user) return "";

	return (
		<form
			id="AddUserForm"
			onSubmit={(event) => {
				event.preventDefault();
				if (!user) return;

				addUser(user);
				setUser(initialFormState);
			}}
		>
			<label>Firstname</label>
			<input
				type="text"
				name="firstname"
				value={user.firstname}
				onChange={handleInputChange}
			/>

			<label>Lastname</label>
			<input
				type="text"
				name="lastname"
				value={user.lastname}
				onChange={handleInputChange}
			/>

			<label>Password</label>
			<input
				type="text"
				name="password"
				value={user.password}
				onChange={handleInputChange}
			/>

			<label>Email</label>
			<input
				type="text"
				name="email"
				value={user.email}
				onChange={handleInputChange}
			/>

			<label>Phone</label>
			<input
				type="text"
				name="phone"
				value={user.phone}
				onChange={handleInputChange}
			/>

			<button>Add new user</button>
		</form>
	);
};

export default AddUserForm;
