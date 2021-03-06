const connection = require("../db-config");
const db = connection.promise();

const findAll = () => {
	return db
		.query("SELECT id, firstname, lastname, email, phone FROM users ")
		.then(([res]) => res);
};

const findOne = (id) => {
	return db
		.query("SELECT firstname, lastname, email, phone FROM users WHERE id = ?", [
			id,
		])
		.then(([res]) => res[0]);
};

const findOneByName = (username) => {
	return db
		.query(
			`SELECT
		users.id,
		roles.name role
		FROM users
		INNER JOIN roles
		ON roles.id = users.role_id
		WHERE firstname = ?`,
			[username]
		)
		.then(([res]) => res[0]);
};

const createUser = (user) => {
	return db.query(
		"INSERT INTO users (firstname, lastname, password, email, phone) VALUES (?, ?, ?, ?, ?)",
		[user.firstname, user.lastname, user.password, user.email, user.phone]
	);
};

const updateUser = (user, id) => {
	return db.query(`UPDATE users SET ? WHERE id = ?`, [user, id]);
};

const deleteUser = (id) => {
	return db.query("DELETE FROM users WHERE id = ?", [id]);
};

module.exports = {
	findAll,
	findOne,
	findOneByName,
	createUser,
	updateUser,
	deleteUser,
};
