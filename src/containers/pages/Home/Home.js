import React from 'react';
import { withSiteData, withRouteData, Link } from 'react-static';
import ImageLoading, { Fallback, LoadingPlaceholder } from 'react-image-loading';
import styled from 'styled-components';
import TextTransition from '../../../components/TextTransition';

const HomeWrapper = styled.div`
  .homeContainer {
    max-width: 500px;
    padding: 60px 20px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .header {
    font-size: 18px;
    margin-bottom: 60px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  .subheader {
    font-size: 14px;
  }

  .projectDetailImage {
    border: 1px solid #ebebeb;
  }

  @media (min-width: 768px) {
    .homeContainer {
      padding: 60px 0;
    }

    .header {
      font-size: 24px;
    }

    .subheader {
      font-size: 16px;
    }
  }
`;

const Home = withRouteData(({ projects }) => {
  const latestFeaturedProject = projects.filter(project => project.featured)
    .sort((projectA, projectB) => {
      if (projectA.createdAt > projectB.createdAt) {
        return -1;
      }
      if (projectA.createdAt < projectB.createdAt) {
        return 1;
      }
      return 0;
    })[0];

  const featureDetail = latestFeaturedProject.details.filter(detail => detail.featured)[0];
  const featuredImage = featureDetail && featureDetail.image;

  return (
    <HomeWrapper>
      <div className="homeContainer">
        <h1 className="header">Lee Sargent</h1>
        <TextTransition >
          <p className="subheader">Front End Developer</p>
        </TextTransition>
        <ImageLoading>
          {(ref, status) => (
            <React.Fragment>
              {status === 'error' || !featuredImage
                  ? <Fallback style={{ backgroundColor: '#ccc' }} />
                  :
                  <React.Fragment>
                    <Link to={`/work/${latestFeaturedProject.slug}/`}>
                      <img ref={ref} src={featuredImage} className="projectDetailImage" alt="Recent Work" />
                    </Link>
                    <LoadingPlaceholder
                      style={{
                          transition: 'opacity 1.2s',
                          opacity: status === 'loading' ? 1 : 0,
                          backgroundColor: 'white',
                        }}
                      animate={status === 'loading'}
                    />
                    <TextTransition >
                      <p className="subheader">
                        <span role="img" aria-label="pointing up">
                          ☝️
                        </span> Recent Work:
                        {' '}
                        <Link to={`/work/${latestFeaturedProject.slug}/`}>
                          {latestFeaturedProject.title}
                        </Link>
                      </p>
                    </TextTransition>
                  </React.Fragment>
                }
            </React.Fragment>
            )}
        </ImageLoading>
      </div>
    </HomeWrapper>
  );
});


export default withSiteData(Home);
