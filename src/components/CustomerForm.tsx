import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import { Task } from '../interfaces/task';
import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { ToastContext } from '../context';

interface Props {
  id?: string;
  show: boolean;
}

const CustomerForm: FC<Props> = ({ id }) => {
  const router = useRouter();

  const [task, setTask] = useState<Task>({
    name: '',
    description: '',
    autor: '',
    is_complete: 0,
  });

  const showToast = useContext(ToastContext);

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`http://localhost:8000/task/${id}`);
      if (!response.ok) {
        throw new Error('Error fetching task');
      }
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = id
      ? `http://localhost:8000/task/${id}`
      : 'http://localhost:8000/task';
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      console.log('Task saved:', data);

      showToast({ msg: 'Task saved succesfully' });

      router.push('/');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleChange = (e) => {
    const value =
      e.target.type === 'checkbox' ? Number(e.target.checked) : e.target.value;

    setTask((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center mx-5">
        <div className="text-center mt-5 mb-5">
          {id ? <h1>Edit Task </h1> : <h1>Create Task</h1>}
        </div>
        <Form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={task.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Autor
            </label>
            <input
              type="text"
              className="form-control"
              name="autor"
              value={task.autor}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              label="Status"
              name="is_complete"
              checked={!!task.is_complete}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Save Task
          </button>
        </Form>
      </Row>
    </Container>
  );
};

export default CustomerForm;
