import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../../connectors/redux/actions/projects';
import {
  selectAllProjects,
  selectProjectsStatus,
} from '../../connectors/redux/selectors/projects';

class Projects extends React.Component {
  componentDidMount() {
    this.props.fetchProjects();
  }

  renderProjects() {
    const { allProjects, projectsStatus } = this.props;

    if (projectsStatus === 'BUSY') {
      return (
        <h1>loading...</h1>
      );
    }

    return (
      <ul className="workProjectsList">
        {allProjects.map(project => (
          <li key={project.slug} className="workProjectsListItem">
            {project.title}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div>
        { this.renderProjects() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    allProjects: selectAllProjects(state),
    projectsStatus: selectProjectsStatus(state)
});

const ProjectsListConnected = connect(
  mapStateToProps,
  actions,
)(Projects);

Projects.propTypes = {
  allProjects: PropTypes.arrayOf(PropTypes.shape({
    featured: PropTypes.boolean,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  fetchProjects: PropTypes.func.isRequired,
  projectsStatus: PropTypes.string.isRequired,
};

export { Projects };

export default ProjectsListConnected;
