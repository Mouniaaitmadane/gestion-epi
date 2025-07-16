import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const API_URL = "http://localhost:8080/utilisateurs";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({
    nomUtilisateur: "",
    motDePasse: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setUsers(data);
  };

  const handleOpen = (user = null) => {
    setSelectedUser(user);
    setForm(user || { nomUtilisateur: "", motDePasse: "", role: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (selectedUser) {
      await fetch(`${API_URL}/${selectedUser.id_utilisateur}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    fetchUsers();
    handleClose();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div className="p-4">
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Ajouter un utilisateur
      </Button>
      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell>Rôle</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id_utilisateur}>
                <TableCell>{user.nom_utilisateur}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleOpen(user)}>
                    Modifier
                  </Button>
                  <Button
                    color="secondary"
                    onClick={() => handleDelete(user.id_utilisateur)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedUser ? "Modifier" : "Ajouter"} un utilisateur
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Nom"
            name="nomUtilisateur"
            fullWidth
            margin="dense"
            value={form.nomUtilisateur}
            onChange={handleChange}
          />
          <TextField
            label="Mot de passe"
            name="motDePasse"
            type="password"
            fullWidth
            margin="dense"
            value={form.motDePasse}
            onChange={handleChange}
          />
          <TextField
            label="Rôle"
            name="role"
            fullWidth
            margin="dense"
            value={form.role}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {selectedUser ? "Modifier" : "Ajouter"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
