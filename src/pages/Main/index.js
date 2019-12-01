/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Exception } from 'handlebars';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Form, SubmitButton, List } from './styled';
import Container from '../../components/Container';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    invalidInput: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      this.setState({ loading: true });
      const { newRepo, repositories } = this.state;
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      repositories.forEach(repo => {
        if (repo.name === data.name) {
          throw new Exception('Invalid repository name.');
        }
      });

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        invalidInput: false,
      });
    } catch {
      this.setState({ invalidInput: true, loading: false });
    }
  };

  render() {
    const { newRepo, repositories, loading, invalidInput } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} invalidInput={invalidInput}>
          <input
            invalidInput={invalidInput}
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
