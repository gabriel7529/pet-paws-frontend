import useAllUsers from "../../hooks/useAllUsers";
import useModal from "../../hooks/useModal";
import { useState } from "react";
import Modal from "./ui/Modal";
import EditUser from "./EditUser";

const Users = () => {
  const { users, loading, error, updateUser } = useAllUsers();
  const [editUser, setEditUser] = useState(null);
  const { isOpen, openModal, closeModal } = useModal();

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar usuarios: {error.message}</div>;

  const handleEditClick = (user) => {
    setEditUser(user);
    openModal();
  };

  return (
    <div className="p-10">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 min-w-80">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th className="w-8">#</th>
            <th>Nombres y apellidos</th>
            <th>Email</th>
            <th className="hidden md:table-cell">Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td>{index + 1}</td>
                <td>{user.name + " " + user.lastName}</td>
                <td>{user.email}</td>
                <td >{user.role === "USER" ? "USUARIO" : "ADMINISTRADOR"}</td>
                <td className={
                  user.isActive
                    ? "text-green-500"
                    : "text-red-500"
                }>{user.isActive ? "Activo" : "Inactivo"}</td>
                <td>
                  <button
                    onClick={() => handleEditClick(user)}
                    className="p-1 text-gray-700 bg-gray-200 rounded-md dark:bg-gray-700 dark:text-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path d="M 19.171875 2 C 18.448125 2 17.724375 2.275625 17.171875 2.828125 L 16 4 L 20 8 L 21.171875 6.828125 C 22.275875 5.724125 22.275875 3.933125 21.171875 2.828125 C 20.619375 2.275625 19.895625 2 19.171875 2 z M 14.5 5.5 L 3 17 L 3 21 L 7 21 L 18.5 9.5 L 14.5 5.5 z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay usuarios</td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal isOpen={isOpen} onClose={closeModal} title="Editar usuario">
        {" "}
        {editUser && <EditUser user={editUser} onClose={closeModal} handleSaveClick={updateUser} />}{" "}
      </Modal>
    </div>
  );
};

export default Users;
