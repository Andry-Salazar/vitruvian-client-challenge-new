import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import { Container, Form, Row } from 'react-bootstrap';
import { Task } from '../interfaces/task';

const IndexPage: NextPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:8000/tasks');
      const data: Task[] = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const deleteTask = async (id: string | number) => {
    try {
      const response = await fetch(`http://localhost:8000/task/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log('Task deleted:', data);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <h1 className="text-center my-5" style={{ color: '	#000' }}>
          My Tasks List
        </h1>
      </Row>
      <Row className="mb-5">
        <Link href="/task">
          <div>
            <Button variant="primary" size="lg">
              Add Task
              <i className="bi bi-plus"></i>
            </Button>
          </div>
        </Link>
      </Row>
      <Row>
        <Table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Is completed</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={idx}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td
                  style={{
                    fontSize: '0.9rem',
                    verticalAlign: 'middle',
                    textAlign: 'justify',
                  }}
                >
                  {task.description}
                </td>
                <td>
                  <Form.Check
                    type="checkbox"
                    name="is_complete"
                    checked={!!task.is_complete}
                    readOnly
                  />
                </td>
                <td
                  style={{
                    fontSize: '0.9rem',
                    verticalAlign: 'middle',
                    textAlign: 'justify',
                    justifyContent: 'center',
                  }}
                >
                  <Link href={`/task/${task.id}`}>
                    <Button variant="outline-success">
                      <i className="bi bi-pencil-square"></i>Edit
                    </Button>
                  </Link>
                </td>
                <td
                  style={{
                    fontSize: '0.9rem',
                    textAlign: 'justify',
                    justifyContent: 'center',
                  }}
                >
                  <Button
                    variant="outline-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    <i className="bi bi-trash-fill"></i>Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div>
          <h4>You have {tasks.length} Tasks</h4>
        </div>
      </Row>
    </Container>
  );
};
export default IndexPage;
