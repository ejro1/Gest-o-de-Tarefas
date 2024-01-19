import React, { useState, useEffect } from "react";
import AuthService from "../../services/auth.service";

const Dashboard = () => {
    const currentUser = AuthService.getCurrentUser();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch("SEU_ENDPOINT_DA_API_BACKEND/tarefas", {
                headers: {
                    Authorization: `Bearer ${AuthService.getToken()}`,
                },
            });

            if (!response.ok) {
                throw new Error("Falha ao buscar tarefas");
            }

            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error.message);
        }
    };

    const logOut = () => {
        AuthService.logout();
    };

    return (
        <main>
            <div className="p-1 mb-4 bg-body-terciary rounded-3">
                <div className="container-fluid py-5">
                    <h1 className="display-5 fw-bold">Olá {currentUser}</h1>
                    <p className="col-md-8 fs-4">Suas tarefas:</p>
                    <ul>
                        {tasks.map((task) => (
                            <li key={task.id}>{task.title}</li>
                        ))}
                    </ul>
                    <div className="d-flex justify-content">
                        <button className="btn btn-danger btn-lg px-4" onClick={logOut}>
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Dashboard;
