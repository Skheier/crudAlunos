import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";

import './TestCss.css'; /* ./Stylus.css */

const API_URL = "http://localhost:8081/";

export default function Teest() {
//const [count, setCount] = useState(0);/**PORTANTES */
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({nome: "", telefone: "" , email: "", endereco: ""}); /*Não precisa do campo "id"   const [form, setForm] = useState({nome: "", telefone: "" , email: "", endereco: ""}); */

  // Carregar usuários da API ao iniciar
  useEffect(() => {
    fetch(`${API_URL}getAll`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      /*
      .then(res => {
        const persons = res.data;
        const longeur = res.length;
        this.setState({ persons, longeur });
      })
      */
      .catch((error) => console.error("Erro ao carregar usuários:", error));
  }, []);

  // Atualizar estado do formulário
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Adicionar ou atualizar usuário
  const handleSubmit = () => {
    if (form.id) {
      // Atualizar usuário (PUT)
      fetch(`${API_URL}edit/${form.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((updatedUser) => {
          setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
          setForm({ id: "", nome: "", telefone: "", email: "", endereco: ""});
        })
        .catch((error) => console.error("Erro ao atualizar usuário:", error));
    } else {
      // Criar novo usuário (POST)
      fetch(`${API_URL}new`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
        .then((res) => res.json())
        .then((newUser) => {
          setUsers([...users, newUser]);
          setForm({ id: "", nome: "", telefone: "", email: "", endereco: ""});
        })
        .catch((error) => console.error("Erro ao adicionar usuário:", error));
    }
  };

  // Preencher formulário ao editar usuário
  const handleEdit = (user) => {
    setForm(user);
  };

  // Excluir usuário (DELETE)
  const handleDelete = (id) => {
    fetch(`${API_URL}delete/${id}`, { method: "DELETE" })
      .then(() => setUsers(users.filter((user) => user.id !== id)))
      .catch((error) => console.error("Erro ao excluir usuário:", error));
  };

  return (
    
    <div className="fundo">

      <div className="greyCard">
        <h1>Listagem de Alunos</h1> {/* /{count} */}

        <Card>
          <CardContent className="p-4">
          <Input name="id" value={form.id} onChange={handleChange} placeholder="id" className="mb-2" /> {/* Não sei se deixo aqui ou não, a aplicação funcionaria engual */}
            <Input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" className="mb-2" />
            <Input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" className="mb-2" />
            <Input name="email" value={form.email} onChange={handleChange} placeholder="E-mail" className="mb-2" />
            <Input name="endereco" value={form.endereco} onChange={handleChange} placeholder="Endereco" className="mb-2" />
            <Button onClick={handleSubmit} className="w-full">{form.id ? "Atualizar" : "Adicionar"}</Button>
          </CardContent>
        </Card>
        
        <table  className="mainTable">
          <tr>
            <th>Nome:</th>
            <th>Telefone:</th>
            <th>E-mail:</th>
            <th>Endereco:</th>
            <th id="actionsTh">Actions</th>
          </tr>
          {users.map((user) => (
          <tr key={user.id}>
            <td>{user.nome}</td>
            <td>{user.telefone}</td>
            <td>{user.email}</td>
            <td>{user.endereco}</td>
            <td id="buttonsRow">
                <Button onClick={() => handleEdit(user)} className="">Editar</Button>
                <Button onClick={() => handleDelete(user.id)} variant="destructive">Excluir</Button>
              </td>
          </tr>
          ))}
        </table>
        
      </div>{/*...end grey card... */}


    </div>
  );
}
